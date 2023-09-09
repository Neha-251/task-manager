import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/actions/common.action";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faUser,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MainNav = () => {
  const theme = useSelector((state) => state.data.theme);
  const dispatch = useDispatch();

  const [showSubmenu, set_showSubmenu] = useState(false);

  return (
    <div className="MainNav">
      <div
        className="icon-menu"
        onClick={() => set_showSubmenu(showSubmenu ? false : true)}
      >
        <FontAwesomeIcon className="icon" icon={faBars} />
      </div>

      <div className={showSubmenu ? "sub-menu-show" : "sub-menu-hidden"}>
        <FontAwesomeIcon className="icon" icon={faHouse} />
        <Link to="/user">
          {" "}
          <FontAwesomeIcon className="icon" icon={faUser} />{" "}
        </Link>

        <div>
          {theme === "Dark" ? (
            <FontAwesomeIcon className="icon" icon={faSun} />
          ) : (
            <FontAwesomeIcon className="icon" icon={faMoon} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNav;
