import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewBadge,
  getAllBadges,
} from "../../redux/actions/workspace.action";
import { RgbaColorPicker } from "react-colorful";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setShowToaster,
  setToasterError,
} from "../../redux/actions/common.action";
import "./style.scss";
import BadgeModal from "./badge-modal.js";

const Badge = () => {
  const dispatch = useDispatch();
  const currentWorkspace = useSelector((state) => state.data.currentWorkspace);
  const allBadges = useSelector((state) => state.data.allBadges);

  const [currColor, set_currColor] = useState({
    r: 200,
    g: 150,
    b: 35,
    a: 0.5,
  });

  const [showColorPicker, set_showColorPicker] = useState(false);

  const [colorPickerPosition, set_colorPickerPosition] = useState({
    top: -99999,
    left: -99999,
  });

  useEffect(() => {
    if (!allBadges.length) dispatch(getAllBadges(currentWorkspace?._id));
  }, []);

  const handleColorEdit = (badgeId) => {
    set_modalDetails({ action: "edit", btnText: "Update Badge", badgeId });
    set_showInputModal(true);
  };

  const getColorFromRGBA = (rgba) => {
    const { r, g, b, a } = rgba;
    return `rgba(${r},${g},${b},${a})`;
  };

  const [showInputModal, set_showInputModal] = useState(false);
  const [modalDetails, set_modalDetails] = useState({
    action: "create",
    btnText: "Create Badge",
  });

  const handleBadgeCreateBtnClick = () => {
    set_modalDetails({ action: "create", btnText: "Create Badge" });
    set_showInputModal(showInputModal ? false : true);
  };

  return (
    <div className="Badge">
      <button onClick={handleBadgeCreateBtnClick}>Create new Badge</button>

      {showInputModal ? (
        <BadgeModal
          onBtnClick={() => set_showInputModal(false)}
          btnText={modalDetails.btnText}
          action={modalDetails.action}
          badgeId={modalDetails.badgeId}
        />
      ) : null}

      <div className="badge-container">
        {allBadges?.map((badge) => {
          return (
            <div
              className="badge"
              style={{ backgroundColor: badge.color }}
              key={badge?._id}
            >
              <h5>{badge.name}</h5>
              <FontAwesomeIcon
                className="icon-pencil"
                icon={faPencil}
                onClick={() => handleColorEdit(badge._id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badge;
