import { useDispatch, useSelector } from "react-redux";
import {
  createNewCard,
  getAllCards,
  getLastCardId,
  getTotalCards,
} from "../../../redux/actions/card.actions";
import { useEffect, useState } from "react";
import { getAllBadges } from "../../../redux/actions/workspace.action";
import Trees from "./trees";

const AllTrees = () => {
  const allTrees = useSelector((state) => state.data.allTrees);
  const currentWorkspace = useSelector((state) => state.data.currentWorkspace);
  const dispatch = useDispatch();

  const [sortedTrees, set_sortedTrees] = useState();

  useEffect(() => {
    const _sortedTrees = allTrees?.sort((a, b) => a.order - b.order);
    set_sortedTrees(_sortedTrees);
  }, [allTrees]);

  const fetchTotalCardsANdLastCardId = () => {
    dispatch(getTotalCards(currentWorkspace?._id));
    dispatch(getLastCardId(currentWorkspace?._id));
  };

  useEffect(() => {
    if (currentWorkspace) {
      fetchTotalCardsANdLastCardId();
      dispatch(getAllBadges(currentWorkspace?._id));
    }
  }, [currentWorkspace]);

  return (
    <>
      <Trees trees={sortedTrees} />
    </>
  );
};

export default AllTrees;
