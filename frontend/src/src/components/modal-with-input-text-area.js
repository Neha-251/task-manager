import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ModalWithInputTextArea = (props) => {
  const { onBtnClick, btnText, defName, defDesc } = props;
  const [workspaceName, setNewWorkspaceName] = useState(defName);
  const [description, set_description] = useState(defDesc);

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
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              value={workspaceName}
              autoFocus
            />
            <textarea
              onChange={(e) => set_description(e.target.value)}
              value={description}
              cols={20}
            />
          </form>
        </div>
        <div className="Modal-btn">
          <button
            onClick={(e) => onBtnClick(e, btnText, workspaceName, description)}
          >
            {btnText}
          </button>
          <button onClick={(e) => onBtnClick(e, "cancel")}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalWithInputTextArea;
