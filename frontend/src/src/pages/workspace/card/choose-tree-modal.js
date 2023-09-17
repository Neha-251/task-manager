import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCards, updateCard } from "../../../redux/actions/card.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ChooseTreeModal = ({ treeId, card, shouldCloseModal }) => {
  const allTrees = useSelector((state) => state.data.allTrees);
  const currentWorkspace = useSelector((state) => state.data.currentWorkspace);
  const dispatch = useDispatch();

  const [trees, set_trees] = useState();
  const [chosenTreeId, set_chosenTreeId] = useState("");

  useEffect(() => {
    if (!allTrees) return;

    const _trees = allTrees?.filter((tree) => tree._id !== treeId);

    set_trees(_trees);
  }, [allTrees]);

  const handleCardMove = () => {
    const data = { ...card, treeId: chosenTreeId };

    dispatch(updateCard(card._id, data));
    setTimeout(() => {
      dispatch(getAllCards(currentWorkspace?._id, treeId));
      dispatch(getAllCards(currentWorkspace?._id, chosenTreeId));
    }, 1000);
    shouldCloseModal("close");
  };

  return (
    <div className="Modal">
      <div className="Modal-Sub">
        <h3 className="text-center">
          Choose Tree To Move Card #{card?.cardId}
        </h3>
        <FontAwesomeIcon
          onClick={(e) => shouldCloseModal("close")}
          className="cross modal-cross"
          icon={faXmark}
        />
        <div className="Modal-content flex gap-10 text-center align-center ">
          <select
            value={chosenTreeId}
            onChange={(e) => set_chosenTreeId(e.target.value)}
          >
            <option value=""> Please Choose A Tree</option>;
            {trees?.map((tree) => {
              return (
                <option key={tree._id} value={tree._id}>
                  {tree.name}
                </option>
              );
            })}
          </select>
          <button style={{ width: "100px" }} onClick={() => handleCardMove()}>
            Move
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseTreeModal;
