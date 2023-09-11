import { useDispatch, useSelector } from "react-redux";
import AllCards from "../card/allCards";
import {
  createNewCard,
  getAllCards,
  getTotalCards,
} from "../../../redux/actions/card.actions";
import { useEffect } from "react";

const AllTrees = () => {
  const allTrees = useSelector((state) => state.data.allTrees);
  const currentWorkspace = useSelector((state) => state.data.currentWorkspace);
  const totalCards = useSelector((state) => state.data.totalCards);
  const dispatch = useDispatch();

  const fetchTotalCards = () => {
    dispatch(getTotalCards(currentWorkspace?._id));
  };

  useEffect(() => {
    if (currentWorkspace?._id) fetchTotalCards();
  }, [currentWorkspace]);

  const handleCreateNewCard = (treeId) => {
    if (totalCards >= 0) {
      const cardDetails = {
        title: "Title",
        cardId: totalCards + 1,
        treeId: treeId,
        workspaceId: currentWorkspace?._id,
      };

      dispatch(createNewCard(cardDetails));
    }
  };

  const fetchCards = (treeId) => {
    dispatch(getAllCards(currentWorkspace?._id, treeId));
  };

  useEffect(() => {
    if (!allTrees) return;

    allTrees?.forEach((tree) => {
      fetchCards(tree._id);
    });
  }, [allTrees]);

  return (
    <div className="AllTrees">
      {allTrees?.map((tree) => {
        return (
          <div className="Tree" key={tree._id}>
            <h3>{tree.name}</h3>

            {/* cards */}
            <AllCards treeId={tree._id} />

            {/* Create Card  */}
            <button
              className="create-card-btn"
              onClick={() => handleCreateNewCard(tree._id)}
            >
              Create New Card
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AllTrees;
