import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentWorkspace } from "../../redux/actions/workspace.action";
import { getAllTrees } from "../../redux/actions/trees.actions";
import Navbar from "../../components/navbar";
import AllTrees from "./tree/allTrees";
import "./style.scss";

const Workspace = () => {
  const { workspaceId } = useParams();
  const dispatch = useDispatch();

  const workspaceDetails = useSelector((state) => state.data.currentWorkspace);

  useEffect(() => {
    // fetch workspace details
    // fetch trees
    if (workspaceId) {
      dispatch(getCurrentWorkspace(workspaceId));
      dispatch(getAllTrees(workspaceId));
    }
  }, [workspaceId]);

  return (
    <Fragment>
      <Navbar
        title={workspaceDetails?.title}
        description={workspaceDetails?.description}
      />

      <AllTrees />
    </Fragment>
  );
};

export default Workspace;
