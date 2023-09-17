import { useState } from "react";
import InputModal from "./input-modal";
import { useDispatch, useSelector } from "react-redux";
import { createNewTree } from "../redux/actions/trees.actions";
import { Link, useParams } from "react-router-dom";

const Navbar = ({ title, description }) => {
  const [shouldOpenModal, set_shouldOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { workspaceId } = useParams();
  const allTrees = useSelector((state) => state.data.allTrees);

  const handleCreateTree = (action, inputText) => {
    if (!workspaceId) return;
    if (action === "Create") {
      dispatch(
        createNewTree({
          name: inputText,
          workspaceId: workspaceId,
          order: allTrees.length,
        })
      );
    }
    set_shouldOpenModal(false);
  };

  return (
    <nav>
      <div className="nav-heading">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="nav-btns " style={{ marginRight: "10px" }}>
        <button onClick={() => set_shouldOpenModal(true)}>
          Create New Tree
        </button>
        <Link to="/badge">
          <button>Badges</button>
        </Link>
      </div>

      {shouldOpenModal ? (
        <InputModal
          placeholder="Tree 1"
          btnText="Create"
          onBtnClick={handleCreateTree}
        />
      ) : null}
    </nav>
  );
};

export default Navbar;
