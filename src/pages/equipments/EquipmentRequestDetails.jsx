import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader/Loader";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import { toast } from "react-toastify";
import axios from "../../helper/axios";
import config from "../../helper/config ";
import { Form } from "react-bootstrap";
import CustomPopup from "../../utils/CustomPopup";
import validation from "../../helper/validation";
import moment from "moment";
import { BUCKET_DOMAIN, DATE_TIME_HELPER } from "../../helper/Helper";
import DeletePopup from "../../utils/DeletePopup";
import ReactDatePicker from "react-datepicker";
import { FaHeart } from "react-icons/fa";
import { default_avatar } from "../../assets/images";

export default function EquipmentRequestDetails() {
  const [loading, setLoading] = useState(true);

  const id = useParams()?.id;

  const [allModel, setAllModel] = useState({});
  const [allSpecification, setAllSpecification] = useState([]);

  const [formData, setFormData] = useState({
    equipment_type_id: "",
    model_name: "",
    price: "",
    duration_type: "",
    price_type: "",
    description: "",
    specification_details: {},
    start_date: "",
    end_date: "",
  });

  const [openProposal, setOpenProposal] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const [proposalData, setProposalData] = useState({
    request_equipment_id: "",
    price: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});

  const [proposals, setAllProposals] = useState([]);
  const [total, setTotal] = useState(0);

  const [accepetProposalId, setAcceptProposalId] = useState("");
  const [wishlistId, setWishlistId] = useState({});

  const [acceptProposalDetails, setAcceptProposalDetails] = useState({});

  useEffect(() => {
    let data = localStorage.getItem("userDetails");

    if (data) {
      data = JSON.parse(data);
      setUserDetails(data);

      if (data.user_type === 2) {
        getAllProposal();
      }
    }
    getEquipmentDetails();
    // eslint-disable-next-line
  }, [id]);

  const getEquipmentDetails = () => {
    setLoading(true);
    axios
      .get(`/equipment/request-equipment/${id}`, config)
      .then(async (res) => {
        setLoading(false);
        if (res.data.success) {
          let { data } = res.data;

          for (const [key, value] of Object.entries(data)) {
            if (key === "equipment_type_id") {
              formData[key] = value.name;
              setAllModel(value.model_number);
              setAllSpecification(value.specification_details);
            } else {
              formData[key] = value;
            }
            setFormData({ ...formData });
          }
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

  const getAllProposal = () => {
    setLoading(true);

    axios
      .get(`/equipment/proposals/${id}`, config)
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          let { proposals, total } = res.data;
          setAllProposals(proposals);
          setTotal(total);
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

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    proposalData[name] = value;

    setProposalData({ ...proposalData });

    const valid_obj = {
      value,
      rules: e.target.getAttribute("validaterule"),
      message: e.target.getAttribute("validatemsg"),
    };

    validation(valid_obj).then((err) => {
      setErrors({ ...errors, [name]: err });
    });
  };

  const isValidForm = (errors) => {
    for (const [, value] of Object.entries(errors)) {
      if (value.length > 0) {
        return false;
      }
    }
    return true;
  };

  const clearProposal = () => {
    setOpenProposal(false);

    setProposalData({
      request_equipment_id: "",
      price: "",
      comment: "",
    });
  };

  const submitProposal = (e) => {
    e.preventDefault();

    if (isValidForm(errors)) {
      proposalData.request_equipment_id = id;

      setLoading(true);

      axios
        .post("/equipment/add-proposal", proposalData, config)
        .then((res) => {
          setLoading(false);

          if (res.data.success) {
            toast.success(res.data.message);
            clearProposal();
            getEquipmentDetails();
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          toast.error("Something Went Wrong");
        });
    }
  };

  const proposalAccept = () => {
    setLoading(true);

    let { comment, user_id } = acceptProposalDetails;

    axios
      .put(
        `equipment/accept-proposal/${accepetProposalId}`,
        { req_equp_id: id, comment, proposal_user_id: user_id },
        config
      )
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          toast.success(res.data.message);
          getEquipmentDetails();
          getAllProposal();
          setAcceptProposalId("");
          setAcceptProposalDetails("");
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

  const toggleWishlist = () => {
    setLoading(true);

    axios
      .get(`/equipment/toggle-wishlist/${wishlistId._id}`, config)
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          toast.success(res.data.message);
          getAllProposal();
          setWishlistId({});
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

      <CustomPopup
        show={openProposal}
        onClose={clearProposal}
        title="Send Proposal"
      >
        <Form onSubmit={submitProposal}>
          <div className="equipment-sec">
            {formData.price_type === 1 && (
              <div className="col-lg-12 mb-4">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    className="form-control"
                    placeholder="Price"
                    type="text"
                    name="price"
                    required
                    validaterule={["required", "isPrice"]}
                    validatemsg={["Price is required"]}
                    value={proposalData.price}
                    onChange={handleOnChange}
                  />
                  <p className="invalid_input">{errors.price}</p>
                </div>
              </div>
            )}
            <div className="col-sm-12">
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  required
                  name="comment"
                  placeholder="Notes"
                  value={proposalData.comment}
                  onChange={handleOnChange}
                />
                <p className="invalid_input">{errors.comment}</p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="submit" className="save-changes-submit">
              Submit Proposal
            </button>
          </div>
        </Form>
      </CustomPopup>

      {/* FOR APPROVE PROPOSAL */}
      <DeletePopup
        message="Approve this proposal ?"
        show={accepetProposalId !== ""}
        no={() => {
          setAcceptProposalId("");
          setAcceptProposalDetails("");
        }}
        yes={proposalAccept}
      />

      {/* FOR ADD TO WISHLIST */}
      <DeletePopup
        message={
          wishlistId.isWishlist
            ? "Remove to wish this proposal ?"
            : "Add to wish this proposal ?"
        }
        show={Object.keys(wishlistId).length > 0}
        no={() => {
          setWishlistId({});
        }}
        yes={toggleWishlist}
      />

      <div className="main-bar">
        <div className="equipment-sec">
          <Form>
            <div className="row">
              <div className="col-sm-12">
                <h2>Equipment Request Details </h2>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-6 mb-4">
                <div className="form-group">
                  <label>Equipment Type</label>
                  <input
                    className="form-control"
                    name="equipment_type_id"
                    value={formData.equipment_type_id}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-sm-6 mb-4">
                <div className="form-group">
                  <label>{allModel.lebel}</label>
                  <input
                    className="form-control"
                    value={formData.model_name}
                    name="model_name"
                    readOnly
                  />
                </div>
              </div>

              {allSpecification.map((specification, key) => {
                return (
                  <div className="col-sm-6 mb-4" key={key}>
                    <div className="form-group">
                      <label>{specification.lebel}</label>
                      <input
                        className="form-control"
                        name={specification.lebel}
                        value={
                          formData.specification_details[
                            `"${specification.lebel}"`
                          ] || "Select " + specification.lebel
                        }
                        readOnly
                      />
                    </div>
                  </div>
                );
              })}

              <div className="col-lg-3 col-sm-6 mb-3">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    className="form-control"
                    placeholder="Price"
                    type="text"
                    name="price"
                    value={formData.price}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 mb-3">
                <div className="form-group">
                  <label>Price Duration</label>
                  <input
                    className="form-control"
                    name="duration_type"
                    value={formData.duration_type}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 mb-4">
                <div className="form-group">
                  <label>Price Type</label>
                  <input
                    required
                    className="form-control"
                    name="price_type"
                    value={
                      formData.price_type === 1 ? "Negotiable" : "Fixed Price"
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 mb-3">
                <div className="form-group">
                  <label>Start Date</label>
                  <ReactDatePicker
                    className="form-control"
                    placeholderText="Start Date"
                    selected={
                      formData.start_date !== "" &&
                      new Date(formData.start_date)
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 mb-3">
                <div className="form-group">
                  <label>End Date</label>
                  <ReactDatePicker
                    className="form-control"
                    placeholderText="End Date"
                    selected={
                      formData.end_date !== "" && new Date(formData.end_date)
                    }
                    readOnly
                  />
                </div>
              </div>

              <div className="col-sm-12 mb-4">
                <div className="form-group">
                  <p>Description</p>
                  {formData.description}
                </div>
              </div>
            </div>
          </Form>
          <div className="row">
            <div className="col-sm-12 mb-4 d-flex justify-content-between">
              <div style={{ fontWeight: "500" }} className="price_shadow">
                ${formData.price}/{formData.duration_type} (
                {formData.price_type === 1 ? "Negotiable" : "Fixed Price"})
              </div>
              {userDetails.user_type === 1 &&
                (formData.accept ? (
                  <button
                    className="submit"
                    style={{ backgroundColor: "#22b7e8" }}
                    disabled={formData.accept || formData.isSendProposal}
                  >
                    {formData.accept ? "Completed" : "Send Proposal"}
                  </button>
                ) : (
                  <button
                    className="submit"
                    onClick={() => {
                      setOpenProposal(true);
                    }}
                    disabled={formData.accept || formData.isSendProposal}
                  >
                    {formData.isSendProposal
                      ? "Already Submitted"
                      : "Send Proposal"}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {userDetails.user_type === 2 && (
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="equipment-card" style={{ marginTop: "10px" }}>
                  <h4>Proposals ({total} proposal)</h4>

                  {proposals.map((item, key) => {
                    return (
                      <div key={key} className="client-review-sec">
                        <div>
                          <img
                            src={
                              item.userDetails.avatar
                                ? BUCKET_DOMAIN + item.userDetails.avatar
                                : default_avatar
                            }
                            className="proposals-profile"
                            alt={key}
                          />
                        </div>
                        <div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6 className="mb-0">
                                {item.userDetails.full_name}
                                <mark>${item.price || formData.price}</mark>
                                <FaHeart
                                  className={`wishlist-icon ${
                                    item.isWishlist ? "active" : ""
                                  }`}
                                  onClick={() => {
                                    setWishlistId(item);
                                  }}
                                />
                              </h6>
                              {item.accept && <span>Accepted</span>}
                              <p className="mb-1">
                                {moment(item.createdAt).format(
                                  DATE_TIME_HELPER.DATE_FORMAT_MONTH_NAME
                                )}
                              </p>
                            </div>
                            <div style={{ position: "absolute", right: "0" }}>
                              {item.accept ? (
                                <button
                                  style={{ backgroundColor: "#22b7e8" }}
                                  className="submit"
                                  disabled={formData.accept}
                                >
                                  Accepted
                                </button>
                              ) : (
                                <button
                                  className="submit"
                                  onClick={() => {
                                    setAcceptProposalId(item._id);
                                    setAcceptProposalDetails(item);
                                  }}
                                  disabled={formData.accept}
                                >
                                  Agree
                                </button>
                              )}
                            </div>
                          </div>

                          <p>{item.comment}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
