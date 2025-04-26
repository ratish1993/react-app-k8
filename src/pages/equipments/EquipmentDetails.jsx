import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckImg from "./../../images/check.png";
import axios from "../../helper/axios";
import config from "../../helper/config ";
import { toast } from "react-toastify";
import Loader from "../../common/loader/Loader";
import { BUCKET_DOMAIN, DATE_TIME_HELPER } from "../../helper/Helper";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import Rating from "react-rating";
import moment from "moment";
import ImageViewerPopup from "../../utils/ImageViewerPopup";
import { default_avatar } from "../../assets/images";

export default function EquipmentDetails() {
  const per_page = 10;

  const [loading, setLoading] = useState(true);
  const [equDeatils, setEqudetails] = useState({});
  const [reviews, setAllReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [currentImage, setCurrentImage] = useState(-1);

  const [allImages, setAllImages] = useState([]);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    equipment_id: "",
  });

  const id = useParams()?.id;

  useEffect(() => {
    window.scrollTo(0, 0);

    getEquipmentDetails();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    getAllReview();
    // eslint-disable-next-line
  }, [id, currentPage]);

  const getEquipmentDetails = () => {
    setLoading(true);

    axios
      .get(`/equipment/equipment/${id}`, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setEqudetails(res.data.data);

          let { image } = res.data.data;

          let data = image.map((img) => {
            return {
              url: BUCKET_DOMAIN + img,
            };
          });
          setAllImages([...data]);
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

  const getAllReview = () => {
    setLoading(true);
    axios
      .get(
        `/equipment/all-review/${id}?per_page=${per_page}&page=${currentPage}`,
        config
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          let { review, total } = res.data;
          setAllReviews([...reviews.concat(review)]);
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

  const addReview = () => {
    setLoading(true);
    formData.equipment_id = id;

    if (!formData.comment) {
      toast.error("Please add comment");
    }

    axios
      .post("/equipment/add-review", formData, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success(res.data.message);
          setFormData({
            rating: 0,
            comment: "",
            equipment_id: "",
          });
          getEquipmentDetails();
          getAllReview();
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

  const requestEquipment = () => {
    let { equipment_type_id, model_name, price, duration_type } = equDeatils;
    const formData = {
      equipment_type_id: equipment_type_id._id,
      model_name,
      price,
      duration_type,
    };
    console.log("formData", formData);
    console.log(equDeatils);
  };

  return (
    <div className="bg-color">
      <div className="main">
        <LeftPanel />
        <div className="main-bar">
          <div className="equipment-sec">
            <div className="equipment-details-bg">
              {loading && <Loader />}

              {currentImage !== -1 && (
                <ImageViewerPopup
                  show={currentImage !== -1}
                  onClose={() => setCurrentImage(-1)}
                  src={allImages}
                  index={currentImage}
                />
              )}

              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="equipment-banner">
                      {allImages?.length > 0 && (
                        <img
                          src={allImages[0].url}
                          alt={equDeatils.equipment_type_id?.name}
                          onClick={() => setCurrentImage(0)}
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="row">
                      {allImages?.slice(1)?.map((preview, key) => {
                        return (
                          <div className="col-sm-6" key={key}>
                            <div className="equipment-banner-small">
                              <img
                                src={preview.url}
                                alt={equDeatils.equipment_type_id?.name}
                                onClick={() => setCurrentImage(key + 1)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8">
                    <div className="equipment-card">
                      <div className="d-flex justify-content-between align-items-center">
                        <button className="model">
                          Model : {equDeatils.model_name}
                        </button>
                        {/* <div className="d-flex gap-4">
                  <div className="option">
                    <img src={ShareImg} alt="" />
                    <p className="mb-0">Share</p>
                  </div>
                  <div className="option">
                    <img src={SaveImg} alt="" />
                    <p className="mb-0">Save</p>
                  </div>
                </div> */}
                      </div>
                      <h4 className="mt-3">
                        {equDeatils.equipment_type_id?.name}
                      </h4>
                      {/* <div className="d-flex align-items-center gap-2">
                <img src={LocationImg} alt="" />
                <p className="mb-0">
                  Viale delle Rimembranze di Greco, Milan, Italy
                </p>
              </div> */}
                      <div className="profile-sec">
                        <div className="d-flex align-items-center gap-3">
                          <div className="profile">
                            <img
                              src={
                                equDeatils.user_details?.avatar
                                  ? BUCKET_DOMAIN +
                                    equDeatils.user_details?.avatar
                                  : default_avatar
                              }
                              alt=""
                            />
                            <img className="check" src={CheckImg} alt="" />
                          </div>
                          <p className="mb-0">
                            {equDeatils.user_details?.full_name}
                          </p>
                          <div className="total_rating">
                            {/* <img src={StarImg} alt="" /> */}
                            <Rating
                              initialRating={1}
                              emptySymbol={
                                <i className="fa-regular fa-star fa-sm rating" />
                              }
                              fullSymbol={
                                <i className="fa-solid fa-star fa-sm rating" />
                              }
                              readonly
                              stop={1}
                            />
                            {equDeatils.totalRating}{" "}
                            <span>({equDeatils.totalReview})</span>
                          </div>
                        </div>
                        <div>{/* <Link>View Dealer</Link> */}</div>
                      </div>
                      <hr />
                      {/* <div className="standard-frame">
                <div className="d-flex gap-1">
                  <img src={EquipmentImg} alt="" />
                  <p className="mb-0">Equipment type</p>
                </div>
                <div className="d-flex gap-1">
                  <img src={SpecificationsImg} alt="" />
                  <p className="mb-0">Specifications</p>
                </div>
                <div className="d-flex gap-1">
                  <img src={MakeImg} alt="" />
                  <p className="mb-0">Make</p>
                </div>
                <div className="d-flex gap-1">
                  <img src={AvailableImg} alt="" />
                  <p className="mb-0">Available in 2 days</p>
                </div>
              </div> */}
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="equipment-card">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          {/* <h2>
                            ${equDeatils.price}{" "}
                            <span>/{equDeatils.duration_type}</span>
                          </h2> */}

                          <button onClick={requestEquipment}>
                            Request Equipment
                          </button>
                        </div>
                        {/* <div className="d-flex align-items-center gap-1">
                  <img src={StarImg} alt="" />
                  <p className="mb-0">4.5 (112)</p>
                </div> */}
                      </div>
                      {/* <div className="date-range">
                <div>
                  <img src={CalenderImg} alt="" />
                </div>
                <div>
                  <h5 className="mb-0">{moment(equDeatils.createdAt).format(DATE_TIME_HELPER.DATE_TIME_FORMAT) }</h5>
                  <span>2 days</span>
                </div>
              </div> */}
                      {/* <div className="delivery-sec pt-3">
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-2">
                    <input type="radio" />
                    <label htmlFor="html">Self Pickup</label>
                  </div>
                  <div></div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex gap-2">
                    <input type="radio" />
                    <label htmlFor="html">Two way delivery</label>
                  </div>
                  <div>$79</div>
                </div>
              </div>
              <hr />
              <div className="total-charge">
                <div className="d-flex align-items-center justify-content-between">
                  <span>Per day Charges</span>
                  <span>$400</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Price for 2 days</p>
                  <p>$800</p>
                </div>
                <button>Continue Booking</button>
              </div> */}
                    </div>
                    {/* <div className="equipment-card">
              <h5 className="text-center mb-4">Pick-up and drop-off point</h5>
              <div className="instructions">
                <ul>
                  <li>
                    <h6>Tue, July 10, 10:00 am</h6>
                    <p className="mb-0">Milan - Via Rivoltana</p>
                    <span>View pick-up instructions</span>
                  </li>
                  <li>
                    <h6>Tue, July 10, 10:00 am</h6>
                    <p className="mb-0">Milan - Via Rivoltana</p>
                    <span>View pick-up instructions</span>
                  </li>
                </ul>
                <img src={MapImg} alt="" />
              </div>
            </div> */}
                  </div>
                  <div className="col-sm-8">
                    <div className="equipment-card">
                      <h4>Specification</h4>
                      <div className="row">
                        <div className="col-sm-12">
                          <ul>
                            {equDeatils.specification_details ? (
                              Object.entries(
                                equDeatils.specification_details
                              ).map(([key, value]) => (
                                <li key={key}>
                                  <p>
                                    {key} : {value}
                                  </p>
                                </li>
                              ))
                            ) : (
                              <p></p>
                            )}
                          </ul>
                        </div>
                        {/* <div className="col-sm-6">
                  <ul>
                    <li>
                      <Link to="/">Maximum Reach: 2Meter</Link>
                    </li>
                    <li>
                      <Link to="/">Maximum Reach: 2Meter</Link>
                    </li>
                    <li>
                      <Link to="/">Maximum Reach: 2Meter</Link>
                    </li>
                    <li>
                      <Link to="/">Maximum Reach: 2Meter</Link>
                    </li>
                  </ul>
                </div> */}
                      </div>
                    </div>
                    <div className="equipment-card">
                      <h4>Equipment description</h4>
                      <p>{equDeatils.description}</p>
                    </div>
                    {/* <div className="equipment-card">
              <h4>Things to know</h4>
              <p>Please read the policies as given bellow</p>
              <h6>Cancellation policy</h6>
              <p>
                Refund 50% of the booking value when customers cancel the room
                within 48 hours after successful booking and 14 days before the
                check-in time. Then, cancel the room 14 days before the check-in
                time, get a 50% refund of the total amount paid (minus the
                service fee).
              </p>
              <h6>Special Note</h6>
              <ul>
                <li>
                  <Link to="/">
                    Ban and I will work together to keep the landscape and
                    environment green and clean by not littering, not using
                    stimulants and respecting people around.
                  </Link>
                </li>
                <li>
                  <Link to="/">Do not sing karaoke past 11:30</Link>
                </li>
              </ul>
            </div> */}
                    <div className="equipment-card">
                      <h4>Reviews ({total} reviews)</h4>
                      {!equDeatils.isReviewer && (
                        <>
                          <div className="client-review mt-3 mb-4">
                            <Rating
                              initialRating={formData.rating}
                              emptySymbol={
                                <i className="fa-regular fa-star fa-xl rating" />
                              }
                              fullSymbol={
                                <i className="fa-solid fa-star fa-xl rating" />
                              }
                              onChange={(data) => {
                                formData.rating = data;
                                setFormData({ ...formData });
                              }}
                            />
                          </div>
                          <textarea
                            placeholder="Share your thoughts..."
                            name="comment"
                            rows="4"
                            value={formData.comment}
                            onChange={(e) => {
                              formData.comment = e.target.value;
                              setFormData({ ...formData });
                            }}
                          />
                          <div className="d-flex justify-content-end mt-2">
                            <button
                              onClick={addReview}
                              className="share-review mb-3"
                              disabled={!formData.comment}
                            >
                              Share Review
                            </button>
                          </div>
                        </>
                      )}

                      {reviews.map((item, key) => {
                        return (
                          <div className="client-review-sec" key={key}>
                            <div>
                              <img
                                src={
                                  item.user_details?.avatar
                                    ? BUCKET_DOMAIN + item.user_details?.avatar
                                    : default_avatar
                                }
                                width={70}
                                height={70}
                                alt={item.user_details.full_name}
                              />
                            </div>
                            <div>
                              <h6 className="mb-0">
                                {item.user_details.full_name}
                              </h6>
                              <p className="mb-1">
                                {moment(item.createdAt).format(
                                  DATE_TIME_HELPER.DATE_FORMAT_MONTH_NAME
                                )}
                              </p>
                              <p>{item.comment}</p>
                            </div>

                            <div className="rating d-flex gap-1">
                              <Rating
                                initialRating={item.rating}
                                emptySymbol={
                                  <i className="fa-regular fa-star fa-sm rating" />
                                }
                                fullSymbol={
                                  <i className="fa-solid fa-star fa-sm rating" />
                                }
                                readonly
                              />
                            </div>
                          </div>
                        );
                      })}

                      <button
                        className="see-more"
                        onClick={() => {
                          setCurrentPage((page) => page + 1);
                        }}
                        disabled={per_page * currentPage >= total}
                      >
                        See more Reviews
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
