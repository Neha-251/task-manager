import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RgbaColorPicker } from "react-colorful";
import {
  createNewBadge,
  updateBadge,
} from "../../redux/actions/workspace.action";
import {
  setShowToaster,
  setToasterError,
} from "../../redux/actions/common.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const BadgeModal = ({ onBtnClick, action, btnText, badgeId }) => {
  const currentWorkspace = useSelector((state) => state.data.currentWorkspace);

  const [newBadgeDetails, set_newBadgeDetails] = useState({
    name: "badge1",
    color: { r: 200, g: 150, b: 35, a: 0.5 },
    workspaceId: currentWorkspace?._id,
  });

  const dispatch = useDispatch();

  const handleCreateBadge = () => {
    if (newBadgeDetails.name && newBadgeDetails.color) {
      const badgeDetails = {
        ...newBadgeDetails,
        color: getColorFromRGBA(newBadgeDetails.color),
      };

      action === "create"
        ? dispatch(createNewBadge(badgeDetails))
        : dispatch(updateBadge(badgeDetails, badgeId));
    } else {
      dispatch(
        setToasterError({
          type: "error",
          message: "Please fill all the details",
        })
      );
      dispatch(setShowToaster(true));
    }

    onBtnClick("close");
  };

  const getColorFromRGBA = (rgba) => {
    const { r, g, b, a } = rgba;
    return `rgba(${r},${g},${b},${a})`;
  };

  return (
    <div className="Modal">
      <div className="create-badge Modal-Sub">
        <FontAwesomeIcon
          onClick={(e) => onBtnClick(e, "close")}
          className="cross modal-cross"
          icon={faXmark}
        />

        <div className="Modal-content">
          <input
            type="text"
            value={newBadgeDetails.name}
            onChange={(e) =>
              set_newBadgeDetails({ ...newBadgeDetails, name: e.target.value })
            }
          />
          <div className="create-badge-color">
            <div
              className="color-box"
              style={{
                backgroundColor: getColorFromRGBA(newBadgeDetails.color),
              }}
            ></div>
            <RgbaColorPicker
              color={newBadgeDetails.color}
              onChange={(color) =>
                set_newBadgeDetails({ ...newBadgeDetails, color })
              }
            />
          </div>
          <button onClick={handleCreateBadge}>{btnText}</button>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;
