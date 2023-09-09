import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setShowToaster } from "../../redux/actions/common.action";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Toaster = () => {
  const showToaster = useSelector((state) => state.data.showToaster);
  const { type, message } = useSelector((state) => state.data.toasterError);
  console.log("🚀 ~ file: toaster.js:10 ~ Toaster ~ message:", message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showToaster) {
      setTimeout(() => {
        dispatch(setShowToaster(false));
      }, 5000);
    }
  }, [showToaster]);

  return (
    <div className="Toaster">
      <div
        className={
          type === "error"
            ? "toaster-error toaster-content"
            : "toaster-success toaster-content"
        }
      >
        <FontAwesomeIcon
          onClick={() => dispatch(setShowToaster(false))}
          className="cross toaster-cross"
          icon={faXmark}
        />

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Toaster;
