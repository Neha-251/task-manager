import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { updateTree } from "../../../redux/actions/trees.actions";
import { useDispatch } from "react-redux";

const TreeHeader = ({ tree }) => {
  const dispatch = useDispatch();
  const [isEditTreeName, set_isEditTreeName] = useState(false);
  const [treeName, set_treeName] = useState(tree?.name);

  const handleEditTreeName = (tree) => {
    if (treeName === tree.name) {
      set_isEditTreeName(false);
      return;
    }
    const data = { ...tree, name: treeName };
    dispatch(updateTree(tree._id, data));
    set_isEditTreeName(false);
  };

  return (
    <div className="tree-header rel">
      {!isEditTreeName ? (
        <Fragment>
          <h3>{tree.name}</h3>
          <FontAwesomeIcon
            onClick={() => set_isEditTreeName(isEditTreeName ? false : true)}
            className="dark-icon abs"
            icon={faPencil}
          />
        </Fragment>
      ) : (
        <Fragment>
          <input
            type="text"
            value={treeName}
            onChange={(e) => set_treeName(e.target.value)}
          />{" "}
          <div>
            <button onClick={() => handleEditTreeName(tree)}>Ok</button>
            <button onClick={() => set_isEditTreeName(false)}>Cancel</button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default TreeHeader;
