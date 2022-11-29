import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

import icLogo from "../../../assets/logo.svg";
import icSearch from "../../../assets/search-icon.svg";
import icFilter from "../../../assets/filter-icon.svg";
import icCart from "../../../assets/cart-icon.svg";

const Navbar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return navigate(`/search?q=${search}`);
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top ${styles.navbar}`}>
        <div className="container g-0">
          <Link className="navbar-brand" to="#">
            <div className=" d-flex flex-row">
              <img src={icLogo} alt="icLogo" />
              <div className="mt-2">
                <p className={styles.titleLogo}>TikiToko</p>
              </div>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex ms-5">
              <input
                type="text"
                className={`px-4 py-2 ${styles.cstmSearch}`}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
              <button
                className={`px-4 ${styles.btnSearch}`}
                type="button"
                id="button-addon2"
              >
                <img src={icSearch} alt="icSearch" />
              </button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  <button
                    className={` px-2 ${styles.btnFilter}`}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <img src={icFilter} alt="icFilter" />
                  </button>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  <button className={`px-2 ${styles.btnCart}`}>
                    <img src={icCart} alt="icCart" />
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  {" "}
                  <button className={`ms-3 px-4 py-1 ${styles.btnLogin}`}>
                    Login
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  {" "}
                  <button className={`ms-3 px-3 py-1 ${styles.btnSignup}`}>
                    Signup
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
