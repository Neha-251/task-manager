import logo from "./logo.svg";
import "./App.css";
import MainNav from "./src/components/main-nav";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./src/pages/dashboard/dashboard";
import Loader from "./src/components/loader";
import User from "./src/pages/user/user";
import Toaster from "./src/components/toaster/toaster";

function App() {
  const showLoader = useSelector((state) => state.data.showLoader);
  const showToaster = useSelector((state) => state.data.showToaster);

  return (
    <>
      <MainNav />

      {showLoader ? <Loader /> : null}
      {showToaster ? <Toaster /> : null}

      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/user" element={<User />}></Route>
        {/* <Route exact path="/product/:id" element={<ProductDetails />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
