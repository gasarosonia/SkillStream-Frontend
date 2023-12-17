import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { apis } from "../store/apis";
import { useEffect, useState } from "react";
import { Alert, Spinner } from "reactstrap";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const { loading, error, user } = useSelector((state) => state.login);
  const {
    loading: registering,
    user: registeredUser,
    message,
    error: registerError,
  } = useSelector((state) => state.register);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const [registerUser, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    age: "",
  });

  const handleRegisterChange = (e) => {
    setUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (message && registeredUser) {
      localStorage.setItem("useremail", registerUser.email);
      setTimeout(() => {
        dispatch(apis.resetAll());
        window.location.href = "/";
      }, 2000);
    }
    if (registerError) {
      setTimeout(() => {
        dispatch(apis.resetAll());
      }, 2000);
    }
  }, [registeredUser, registerError]);

  useEffect(() => {
    if (user && user.role) {
      setTimeout(() => {
        dispatch(apis.resetAll());
        setLoading(false);
        window.location.href = "/dashboard";
      }, 2000);
    }
  }, [user]);
  console.log(registerError);
  return (
    <div class="containerAll">
      <div class="container1">
        <input type="checkbox" id="flip" />
        <div class="cover1">
          <div class="front1">
            <img
              class="frontImg1"
              src="https://thumbs.dreamstime.com/b/young-black-freelancer-woman-working-laptop-home-office-taking-notes-sitting-desk-near-window-looking-screen-writing-198331565.jpg"
              alt=""
            />
            <div class="text1">
              <span class="text-1">
                Every new friend is a <br /> new adventure
              </span>
              <span class="text-2">Let's get connected</span>
            </div>
          </div>
          <div class="back1">
            <img
              class="backImg1"
              src="https://img.freepik.com/premium-photo/smiling-african-american-man-sitting-desk-working-laptop-taking-notes-notebook-black-male-studying-online_116547-26697.jpg?w=2000"
              alt=""
            />
            <div class="text1">
              <span class="text-1">
                Complete miles of journey <br /> with one step
              </span>
              <span class="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div class="forms1">
          <div class="form-content1">
            <div class="login-form1">
              <div class="title1">Login</div>
              <form action="#">
                <div class="input-boxes1">
                  <div class="input-box1">
                    <i class="fas fa-envelope"></i>
                    <input
                      onChange={handleChange}
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div class="input-box1">
                    <i class="fas fa-lock"></i>
                    <input
                      onChange={handleChange}
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div class="text1">
                    <a href="#">Forgot password?</a>
                  </div>
                  <div class="button1 input-box1">
                    <input
                      type="submit"
                      value={loading || isLoading ? "Loading..." : "Login"}
                      onClick={(e) => {
                        e.preventDefault();
                        setLoading(true);
                        dispatch(apis.login(loginData));
                      }}
                    />
                  </div>
                  <Alert color="danger" isOpen={error}>
                    {error}
                  </Alert>
                  <div class="text1 sign-up-text1">
                    Don't have an account? <label for="flip">Sigup now</label>
                  </div>
                </div>
              </form>
            </div>
            <div class="signup-form1">
              <div class="title1">Signup</div>
              <form action="#">
                <div class="input-boxes1">
                  <div class="input-box1">
                    <i class="fas fa-user1"></i>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div class="input-box1">
                    <i class="fas fa-envelope"></i>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      required
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div class="input-box1">
                    <i class="fas fa-lock"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div class="input-box1">
                    {/* <i class="fas fa-lock"></i> */}
                    <input
                      type="number"
                      name="age"
                      placeholder="Enter your age"
                      required
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div class="button1 input-box1">
                    <input
                      type="submit"
                      value="Submit"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          apis.register({ ...registerUser, role: "student" })
                        );
                      }}
                    />
                  </div>
                  <Alert color="danger" isOpen={registerError}>
                    {registerError}
                  </Alert>
                  <Alert color="success" isOpen={message}>
                    {message}
                  </Alert>
                  <div class="text1 sign-up-text1">
                    Already have an account? <label for="flip">Login now</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
