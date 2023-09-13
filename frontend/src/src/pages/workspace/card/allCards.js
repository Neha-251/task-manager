import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteCard } from "../../../redux/actions/card.actions";
import Card from "./card";

const AllCards = ({ treeId }) => {
  const [cards, setCards] = useState([]);
  const [lastEditedCard, set_lastEditedCard] = useState();
  const [showCardModal, set_showCardModal] = useState(false);
  const dispatch = useDispatch();
  const allCards = useSelector((state) => state.data.allCards);

  useEffect(() => {
    if (!allCards || !treeId) return;

    const _cards = allCards?.filter((card) => card.treeId === treeId);

    if (_cards) setCards(_cards[0]?.data);
  }, [allCards]);

  const handleCardDelete = (id) => {
    dispatch(deleteCard(id, treeId));
  };

  const handleCardClick = (card) => {
    set_lastEditedCard(card);
    set_showCardModal(true);
  };

  return (
    <div className="Cards">
      {cards?.map((card) => {
        return (
          <div
            className="card"
            key={card._id}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-header">
              <div>badges</div>
              <div className="icon-div">
                <FontAwesomeIcon className="icon pencil-icon" icon={faPencil} />
                <FontAwesomeIcon
                  onClick={() => handleCardDelete(card._id)}
                  className="icon"
                  icon={faTrash}
                />
              </div>
            </div>
            <div className="card-content">
              <p>#{card.cardId}</p>
              <h5>{card.title}</h5>
            </div>
          </div>
        );
      })}

      {showCardModal ? (
        <Card
          card={lastEditedCard}
          onBtnClick={() => set_showCardModal(false)}
        />
      ) : null}
    </div>
  );
};

export default AllCards;
