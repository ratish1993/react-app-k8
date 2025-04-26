import React, { useEffect, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import { Form } from "react-bootstrap";
import axios from "../../helper/axios";
import { toast } from "react-toastify";
import Loader from "../../common/loader/Loader";
import validation from "../../helper/validation";
import _ from "lodash";
import { getFileExtension } from "../../helper/Helper";
import config from "../../helper/config ";
import { useNavigate } from "react-router-dom";
import "./equipment.css";

export default function AddEquipment() {
  const navigate = useNavigate();

  const IMAGE_LENGTH = 5;

  const [loading, setLoading] = useState(false);

  const [allEquipmentTypes, setAllEquipmentTypes] = useState([]);
  const [allModel, setAllModel] = useState({});
  const [allSpecification, setAllSpecification] = useState([]);

  const [formData, setFormData] = useState({
    equipment_type_id: "",
    model_name: "",
    price: "",
    duration_type: "",
    description: "",
    specification_details: {},
    image: [],
  });
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);

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

  const handleImages = (e) => {
    e.persist();

    let { files } = e.target;

    let len = Math.min(IMAGE_LENGTH - images.length, files.length);

    for (let i = 0; i < len; i++) {
      let file = files[i];
      let validExtension = ["png", "jpg", "jpeg"];
      if (file !== undefined) {
        let extension = getFileExtension(file);
        if (
          extension !== undefined &&
          _.findIndex(validExtension, (exe) => {
            return exe === extension;
          }) !== -1
        ) {
          images.push(file);
        } else {
          toast.error("The file format is not supported");
        }
      }
    }

    setImages([...images]);
  };

  const deleteImage = (pos) => {
    images.splice(pos, 1);
    setImages([...images]);
  };

  const isValidForm = (errors) => {
    let isValid = true;
    for (const [, value] of Object.entries(errors)) {
      if (value.length > 0) {
        isValid = false;
      }
    }
    return isValid;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (isValidForm(errors)) {
      if (images.length === 0) {
        toast.error("Please add equipment image");
        return;
      }

      uploadImages();
    }
  };

  const uploadImages = () => {
    let data = new FormData();
    images.forEach((file) => {
      data.append(`images`, file);
    });

    setLoading(true);
    axios
      .post("/equipment/upload-equipment-image", data, config)
      .then((res) => {
        if (res.data.success) {
          let { images } = res.data;
          addEquDetails(images);
        } else {
          setLoading(false);
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something Went Wrong");
      });
  };

  const addEquDetails = (url) => {
    setLoading(true);
    formData.image = [...url];
    axios
      .post("/equipment/add-equipment", formData, config)
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          toast.success(res.data.message);

          // setFormData({
          //   equipment_type_id: "",
          //   model_name: "",
          //   price: "",
          //   duration_type: "",
          //   description: "",
          //   specification_details: {},
          //   image: [],
          // });
          // setAllSpecification([]);
          // setAllModel({});
          // setImages([]);
          navigate("/my-equipment");
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
          <Form onSubmit={handleOnSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <h2>add equipment</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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

              <div className="col-sm-12 mb-4">
                <div className="form-group">
                  <label>Equipment Description</label>
                  <textarea
                    name="description"
                    type="text"
                    placeholder="Equipment Description"
                    value={formData.description}
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="col-sm-12 mb-4">
                <label className="mb-2">Equipment Image</label>
                <div className="form-group">
                  {images.length < IMAGE_LENGTH && (
                    <div className="upload-file">
                      <div className="upload-content">
                        <i className="fa-solid fa-upload"></i>
                        <h5>Upload File</h5>
                      </div>
                      <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        multiple
                        // className="sr-only"
                        onChange={handleImages}
                      />
                    </div>
                  )}
                </div>

                <div className="row mt-5">
                  {images?.map((preview, key) => {
                    return (
                      <div className="col-sm-2" key={key}>
                        <div className="preview">
                          <img src={URL.createObjectURL(preview)} alt={key} />
                          <i
                            onClick={() => {
                              deleteImage(key);
                            }}
                            className="fa-solid fa-circle-xmark"
                          />
                        </div>
                      </div>
                    );
                  })}
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
