import { useSelector } from "react-redux";

const AllTrees = () => {
  const allTrees = useSelector((state) => state.data.allTrees);

  return (
    <div className="AllTrees">
      {allTrees?.map((tree) => {
        return (
          <div className="Tree" key={tree._id}>
            <h3>{tree.name}</h3>

            {/* cards */}

            {/* Create Card  */}
            <button className="create-card-btn">Create New Card</button>
          </div>
        );
      })}
    </div>
  );
};

export default AllTrees;
