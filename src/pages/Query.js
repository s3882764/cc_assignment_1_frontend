import React, { useState, useEffect } from "react";
import AWS from 'aws-sdk';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Query = () => {
  const [rows, setRows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  
  const handleSubmit = async (event) => {
    var { title, artist, year } = document.forms[0];
    console.log("Title: " + title.value, " artist: " + artist.value + " year: " + year.value);
    var queryString = "";
    if(title.value == "" && artist.value == "" && year.value == ""){
      alert("Enter at least one of the fields");
    } else {
    if(title.value != ""){
      queryString = "title=" + title.value;
    }
    if(artist.value != ""){
      queryString = queryString == "" ? "artist=" + artist.value : queryString + "&artist=" + artist.value;
    }
    if(year.value != ""){
      queryString = queryString == "" ? "yearDb=" + year.value : queryString + "&yearDb=" + year.value;
    }
    await fetch(`https://ginbfsis8c.execute-api.us-east-1.amazonaws.com/dev/music/search?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
              setIsLoaded(true);
              if(data.music.length >0){
                const initialState = data.music.map(obj => obj.music);
                setRows(data.music);
              } else if(data.music.length == 0) {
                alert("No songs with this search")
              }
            })
            .catch((err) => {
                console.log(err);
            });
          }
          };

    const handleAdd = async (data) => {
      let url = `https://ginbfsis8c.execute-api.us-east-1.amazonaws.com/dev/subscription`
      await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
              "email": localStorage.getItem("email"),
              "title": data.title
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((res) => {
              setIsLoaded(true);
              console.log(res);
              if(res.message == "New Item created/updated"){
                alert("Music sucscribed successfully");
              } else {
                alert("Music is already subscribed");
              }
            })
            .catch((err) => {
                console.log(err);
            });
          };
   
    return (
      <>
      { isLoaded ? 
      <div>
        <form>
          <div className="field1">
          <h3>Enter Search term</h3>
          <br></br>
          <label htmlFor="title"> Title</label>
          <input name="title" placeholder="Title" />
          <label htmlFor="artist"> Artist</label>
          <input name="artist" placeholder="Artist" />
          <label htmlFor="year"> Year</label>
          <input name="year" type="number" placeholder="Year" />
        </div>
        <br></br>
      <button type="button" onClick={() => {
                        handleSubmit();
                        setIsLoaded(false)
                    }}  id="submitBtn" className="submitBtn">submit</button>
  </form>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableHead">Title</TableCell>
              <TableCell align="right" className="tableHead">Artist</TableCell>
              <TableCell align="right" className="tableHead">Year</TableCell>
              <TableCell align="right" className="tableHead">Artist Image</TableCell>
              <TableCell align="right" className="tableHead">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                {/* <TableCell align="right">{row.title}</TableCell> */}
                <TableCell align="right">{row.artist}</TableCell>
                <TableCell align="right">{row.yearDb}</TableCell>
                
                <TableCell align="right"><img height="100" width="100" src={`data:image/png;base64,`+ `https://ginbfsis8c.execute-api.us-east-1.amazonaws.com/dev/image?image=${row.title}`}/></TableCell>
               
                {/* <TableCell align="right"><img height="100" width="100" src={`data:image/png;base64,${get_image(row.title)}`}/></TableCell> */}
                <TableCell align="right"><button onClick={() => {
                        setIsLoaded(false)
                        handleAdd(row)
                    }} >Add</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
       :
      <BeatLoader color="#36d7b7"/>
}
      </>
    );
  };
  
  export default Query;