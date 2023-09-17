import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCard, updateCard } from "../../../redux/actions/card.actions";
import { isEqual } from "lodash";

const { faXmark, faPencil } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

const Card = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(getCard(id));
  }, [id]);

  const allBadges = useSelector((state) => state.data.allBadges);
  const currentCard = useSelector((state) => state.data.currentCard);

  const [cardDetails, set_cardDetails] = useState();

  useEffect(() => {
    if (currentCard) set_cardDetails(currentCard);
  }, [currentCard]);

  const [showBadgeDropDown, set_showBadgeDropDown] = useState(false);
  const [showDescTextArea, set_showDescTextArea] = useState(false);
  const [showTitleInput, set_showTitleInput] = useState(false);

  const handleAddBadgeToCardDetails = (badgeId) => {
    const { badges } = cardDetails;

    if (badges.includes(badgeId)) {
      const filteredBadges = badges.filter((badge) => badge !== badgeId);
      set_cardDetails({ ...cardDetails, badges: filteredBadges });
    } else {
      set_cardDetails({
        ...cardDetails,
        badges: [...badges, badgeId],
      });
    }
  };

  const handleModalClose = () => {
    if (!isEqual(cardDetails, currentCard)) {
      // if there is any change in card details update card
      dispatch(updateCard(cardDetails._id, cardDetails));
    }

    navigate(-1);
  };

  return (
    <div className="Modal Card-container">
      <div className="Modal-Sub">
        <FontAwesomeIcon
          onClick={handleModalClose}
          className=" modal-cross"
          icon={faXmark}
        />

        <div className="Modal-content">
          <div className="Card">
            <div className="card-header rel">
              <h2>#{cardDetails?.cardId}</h2>
              {!showTitleInput ? (
                <h1>{cardDetails?.title}</h1>
              ) : (
                <input
                  type="text"
                  value={cardDetails?.title}
                  onChange={(e) =>
                    set_cardDetails({ ...cardDetails, title: e.target.value })
                  }
                  autoFocus
                />
              )}
              <FontAwesomeIcon
                onClick={() =>
                  set_showTitleInput(showTitleInput ? false : true)
                }
                className="dark-icon abs"
                icon={faPencil}
              />
            </div>

            <div className="card-body">
              <div className="card-badges">
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
                          onClick={() => handleAddBadgeToCardDetails(badge._id)}
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
                {cardDetails?.badges?.map((badgeId, index) => {
                  const badgeContent = allBadges.filter(
                    (_badge) => _badge._id === badgeId
                  )[0];

                  return (
                    <div
                      className="card-badge-item"
                      key={index}
                      style={{
                        backgroundColor: badgeContent?.color,
                        color: "white",
                      }}
                    >
                      {badgeContent?.name}
                    </div>
                  );
                })}
              </div>
              <div className="card-description ">
                <FontAwesomeIcon
                  onClick={() =>
                    set_showDescTextArea(showDescTextArea ? false : true)
                  }
                  className="pencil-icon"
                  icon={faPencil}
                />
                {showDescTextArea ? (
                  <textArea
                    value={cardDetails.description}
                    onChange={(e) =>
                      set_cardDetails({
                        ...cardDetails,
                        description: e.target.value,
                      })
                    }
                    cols={60}
                    rows={10}
                    autoFocus
                  />
                ) : (
                  <p>{cardDetails?.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
