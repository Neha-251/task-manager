import { useEffect, useState } from "react";

const AllCards = ({ treeId }) => {
  const [cards, setCards] = useState([]);

  const allCards = useSelector((state) => state.data.allCards);

  useEffect(() => {
    if (!allCards || !treeId) return;

    const _cards = allCards.filter((card) => card.treeId === treeId);
    setCards(_cards);
  }, [allCards]);

  return (
    <div className="Cards">
      {cards?.map((card) => {
        return (
          <div className="card" key={card._id}>
            <h4>{card.title}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default AllCards;
