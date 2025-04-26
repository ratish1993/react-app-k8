import React, { useEffect, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../helper/config ";
import axios from "../../helper/axios";
import Loader from "../../common/loader/Loader";
import DeletePopup from "../../utils/DeletePopup";
import { BannerBg } from "../../assets/images";

export default function MyEquipmentRequest() {
  const [loading, setLoading] = useState(false);

  const [allEquipments, setAllEquipments] = useState([]);
  const [delete_id, setDeleteId] = useState("");

  useEffect(() => {
    getAllEquipments();
  }, []);

  const getAllEquipments = () => {
    setLoading(true);
    axios
      .get("/equipment/my-request-equipments", config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setAllEquipments(res.data.data);
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

  const deleteEquipment = (id) => {
    setLoading(true);
    axios
      .delete(`/equipment/request-equipment/${id}`, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success(res.data.message);
          getAllEquipments();
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

      <DeletePopup
        message="Delete this equipment?"
        show={delete_id !== ""}
        no={() => {
          setDeleteId("");
        }}
        yes={() => {
          deleteEquipment(delete_id);
          setDeleteId("");
        }}
      />

      <LeftPanel />
      <div className="main-bar">
        <div className="equipment-sec">
          <div className="row">
            <div className="col-sm-6 align-self-center">
              <h2>My Equipment Request</h2>
              <p>Manage your equipment query here</p>
            </div>
            <div className="col-sm-6 align-self-center">
              <div className="d-flex justify-content-end gap-3">
                <Link to="/add-equipment-request">
                  <button className="submit">New Request</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="listing-table">
              <table className="table-responsive">
                <tbody>
                  {allEquipments.map((equipment, key) => {
                    return (
                      <tr key={key}>
                        <td>
                          <div className="list-img">
                            <Link
                              to={`/equipment-request-details/${equipment._id}`}
                            >
                              <img
                                src={BannerBg}
                                alt={equipment.equipment_type_id.name}
                              />
                            </Link>
                            <div>
                              <Link
                                to={`/equipment-request-details/${equipment._id}`}
                              >
                                <h6>{equipment.equipment_type_id.name}</h6>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Link
                            style={{ textDecoration: "none", color: "#000" }}
                            to={`/equipment-request-details/${equipment._id}`}
                          >
                            Proposal: {equipment.proposal}
                          </Link>
                        </td>
                        <td>
                          <Link
                            style={{ textDecoration: "none", color: "#000" }}
                            to={`/equipment-request-details/${equipment._id}`}
                          >
                            Model: {equipment.model_name}
                          </Link>
                        </td>
                        <td style={{ fontWeight: "500" }}>
                          <div className="price_shadow">
                            ${equipment.price}/{equipment.duration_type} (
                            {equipment.price_type === 1
                              ? "Negotiable"
                              : "Fixed Price"}
                            )
                          </div>
                        </td>
                        <td>
                          {equipment.accept ? (
                            <span className="badge text-bg-primary">
                              Completed
                            </span>
                          ) : (
                            <span className="badge text-bg-success">
                              Active
                            </span>
                          )}
                        </td>
                        <td>
                          <div
                            className="action-table"
                            style={{ marginRight: "20px" }}
                          >
                            <Link
                              to={`/edit-equipment-request/${equipment._id}`}
                            >
                              <i className="fa fa-pencil" />
                            </Link>
                            <Link
                              onClick={() => {
                                setDeleteId(equipment._id);
                              }}
                            >
                              <i className="fa fa-trash-can" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
