import { useEffect, useState } from "react";
import ModalWithInputTextArea from "../../components/modal-with-input-text-area";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkspace,
  deleteWorkspace,
  getAllWorkspaces,
  updateWorkspace,
} from "../../redux/actions/workspace.action";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [showModal, set_showModal] = useState(false);
  const userId = useSelector((state) => state.data.userId);
  const allWorkspaces = useSelector((state) => state.data.allWorkspaces);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateWorkspace = (workspaceName, description) => {
    const data = {
      title: workspaceName,
      members: [userId],
      description: description,
    };

    dispatch(createWorkspace(data));
    dispatch(getAllWorkspaces(userId));
    set_showModal(false);
  };

  const handleEditWorkspace = (workspaceName, workspaceDescription) => {
    const data = {
      title: workspaceName,
      description: workspaceDescription,
    };
    dispatch(updateWorkspace(lastClickedWorkspaceId, data));
    set_showModal(false);
  };

  useEffect(() => {
    if (userId) dispatch(getAllWorkspaces(userId));
  }, [userId, dispatch]);

  const handleNavigate = (workspaceId) => {
    navigate(`/workspace/${workspaceId}`);
  };

  const handleDeleteWorkspace = (e, id) => {
    e.stopPropagation();
    dispatch(deleteWorkspace(id));
  };

  const [modalDetails, set_modalDetails] = useState({
    defName: "",
    defDesc: "",
    btnText: "",
  });
  const [lastClickedWorkspaceId, set_lastClickedWorkspaceId] = useState();

  const handleEditBtnClick = (e, workspace) => {
    e.stopPropagation();
    set_modalDetails({
      defName: workspace.title,
      defDesc: workspace.description,
      btnText: "Edit",
    });
    set_showModal(true);
    set_lastClickedWorkspaceId(workspace._id);
  };

  const handleCreateBtnClick = () => {
    set_modalDetails({
      defName: "New Workspace",
      defDesc: "this is new workspace",
      btnText: "Create",
    });
    set_showModal(true);
  };

  return (
    <div className="Dashboard">
      {/* create new workspace */}
      <button onClick={handleCreateBtnClick}>Create New Workspace</button>
      {showModal ? (
        <ModalWithInputTextArea
          onBtnClick={(e, action, workspaceName, description) => {
            if (action === "Create")
              handleCreateWorkspace(workspaceName, description);
            else if (action === "Edit") {
              handleEditWorkspace(workspaceName, description);
            } else set_showModal(false);
          }}
          btnText={modalDetails.btnText}
          defName={modalDetails.defName}
          defDesc={modalDetails.defDesc}
        />
      ) : null}

      {/* existing workspaces */}

      <div className="workspaces">
        {allWorkspaces?.map((workspace) => {
          return (
            <div
              className="card workspace"
              key={workspace._id}
              onClick={() => handleNavigate(workspace._id)}
            >
              <h2>{workspace.title}</h2>
              <p>{workspace.description}</p>
              <div className="icon-div">
                <FontAwesomeIcon
                  onClick={(e) => handleEditBtnClick(e, workspace)}
                  className="pencil-icon icon"
                  icon={faPencil}
                />
                <FontAwesomeIcon
                  onClick={(e) => handleDeleteWorkspace(e, workspace._id)}
                  className="icon"
                  icon={faTrash}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
