import React, { useEffect, useState } from "react";
import config from "../../helper/config ";
import Loader from "../../common/loader/Loader";
import { BUCKET_DOMAIN } from "../../helper/Helper";
import { Col, Container, Row } from "react-bootstrap";
import axios from "../../helper/axios";
import { toast } from "react-toastify";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

export default function MyFavoriteEquipment() {
  const per_page = 9;

  const [loading, setLoading] = useState(false);
  const [allEquipments, setAllEquipments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAllEquipments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, search]);

  const getAllEquipments = () => {
    setLoading(true);
    axios
      .get(
        `/equipment/my-favorite-equipments?per_page=${per_page}&page=${currentPage}&search=${search}`,
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

  const toggleFavorite = (equipment_id, index) => {
    setLoading(true);

    axios
      .post("/equipment/toggle-favorite", { equipment_id }, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          allEquipments.splice(index, 1);
          setAllEquipments([...allEquipments]);
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
            <section className="featured-section dash-fea-sec">
              <Container>
                <Row className="align-items-center">
                  <Col md={6}>
                    <div className="featured-title">
                      <h2>Favorite Equipment List</h2>
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

                <Row>
                  {allEquipments.map((equipment, key) => {
                    return (
                      <Col md={4} key={key}>
                        <div className="featured-item-box feat-dash">
                          <button
                            className="fav"
                            onClick={() => {
                              toggleFavorite(equipment.equipment._id);
                            }}
                          >
                            <i className="fa-solid fa-heart" />
                          </button>
                          <Link
                            to={`/equipment-details/${equipment.equipment._id}`}
                          >
                            <div className="featured-item-image-box">
                              <img
                                src={
                                  BUCKET_DOMAIN + equipment.equipment.image[0]
                                }
                                alt={equipment.equipment_type.name}
                              />
                            </div>
                          </Link>
                          <Link
                            to={`/equipment-details/${equipment.equipment._id}`}
                          >
                            <div className="featured-item-content-box">
                              <h4>{equipment.equipment_type.name} </h4>

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
                                    {equipment.equipment.model_name.charAt(0)}
                                  </div>
                                  <div className="featured-item-bottom-rating">
                                    <span className="name">
                                      {equipment.equipment.model_name}
                                    </span>{" "}
                                    <FaStar className="star" />{" "}
                                    <span className="ratingNumber">
                                      {equipment.totalRating}/5 (
                                      {equipment.totalReview})
                                    </span>
                                  </div>
                                </div>
                                {/* <div className="featured-item-bottom-right">
                                  <h5>
                                    ${equipment.equipment.price} /{" "}
                                    {equipment.equipment.duration_type}
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
