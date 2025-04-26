import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../helper/axios";
import validation from "../../helper/validation";
import { toast } from "react-toastify";
import Loader from "../../common/loader/Loader";
// import "./forgotpassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });

  useEffect(() => {
    formData.token = token;
    setFormData(formData);
  }, [token]);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "confirmPassword") {
      let err;
      if (formData.password !== value) {
        err = "Confirm Password should be same as password";
      } else {
        err = "";
      }
      setErrors({ ...errors, confirmPassword: err });
      return;
    }

    if (name === "password") {
      let err;
      if (formData.confirmPassword && formData.confirmPassword !== value) {
        err = "Confirm Password should be same as password";
      } else {
        err = "";
      }

      errors.confirmPassword = err;
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
        .post("/auth/change-password", formData)
        .then((res) => {
          setLoading(false);
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/login");
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
                  <h1>Forgot Password</h1>
                  <p>
                    Curabitur vulputate, justo eget rutrum placerat, est dui
                    hendrerit velit, vel mattis neque sem in magna.
                  </p>
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
                    name="confirmPassword"
                    required
                    validaterule={["required", "password"]}
                    validatemsg={["Confirm Password is required"]}
                    value={formData.confirmPassword}
                    onChange={handleOnChange}
                  />
                  <label>Confirm Password</label>
                  <p className="invalid_input">{errors.confirmPassword}</p>
                </div>
                <button type="submit" className="sign-btn mt-40">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
