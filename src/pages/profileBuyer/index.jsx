/* eslint-disable array-callback-return */
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./profilebuyer.module.css";
import pencil from "../../assets/pencil-icon.svg";
import user from "../../assets/user-icon.svg";
import location from "../../assets/location-icon.svg";
import order from "../../assets/order-icon.svg";
import Navbar from "../../component/module/navbarLogin";
import axios from "axios";
import swal from "sweetalert";

const ProfileBuyer = () => {
  const navigate = useNavigate();
  const [allItem, setAllItem] = useState([]);
  // const statusOrder = allItem.map((item) => item.status);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://tikitoko.up.railway.app/v1/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllItem(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [users, setUsers] = useState({});

  const data = JSON.parse(localStorage.getItem("buyer"));
  const id = data.buyer_id;

  const [dateBirth, setDateBirth] = useState("");
  useEffect(() => {
    axios
      .get(`https://tikitoko.up.railway.app/v1/buyer/${id}`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.data);
        convertDateBirthday(res.data.data.birthdate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const convertDateBirthday = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();

    const tempDate = {
      year: year,
      month: `${month < 10 ? `0${month}` : month}`,
      day: `${day < 10 ? `0${day}` : day}`,
    };

    const formattedDate = `${tempDate.year}-${tempDate.month}-${tempDate.day}`;

    setDateBirth(formattedDate);

    //  ////

    // const option = {
    //   day: "numeric",
    //   month: "numeric",
    //   year: "numeric",
    // };
    // const newDate = new Date(date);
    // const formattedDate = newDate.toLocaleDateString("en-US", option)
    // setDateBirth(formattedDate);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("buyer_id", id);
    axios
      .put(`https://tikitoko.up.railway.app/v1/buyer/${id}`, formData)
      .then((res) => {
        swal({
          title: "Update Success",
          text: `Your account have been updated`,
          icon: "success",
        }).then(() => {
          navigate("/profile");
        });
      })
      .catch((err) => {
        alert("Update Failed");
      });
  };

  // const deleteUser = (e) => {
  //   e.preventDefault();
  //   axios
  //   .delete(`https://tikitoko.up.railway.app/user/delete/${buyer_id}`)
  //   .then((res) => {
  //     // console.log(res);
  //     alert("Delete Success");
  //     localStorage.clear();
  //     navigate("/");
  //   })
  //   .catch((err) => {
  //     alert("Delete Failed");
  //     // console.log(err);
  //   })
  // }

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
  };
  const [viewPage, setViewPage] = useState(0);
  const [viewCollapse, setViewCollapse] = useState(0);
  const [address, setAddress] = useState([]);
  const [editAddress, setEditAddress] = useState({});

  useEffect(() => {
    axios
      .get(`https://tikitoko.up.railway.app/v1/address`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAddress(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [addressForm, setAddressForm] = useState({
    label: "",
    recipient: "",
    phone: "",
    residence: "",
    postcode: "",
    city: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      addressForm.label === "" ||
      addressForm.recipient === "" ||
      addressForm.phone === "" ||
      addressForm.residence === "" ||
      addressForm.postcode === "" ||
      addressForm.city === ""
    ) {
      alert("Please fill all the form");
    } else {
      const body = {
        label: addressForm.label,
        recipient: addressForm.recipient,
        phone: addressForm.phone,
        residence: addressForm.residence,
        postcode: addressForm.postcode,
        city: addressForm.city,
      };
      axios
        .post(`https://tikitoko.up.railway.app/v1/address`, body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setAddressForm(res.data.data);
          swal({
            title: "Address Added",
            text: `New address have been added`,
            icon: "success",
          }).then(() => {
            navigate("/profile");
          });
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Failed",
            text: `Make sure your address data is correct!`,
            icon: "warning",
          });
        });
    }
  };

  const deleteAddress = (address_id) => {
    swal({
      title: "Remove address?",
      text: `Are you sure want to remove this address?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        axios
          .delete(`https://tikitoko.up.railway.app/v1/address/${address_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setAddressForm(res.data.data);
            swal({
              title: "Remove Success",
              text: `Address have been removed`,
              icon: "success",
            });
          })
          .catch(() => {
            swal({
              title: "Failed",
              text: `Failed removing address`,
              icon: "warning",
            });
          });
      }
    });
  };

  const prepareDataAddress = (address_id) => {
    axios
      .get(`https://tikitoko.up.railway.app/v1/address/${address_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setEditAddress(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAddress = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://tikitoko.up.railway.app/v1/address/${editAddress.address_id}`,
        editAddress,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setAddressForm(res.data.data);
        swal({
          title: "Address updated",
          text: `Your address have been updated`,
          icon: "success",
        }).then(() => {
          navigate("/profile");
        });
      })
      .catch(() => {
        swal({
          title: "Update failed",
          text: `Make sure your address data is correct`,
          icon: "warning",
        });
      });
  };

  const cancelOrder = (val) => {
    swal({
      title: "Cancel order?",
      text: `Are you sure want to cancel this order?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        axios
          .put(`https://tikitoko.up.railway.app/v1/order/cancel/${val}`)
          .then((res) => {
            swal({
              title: "Order Cancelled",
              text: `Order have been cancelled`,
              icon: "success",
            });
          });
      }
    });
  };

  const [isLogout, setIsLogout] = useState(false);

  const logout = () => {
    swal({
      title: "Logging Out",
      text: `Are you sure want to leave?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (confirm) => {
      if (confirm) {
        localStorage.clear();
        setIsLogout(true)
      }
    });
  };

  useEffect(() => {
    if (isLogout) {
      swal({
        title: "Logged Out",
        text: `You have been logged out`,
        icon: "success",
      });
      navigate("/login");
    }
  }, [isLogout, navigate]);

  return (
    <>
      <Navbar />
      <div className={`container-fluid bg-light ${styles.customContainer}`}>
        <div className="row">
          <div className={`col-md-3 bg-white py-4 px-5`}>
            <div className="col-md-12 mt-5 ">
              <div className="row">
                <div className="col-md-3 mx-2">
                  <img
                    src={
                      users.avatar
                        ? users.avatar
                        : require("../../assets/dummy.jpg")
                    }
                    alt=""
                    width={55}
                    height={55}
                    className="rounded-circle"
                  />
                </div>
                <div className="col-md-6 ">
                  <h6 className="mt-1">{users.name}</h6>
                  <p>
                    {/* <i className="text-muted">Ubah profile</i> */}
                    <img src={pencil} width={12} height={12} alt="profile" />
                    <small className="text-muted"> Ubah profile</small>
                  </p>
                </div>
              </div>
              <div className="col-md-12 mt-5">
                <small>
                  <img
                    src={user}
                    alt="usericon"
                    className={`rounded-circle ${styles.bgBlue} text-white p-2`}
                  ></img>
                  <span
                    className="ms-2"
                    onClick={() => setViewPage(0)}
                    style={{ cursor: "pointer" }}
                  >
                    My Account
                  </span>
                </small>
              </div>
              <div className="col-md-12 mt-3">
                <small>
                  <img
                    src={location}
                    alt="locationIcon"
                    className={`rounded-circle ${styles.bgOrange} text-white p-2`}
                  ></img>
                  <span
                    className="ms-2"
                    onClick={() => setViewPage(1)}
                    style={{ cursor: "pointer" }}
                  >
                    Shipping Address
                  </span>
                </small>
              </div>
              <div className="col-md-12 mt-3">
                <small>
                  <img
                    src={order}
                    alt="orderIcon"
                    className={`rounded-circle ${styles.bgPink} text-white p-2`}
                  ></img>
                  <span
                    className="ms-2"
                    onClick={() => setViewPage(2)}
                    style={{ cursor: "pointer" }}
                  >
                    My Order
                  </span>
                </small>
              </div>
              <div className="col-md-12 mt-2">
                <button
                  type="submit"
                  className="btn btn-outline-danger mt-2 rounded-pill"
                  style={{ width: "100%" }}
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          {viewPage === 0 ? (
            <div
              className={`col-md-8 bg-white p-5 my-5 border rounded ${styles.customMobileSection}`}
              id="account"
            >
              <form
                onSubmit={(e) => {
                  handleUpdate(e);
                }}
              >
                <div className="col-md-12">
                  <h5>My Profile</h5>
                  <p className="text-muted">Manage your profile information</p>
                  <hr />
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <div className="row my-4">
                      <div className="col-md-3">
                        <label htmlFor="username" className="text-muted">
                          Name
                        </label>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="text"
                          name="name"
                          id="username"
                          className="form-control"
                          placeholder="Masukkan nama"
                          defaultValue={users.name}
                        />
                      </div>
                    </div>
                    <div className="row my-4">
                      <div className="col-md-3">
                        <label htmlFor="email" className="text-muted">
                          Email
                        </label>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          // disabled
                          className="form-control"
                          placeholder="Masukkan email"
                          defaultValue={users.email}
                        />
                      </div>
                    </div>
                    <div className="row my-4">
                      <div className="col-md-3">
                        <label htmlFor="phone" className="text-muted">
                          Phone
                        </label>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="form-control"
                          placeholder="Masukkan nomor telepon"
                          defaultValue={users.phone}
                        />
                      </div>
                    </div>

                    <div className="row my-4">
                      <div className="col-md-3">
                        <label htmlFor="gender" className="text-muted">
                          Gender
                        </label>
                      </div>
                      <div className="col-md-6 my-2">
                        <div className="d-flex flex-row">
                          {users.gender ? (
                            <>
                              <p className="mx-2 text-muted">
                                <input
                                  type="radio"
                                  name="gender"
                                  value={1}
                                  defaultChecked={users?.gender === 1}
                                />{" "}
                                Pria
                              </p>
                              <p className="mx-2 text-muted">
                                <input
                                  type="radio"
                                  name="gender"
                                  value={2}
                                  defaultChecked={users?.gender === 2}
                                />{" "}
                                Perempuan
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="mx-2 text-muted">
                                <input type="radio" name="gender" value={1} />{" "}
                                Pria
                              </p>
                              <p className="mx-2 text-muted">
                                <input type="radio" name="gender" value={2} />{" "}
                                Perempuan
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row my-4">
                      <div className="col-md-3">
                        <label htmlFor="date" className="text-muted">
                          Date of Birth
                        </label>
                      </div>
                      <div className="col-md-8">
                        <input
                          type="date"
                          // type="text"
                          name="birthdate"
                          id="date"
                          className="form-control"
                          defaultValue={dateBirth}
                        />
                      </div>
                    </div>
                    <div className="row mt-4 mb-5">
                      <div className="col-md-3"></div>
                      <div className="col-md-8">
                        <button
                          type="submit"
                          className="btn btn-danger px-4 rounded-pill"
                        >
                          save
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 bg-white mt-3">
                    <div className="col-md-12 text-center border-start">
                      <img
                        src={
                          users.avatar
                            ? users.avatar
                            : require("../../assets/dummy.jpg")
                        }
                        alt={users.name}
                        width={120}
                        height={120}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="col-md-12 text-center mt-3">
                      <button
                        type="button"
                        onClick={handleClick}
                        className="btn btn-outline-danger rounded-pill text-muted"
                      >
                        Select image
                      </button>

                      <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                        ref={hiddenFileInput}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : viewPage === 1 ? (
            <div
              className={`col-md-8 bg-white p-5 my-5 border rounded ${styles.customMobileSection}`}
              id="address"
            >
              <div className="col-md-12">
                <h5 className="fw-bold">Choose another address</h5>
                <p className="text-muted">Manage your shipping address</p>
                <hr />
              </div>
              <div className="col-md-12 p-4">
                <div className={`col-md-12 ${styles.customNewAdd}`}>
                  <button
                    className={`text-center text-muted p-4 ${styles.customAddBtn}`}
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                  >
                    Add new address
                  </button>
                  <form onSubmit={(e) => onSubmitHandler(e)}>
                    <div className="modal p-3 " id="myModal">
                      <div className={`modal-dialog`}>
                        <div
                          className={`modal-content p-4 ${styles.customCollapse}`}
                        >
                          <div className={`modal-header`}>
                            <h4 className="modal-title">Add New Address</h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                            ></button>
                          </div>

                          <div className="modal-body">
                            <div className="col-md-12 my-2">
                              <label htmlFor="rumah" className="text-muted">
                                Save address as (ex : home address, office
                                address)
                              </label>
                            </div>
                            <div className="col-md-12 my-2">
                              <input
                                type="text"
                                name="label"
                                id="rumah"
                                className="p-2 form-control"
                                placeholder="Rumah"
                                onChange={(e) =>
                                  setAddressForm({
                                    ...addressForm,
                                    label: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="row my-2">
                              <div className="col-md-6 my-2">
                                <div className="col-md-12">
                                  <label htmlFor="nama" className="text-muted">
                                    Recipient's name
                                  </label>
                                </div>
                                <div className="col-md-12 mt-2">
                                  <input
                                    type="text"
                                    name="recipient"
                                    id="nama"
                                    className="p-2 form-control"
                                    placeholder="Masukkan nama"
                                    onChange={(e) =>
                                      setAddressForm({
                                        ...addressForm,
                                        recipient: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 my-2">
                                <div className="col-md-12">
                                  <label htmlFor="phone" className="text-muted">
                                    Phone number
                                  </label>
                                </div>
                                <div className="col-md-12 mt-2">
                                  <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="p-2 form-control"
                                    placeholder="Masukkan nomor telepon"
                                    onChange={(e) =>
                                      setAddressForm({
                                        ...addressForm,
                                        phone: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row my-2">
                              <div className="col-md-8 my-2">
                                <div className="col-md-12">
                                  <label
                                    htmlFor="address"
                                    className="text-muted"
                                  >
                                    Address
                                  </label>
                                </div>
                                <div className="col-md-12 mt-2">
                                  <input
                                    type="text"
                                    name="residence"
                                    id="address"
                                    className="p-2 form-control"
                                    placeholder="Masukkan alamat"
                                    onChange={(e) =>
                                      setAddressForm({
                                        ...addressForm,
                                        residence: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-md-4 my-2">
                                <div className="col-md-12">
                                  <label
                                    htmlFor="postalCode"
                                    className="text-muted"
                                  >
                                    Postal Code
                                  </label>
                                </div>
                                <div className="col-md-12 mt-2">
                                  <input
                                    type="text"
                                    name="postcode"
                                    id="postalCode"
                                    className="p-2 form-control"
                                    placeholder="Masukkan kode pos"
                                    onChange={(e) =>
                                      setAddressForm({
                                        ...addressForm,
                                        postcode: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row my-2">
                              <div className="col-md-6 my-2">
                                <div className="col-md-12">
                                  <label htmlFor="city" className="text-muted">
                                    City of Subdistrict
                                  </label>
                                </div>
                                <div className="col-md-12 mt-2">
                                  <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    className="p-2 form-control"
                                    placeholder="Masukkan kota"
                                    onChange={(e) =>
                                      setAddressForm({
                                        ...addressForm,
                                        city: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-check">
                              <input
                                id="gridCheck"
                                type="checkbox"
                                className={styles.accent}
                              />
                              <label
                                className="form-check-label px-2 text-muted"
                                htmlFor="gridCheck"
                              >
                                Make it the primary address
                              </label>
                            </div>
                          </div>

                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-outline-danger text-muted w-25 rounded-pill"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-danger w-25 rounded-pill"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {address
                  ? address.map((item, index) => {
                      return (
                        <div className={`col-md-12 ${styles.customAdd}`}>
                          <div className="col-md-12 px-3 pt-4">
                            <h6>{item.label}</h6>
                          </div>
                          <div className="col-md-12 px-3 py-1">
                            <small className="">
                              {item.residence} - {item.city}
                            </small>
                          </div>
                          <div className="col-md-12 px-3 py-1 pb-4">
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal2"
                              // button none decor
                              style={{
                                border: "none",
                                background: "none",
                                color: "red",
                              }}
                              onClick={() =>
                                prepareDataAddress(item.address_id)
                              }
                            >
                              Change address
                            </button>
                          </div>
                          {editAddress ? (
                            <form onSubmit={(e) => updateAddress(e)}>
                              <div className="modal p-3 " id="myModal2">
                                <div className={`modal-dialog`}>
                                  <div
                                    className={`modal-content p-4 ${styles.customCollapse}`}
                                  >
                                    <div className={`modal-header`}>
                                      <h4 className="modal-title">
                                        Update Address
                                      </h4>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                      ></button>
                                    </div>

                                    <div className="modal-body">
                                      <div className="col-md-12 my-2">
                                        <label
                                          htmlFor="rumah"
                                          className="text-muted"
                                        >
                                          Save address as (ex : home address,
                                          office address)
                                        </label>
                                      </div>
                                      <div className="col-md-12 my-2">
                                        <input
                                          type="text"
                                          // name="label"
                                          id="rumah"
                                          className="p-2 form-control"
                                          placeholder="Rumah"
                                          onChange={(e) =>
                                            setEditAddress({
                                              ...editAddress,
                                              label: e.target.value,
                                            })
                                          }
                                          defaultValue={editAddress.label}
                                        />
                                      </div>
                                      <div className="row my-2">
                                        <div className="col-md-6 my-2">
                                          <div className="col-md-12">
                                            <label
                                              htmlFor="nama"
                                              className="text-muted"
                                            >
                                              Recipient's name
                                            </label>
                                          </div>
                                          <div className="col-md-12 mt-2">
                                            <input
                                              type="text"
                                              // name="recipient"
                                              id="nama"
                                              className="p-2 form-control"
                                              placeholder="Masukkan nama"
                                              defaultValue={
                                                editAddress.recipient
                                              }
                                              onChange={(e) =>
                                                setEditAddress({
                                                  ...editAddress,
                                                  recipient: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-6 my-2">
                                          <div className="col-md-12">
                                            <label
                                              htmlFor="phone"
                                              className="text-muted"
                                            >
                                              Phone number
                                            </label>
                                          </div>
                                          <div className="col-md-12 mt-2">
                                            <input
                                              type="text"
                                              // name="phone"
                                              id="phone"
                                              className="p-2 form-control"
                                              placeholder="Masukkan nomor telepon"
                                              defaultValue={editAddress.phone}
                                              onChange={(e) =>
                                                setEditAddress({
                                                  ...editAddress,
                                                  phone: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row my-2">
                                        <div className="col-md-8 my-2">
                                          <div className="col-md-12">
                                            <label
                                              htmlFor="address"
                                              className="text-muted"
                                            >
                                              Address
                                            </label>
                                          </div>
                                          <div className="col-md-12 mt-2">
                                            <input
                                              type="text"
                                              // name="residence"
                                              id="address"
                                              className="p-2 form-control"
                                              placeholder="Masukkan alamat"
                                              defaultValue={
                                                editAddress.residence
                                              }
                                              onChange={(e) =>
                                                setEditAddress({
                                                  ...editAddress,
                                                  residence: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-4 my-2">
                                          <div className="col-md-12">
                                            <label
                                              htmlFor="postalCode"
                                              className="text-muted"
                                            >
                                              Postal Code
                                            </label>
                                          </div>
                                          <div className="col-md-12 mt-2">
                                            <input
                                              type="text"
                                              // name="postcode"
                                              id="postalCode"
                                              className="p-2 form-control"
                                              placeholder="Masukkan kode pos"
                                              defaultValue={
                                                editAddress.postcode
                                              }
                                              onChange={(e) =>
                                                setEditAddress({
                                                  ...editAddress,
                                                  postcode: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row my-2">
                                        <div className="col-md-6 my-2">
                                          <div className="col-md-12">
                                            <label
                                              htmlFor="city"
                                              className="text-muted"
                                            >
                                              City of Subdistrict
                                            </label>
                                          </div>
                                          <div className="col-md-12 mt-2">
                                            <input
                                              type="text"
                                              // name="city"
                                              id="city"
                                              className="p-2 form-control"
                                              placeholder="Masukkan kota"
                                              defaultValue={editAddress.city}
                                              onChange={(e) =>
                                                setEditAddress({
                                                  ...editAddress,
                                                  city: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-check">
                                        <input
                                          id="gridCheck"
                                          type="checkbox"
                                          className={styles.accent}
                                        />
                                        <label
                                          className="form-check-label px-2 text-muted"
                                          htmlFor="gridCheck"
                                        >
                                          Make it the primary address
                                        </label>
                                      </div>
                                    </div>

                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger text-muted w-25 rounded-pill"
                                        data-bs-dismiss="modal"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-danger w-25 rounded-pill"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          ) : null}

                          <div className="col-md-12">
                            <button
                              type="button"
                              className={`btn btn-danger w-100 rounded ${styles.btn}`}
                              onClick={() => deleteAddress(item.address_id)}
                            >
                              Delete Address
                            </button>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          ) : viewPage === 2 ? (
            <div
              className={`col-md-8 bg-white p-5 my-5 border rounded ${styles.customMobileSection}`}
            >
              {viewCollapse === 0 ? (
                <div className="col-md-12" id="address">
                  <div className="col-md-12">
                    <h5 className="fw-bold">My order</h5>
                  </div>
                  <p className="mt-3">
                    <Link
                      className="btn text-danger me-4 "
                      data-bs-toggle="collapse"
                      to="#allItem"
                      style={{
                        borderBottom: "2px solid red",
                        borderRadius: 0,
                        // color: "red !important",
                      }}
                      onClick={() => setViewCollapse(0)}
                    >
                      All items
                    </Link>
                    <Link
                      className="btn text-muted me-4 ms-3"
                      data-bs-toggle="collapse"
                      to="#notPaid"
                      onClick={() => setViewCollapse(1)}
                    >
                      Not yet paid
                    </Link>

                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#completed"
                      onClick={() => setViewCollapse(2)}
                    >
                      Completed
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#cancel"
                      onClick={() => setViewCollapse(3)}
                    >
                      Order cancel
                    </Link>
                  </p>
                  <hr />
                  {allItem
                    ? allItem.map((item, index) => {
                        return (
                          <div className="collapse multi-collapse" id="allItem">
                            <div className="mt-3">
                              <div className={styles["card"]}>
                                <div className="card-body px-4 py-4">
                                  <div className={styles["product"]}>
                                    <div className="d-flex align-items-center">
                                      <img
                                        className={styles["product-img"]}
                                        src={item.image}
                                        width="60"
                                        height="60"
                                        alt="suite"
                                      />
                                      <div className={styles["brand"]}>
                                        <h5>{item.name}</h5>
                                        <p>{item.qty}</p>
                                      </div>
                                    </div>
                                    <p className={styles["price"]}>
                                      Rp {item.price * item.qty}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              ) : viewCollapse === 1 ? (
                <div className="col-md-12" id="address">
                  <div className="col-md-12">
                    <h5 className="fw-bold">My order</h5>
                  </div>
                  <p className="mt-3">
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#allItem"
                      onClick={() => setViewCollapse(0)}
                    >
                      All items
                    </Link>
                    <Link
                      className="btn text-danger me-4 ms-3"
                      data-bs-toggle="collapse"
                      to="#notPaid"
                      style={{
                        borderBottom: "2px solid red",
                        borderRadius: 0,
                        color: "red",
                      }}
                      onClick={() => setViewCollapse(1)}
                    >
                      Not yet paid
                    </Link>

                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#completed"
                      onClick={() => setViewCollapse(2)}
                    >
                      Completed
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#cancel"
                      onClick={() => setViewCollapse(3)}
                    >
                      Order cancel
                    </Link>
                  </p>
                  <hr />
                  {allItem
                    ? allItem.map((item, index) => {
                        if (item.status === 0) {
                          return (
                            <div
                              className="collapse multi-collapse"
                              id="notPaid"
                            >
                              <div className="mt-3">
                                <div className={styles["card"]}>
                                  <div className="card-body px-4 py-4">
                                    <div className={styles["product"]}>
                                      <div className="d-flex align-items-center">
                                        <img
                                          className={styles["product-img"]}
                                          src={item.image}
                                          width="60"
                                          height="60"
                                          alt="suite"
                                        />
                                        <div className={styles["brand"]}>
                                          <h5>{item.name}</h5>
                                          <p>{item.qty}</p>
                                        </div>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <p className={styles["price"]}>
                                          Rp {item.price * item.qty}
                                        </p>
                                        <button
                                          className={`ml-3 ${styles["delete-btn"]}`}
                                          onClick={() =>
                                            cancelOrder(item.order_id)
                                          }
                                        >
                                          cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })
                    : null}
                </div>
              ) : viewCollapse === 2 ? (
                <div className="col-md-12" id="address">
                  <div className="col-md-12">
                    <h5 className="fw-bold">My order</h5>
                  </div>
                  <p className="mt-3">
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#allItem"
                      onClick={() => setViewCollapse(0)}
                    >
                      All items
                    </Link>
                    <Link
                      className="btn text-muted me-4 ms-3"
                      data-bs-toggle="collapse"
                      to="#notPaid"
                      onClick={() => setViewCollapse(1)}
                    >
                      Not yet paid
                    </Link>
                    <Link
                      className="btn text-danger me-4 "
                      data-bs-toggle="collapse"
                      to="#completed"
                      style={{
                        borderBottom: "2px solid red",
                        borderRadius: 0,
                        color: "red",
                      }}
                      onClick={() => setViewCollapse(2)}
                    >
                      Completed
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#cancel"
                      onClick={() => setViewCollapse(3)}
                    >
                      Order cancel
                    </Link>
                  </p>
                  <hr />
                  {allItem
                    ? // allItem.map((item, index) => {
                      //   if (item.status === "not yet paid") {

                      allItem.map((item, index) => {
                        if (item.status === 1) {
                          return (
                            <div
                              className="collapse multi-collapse"
                              id="completed"
                            >
                              <div className="mt-3">
                                <div className={styles["card"]}>
                                  <div className="card-body px-4 py-4">
                                    <div className={styles["product"]}>
                                      <div className="d-flex align-items-center">
                                        <img
                                          className={styles["product-img"]}
                                          src={item.image}
                                          width="60"
                                          height="60"
                                          alt="suite"
                                        />
                                        <div className={styles["brand"]}>
                                          <h5>{item.name}</h5>
                                          <p>{item.qty}</p>
                                        </div>
                                      </div>
                                      <p className={styles["price"]}>
                                        Rp {item.price * item.qty}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })
                    : null}
                </div>
              ) : viewCollapse === 3 ? (
                <div className="col-md-12" id="address">
                  <div className="col-md-12">
                    <h5 className="fw-bold">My order</h5>
                  </div>
                  <p className="mt-3">
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#allItem"
                      onClick={() => setViewCollapse(0)}
                    >
                      All items
                    </Link>
                    <Link
                      className="btn text-muted me-4 ms-3"
                      data-bs-toggle="collapse"
                      to="#notPaid"
                      onClick={() => setViewCollapse(1)}
                    >
                      Not yet paid
                    </Link>

                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#completed"
                      onClick={() => setViewCollapse(2)}
                    >
                      Completed
                    </Link>
                    <Link
                      className="btn text-danger me-4 "
                      data-bs-toggle="collapse"
                      to="#cancel"
                      style={{
                        borderBottom: "2px solid red",
                        borderRadius: 0,
                        color: "red",
                      }}
                      onClick={() => setViewCollapse(3)}
                    >
                      Order cancele
                    </Link>
                  </p>
                  <hr />
                  {allItem
                    ? // allItem.map((item, index) => {
                      //   if (item.status === "not yet paid") {

                      allItem.map((item, index) => {
                        if (item.status === 2) {
                          return (
                            <div
                              className="collapse multi-collapse"
                              id="cancel"
                            >
                              <div className="mt-3">
                                <div className={styles["card"]}>
                                  <div className="card-body px-4 py-4">
                                    <div className={styles["product"]}>
                                      <div className="d-flex align-items-center">
                                        <img
                                          className={styles["product-img"]}
                                          src={item.image}
                                          width="60"
                                          height="60"
                                          alt="suite"
                                        />
                                        <div className={styles["brand"]}>
                                          <h5>{item.name}</h5>
                                          <p>{item.qty}</p>
                                        </div>
                                      </div>
                                      <p className={styles["price"]}>
                                        Rp {item.price * item.qty}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })
                    : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProfileBuyer;
