import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteCard } from "../../../redux/actions/card.actions";

const AllCards = ({ treeId }) => {
  const [cards, setCards] = useState([]);
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

  return (
    <div className="Cards">
      {cards?.map((card) => {
        return (
          <div className="Card" key={card._id}>
            <div className="card-header">
              <p>#{card.cardId}</p>
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
              <h5>{card.title}</h5>
              <div>badges</div>
              <div>members</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllCards;
