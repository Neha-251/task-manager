import logo from "./logo.svg";
import "./App.css";
import MainNav from "./src/components/main-nav";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./src/pages/dashboard/dashboard";
import Loader from "./src/components/loader";
import User from "./src/pages/user/user";
import Toaster from "./src/components/toaster/toaster";
import { useEffect } from "react";
import { setUserDetails, setUserID } from "./src/redux/actions/user.action";
import Workspace from "./src/pages/workspace/workspace";
import Badge from "./src/pages/badge/badge";
import Card from "./src/pages/workspace/card/card";
import UserDetails from "./src/pages/user/user-details";

function App() {
  const showLoader = useSelector((state) => state.data.showLoader);
  const showToaster = useSelector((state) => state.data.showToaster);
  const userId = useSelector((state) => state.data.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch user details from
    // if get userDetails, save in redux
    // else navigate to user route

    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
      dispatch(setUserDetails(userDetails));
      dispatch(setUserID(userDetails._id));
    } else {
      navigate("/user");
    }
  }, []);

  return (
    <>
      <MainNav />

      {showLoader ? <Loader /> : null}
      {showToaster ? <Toaster /> : null}

      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/user" element={<User />}></Route>
        <Route exact path="/userDetails" element={<UserDetails />}></Route>
        <Route
          exact
          path="/workspace/:workspaceId"
          element={<Workspace />}
        ></Route>
        <Route exact path="/badge" element={<Badge />}></Route>
        <Route exact path="/card/:id" element={<Card />}></Route>
      </Routes>
    </>
  );
}

export default App;
