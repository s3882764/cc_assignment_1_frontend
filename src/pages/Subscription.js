import React from "react";
import AWS from 'aws-sdk';


function Subscription () {
    AWS.config.update({
        accessKeyId:"ASIASUA66KZZBGMC3T3T",
        secretAccessKey:"VPoPBFrqtkcx8MCWKlP2P2gl3hKJUmcy1NdKm3Zx"
        // aws_session_token:"FwoGZXIvYXdzEDAaDBMkUVEujaGDoLYsKCLNAWd6vuZ59hqon7NNsJAfYXxVQeWyj3j3pKAhqhLHP1JamKZ/8NuY9AGT/+v9p6NXAOKB1t4tSLGwW9XcTDmWNWx4SMxHJSZmFOiy9GfGDz0IBrgp5JmM7NneWQXq1ekuBa9JFe4t0Kp58SyEkqOXW88ls8MTcWDsLJOgI8tGrUkACQ+xL10bpzFY+oItqiCNyZ66Ox6LyZuoJg39c6h0uVHAlQK/Z3IOaruGV31qefevjdr5cASE/FVdKMJe7ND1F7kQqroAxq3tNorAxvso2c6yoQYyLeFxRA92PjRxf5Uu6MUBjpuM1I5ymBIrArD/Yazk0fXyJfTV4Bx2fSpA1GHKpQ==",
        // region:"us-east-1"
    });

    const handleDownload = () => {
            const s3 = new AWS.S3();
        
            const params = {
              Bucket: "music-album-images",
              Key: "1904",
              ResponseContentEncoding: 'content-type'
            };
        
            s3.getObject(params, (err, data) => {
              if (err) {
                console.log(err, err.stack);
              } else {
                console.log(data.Body.toString());
              }
            });
        
        }
    return (
    <><h1>Subscription</h1><div className="button-container">
            <input className="register" type="button" value="Click" onClick={() => {
                handleDownload();
            } } />
        </div></>
    );
    // return <AmplifyS3Image imgKey="1904" />
};
export default Subscription;




//   import React, { useState } from 'react';
// import { ListGroup, Dropdown } from 'react-bootstrap';
// import AWS from 'aws-sdk';

// const InputDownload = () => {
//   const [template, setTemplate] = useState('Choose Template');

//   AWS.config.update({
//     accessKeyId: process.env.REACT_APP_ACCESS_ID,
//     secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
//   });

//   const handleDownload = () => {
//     const s3 = new AWS.S3();

//     const params = {
//       Bucket: process.env.REACT_APP_INTERNAL_BUCKET_NAME,
//       Key: `templates/${template}`,
//     };

//     s3.getObject(params, (err, data) => {
//       if (err) {
//         console.log(err, err.stack);
//       } else {
//         console.log(data.Body.toString();
//       }
//     });

// }

//   return (
//     <>
//       <form className='bg-white my-4'>
//         <Dropdown>
//           <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
//             {template}
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onSelect={() => setTemplate('T1')}>
//               T1</Dropdown.Item>
//             <Dropdown.Item onSelect={() => setTemplate('IV1')}>
//               IV1
//             </Dropdown.Item>
//             <Dropdown.Item onSelect={() => setTemplate('IV2')}>
//               IV2
//             </Dropdown.Item>
//             <Dropdown.Item onSelect={() => setTemplate('DV1')}>
//               DV1
//             </Dropdown.Item>
            
//           </Dropdown.Menu>
//         </Dropdown>
//         <input
//           type='submit'
//           value='Download'
//           className='btn btn-primary btn-block mt-3'
//           onClick={handleDownload}
//         />
      
//       </form>
//     </>
//   );
// };

// export default InputDownload;
