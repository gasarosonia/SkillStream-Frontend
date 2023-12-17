import { Link, useParams } from "react-router-dom";
import headeimg from "../assets/images/header.jpg";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { apis } from "../store/apis";
import {
  Alert,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import user1 from "../assets/images/user1.jpg";

export const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const { course } = useSelector((state) => state.getCourse);
  const { message, error } = useSelector((state) => state.createEnrollment);

  useEffect(() => {
    dispatch(apis.getcourse(id));
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(apis.resetAll());
        window.location.href = "/courses";
      }, 2000);
    }
    if (error) {
      setTimeout(() => {
        dispatch(apis.resetAll());
        window.location.href = "/courses";
      }, 2000);
    }
  }, [message, error]);
  return (
    <>
      <div class="container-fluid bg-dark">
        <div class="row py-2 px-lg-5">
          <div class="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div class="d-inline-flex align-items-center text-white">
              <small>
                <i class="fa fa-phone-alt mr-2"></i>+012 345 6789
              </small>
              <small class="px-3">|</small>
              <small>
                <i class="fa fa-envelope mr-2"></i>info@example.com
              </small>
            </div>
          </div>
          <div class="col-lg-6 text-center text-lg-right">
            <div class="d-inline-flex align-items-center">
              <a class="text-white px-2" href="">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a class="text-white px-2" href="">
                <i class="fab fa-twitter"></i>
              </a>
              <a class="text-white px-2" href="">
                <i class="fab fa-linkedin-in"></i>
              </a>
              <a class="text-white px-2" href="">
                <i class="fab fa-instagram"></i>
              </a>
              <a class="text-white pl-2" href="">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid p-0">
        <nav class="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-lg-5">
          <a href="/" class="navbar-brand ml-lg-3">
            <h1 class="m-0 text-uppercase text-primary">
              <i class="fa fa-book-reader mr-3"></i>SkillStream
            </h1>
          </a>
          <button
            type="button"
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-between px-lg-3"
            id="navbarCollapse"
          >
            <div class="navbar-nav mx-auto py-0">
              <a href="/" class="nav-item nav-link">
                Home
              </a>
              <a href="about" class="nav-item nav-link">
                About
              </a>
              <a href="courses" class="nav-item nav-link">
                Courses
              </a>
            </div>
            {localStorage.getItem("useremail") ? (
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color="primary">
                  <img
                    src={user1}
                    alt="profile"
                    className="rounded-circle"
                    width="30"
                  ></img>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link
                class="btn btn-primary py-2 px-4 d-none d-lg-block"
                onClick={() => (window.location.href = "/login")}
              >
                Join Us
              </Link>
            )}
          </div>
        </nav>
      </div>

      <div
        class="jumbotron jumbotron-fluid page-header position-relative overlay-bottom"
        style={{
          marginBottom: "90px",
        }}
      >
        <div class="container text-center py-5">
          <h1 class="text-white display-1">Course Detail</h1>
          <div class="d-inline-flex text-white mb-5">
            <p class="m-0 text-uppercase">
              <a class="text-white" href="">
                Home
              </a>
            </p>
            <i class="fa fa-angle-double-right pt-1 px-3"></i>
            <p class="m-0 text-uppercase">Course Detail</p>
          </div>
          <div
            class="mx-auto mb-5"
            style={{
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <div class="input-group">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-light bg-white text-body px-4 dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Courses
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">
                    Courses 1
                  </a>
                  <a class="dropdown-item" href="#">
                    Courses 2
                  </a>
                  <a class="dropdown-item" href="#">
                    Courses 3
                  </a>
                </div>
              </div>
              <input
                type="text"
                class="form-control border-light"
                style={{
                  padding: "30px 25px",
                }}
                placeholder="Keyword"
              />
              <div class="input-group-append">
                <button class="btn btn-secondary px-4 px-lg-5">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid py-5">
        <div class="container py-5">
          <div class="row">
            <div class="col-lg-8">
              <div class="mb-5">
                <div class="section-title position-relative mb-5">
                  <h6 class="d-inline-block position-relative text-secondary text-uppercase pb-2">
                    Course Detail
                  </h6>
                  <h1 class="display-4">
                    {course.title && course.title.toUpperCase()}
                  </h1>
                </div>
                <img
                  class="img-fluid rounded w-100 mb-4"
                  src={headeimg}
                  alt="Image"
                />
              </div>
            </div>

            <div class="col-lg-4 mt-5 mt-lg-0">
              <div class="bg-primary mb-5 py-3">
                <h3 class="text-white py-3 px-4 m-0">Course Features</h3>
                <div class="d-flex justify-content-between border-bottom px-4">
                  <h6 class="text-white my-3">Instructor</h6>
                  <h6 class="text-white my-3">{course.instructor}</h6>
                </div>
                <div class="d-flex justify-content-between border-bottom px-4">
                  <h6 class="text-white my-3">Rating</h6>
                  <h6 class="text-white my-3">
                    4.5 <small>(250)</small>
                  </h6>
                </div>
                <div class="d-flex justify-content-between border-bottom px-4">
                  <h6 class="text-white my-3">Lectures</h6>
                  <h6 class="text-white my-3">
                    {course.modules && course.modules.length}
                  </h6>
                </div>
                <div class="d-flex justify-content-between border-bottom px-4">
                  <h6 class="text-white my-3">Duration</h6>
                  <h6 class="text-white my-3">{course.length}</h6>
                </div>
                <div class="d-flex justify-content-between border-bottom px-4">
                  <h6 class="text-white my-3">Skill level</h6>
                  <h6 class="text-white my-3">All Level</h6>
                </div>
                <div class="d-flex justify-content-between px-4">
                  <h6 class="text-white my-3">Language</h6>
                  <h6 class="text-white my-3">English</h6>
                </div>
                <h5 class="text-white py-3 px-4 m-0">Course Price: $199</h5>
                <div class="py-3 px-4">
                  <Alert color="danger" isOpen={error}>
                    {error}
                  </Alert>
                  <Alert color="success" isOpen={message}>
                    {message}
                  </Alert>
                  <Button
                    class="btn btn-block btn-secondary py-3 px-5"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        apis.createEnrollment({
                          course: course.title,
                          userEmail: localStorage.getItem("useremail"),
                        })
                      );
                    }}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>

              {/* <div class="mb-5">
                <h2 class="mb-3">Categories</h2>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <a href="" class="text-decoration-none h6 m-0">
                      Web Design
                    </a>
                    <span class="badge badge-primary badge-pill">150</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <a href="" class="text-decoration-none h6 m-0">
                      Web Development
                    </a>
                    <span class="badge badge-primary badge-pill">131</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <a href="" class="text-decoration-none h6 m-0">
                      Online Marketing
                    </a>
                    <span class="badge badge-primary badge-pill">78</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <a href="" class="text-decoration-none h6 m-0">
                      Keyword Research
                    </a>
                    <span class="badge badge-primary badge-pill">56</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                    <a href="" class="text-decoration-none h6 m-0">
                      Email Marketing
                    </a>
                    <span class="badge badge-primary badge-pill">98</span>
                  </li>
                </ul>
              </div>

              <div class="mb-5">
                <h2 class="mb-4">Recent Courses</h2>
                <a
                  class="d-flex align-items-center text-decoration-none mb-4"
                  href=""
                >
                  <img
                    class="img-fluid rounded"
                    src="img/courses-80x80.jpg"
                    alt=""
                  />
                  <div class="pl-3">
                    <h6>Web design & development courses for beginners</h6>
                    <div class="d-flex">
                      <small class="text-body mr-3">
                        <i class="fa fa-user text-primary mr-2"></i>Jhon Doe
                      </small>
                      <small class="text-body">
                        <i class="fa fa-star text-primary mr-2"></i>4.5 (250)
                      </small>
                    </div>
                  </div>
                </a>
                <a
                  class="d-flex align-items-center text-decoration-none mb-4"
                  href=""
                >
                  <img
                    class="img-fluid rounded"
                    src="img/courses-80x80.jpg"
                    alt=""
                  />
                  <div class="pl-3">
                    <h6>Web design & development courses for beginners</h6>
                    <div class="d-flex">
                      <small class="text-body mr-3">
                        <i class="fa fa-user text-primary mr-2"></i>Jhon Doe
                      </small>
                      <small class="text-body">
                        <i class="fa fa-star text-primary mr-2"></i>4.5 (250)
                      </small>
                    </div>
                  </div>
                </a>
                <a
                  class="d-flex align-items-center text-decoration-none mb-4"
                  href=""
                >
                  <img
                    class="img-fluid rounded"
                    src="img/courses-80x80.jpg"
                    alt=""
                  />
                  <div class="pl-3">
                    <h6>Web design & development courses for beginners</h6>
                    <div class="d-flex">
                      <small class="text-body mr-3">
                        <i class="fa fa-user text-primary mr-2"></i>Jhon Doe
                      </small>
                      <small class="text-body">
                        <i class="fa fa-star text-primary mr-2"></i>4.5 (250)
                      </small>
                    </div>
                  </div>
                </a>
                <a
                  class="d-flex align-items-center text-decoration-none"
                  href=""
                >
                  <img
                    class="img-fluid rounded"
                    src="img/courses-80x80.jpg"
                    alt=""
                  />
                  <div class="pl-3">
                    <h6>Web design & development courses for beginners</h6>
                    <div class="d-flex">
                      <small class="text-body mr-3">
                        <i class="fa fa-user text-primary mr-2"></i>Jhon Doe
                      </small>
                      <small class="text-body">
                        <i class="fa fa-star text-primary mr-2"></i>4.5 (250)
                      </small>
                    </div>
                  </div>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div
        class="container-fluid position-relative overlay-top bg-dark text-white-50 py-5"
        style={{
          marginTop: "90px",
        }}
      >
        <div class="container mt-5 pt-5">
          <div class="row">
            <div class="col-md-6 mb-5">
              <a href="/" class="navbar-brand">
                <h1 class="mt-n2 text-uppercase text-white">
                  <i class="fa fa-book-reader mr-3"></i>SkillStream
                </h1>
              </a>
              <p class="m-0">
                Accusam nonumy clita sed rebum kasd eirmod elitr. Ipsum ea lorem
                at et diam est, tempor rebum ipsum sit ea tempor stet et
                consetetur dolores. Justo stet diam ipsum lorem vero clita diam
              </p>
            </div>
            <div class="col-md-6 mb-5">
              <h3 class="text-white mb-4">Newsletter</h3>
              <div class="w-100">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control border-light"
                    style={{
                      padding: "30px",
                    }}
                    placeholder="Your Email Address"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary px-4">Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 mb-5">
              <h3 class="text-white mb-4">Get In Touch</h3>
              <p>
                <i class="fa fa-map-marker-alt mr-2"></i>123 Street, New York,
                USA
              </p>
              <p>
                <i class="fa fa-phone-alt mr-2"></i>+012 345 67890
              </p>
              <p>
                <i class="fa fa-envelope mr-2"></i>info@example.com
              </p>
              <div class="d-flex justify-content-start mt-4">
                <a class="text-white mr-4" href="#">
                  <i class="fab fa-2x fa-twitter"></i>
                </a>
                <a class="text-white mr-4" href="#">
                  <i class="fab fa-2x fa-facebook-f"></i>
                </a>
                <a class="text-white mr-4" href="#">
                  <i class="fab fa-2x fa-linkedin-in"></i>
                </a>
                <a class="text-white" href="#">
                  <i class="fab fa-2x fa-instagram"></i>
                </a>
              </div>
            </div>
            <div class="col-md-4 mb-5">
              <h3 class="text-white mb-4">Our Courses</h3>
              <div class="d-flex flex-column justify-content-start">
                <a class="text-white-50 mb-2" href="#">
                  <i class="fa fa-angle-right mr-2"></i>Web Design
                </a>
                <a class="text-white-50 mb-2" href="#">
                  <i class="fa fa-angle-right mr-2"></i>Apps Design
                </a>
                <a class="text-white-50 mb-2" href="#">
                  <i class="fa fa-angle-right mr-2"></i>Marketing
                </a>
                <a class="text-white-50 mb-2" href="#">
                  <i class="fa fa-angle-right mr-2"></i>Research
                </a>
                <a class="text-white-50" href="#">
                  <i class="fa fa-angle-right mr-2"></i>SEO
                </a>
              </div>
            </div>
            <div class="col-md-4 mb-5">
              <h3 class="text-white mb-4">Quick Links</h3>
              <div class="d-flex flex-column justify-content-start">
                <a class="text-white-50 mb-2" href="#">
                  <i class="fa fa-angle-right mr-2"></i>Privacy Policy
                </a>
                <a class="text-white-50 mb-2" href="#">
                  <i class="fa fa-angle-right mr-2"></i>Terms & Condition
                </a>
                <a class="text-white-50 mb-2" href="#">
                  <i class="fa fa-angle-right mr-2"></i>Regular FAQs
                </a>
                <a class="text-white-50 mb-2" href="#">
                  <i class="fa fa-angle-right mr-2"></i>Help & Support
                </a>
                <a class="text-white-50" href="#">
                  <i class="fa fa-angle-right mr-2"></i>Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="container-fluid bg-dark text-white-50 border-top py-4"
        style={{
          borderColor: "rgba(256, 256, 256, 0.1) !important",
        }}
      >
        <div class="container">
          <div class="row">
            <div class="col-md-6 text-center text-md-left mb-3 mb-md-0">
              <p class="m-0">
                Copyright &copy;
                <a class="text-white" href="#">
                  Your Site Name
                </a>
                . All Rights Reserved.
              </p>
            </div>
            <div class="col-md-6 text-center text-md-right">
              <p class="m-0">
                Designed by
                <a class="text-white" href="https://htmlcodex.com">
                  HTML Codex
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#"
        class="btn btn-lg btn-primary rounded-0 btn-lg-square back-to-top"
      >
        <i class="fa fa-angle-double-up"></i>
      </a>
    </>
  );
};
