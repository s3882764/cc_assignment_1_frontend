import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
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
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;