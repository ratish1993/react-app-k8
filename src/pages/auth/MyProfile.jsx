import React, { useEffect, useState } from "react";
import LeftPanel from "../../components/leftpanel/LeftPanel";
import { Form } from "react-bootstrap";
import axios from "../../helper/axios";
import { toast } from "react-toastify";
import Loader from "../../common/loader/Loader";
import validation from "../../helper/validation";
import config from "../../helper/config ";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import _ from "lodash";
import { BUCKET_DOMAIN, getFileExtension } from "../../helper/Helper";
import { default_avatar } from "../../assets/images";

export default function MyProfile() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    office_address: "",
    avatar: "",
    about: "",
  });
  const [errors, setErrors] = useState({});

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line
  }, []);

  const getUserDetails = () => {
    setLoading(true);
    axios
      .get("/auth/user-details", config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          let { userDetails } = res.data;
          localStorage.setItem("userDetails", JSON.stringify(userDetails));

          for (const [key, value] of Object.entries(userDetails)) {
            formData[key] = value;
            setFormData({ ...formData });
          }
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

  const handlePhoneChange = (value) => {
    if (value !== undefined) {
      setFormData({ ...formData, mobile: value });

      if (isValidPhoneNumber(value)) {
        errors.mobile = "";
      } else {
        errors.mobile = "Enter Valid Mobile Number";
      }
      setErrors({ ...errors });
    } else {
      errors.mobile = "Enter Valid Mobile Number";

      formData.mobile = "";
      setErrors({ ...errors });
      setFormData({ ...formData });
    }
  };

  const handleImages = (e) => {
    e.persist();

    let { files } = e.target;

    let file = files[0];
    let validExtension = ["png", "jpg", "jpeg"];
    if (file !== undefined) {
      let extension = getFileExtension(file);
      if (
        extension !== undefined &&
        _.findIndex(validExtension, (exe) => {
          return exe === extension;
        }) !== -1
      ) {
        setProfileImage(file);
      } else {
        toast.error("The file format is not supported");
      }
    }
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
      if (!profileImage && !formData.avatar) {
        toast.error("Please select profile image");
        return;
      }
      if (profileImage) {
        uploadProfileImage();
      } else {
        updateUserDetails();
      }
    }
  };

  const uploadProfileImage = () => {
    let data = new FormData();

    data.append("avatar", profileImage);

    setLoading(true);
    axios
      .post("/auth/upload-profile-image", data, config)
      .then((res) => {
        if (res.data.success) {
          let { avatar } = res.data;
          updateUserDetails(avatar);
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

  const updateUserDetails = (avatar = null) => {
    setLoading(true);
    if (avatar) {
      formData.avatar = avatar;
    }
    axios
      .put("/auth/update-user-details", formData, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success(res.data.message);
          getUserDetails();
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
                <h2>My Profile</h2>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-6 col-sm-6 mb-3">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    className="form-control"
                    placeholder="Full Name"
                    type="text"
                    name="full_name"
                    required
                    validaterule={["required", "isName"]}
                    validatemsg={["Full name is required", "Enter valid name"]}
                    value={formData.full_name}
                    onChange={handleOnChange}
                  />
                  <p className="invalid_input">{errors.full_name}</p>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6 mb-3">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    className="form-control"
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                    readOnly
                    validaterule={["required", "isEmail"]}
                    validatemsg={["Email is required", "Enter valid email id"]}
                    value={formData.email}
                    onChange={handleOnChange}
                  />
                  <p className="invalid_input">{errors.email}</p>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6 mb-3">
                <div className="form-group">
                  <label>Contact Number</label>

                  <PhoneInput
                    className="phone_field form-control"
                    defaultCountry="US"
                    placeholder="Contact Number"
                    // countries={country_code_list}
                    value={formData.mobile}
                    required
                    onChange={handlePhoneChange}
                  />
                  <p className="invalid_input">{errors.mobile}</p>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6 mb-3">
                <div className="form-group">
                  <label>Office Address</label>
                  <input
                    className="form-control"
                    placeholder="Office Address"
                    type="text"
                    name="office_address"
                    required
                    validaterule={["required"]}
                    validatemsg={["Office Address is required"]}
                    value={formData.office_address}
                    onChange={handleOnChange}
                  />
                  <p className="invalid_input">{errors.office_address}</p>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6 mb-5">
                <div className="form-group profile_main">
                  <div className="upload-file profile-upload">
                    <div className="upload-content">
                      <i className="fa-solid fa-plus"></i>
                    </div>
                    <input
                      className="form-control"
                      placeholder="Profile Image"
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      onChange={handleImages}
                    />
                  </div>
                  <div>
                    <h5>Upload your profile image</h5>
                    <p className="mb-0">please upload a jpg/jpeg/png image</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-sm-6">
                <div className="preview profile_prev">
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile Url"
                    />
                  ) : (
                    <img
                      src={
                        formData.avatar
                          ? BUCKET_DOMAIN + formData.avatar
                          : default_avatar
                      }
                      alt="Avatar"
                    />
                  )}
                </div>
              </div>

              <div className="col-sm-12 mb-4">
                <div className="form-group">
                  <label>About</label>
                  <textarea
                    name="about"
                    type="text"
                    required
                    placeholder="About"
                    value={formData.about}
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="col-sm-12 mb-4">
                <div className="d-flex justify-content-end gap-3">
                  <button className="submit" type="submit">
                    Update
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
