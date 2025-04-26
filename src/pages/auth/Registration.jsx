import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "../../helper/validation";
import axios from "../../helper/axios";
import Loader from "../../common/loader/Loader";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "./registration.css";

export default function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    password: "",
    c_password: "",
    user_type: 1,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "c_password") {
      let err;
      if (formData.password !== value) {
        err = "Confirm Password should be same as password";
      } else {
        err = "";
      }
      setErrors({ ...errors, c_password: err });
      return;
    }

    if (name === "password") {
      let err;
      if (formData.c_password && formData.c_password !== value) {
        err = "Confirm Password should be same as password";
      } else {
        err = "";
      }
      errors.c_password = err;
      setErrors({ ...errors });
    }

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

  const isValidForm = (errors) => {
    let isValid = true;
    for (const [, value] of Object.entries(errors)) {
      if (value.length > 0) {
        isValid = false;
      }
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidForm(errors)) {
      setLoading(true);

      axios
        .post("/auth/register", formData)
        .then((res) => {
          setLoading(false);
          if (res.data.success) {
            toast.success(res.data.message);

            setFormData({
              full_name: "",
              mobile: "",
              email: "",
              password: "",
              c_password: "",
              user_type: 1,
            });
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
    <div className="loginSection">
      <div className="container">
        {loading && <Loader />}
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="sing-form-section">
                <div className="sign-head">
                  <h1>Create new account</h1>
                  <p>Enter your details to get started</p>
                </div>
                <div className="tab-sec mt-3">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item first" role="presentation">
                      <button
                        className={`nav-link first ${
                          formData.user_type === 1 && "active"
                        }`}
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="home-tab-pane"
                        aria-selected="true"
                        onClick={() => {
                          setFormData({ ...formData, user_type: 1 });
                        }}
                      >
                        As A Firm
                      </button>
                    </li>
                    <li className="nav-item second" role="presentation">
                      <button
                        className={`nav-link second ${
                          formData.user_type === 2 && "active"
                        }`}
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="profile-tab-pane"
                        aria-selected="false"
                        onClick={() => {
                          setFormData({ ...formData, user_type: 2 });
                        }}
                      >
                        As A Vendor
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="sign-form">
                  <input
                    type="text"
                    required
                    name="full_name"
                    validaterule={["required", "isName"]}
                    validatemsg={["Full name is required"]}
                    value={formData.full_name}
                    onChange={handleOnChange}
                  />
                  <label>Full Name</label>
                  <p className="invalid_input">{errors.full_name}</p>
                </div>

                <div className="sign-form">
                  <input
                    type="email"
                    name="email"
                    required
                    validaterule={["required", "isEmail"]}
                    validatemsg={[
                      "Email address is required",
                      "Enter a valid email address",
                    ]}
                    value={formData.email}
                    onChange={handleOnChange}
                  />
                  <label>Email</label>
                  <p className="invalid_input">{errors.email}</p>
                </div>

                <div className="sign-form">
                  <PhoneInput
                    className="phone_field"
                    defaultCountry="US"
                    placeholder="Contact Number"
                    // countries={country_code_list}
                    value={formData.mobile}
                    onChange={handlePhoneChange}
                    required
                    // addInternationalOption={false}
                  />
                  <p className="invalid_input">{errors.mobile}</p>
                </div>

                <div className="sign-form">
                  <input
                    type="password"
                    name="password"
                    required
                    validaterule={["required", "password"]}
                    validatemsg={["Password is required"]}
                    value={formData.password}
                    onChange={handleOnChange}
                  />
                  <label>Password</label>
                  <p className="invalid_input">{errors.password}</p>
                </div>

                <div className="sign-form">
                  <input
                    type="password"
                    name="c_password"
                    required
                    validaterule={["required"]}
                    validatemsg={["Confirm password is required"]}
                    value={formData.c_password}
                    onChange={handleOnChange}
                  />
                  <label>Confirm Password</label>
                  <p className="invalid_input">{errors.c_password}</p>
                </div>
                <button type="submit" className="sign-btn mt-40" to="/">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
