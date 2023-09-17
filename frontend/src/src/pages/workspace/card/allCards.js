import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteCard,
  getAllCards,
  getLastCardId,
  updateCard,
} from "../../../redux/actions/card.actions";
import { getAllBadges } from "../../../redux/actions/workspace.action";
import { useNavigate } from "react-router-dom";
import ChooseTreeModal from "./choose-tree-modal";

const AllCards = ({ treeId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentWorkspace = useSelector((state) => state.data.currentWorkspace);
  const allCards = useSelector((state) => state.data.allCards);
  const allBadges = useSelector((state) => state.data.allBadges);

  const [cards, set_cards] = useState();
  const [moveModal, set_moveModal] = useState({ status: false, card: {} });

  useEffect(() => {
    const _cards = allCards?.filter((card) => card.treeId === treeId)[0];
    set_cards(_cards?.data);
  }, [allCards]);

  useEffect(() => {
    dispatch(getAllCards(currentWorkspace?._id, treeId));
  }, [treeId, dispatch, currentWorkspace]);

  useEffect(() => {
    dispatch(getAllBadges(currentWorkspace?._id));
  }, [dispatch, currentWorkspace]);

  const handleCardDelete = (e, id) => {
    e.stopPropagation();
    dispatch(deleteCard(id, treeId));
    dispatch(getLastCardId(currentWorkspace?._id));
  };

  const handleCardEditBtnClick = (cardId) => {
    navigate(`/card/${cardId}`);
  };

  const handleCardMove = (e, card) => {
    e.stopPropagation();
    set_moveModal({ status: true, card });
  };

  return (
    <>
      {moveModal.status ? (
        <ChooseTreeModal
          treeId={treeId}
          card={moveModal.card}
          shouldCloseModal={(action) => {
            if (action === "close") set_moveModal({ status: false, card: {} });
          }}
        />
      ) : null}
      <div className="Cards">
        {cards?.map((card) => {
          return (
            <div
              className="Cards-card"
              key={card._id}
              onClick={() => handleCardEditBtnClick(card._id)}
            >
              <div className="card-header">
                {/* badges */}
                <div className="badges-container flex gap-5">
                  {card.badges?.map((badgeId) => {
                    const badge = allBadges?.filter(
                      (badge) => badge._id === badgeId
                    )[0];

                    return (
                      <div
                        key={badgeId}
                        style={{
                          backgroundColor: badge?.color,
                          height: "5px",
                          width: "40px",
                        }}
                      ></div>
                    );
                  })}
                </div>
                {/* badges */}

                {/* editing div */}
                <div className="icon-div">
                  <FontAwesomeIcon
                    className="dark-icon icon"
                    icon={faArrowRightArrowLeft}
                    onClick={(e) => handleCardMove(e, card)}
                  />
                  <FontAwesomeIcon
                    onClick={(e) => handleCardDelete(e, card._id)}
                    className="icon dark-icon "
                    icon={faTrash}
                  />
                </div>
                {/* editing div */}
              </div>
              <div className="card-content">
                <p>#{card.cardId}</p>
                <h5>{card.title}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllCards;
