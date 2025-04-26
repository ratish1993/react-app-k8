import React, { useEffect, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader/Loader";
import { BUCKET_DOMAIN } from "../../helper/Helper";
import { default_avatar } from "../../assets/images";
import axios from "../../helper/axios";
import config from "../../helper/config ";
import { toast } from "react-toastify";
import moment from "moment";

export default function Chat() {
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");
  const [profileDetails, setProfileDetails] = useState({});

  const [allChats, setAllChats] = useState([]);

  const [message, setMessage] = useState("");

  const id = useParams()?.id;

  useEffect(() => {
    let data = localStorage.getItem("userDetails");

    if (data) {
      data = JSON.parse(data);
      setUserId(data._id);
    }

    getAllChats();
    // eslint-disable-next-line
  }, [id]);

  const getAllChats = () => {
    setLoading(true);

    axios
      .get(`equipment/chats/${id}`, config)
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          let { comment, profileDetails } = res.data.chats;

          setAllChats(comment);

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
          request_equipment_id: id,
          email: profileDetails.email,
        },
        config
      )
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setMessage("");
          getAllChats();
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
      <LeftPanel />
      {loading && <Loader />}

      <div className="main-bar">
        <div className="equipment-sec">
          <div className="row">
            <div className="col-sm-12">
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
                        <div className="status bg-success" />
                      </div>
                      <div>
                        <span>{profileDetails.full_name}</span>
                        {/* <p>Online </p> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="right-sidebar-Chats">
                  <div className="msger">
                    <div className="msger-chat">
                      {allChats.map((item, key) => {
                        return (
                          <div
                            className={`msg ${
                              item.user_id === userId ? "right-msg" : "left-msg"
                            }`}
                            key={key}
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
                        style={{ height: "65px" }}
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
          </div>
        </div>
      </div>
    </div>
  );
}
