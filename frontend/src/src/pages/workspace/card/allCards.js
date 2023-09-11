import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const AllCards = ({ treeId }) => {
  const [cards, setCards] = useState([]);
  const dispatch = useDispatch();
  const allCards = useSelector((state) => state.data.allCards);

  useEffect(() => {
    if (!allCards || !treeId) return;

    const _cards = allCards?.filter((card) => card.treeId === treeId);

    if (_cards) setCards(_cards[0]?.data);
  }, [allCards]);

  return (
    <div className="Cards">
      {cards?.map((card) => {
        return (
          <div className="Card" key={card._id}>
            <div className="card-header">
              <p>#{card.cardId}</p>
              <FontAwesomeIcon className="pencil-icon" icon={faPencil} />
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
