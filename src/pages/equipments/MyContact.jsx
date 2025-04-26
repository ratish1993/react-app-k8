import React, { useEffect, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../helper/config ";
import axios from "../../helper/axios";
import Loader from "../../common/loader/Loader";
import { BUCKET_DOMAIN } from "../../helper/Helper";
import { BannerBg } from "../../assets/images";
import { Button } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";

export default function MyContact() {
  const per_page = 2;
  const [loading, setLoading] = useState(false);
  const [allEquipments, setAllEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("userDetails");
    if (data) {
      setUserDetails(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    getAllEquipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search]);

  const getAllEquipments = () => {
    setLoading(true);

    let data = localStorage.getItem("userDetails");

    if (data) {
      data = JSON.parse(data);
    }

    let url = `/equipment/${
      data.user_type === 1
        ? "completed-my-equipment-related-request"
        : "completed-my-request-equipments"
    }?per_page=${per_page}&page=${currentPage}&search=${search}`;

    axios
      .get(url, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          let { equipment, total } = res.data;
          setAllEquipments([...allEquipments.concat(equipment)]);
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

  return (
    <div className="main">
      {loading && <Loader />}

      <LeftPanel />
      <div className="main-bar">
        <div className="equipment-sec">
          <div className="row">
            <div className="col-sm-6 align-self-center">
              <h2>Accepted Proposal</h2>
            </div>
            <div className="col-sm-6 align-self-center">
              <div className="d-flex justify-content-end gap-3">
                <div className="form-search">
                  <input
                    type="text"
                    placeholder="Search"
                    value={filter}
                    onChange={(e) => {
                      let { value } = e.target;
                      setFilter(value);
                    }}
                  />
                  <IoSearch
                    onClick={() => {
                      setAllEquipments([]);
                      setSearch(filter);
                      setCurrentPage(1);
                    }}
                  />
                </div>
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
                                src={
                                  userDetails.user_type === 1
                                    ? BUCKET_DOMAIN +
                                      equipment?.equ_model_details?.image[0]
                                    : BannerBg
                                }
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
                        <td>{equipment.userDetails?.full_name}</td>

                        <td>
                          <Link
                            style={{ textDecoration: "none", color: "#000" }}
                            to={`${
                              !equipment.isProposalAccept &&
                              userDetails.user_type === 1
                                ? "#"
                                : `/chat/${equipment._id}`
                            }     `}
                            className="disable_cursor"
                          >
                            <Button
                              variant="outline-info"
                              disabled={
                                !equipment.isProposalAccept &&
                                userDetails.user_type === 1
                              }
                            >
                              Message
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="row mt-4 mb-3">
            <div className="col-sm-12">
              <div className="loadMore text-center">
                <button
                  onClick={() => {
                    setCurrentPage((page) => page + 1);
                  }}
                  disabled={per_page * currentPage >= total}
                >
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
