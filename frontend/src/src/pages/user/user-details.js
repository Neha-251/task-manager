import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails, setUserID } from "../../redux/actions/user.action";

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.data.userDetails);

  const handleLogOut = () => {
    localStorage.removeItem("userDetails");
    dispatch(setUserDetails({}));
    dispatch(setUserID(null));
    navigate("/user");
  };

  return (
    <div
      className="m-20 p-30"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        width: "fit-content",
      }}
    >
      <div>
        <div className="flex gap-10">
          <p>Name: </p> <p>{userDetails?.name}</p>
        </div>
        <div className="flex gap-10">
          <p>Email: </p> <p>{userDetails?.email}</p>
        </div>

        <div className="flex gap-10">
          <p>Designation: </p> <p>{userDetails?.designation}</p>
        </div>
      </div>
      <div className="text-center m-20 gap-10">
        <button onClick={() => handleLogOut()}>Log Out</button>
      </div>
    </div>
  );
};

export default UserDetails;
