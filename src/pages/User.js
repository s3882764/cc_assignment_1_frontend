import { Navigate } from "react-router-dom";

function User() {
  const userName = localStorage.getItem("userName");
  console.log(userName);
  return (
    <>
    {userName ? <h1 className="users">Welcome {userName}</h1> : <Navigate replace={true} to='/' />}
    </>
);
}

export default User;