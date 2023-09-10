import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";

const CreateNewCardModal = ({ treeId }) => {
  const currentWorkspace = useSelector((state) => state.data.currentWorkspace);

  const [cardDetails, set_cardDetails] = useState({
    title: "",
    description: "",
    cardId: "",
    badges: [],
    members: [],
    treeId: treeId,
    workspaceId: currentWorkspace._id,
    actions: "",
  });

  const handleCardDetailsUpdate = (e) => {
    const { name, value } = e.target;

    set_cardDetails({ ...cardDetails, [name]: value });
  };

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
              onChange={handleCardDetailsUpdate}
              value={cardDetails.title}
            />

            <input
              type="text"
              onChange={handleCardDetailsUpdate}
              value={cardDetails.description}
            />
          </form>
        </div>
        <div className="Modal-btn">
          <button
            onClick={(e) => onBtnClick(e, "create", workspaceName, description)}
          >
            Create
          </button>
          <button onClick={(e) => onBtnClick(e, "cancel")}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
