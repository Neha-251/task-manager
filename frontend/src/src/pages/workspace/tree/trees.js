import { useEffect, useState } from "react";
import TreeHeader from "./treeHeader";
import { useDispatch, useSelector } from "react-redux";
import { createNewCard } from "../../../redux/actions/card.actions";
import AllCards from "../card/allCards";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { isEqual } from "lodash";
import { updateTree } from "../../../redux/actions/trees.actions";

const Trees = ({ trees }) => {
  const currentWorkspace = useSelector((state) => state.data.currentWorkspace);
  const lastCardId = useSelector((state) => state.data.lastCardId);
  const dispatch = useDispatch();

  const [treesList, set_treesList] = useState(trees);

  useEffect(() => {
    if (trees) set_treesList(trees);
  }, [trees]);

  const handleCreateNewCard = (treeId) => {
    if (lastCardId >= 0) {
      const cardDetails = {
        title: "Title",
        cardId: +lastCardId + 1,
        treeId: treeId,
        workspaceId: currentWorkspace?._id,
      };

      dispatch(createNewCard(cardDetails));
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(treesList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    set_treesList(items);
  };

  useEffect(() => {
    treesList?.forEach((tree, index) => {
      if (tree.order !== index) {
        // update tree
        dispatch(updateTree(tree._id, { ...tree, order: index }));
      }
    });
  }, [treesList]);

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="AllTrees" direction="horizontal">
          {(provided) => (
            <div
              className="AllTrees"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {treesList?.map((tree, index) => {
                return (
                  <Draggable
                    key={tree._id}
                    draggableId={tree._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="Tree"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TreeHeader tree={tree} />
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
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Trees;
