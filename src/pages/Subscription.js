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


const Subscription = () => {

  const [rows, setRows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const loadData = async (event) => {
    await fetch('https://ginbfsis8c.execute-api.us-east-1.amazonaws.com/dev/subscription/' + localStorage.getItem("email"), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
              setIsLoaded(true);
              if(data.subscriptionResponse.length >0){
                const initialState = data.subscriptionResponse.map(obj => obj.music);
                setRows(initialState);
              }
            })
            .catch((err) => {
                console.log(err);
            });
          };

    const navigate = useNavigate();
    useEffect(() => {
      if(localStorage.getItem("email") != null){
          loadData();
        } else {
          navigate("/");
        }
    }, [])

    const handleRemove = async (data) => {
      let url = `https://ginbfsis8c.execute-api.us-east-1.amazonaws.com/dev/subscription/${localStorage.getItem("email")}/${data.title}`
      await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((res) => {
              setIsLoaded(true);
              const initialState = rows.filter(obj => obj.title !== data.title);
              setRows(initialState);
            })
            .catch((err) => {
                console.log(err);
            });
          };

        // async function get_image(name){
        //   let url = `https://ginbfsis8c.execute-api.us-east-1.amazonaws.com/dev/image?image=${name}`

        //   await fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     },
        // })
        //     .then((response) => {console.log(response.text())})
        //     .then((res) => {
        //       console.log(JSON.stringify(res))
        //       return res
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        //   };
        
   
    return (
      <>
      { isLoaded ? 
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
                        handleRemove(row)
                    }} >Remove</button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> :
      <BeatLoader color="#36d7b7"/>
}
      </>
    );
};

export default Subscription;




// AWS.config.update({
//   accessKeyId:"ASIASUA66KZZBGMC3T3T",
//   secretAccessKey:"VPoPBFrqtkcx8MCWKlP2P2gl3hKJUmcy1NdKm3Zx"
//   // aws_session_token:"FwoGZXIvYXdzEDAaDBMkUVEujaGDoLYsKCLNAWd6vuZ59hqon7NNsJAfYXxVQeWyj3j3pKAhqhLHP1JamKZ/8NuY9AGT/+v9p6NXAOKB1t4tSLGwW9XcTDmWNWx4SMxHJSZmFOiy9GfGDz0IBrgp5JmM7NneWQXq1ekuBa9JFe4t0Kp58SyEkqOXW88ls8MTcWDsLJOgI8tGrUkACQ+xL10bpzFY+oItqiCNyZ66Ox6LyZuoJg39c6h0uVHAlQK/Z3IOaruGV31qefevjdr5cASE/FVdKMJe7ND1F7kQqroAxq3tNorAxvso2c6yoQYyLeFxRA92PjRxf5Uu6MUBjpuM1I5ymBIrArD/Yazk0fXyJfTV4Bx2fSpA1GHKpQ==",
//   // region:"us-east-1"
// });

// const handleDownload = () => {
//       const s3 = new AWS.S3();
  
//       const params = {
//         Bucket: "music-album-images",
//         Key: "1904"
//       };
  
//       s3.getObject(params, (err, data) => {
//         if (err) {
//           console.log(err, err.stack);
//         } else {
//           console.log(data.Body.toString());
//         }
//       });
  
//   }
// return (
// <><h1>Subscription</h1><div className="button-container">
//       <input className="register" type="button" value="Click" onClick={() => {
//           handleDownload();
//       } } />
//   </div></>
// );