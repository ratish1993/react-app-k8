import React, { useEffect, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../helper/config ";
import axios from "../../helper/axios";
import Loader from "../../common/loader/Loader";
import { BUCKET_DOMAIN } from "../../helper/Helper";
import DeletePopup from "../../utils/DeletePopup";
import { IoSearch } from "react-icons/io5";

export default function MyEquipment() {
  const per_page = 10;

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [allEquipments, setAllEquipments] = useState([]);
  const [delete_id, setDeleteId] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAllEquipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search]);

  const getAllEquipments = () => {
    setLoading(true);
    axios
      .get(
        `/equipment/my-equipment?per_page=${per_page}&page=${currentPage}&search=${search}`,
        config
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setAllEquipments([...allEquipments.concat(res.data.data)]);
          setTotal(res.data.total);
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
      .delete(`/equipment/equipment/${id}`, config)
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
              <h2>My Equipment</h2>
              <p>Manage your equipment here</p>
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
                <Link to="/add-equipment">
                  <button className="submit">Add new</button>
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
                            <img
                              src={BUCKET_DOMAIN + equipment.image[0]}
                              alt={equipment.equipment_type_id.name}
                            />
                            {/* <img src={CategoryImg} alt="" /> */}

                            <div>
                              <Link to={`/equipment-details/${equipment._id}`}>
                                <h6>{equipment.equipment_type_id.name}</h6>
                              </Link>
                              {/* <p className="mb-0">Delivery</p> */}
                            </div>
                          </div>
                        </td>
                        <td>Model: {equipment.model_name}</td>
                        <td>
                          ${equipment.price}/{equipment.duration_type}
                        </td>
                        {/* <td>
                          <div className="d-flex gap-2">
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                          </div>
                        </td> */}
                        <td>
                          <div className="action-table">
                            <Link to={`/edit-equipment/${equipment._id}`}>
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

                  {/* <tr>
                        <td>
                          <div className="list-img">
                            <img src={CategoryImg} alt="" />
                            <div>
                              <h6>Excavator</h6>
                              <p className="mb-0">Delivery</p>
                            </div>
                          </div>
                        </td>
                        <td>Model: 2022</td>
                        <td>$1500/night</td>
                        <td>
                          <div className="d-flex gap-2">
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <img src={EditImg} alt="" />
                            <img src={DeleteImg} alt="" />
                          </div>
                        </td>
                      </tr> */}
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
