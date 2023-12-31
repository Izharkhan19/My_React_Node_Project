import { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";

function BreadcrumPath({ pageNav }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Breadcrumb>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="25"
        height="25"
        viewBox="0 0 50 50"
        onClick={() => navigate(`/home`)}
        style={{ cursor: "pointer" }}
      >
        <path d="M 24.960938 1.1015625 A 1.0001 1.0001 0 0 0 24.386719 1.3105469 L 1.3867188 19.210938 A 1.0001 1.0001 0 1 0 2.6132812 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.386719 20.789062 A 1.0001 1.0001 0 1 0 48.613281 19.210938 L 40.96875 13.261719 A 1.0001 1.0001 0 0 0 41 13 L 41 7 A 1.0001 1.0001 0 0 0 40 6 L 36.099609 6 A 1.0001 1.0001 0 0 0 35.099609 7 L 35.099609 8.6933594 L 25.613281 1.3105469 A 1.0001 1.0001 0 0 0 24.960938 1.1015625 z M 25 3.3671875 L 44 18.154297 L 44 45 L 32 45 L 32 27 A 1.0001 1.0001 0 0 0 31 26 L 19 26 A 1.0001 1.0001 0 0 0 18 27.158203 L 18 45 L 6 45 L 6 18.154297 L 25 3.3671875 z M 37.099609 8 L 39 8 L 39 11.728516 L 37.099609 10.25 L 37.099609 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
      </svg>
      {pageNav &&
        pageNav.map((item) => (
          <Breadcrumb.Item
            onClick={() => navigate(`${item.link}`)}
            className={"ms-2"}
            active={item.active}
          >
            {item.name}
          </Breadcrumb.Item>
        ))}
    </Breadcrumb>
  );
}

export default BreadcrumPath;
