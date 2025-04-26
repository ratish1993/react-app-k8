import React, { useEffect, useRef, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import { Col, Container, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "./../../components/featured/Featured.css";
import "./../../components/projectCategory/ProjectCategory.css";
import { toast } from "react-toastify";
import axios from "../../helper/axios";
import Loader from "../../common/loader/Loader";
import config from "../../helper/config ";
import { BUCKET_DOMAIN } from "../../helper/Helper";
import { Link } from "react-router-dom";
import _ from "lodash";
import { IoSearch } from "react-icons/io5";

export default function Dashboard() {
  const per_page = 9;

  const [loading, setLoading] = useState(false);
  const [allEquipments, setAllEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [allEquipmentTypes, setAllEquipmentTypes] = useState([]);
  const [allModel, setAllModel] = useState({});
  const [allSpecification, setAllSpecification] = useState([]);
  const [allFavEquipment, setAllFavEquipment] = useState([]);
  const [filter, setFilter] = useState("");

  const [equipmentTypeFilter, setEquipmentTypeFilter] = useState({
    equipment_type_id: [],
    model_name: "",
    specification_details: {},
  });

  const [advanceFilter, setAdvanceFilter] = useState({
    model_name: "",
    specification_details: {},
  });

  const refList = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const data = localStorage.getItem("userDetails");
    if (data) {
      if (JSON.parse(data).user_type === 1) {
        window.location.pathname = "/firm-dashboard";
      }
    }
    // getAllEquipmentTypes();
    getAllFavoriteEquipments();
  }, []);

  useEffect(() => {
    getAllEquipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, equipmentTypeFilter, search]);

  const getAllEquipments = () => {
    setLoading(true);
    axios
      .put(
        `/equipment/get-equipment-list?per_page=${per_page}&page=${currentPage}&search=${search}`,
        { advanceFilter: equipmentTypeFilter },
        config
      )
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

  const getAllFavoriteEquipments = () => {
    setLoading(true);
    axios
      .get(`/equipment/my-favorite-equipments`, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          let { equipment } = res.data;
          setAllFavEquipment(equipment);
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

  const toggleItemInArray = (array, item) => {
    const index = array.indexOf(item);
    if (index === -1) {
      array.push(item);
    } else {
      array.splice(index, 1);
    }
    return array;
  };

  const handleEquiTypeFilter = (name, value, index = 0) => {
    if (equipmentTypeFilter.equipment_type_id[0] === value) return;

    // if (refList.current[index].classList.contains("active")) {
    //   refList.current[index].classList.remove("active");
    // } else {
    //   refList.current[index].classList.add("active");
    // }
    if (name === "equipment_type_id") {
      // let newArr = toggleItemInArray(equipmentTypeFilter.equipment_type_id, value);
      // equipmentTypeFilter.equipment_type_id = newArr;
      equipmentTypeFilter.equipment_type_id[0] = value;

      let { specification_details, model_number } = allEquipmentTypes[index];

      setAllSpecification(specification_details);
      setAllModel(model_number);
      equipmentTypeFilter.model_name = "";
      equipmentTypeFilter.specification_details = {};
      setAdvanceFilter({
        model_name: "",
        specification_details: {},
      });

      setEquipmentTypeFilter({ ...equipmentTypeFilter });
      resetAllPreviousData();

      return;
    }
  };

  const resetAllPreviousData = () => {
    setAllEquipments([]);
    setCurrentPage(1);
  };

  const clearFilter = () => {
    let newList = refList.current.map((node) => {
      if (node.classList.contains("active")) {
        return node.classList.remove("active");
      } else return node;
    });
    refList.current = newList;
    resetAllPreviousData();
    setAllSpecification([]);
    setAllModel({});
    setEquipmentTypeFilter({
      equipment_type_id: [],
      model_name: "",
      specification_details: {},
    });
    setAdvanceFilter({
      model_name: "",
      specification_details: {},
    });
  };

  const applyAdvanceFilter = () => {
    let { specification_details, model_name } = advanceFilter;
    equipmentTypeFilter.model_name = model_name;
    equipmentTypeFilter.specification_details = specification_details;
    setEquipmentTypeFilter({ ...equipmentTypeFilter });
    resetAllPreviousData();
  };

  const toggleFavorite = (equipment_id) => {
    setLoading(true);

    axios
      .post("/equipment/toggle-favorite", { equipment_id }, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          let all_equ_index = _.findIndex(allEquipments, (o) => {
            return o._id == equipment_id;
          });

          allEquipments[all_equ_index].isFavorite =
            !allEquipments[all_equ_index].isFavorite;
          setAllEquipments([...allEquipments]);
          getAllFavoriteEquipments();
          toast.success(res.data.message);
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
    <div className="bg-color">
      {loading && <Loader />}

      <div className="main">
        <LeftPanel />
        <div className="main-bar">
          <div className="equipment-sec equi-dash">
            <section className="project-category-section pt-3">
              <Container>
                <Row className="align-items-center">
                  <Col md={6}>
                    <div className="featured-title">
                      <h2 className="mb-3">Favorite Equipment</h2>
                    </div>
                  </Col>
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
                </Row>
                <div className="d-flex gap-3 equipment-scroll">
                  {allFavEquipment.map((item, key) => {
                    return (
                      <Col md={4} key={key}>
                        <div className="featured-item-box feat-dash">
                          <button
                            className="fav"
                            onClick={() => {
                              toggleFavorite(item.equipment._id);
                            }}
                          >
                            <i className="fa-solid fa-heart" />
                          </button>
                          <Link to={`/equipment-details/${item.equipment._id}`}>
                            <div className="featured-item-image-box">
                              <img
                                src={BUCKET_DOMAIN + item.equipment.image[0]}
                                alt={item.equipment_type.name}
                              />
                            </div>
                          </Link>
                          <Link to={`/equipment-details/${item.equipment._id}`}>
                            <div className="featured-item-content-box">
                              <h4>{item.equipment_type.name} </h4>

                              {/* <ul className="featured-item-details">
                              <li>Delivery : $400</li>
                              <li>
                                ${equipment.equipment.price} /{" "}
                                {equipment.equipment.duration_type}
                              </li>
                            </ul> */}

                              <div className="featured-item-bottom">
                                <div className="featured-item-bottom-left">
                                  <div className="featured-item-bottom-name">
                                    {item.equipment.model_name.charAt(0)}
                                  </div>
                                  <div className="featured-item-bottom-rating">
                                    <span className="name">
                                      {item.equipment.model_name}
                                    </span>{" "}
                                    <FaStar className="star" />{" "}
                                    <span className="ratingNumber">
                                      {item.totalRating}/5 ({item.totalReview})
                                    </span>
                                  </div>
                                </div>
                                {/* <div className="featured-item-bottom-right">
                                  <h5>
                                    ${item.equipment.price} /{" "}
                                    {item.equipment.duration_type}
                                  </h5>
                                </div> */}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </Col>
                    );
                  })}
                </div>
              </Container>
            </section>

            {/* <section className="project-category-section pt-3">
              <Container>
                <Row className="align-items-center">
                  <Col md={6}>
                    <div className="featured-title">
                      <h2 className="mb-3">
                        Equipment Type
                        <button
                          disabled={
                            equipmentTypeFilter.equipment_type_id.length === 0
                          }
                          onClick={clearFilter}
                        >
                          Clear
                        </button>
                      </h2>
                    </div>
                  </Col>
                </Row>
                <div className="d-flex gap-3 equipment-scroll">
                  {allEquipmentTypes.map((item, key) => {
                    return (
                      <Col lg={2} md={3} sm={6} xs={6} key={key}>
                        <div
                          ref={(node) => (refList.current[key] = node)}
                          className={`project-category-box project-dash ${
                            equipmentTypeFilter.equipment_type_id[0] ===
                            item.name
                              ? "active"
                              : ""
                          }`}
                          onClick={() => {
                            handleEquiTypeFilter(
                              "equipment_type_id",
                              item.name,
                              key
                            );
                          }}
                        >
                          <div className="project-category-image-box">
                            <img
                              src="https://equipment-rental-system.s3.amazonaws.com/equipments/equ_17074108677936.jpg"
                              alt="graders"
                            />
                          </div>
                          <div className="project-category-content-box">
                            <h4>{item.name}</h4>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </div>

                <div className="d-flex equipment-scroll mt-5 gap-2">
                  {allModel.lebel && (
                    <div className="col-sm-4 mb-1">
                      <div className="form-group">
                        <label>{allModel.lebel || "Equipment Model"}</label>
                        <div className="setting-content">
                          <select
                            id="sb-setting-currency"
                            className="sb-setting-currency-content e-control e-dropdownlist e-lib form-select"
                            aria-disabled="false"
                            name="model_name"
                            value={advanceFilter.model_name}
                            onChange={(e) => {
                              advanceFilter.model_name = e.target.value;
                              setAdvanceFilter({ ...advanceFilter });
                            }}
                          >
                            <option value="">Select Model</option>
                            {allModel.value?.map((model, key) => {
                              return (
                                <option key={key} value={model}>
                                  {model}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {allSpecification.map((specification, key) => {
                    return (
                      <div className="col-md-4 mb-1" key={key}>
                        <div className="form-group">
                          <label>{specification.lebel}</label>
                          <select
                            className="form-select"
                            required
                            name={specification.lebel}
                            value={
                              advanceFilter.specification_details[
                                `"${specification.lebel}"`
                              ] || "Select " + specification.lebel
                            }
                            onChange={(e) => {
                              let { name, value } = e.target;
                              let { specification_details } = advanceFilter;
                              specification_details[`"${name}"`] = value;
                              advanceFilter.specification_details =
                                specification_details;
                              setAdvanceFilter({ ...advanceFilter });
                            }}
                          >
                            <option value="">
                              {"Select " + specification.lebel}
                            </option>

                            {specification.value?.map((value, v_key) => {
                              return (
                                <option key={v_key} value={value}>
                                  {value}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {allModel.lebel && (
                  <div className="col-sm-12 mb-4">
                    <div className="d-flex justify-content-end gap-3">
                      <button className="submit" onClick={applyAdvanceFilter}>
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </Container>
            </section> */}

            <section className="featured-section dash-fea-sec">
              <Container>
                <Row className="align-items-center">
                  <Col md={6}>
                    <div className="featured-title">
                      <h2>Equipment List</h2>
                    </div>
                  </Col>
                  {/* <Col md={6}>
                            <div className='featured-filter'>                                
                                <div className='filter-category-select mr'>
                                    <select>
                                        <option value=''>Filter by category</option>
                                        <option value=''>1</option>
                                        <option value=''>2</option>
                                    </select>
                                </div>
                                <div className='filter-category-select'>
                                    <select>
                                        <option value=''>$0 - $1,000</option>
                                        <option value=''>$100</option>
                                        <option value=''>$200</option>
                                    </select>
                                </div>
                            </div>
                        </Col> */}
                </Row>

                <Row>
                  {allEquipments.map((equipment, key) => {
                    return (
                      <Col lg={4} md={6} key={key}>
                        <div className="featured-item-box feat-dash">
                          <button
                            className="fav"
                            onClick={() => {
                              toggleFavorite(equipment._id);
                            }}
                          >
                            <i
                              className={`fa-${
                                equipment.isFavorite ? "solid" : "regular"
                              } fa-heart`}
                            />
                          </button>
                          <Link to={`/equipment-details/${equipment._id}`}>
                            <div className="featured-item-image-box">
                              <img
                                src={BUCKET_DOMAIN + equipment.image[0]}
                                alt={equipment.equipment_type_id.name}
                              />
                            </div>
                          </Link>
                          <Link to={`/equipment-details/${equipment._id}`}>
                            <div className="featured-item-content-box">
                              <h4>{equipment.equipment_type_id.name} </h4>

                              {/* <ul className="featured-item-details">
                              <li>Delivery : $400</li>
                              <li>
                                ${equipment.price} / {equipment.duration_type}
                              </li>
                            </ul> */}

                              <div className="featured-item-bottom">
                                <div className="featured-item-bottom-left">
                                  <div className="featured-item-bottom-name">
                                    {equipment.model_name.charAt(0)}
                                  </div>
                                  <div className="featured-item-bottom-rating">
                                    <span className="name">
                                      {equipment.model_name}
                                    </span>
                                    <FaStar className="star" />
                                    <span className="ratingNumber">
                                      {equipment.totalRating}/5 (
                                      {equipment.totalReview})
                                    </span>
                                  </div>
                                </div>
                                {/* <div className="featured-item-bottom-right">
                                  <h5>
                                    ${equipment.price} /{" "}
                                    {equipment.duration_type}
                                  </h5>
                                </div> */}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
                <Row>
                  <Col md={12}>
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
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
