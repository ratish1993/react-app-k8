import React, { useEffect, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import Loader from "../../common/loader/Loader";
import { FaTrash } from "react-icons/fa";
import axios from "../../helper/axios";
import config from "../../helper/config ";
import { toast } from "react-toastify";
import { BUCKET_DOMAIN, DATE_TIME_HELPER } from "../../helper/Helper";
import { default_avatar } from "../../assets/images";
import moment from "moment";
import DeletePopup from "../../utils/DeletePopup";

export default function MyWishlist() {
  const [loading, setLoading] = useState(false);

  const [wishListProposal, setWishListProposal] = useState([]);
  const [accepetProposalId, setAcceptProposalId] = useState("");

  useEffect(() => {
    getAllWishlist();
  }, []);

  const getAllWishlist = () => {
    setLoading(true);
    axios
      .get(`/equipment/all-wishlist-proposal`, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          let { proposals } = res.data;
          setWishListProposal(proposals);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong");
      });
  };

  const deleteWishlist = () => {
    setLoading(true);
    axios
      .delete(`/equipment/wishlist/${accepetProposalId}`, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success(res.data.message);
          setAcceptProposalId("");

          getAllWishlist();
        } else {
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

      {/* FOR APPROVE PROPOSAL */}
      <DeletePopup
        message="Delete this proposal?"
        show={accepetProposalId !== ""}
        no={() => {
          setAcceptProposalId("");
        }}
        yes={deleteWishlist}
      />

      <div className="main-bar">
        <div className="container">
          <div className="row">
            <h4 style={{ marginTop: "15px" }}>
              My Wishlist ({wishListProposal.length})
            </h4>
            {wishListProposal.map((item, key) => {
              return (
                <div className="col-sm-6" key={key}>
                  <div className="equipment-card" style={{ marginTop: "10px" }}>
                    <div className="client-review-sec">
                      <div>
                        <img
                          src={
                            item.userDetails.avatar
                              ? BUCKET_DOMAIN + item.userDetails.avatar
                              : default_avatar
                          }
                          className="proposals-profile"
                          alt={item.userDetails.full_name}
                        />
                      </div>
                      <div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h6 className="mb-0">
                              {item.userDetails.full_name}{" "}
                              <mark>${item.proposalDetails.price}</mark>
                            </h6>
                            {item.proposalDetails.accept && (
                              <span>Accepted</span>
                            )}
                            <p className="mb-1">
                              {moment(item.createdAt).format(
                                DATE_TIME_HELPER.DATE_FORMAT_MONTH_NAME
                              )}
                            </p>
                          </div>
                          <div style={{ position: "absolute", right: "0" }}>
                            <FaTrash
                              className="wishlist-icon"
                              onClick={() => {
                                setAcceptProposalId(item._id);
                              }}
                            />
                          </div>
                        </div>

                        <p>{item.proposalDetails.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
