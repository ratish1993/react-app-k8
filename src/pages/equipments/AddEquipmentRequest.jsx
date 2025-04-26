import React, { useEffect, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import { Form } from "react-bootstrap";
import axios from "../../helper/axios";
import { toast } from "react-toastify";
import Loader from "../../common/loader/Loader";
import validation from "../../helper/validation";
import _ from "lodash";
import config from "../../helper/config ";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import "./equipment.css";

export default function AddEquipmentRequest() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [allEquipmentTypes, setAllEquipmentTypes] = useState([]);
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getAllEquipmentTypes();
  }, []);

  const getAllEquipmentTypes = () => {
    setLoading(true);
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

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    formData[name] = value;

    if (name === "equipment_type_id" && value) {
      let { specification_details, model_number } = _.find(
        allEquipmentTypes,
        (o) => {
          return o._id === value;
        }
      );
      setAllSpecification(specification_details);
      setAllModel(model_number);
      formData.specification_details = {};
      formData.model_name = "";
    }
    setFormData({ ...formData });

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

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (isValidForm(errors)) {
      setLoading(true);

      axios
        .post("/equipment/add-request-equipment", formData, config)
        .then((res) => {
          setLoading(false);

          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/my-request");
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

  return (
    <div className="main">
      {loading && <Loader />}
      <LeftPanel />
      <div className="main-bar">
        <div className="equipment-sec">
          <Form onSubmit={handleOnSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <h2>Add Equipment Request</h2>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-6 mb-4">
                <div className="form-group">
                  <label>Equipment Type</label>
                  <select
                    className="form-select"
                    name="equipment_type_id"
                    required
                    value={formData.equipment_type_id}
                    validaterule={["required"]}
                    validatemsg={["Equipment Type is required"]}
                    onChange={handleOnChange}
                  >
                    <option value="">Select Equipment type</option>
                    {allEquipmentTypes.map((eq_type, key) => {
                      return (
                        <option value={eq_type._id} key={key}>
                          {eq_type.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="invalid_input">{errors.equipment_type_id}</p>
                </div>
              </div>

              <div className="col-sm-6 mb-4">
                <div className="form-group">
                  <label>{allModel.lebel || "Equipment Model"}</label>
                  <select
                    className="form-select"
                    required
                    value={formData.model_name}
                    validaterule={["required"]}
                    validatemsg={["Equipment model is required"]}
                    onChange={handleOnChange}
                    name="model_name"
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
                  <p className="invalid_input">{errors.model_name}</p>
                </div>
              </div>

              {allSpecification.map((specification, key) => {
                return (
                  <div className="col-sm-6 mb-4" key={key}>
                    <div className="form-group">
                      <label>{specification.lebel}</label>
                      <select
                        className="form-select"
                        required
                        name={specification.lebel}
                        value={
                          formData.specification_details[
                            `"${specification.lebel}"`
                          ] || "Select " + specification.lebel
                        }
                        onChange={(e) => {
                          let { name, value } = e.target;
                          let { specification_details } = formData;
                          specification_details[`"${name}"`] = value;
                          formData.specification_details =
                            specification_details;
                          setFormData({ ...formData });
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

              <div className="col-lg-3 col-sm-6 mb-3">
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
                    value={formData.price}
                    onChange={handleOnChange}
                  />
                  <p className="invalid_input">{errors.price}</p>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 mb-3">
                <div className="form-group">
                  <label>Price Duration</label>
                  <select
                    required
                    className="form-select"
                    name="duration_type"
                    validaterule={["required"]}
                    validatemsg={["Price Duration is required"]}
                    value={formData.duration_type}
                    onChange={handleOnChange}
                  >
                    <option value="">Select Duration</option>
                    <option value="hour">Hourly</option>
                    <option value="week">Weekly</option>
                    <option value="month">Monthly</option>
                  </select>
                  <p className="invalid_input">{errors.duration_type}</p>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 mb-3">
                <div className="form-group">
                  <label>Price Type</label>
                  <select
                    required
                    className="form-select"
                    name="price_type"
                    validaterule={["required"]}
                    validatemsg={["Price Type is required"]}
                    value={formData.price_type}
                    onChange={handleOnChange}
                  >
                    <option value="">Select Type</option>
                    <option value={0}>Fixed Price</option>
                    <option value={1}>Negotiable</option>
                  </select>
                  <p className="invalid_input">{errors.price_type}</p>
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
                    // dateFormat="yyyy"
                    // maxDate={new Date()}
                    minDate={new Date()}
                    onChange={(date) => {
                      formData.start_date = moment(date).format("MM/DD/YYYY");
                      setFormData({ ...formData });
                    }}
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
                    // dateFormat="yyyy"
                    // maxDate={new Date()}
                    minDate={
                      formData.start_date !== "" &&
                      new Date(formData.start_date)
                    }
                    onChange={(date) => {
                      formData.end_date = moment(date).format("MM/DD/YYYY");
                      setFormData({ ...formData });
                    }}
                  />
                </div>
              </div>

              <div className="col-sm-12 mb-4">
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    type="text"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="col-sm-12 mb-4">
                <div className="d-flex justify-content-end gap-3">
                  <button className="submit" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
