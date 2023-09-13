import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBadges } from "../../../redux/actions/workspace.action";

const { faXmark } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const Card = ({ card, onBtnClick }) => {
  const { _id, title, description, cardId, badges, treeId, actions } = card;

  const allBadges = useSelector((state) => state.data.allBadges);
  console.log("🚀 ~ file: card.js:12 ~ Card ~ allBadges:", allBadges);
  const currentWorkspace = useSelector((state) => state.data.allBadges);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allBadges.length) {
      dispatch(getAllBadges(currentWorkspace?._id));
    }
  }, []);

  const [cardDetails, set_cardDetails] = useState({
    title,
    description,
    badges,
    actions,
    cardId,
    treeId,
  });

  const [showBadgeDropDown, set_showBadgeDropDown] = useState(false);

  return (
    <div className="Modal Card-container">
      <div className="Modal-Sub">
        <FontAwesomeIcon
          onClick={(e) => onBtnClick(e, "close")}
          className="cross modal-cross"
          icon={faXmark}
        />

        <div className="Modal-content">
          <div className="Card">
            <div className="card-header">
              <h2>#{cardId}</h2>
              <h1>{title}</h1>
            </div>

            <div className="card-body">
              <div className="card-badges">
                {badges?.map((badge, index) => {
                  return (
                    <div
                      className="card-badge"
                      key={index}
                      style={{ backgroundColor: badge.color }}
                    >
                      {badge.name}
                    </div>
                  );
                })}
                {/* <div className="card-badge">Add Badge</div> */}

                <div
                  className="card-badge"
                  onClick={() =>
                    set_showBadgeDropDown(showBadgeDropDown ? false : true)
                  }
                >
                  Add Badge
                </div>

                {showBadgeDropDown ? (
                  <div className="card-badges-dropdown">
                    {allBadges?.map((badge) => {
                      return (
                        <div
                          className="card-badge-item"
                          value={badge._id}
                          key={badge._id}
                          onClick={() =>
                            set_cardDetails({
                              ...cardDetails,
                              badges: [...cardDetails.badges, badge],
                            })
                          }
                        >
                          <div
                            className="badge-color"
                            style={{ backgroundColor: badge.color }}
                          ></div>
                          <p>{badge.name}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className="card-description ">{description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
