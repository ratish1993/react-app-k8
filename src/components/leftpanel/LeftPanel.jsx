import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

export default function LeftPanel() {
  let location = useLocation();
  let path = location?.pathname;
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("userDetails");

    if (data) {
      setUserDetails(JSON.parse(data));
    }
  }, []);

  let activemenu="0";
  if(path === '/my-request' || path === '/add-equipment-request' || path === '/pending-request' || path === '/completed-request' || path === '/my-equipment-related-request'){
    activemenu="1";
  }else if(path === '/my-contact' || path === '/my-wishlist'){
    activemenu="2";
  }
  return (
    <div className="sidebar" id="sidebar">
      <div className="list-group rounded-0">
        {userDetails.user_type === 1 && (
          <Link
            to={"/firm-dashboard"}
            className={
              path === "/firm-dashboard"
                ? "active list-group-item list-group-item-action border-0 align-items-center"
                : "list-group-item list-group-item-action border-0 align-items-center"
            }
          >
            <span className="ml-2">Dashboard</span>
          </Link>
        )}

        {/* <Link
            to={userDetails.user_type === 1 ? "/firm-dashboard" : "/"}
            className={
              path === "/" || path === "/firm-dashboard"
                ? "active list-group-item list-group-item-action border-0 align-items-center"
                : "list-group-item list-group-item-action border-0 align-items-center"
            }
          >
            {userDetails.user_type === 1 ? (
              <span className="ml-2">Dashboard</span>
            ) : (
              <span className="ml-2">Equipment List</span>
            )}
          </Link> */}

        <Accordion className="dropdown_menu" defaultActiveKey={activemenu}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Equipment</Accordion.Header>
            <Accordion.Body>
              {userDetails.user_type === 2 && (
                <>
                  <Link
                    to="/"
                    className={
                      path === "/"
                        ? "active list-group-item list-group-item-action border-0 align-items-center"
                        : "list-group-item list-group-item-action border-0 align-items-center"
                    }
                  >
                    <span className="ml-2">Equipment List</span>
                  </Link>
                  <Link
                    to="/my-favorite-equipment"
                    className={
                      path === "/my-favorite-equipment"
                        ? "active list-group-item list-group-item-action border-0 align-items-center"
                        : "list-group-item list-group-item-action border-0 align-items-center"
                    }
                  >
                    <span className="ml-2">Favorite Equipment</span>
                  </Link>
                </>
              )}

              {userDetails.user_type === 1 && (
                <>
                  <Link
                    to="/my-equipment"
                    className={
                      path === "/my-equipment"
                        ? "active list-group-item list-group-item-action border-0 align-items-center"
                        : "list-group-item list-group-item-action border-0 align-items-center"
                    }
                  >
                    <span className="ml-2">My Equipment</span>
                  </Link>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        {/* </Accordion>

        <Accordion className="dropdown_menu" defaultActiveKey={path === 'my-request' || 'add-equipment-request' || 'pending-request' || 'completed-request' || 'my-equipment-related-request' ? "0" : ''}> */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Request</Accordion.Header>
            <Accordion.Body>
              {userDetails.user_type === 2 && (
                <>
                  <Link
                    to="/my-request"
                    className={
                      path === "/my-request" ||
                      path === "/add-equipment-request"
                        ? "active list-group-item list-group-item-action border-0 align-items-center"
                        : "list-group-item list-group-item-action border-0 align-items-center"
                    }
                  >
                    <span className="ml-2">My Request</span>
                  </Link>
                  <Link
                    to="/pending-request"
                    className={
                      path === "/pending-request"
                        ? "active list-group-item list-group-item-action border-0 align-items-center"
                        : "list-group-item list-group-item-action border-0 align-items-center"
                    }
                  >
                    <span className="ml-2">Pending Proposal</span>
                  </Link>
                  <Link
                    to="/completed-request"
                    className={
                      path === "/completed-request"
                        ? "active list-group-item list-group-item-action border-0 align-items-center"
                        : "list-group-item list-group-item-action border-0 align-items-center"
                    }
                  >
                    <span className="ml-2">Completed Proposal</span>
                  </Link>
                </>
              )}

              {userDetails.user_type === 1 && (
                <>
                  <Link
                    to="/my-equipment-related-request"
                    className={
                      path === "/my-equipment-related-request"
                        ? "active list-group-item list-group-item-action border-0 align-items-center"
                        : "list-group-item list-group-item-action border-0 align-items-center"
                    }
                  >
                    <span className="ml-2">Equipment Request</span>
                  </Link>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        {/* </Accordion>

        <Accordion className="dropdown_menu" defaultActiveKey={path === 'my-contact' || 'my-wishlist'  ? "0" : ''}> */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>Vendors</Accordion.Header>
            <Accordion.Body>
              <Link
                to="/my-contact"
                className={
                  path === "/my-contact"
                    ? "active list-group-item list-group-item-action border-0 align-items-center"
                    : "list-group-item list-group-item-action border-0 align-items-center"
                }
              >
                <span className="ml-2">My Vendors</span>
              </Link>

              <Link
                to="/my-wishlist"
                className={
                  path === "/my-wishlist"
                    ? "active list-group-item list-group-item-action border-0 align-items-center"
                    : "list-group-item list-group-item-action border-0 align-items-center"
                }
              >
                <span className="ml-2">Favorite Vendors</span>
              </Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* <Link
          to="/chat"
          className={
            path === "/chat"
              ? "active list-group-item list-group-item-action border-0 align-items-center"
              : "list-group-item list-group-item-action border-0 align-items-center"
          }
        >
          <span className="ml-2">Chat</span>
        </Link> */}

        {/* <Link
            to="/profile"
            className={
              path === "/profile"
                ? "active list-group-item list-group-item-action border-0 align-items-center"
                : "list-group-item list-group-item-action border-0 align-items-center"
            }
          >
            <span className="ml-2">Profile</span>
          </Link> */}
      </div>
    </div>
  );
}
