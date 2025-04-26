import React, { useEffect, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import Loader from "../../common/loader/Loader";
import { BUCKET_DOMAIN } from "../../helper/Helper";
import { default_avatar } from "../../assets/images";
import axios from "../../helper/axios";
import config from "../../helper/config ";
import { toast } from "react-toastify";
import moment from "moment";

export default function AllChats() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [profiles, setAllProfiles] = useState([]);

  const [profileDetails, setProfileDetails] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [aggrementDate, setAggrementDate] = useState("");

  const [message, setMessage] = useState("");
  const [request_equ_id, setRequest_equ_id] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("userDetails");

    if (data) {
      data = JSON.parse(data);
      setUserId(data._id);
    }

    getAllProfiles();
    // eslint-disable-next-line
  }, []);

  const getAllProfiles = () => {
    setLoading(true);

    axios
      .get("/equipment/all-chat-users", config)
      .then((res) => {
        if (res.data.success) {
          let { profiles } = res.data;
          setAllProfiles(profiles);
          if (allComments.length === 0 && profiles.length > 0) {
            getAllChats(profiles[0].request_equipment_id);
            setRequest_equ_id(profiles[0].request_equipment_id);
          }
        } else {
          setLoading(false);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong");
      });
  };

  const getAllChats = (id) => {
    setLoading(true);

    axios
      .get(`equipment/chats/${id}`, config)
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          let { comment, profileDetails, createdAt } = res.data.chats;
          setAllComments(comment);
          setAggrementDate(createdAt);
          setProfileDetails(profileDetails);
        } else {
          toast.error(res.data.mesage);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    axios
      .post(
        "/equipment/add-comment",
        {
          comment: message,
          request_equipment_id: request_equ_id,
          email: profileDetails.email,
        },
        config
      )
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setMessage("");
          getAllChats(request_equ_id);
          getAllProfiles();
        } else {
          setLoading(false);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong");
      });
  };

  return (
    <div className="main">
      {loading && <Loader />}

      <LeftPanel />
      <div className="main-bar">
        <div className="equipment-sec">
          <div className="row">
            <div className="col-sm-4">
              <div className="left-sidebar-chat">
                {/* <div className="search-chat-profile">
                  <RiSearchLine className="search-icon" />
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                  />
                </div> */}

                <div className="list-chat-profile">
                  <ul>
                    {profiles.map((item, key) => {
                      return (
                        <li
                          style={{ cursor: "pointer" }}
                          key={key}
                          onClick={() => {
                            getAllChats(item.request_equipment_id);
                            setRequest_equ_id(item.request_equipment_id);
                          }}
                        >
                          <div className="profile">
                            <img
                              style={{ width: "42px", height: "42px" }}
                              className="img-fluid rounded-circle"
                              src={
                                item.profileDetails?.avatar
                                  ? BUCKET_DOMAIN + item.profileDetails.avatar
                                  : default_avatar
                              }
                              alt={`${key}_"user"`}
                            />
                          </div>
                          <div style={{ width: "100%" }}>
                            <div className="msg-info">
                              <div className="msg-info-name">
                                {item.profileDetails?.full_name}
                              </div>
                              <div className="msg-info-time">
                                {moment(item.updatedAt).format(
                                  "DD-MMM-YYYY, hh:mm a"
                                )}
                              </div>
                            </div>
                            <div className="msg-text">
                              <span>Equipment Name:</span>{" "}
                              {item.equipmentDetails?.model_name}
                            </div>
                            <p>
                              {item.lastComment.user_id !== userId
                                ? ""
                                : "You : "}
                              {item.lastComment.msg}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {allComments.length > 0 && (
              <div className="col-sm-8">
                <div className="card right-sidebar-chat">
                  <div className="right-sidebar-title">
                    <div className="common-space">
                      <div className="chat-time">
                        <div className="active-profile">
                          <img
                            className="img-fluid rounded-circle"
                            src={
                              profileDetails.avatar
                                ? BUCKET_DOMAIN + profileDetails.avatar
                                : default_avatar
                            }
                            alt="user"
                          />
                          <div className="status bg-success"></div>
                        </div>
                        <div>
                          <p>{profileDetails.full_name}</p>
                          <small style={{ fontsize: "12px" }}>
                            {moment(aggrementDate).format("DD-MMM-YYYY")}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="right-sidebar-Chats">
                    <div className="msger">
                      <div className="msger-chat">
                        {allComments.map((item, key) => {
                          return (
                            <div
                              key={key}
                              className={`msg ${
                                item.user_id === userId
                                  ? "right-msg"
                                  : "left-msg"
                              }`}
                            >
                              <div className="msg-bubble">
                                <div className="msg-info">
                                  <div className="msg-info-name">
                                    {item.user_id === userId
                                      ? "You"
                                      : profileDetails.full_name}
                                  </div>
                                  <div className="msg-info-time">
                                    {moment(item.createdAt).format(
                                      "DD-MMM-YYYY, hh:mm a"
                                    )}
                                  </div>
                                </div>
                                <div className="msg-text">{item.msg}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <form className="msger-inputarea" onSubmit={handleSubmit}>
                        <div
                          className="dropdown-form dropdown-toggle"
                          role="main"
                        >
                          <i className="icon-plus" />
                          <div className="chat-icon dropdown-menu dropdown-menu-start">
                            <div className="dropdown-item mb-2">
                              <svg>
                                <use href="../assets/svg/icon-sprite.svg#camera"></use>
                              </svg>
                            </div>
                            <div className="dropdown-item">
                              <svg>
                                <use href="../assets/svg/icon-sprite.svg#attchment"></use>
                              </svg>
                            </div>
                          </div>
                        </div>

                        <textarea
                          className="msger-input two uk-textarea"
                          style={{ height: "55px" }}
                          rows="2"
                          required
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                          placeholder="Type Message here.."
                        />

                        <button className="msger-send-btn" type="submit">
                          <i className="fa fa-location-arrow" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
