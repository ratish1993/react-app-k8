import React, { useEffect, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import StarImg from "./../../images/star.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../helper/axios";
import Loader from "../../common/loader/Loader";
import { BUCKET_DOMAIN } from "../../helper/Helper";
import { SearchImg } from "../../assets/images";
import ReactPaginate from "react-paginate";
import { BsFilterSquare } from "react-icons/bs";
import AdvanceFilter from "../../helper/AdvanceFilter";
import config from "../../helper/config ";

export default function EquipmentList() {
  const per_page = 12;

  const [loading, setLoading] = useState(false);
  const [allEquipments, setAllEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [isShowAdvanceFilter, setIsShowAdvanceFilter] = useState(false);
  const [allEquipmentTypes, setAllEquipmentTypes] = useState([]);

  const [advFilter, setAdvanceFilter] = useState({
    equipment_type_id: "",
    model_name: "",
  });

  useEffect(() => {
    getAllEquipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [per_page, currentPage]);

  useEffect(() => {
    getAllEquipmentTypes();
  }, []);

  const getAllEquipments = () => {
    setLoading(true);
    axios
      .put(
        `/equipment/get-equipment-list?per_page=${per_page}&page=${currentPage}&search=${search}`,
        { advanceFilter: advFilter },
        config
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          let { equipment, total } = res.data;
          setAllEquipments(equipment);
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

  const getAllEquipmentTypes = () => {
    axios
      .get("/equipment/get-equipment-type")
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setAllEquipmentTypes(res.data.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong");
      });
  };

  const toggleFavorite = (equipment_id) => {
    setLoading(true);

    axios
      .post("/equipment/toggle-favorite", { equipment_id }, config)
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

      <LeftPanel />
      <div className="main-bar">
        <div className="equipment-sec">
          <div className="row">
            <div className="col-sm-6 align-self-center">
              <h2>Equipment List</h2>
              {/* <p>Manage your equipment here</p> */}
            </div>
            <div className="col-sm-6 align-self-center">
              <div className="d-flex justify-content-end gap-3">
                <div className="search-equipment">
                  <img src={SearchImg} alt="" onClick={getAllEquipments} />
                  <input
                    type="text"
                    placeholder="Search equipment"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
                <span
                  className="multifilter"
                  onClick={() => {
                    setIsShowAdvanceFilter((current) => !current);
                  }}
                >
                  <BsFilterSquare />
                </span>
                {/* <Link to="/add-equipment">
                  <button className="submit">Add new</button>
                </Link> */}
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
                                <h6>{equipment.equipment_type_id.name} </h6>
                              </Link>
                              <i
                                className={
                                  equipment.isFavorite
                                    ? "fa-solid fa-heart heart clickable"
                                    : "fa-regular fa-heart clickable"
                                }
                                onClick={() => {
                                  toggleFavorite(equipment._id);
                                }}
                              />
                              {/* <p className="mb-0">Delivery</p> */}
                            </div>
                          </div>
                        </td>
                        <td>Model: {equipment.model_name}</td>
                        <td>
                          ${equipment.price}/{equipment.duration_type}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                            <img src={StarImg} alt="" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {isShowAdvanceFilter && (
                <AdvanceFilter
                  allEquipmentTypes={allEquipmentTypes}
                  advFilter={advFilter}
                  setAdvanceFilter={setAdvanceFilter}
                  getAllEquipments={getAllEquipments}
                />
              )}
            </div>
          </div>

          <div className="row mt-4 mb-3">
            <div className="col-sm-12">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="mb-0">
                    {Math.min(per_page * currentPage, total)} of {total} pages
                  </p>
                </div>
                <div className="pagination">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={({ selected }) => {
                      setCurrentPage(selected + 1);
                    }}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(total / per_page)}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
