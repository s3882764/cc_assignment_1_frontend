import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from "react";

const Layout = () => {
  const navigate = useNavigate();
  // const [value, setValue] = React.useState('1');
  // React.useEffect(() => navigate("/dashboard/User"), [])

  const [value, setValue] = React.useState('3');
  React.useEffect(() => navigate("/dashboard/query"), [])

  const handleChange = (event, newValue) => {
    console.log("newValue" + newValue)
    setValue(newValue);
    if(newValue == 1){
      navigate("/dashboard/User");
    } else if(newValue == 2){
      navigate("/dashboard/Subscription");
    } else if(newValue == 3){
      navigate("/dashboard/Query");
    } else if(newValue == 4){
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/dashboard/User">User</Link>
          </li>
          <li>
            <Link to="/dashboard/Subscription">Subscription</Link>
          </li>
          <li>
            <Link to="/dashboard/Query">Query</Link>
          </li>
        </ul>
      </nav> */}

      

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Users" value="1" />
            <Tab label="Subscription" value="2" />
            <Tab label="Query" value="3" />
            <Tab label="Logout" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1"></TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3"></TabPanel>
        <TabPanel value="4"></TabPanel>
      </TabContext>
      <Outlet />
    </>
    
  )
};


export default Layout;