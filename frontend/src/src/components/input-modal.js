import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const InputModal = ({ placeholder, btnText, onBtnClick }) => {
  const [inputText, set_inputText] = useState(placeholder);

  return (
    <div className="Modal">
      <div className="Modal-Sub ">
        <FontAwesomeIcon
          onClick={(e) => onBtnClick(e, "close")}
          className="cross modal-cross"
          icon={faXmark}
        />

        <div className="Modal-content">
          <form>
            <input
              type="text"
              onChange={(e) => set_inputText(e.target.value)}
              value={inputText}
              autoFocus
            />
          </form>
        </div>
        <div className="Modal-btn">
          <button onClick={(e) => onBtnClick(btnText, inputText)}>
            {btnText}
          </button>
          <button onClick={(e) => onBtnClick("cancel")}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
