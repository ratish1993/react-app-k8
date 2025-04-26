import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "../../helper/validation";
import axios from "../../helper/axios";
import Loader from "../../common/loader/Loader";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("admin_token")) {
      navigate("/registration");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

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
        .post("/auth/admin-login", formData)
        .then((res) => {
          setLoading(false);
          if (res.data.success) {
            toast.success(res.data.message);
            localStorage.setItem("admin_token", res.data.token);
            navigate("/registration");
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
                  <h1>Login</h1>
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
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    validaterule={["required", "password"]}
                    validatemsg={["Password is required"]}
                    value={formData.password}
                    onChange={handleOnChange}
                  />
                  <span style={{margin: -25}} className="flex justify-around items-center" onClick={handleTogglePassword}>
                  {showPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash absolute mr-10"></i>}
                  </span>
                  <label>Password</label>
                  <p className="invalid_input">{errors.password}</p>
                </div>

                <button className="sign-btn" type="submit">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
