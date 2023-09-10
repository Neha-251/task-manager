import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./user.scss";
import LoginForm from "./loginForm";
import { LoginUser, createUser } from "../../redux/actions/user.action";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [userMode, set_userMode] = useState("login");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.data.userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) navigate("/");
  }, [userId]);

  const handleSubmit = (e, userDetails) => {
    e.preventDefault();

    userMode === "login"
      ? dispatch(LoginUser(userDetails))
      : dispatch(createUser(userDetails));
  };

  return (
    <div className="User">
      <div className="user-heading">
        <div
          className={userMode === "login" ? "selected" : ""}
          onClick={() => set_userMode("signup")}
        >
          Create Account
        </div>
        <div
          className={userMode !== "login" ? "selected" : ""}
          onClick={() => set_userMode("login")}
        >
          Login
        </div>
      </div>

      <div className="user-body">
        <LoginForm mode={userMode} onSubmit={handleSubmit} />
      </div>

      {userMode === "login" ? (
        <div className="user-text">
          <p>New User?</p>{" "}
          <button onClick={() => set_userMode("signup")} className="inline-btn">
            Create Account
          </button>
        </div>
      ) : (
        <div className="user-text">
          <p>Already have an account?</p>{" "}
          <button onClick={() => set_userMode("login")} className="inline-btn">
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
