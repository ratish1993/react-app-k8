import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "../../helper/validation";
import axios from "../../helper/axios";
import Loader from "../../common/loader/Loader";
import { toast } from "react-toastify";
import { Button, Form, Modal } from "react-bootstrap";
// import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
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
        .post("/auth/login", formData)
        .then((res) => {
          setLoading(false);
          if (res.data.success) {
            toast.success(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem(
              "userDetails",
              JSON.stringify(res.data.userDetails)
            );
            window.location.reload();
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

  const forgotPassword = (e) => {
    e.preventDefault();

    setShowModal(false);
    setLoading(true);

    axios
      .post("/auth/forget-password", {
        email: resetEmail,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setResetEmail("");
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error("Something went wrong!!!!");
      });
  };

  return (
    <div className="loginSection">
      <div className="container">
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            setResetEmail("");
          }}
          className="main-link-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Don't worry we'll help you out to find the credentials through
              email verification
            </p>
            <Form onSubmit={forgotPassword} className="singForgot">
              <div className="sing-form-section link-modal">
                <div className="sign-form">
                  <input
                    type="email"
                    name="email"
                    required
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                    }}
                  />
                  <label>Email</label>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <Button
                    type="submit"
                    variant="primary"
                    className="sign-btn mt-3 modalSubmit"
                  >
                    Send Link
                  </Button>
                </div>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {loading && <Loader />}
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div className="sing-form-section">
                <div className="sign-head">
                  <h1>Sign In</h1>
                  <p>Welcome back, enter your credentials</p>
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

                <div className="sign-form flex">
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
                <div className="forgot" style={{float:"right"}}>
                  <p
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Forgot Password?
                  </p>
                </div>
                <button className="sign-btn" type="submit">
                  Login
                </button>
                {/* <p className="alternate">
                  Already have an account?{" "}
                  <Link to="/registration">SignUp</Link>
                </p> */}
                {/* <h6 className="or">or</h6>
              <p className="continue">Continue with social media</p>
              <div className="with-social gap-5">
                <Link to="/">
                  <img src={GoogleImg} alt="" />
                </Link>
                <Link to="/">
                  <img src={FacebookImg} alt="" />
                </Link>
                <Link to="/">
                  <img src={TwitterImg} alt="" />
                </Link>
              </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
