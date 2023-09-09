import { useEffect, useState } from "react";
import CreateWorkspaceModal from "../../components/create-workspace-modal";
import "./dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkspace,
  getAllWorkspaces,
} from "../../redux/actions/workspace.action";

const Dashboard = () => {
  const [showModal, set_showModal] = useState(false);
  const userId = useSelector((state) => state.data.userId);
  const allWorkspaces = useSelector((state) => state.data.allWorkspaces);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (userId) dispatch(getAllWorkspaces(userId));
  }, [userId, dispatch]);

  return (
    <div>
      {/* create new workspace */}
      <button onClick={() => set_showModal(true)}>Create New Workspace</button>
      {showModal ? (
        <CreateWorkspaceModal
          onBtnClick={(e, action, workspaceName, description) => {
            if (action === "create")
              handleCreateWorkspace(workspaceName, description);
            else set_showModal(false);
          }}
        />
      ) : null}

      {/* existing workspaces */}

      <div className="workspaces">
        {allWorkspaces?.map((workspace) => {
          return (
            <div className="card workspace" key={workspace._id}>
              <h2>{workspace.title}</h2>
              <p>{workspace.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
