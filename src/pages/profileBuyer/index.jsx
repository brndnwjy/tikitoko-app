import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./profilebuyer.module.css";
import pencil from "../../assets/pencil-icon.svg";
import user from "../../assets/user-icon.svg";
import location from "../../assets/location-icon.svg";
import order from "../../assets/order-icon.svg";
import Navbar from "../../component/module/navbar";
import axios from "axios";
import Card from "../../component/module/card";
import { useDispatch} from "react-redux";
import { updateBuyer } from "../../redux/action/user.action";
import {
  insertAddress,
  deletedAddress,
  updatedAddress,
} from "../../redux/action/address.action";

const ProfileBuyer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccessGet = (data) => {};
  const [allItem, setAllItem] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:4000/v1/order`, {
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

  const data = JSON.parse(localStorage.getItem("data"));
  const buyer_id = data.buyer_id;

  const [dateBirth, setDateBirth] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/v1/buyer/${buyer_id}`)
      .then((res) => {
        setUsers(res.data.data);
        convertDateBirthday(res.data.data.birthdate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  // const handleUpdate = (e) => {
  //   const data = JSON.parse(localStorage.getItem("data"));
  //   const buyer_id = data.buyer_id;
  //   e.preventDefault();
  //   let formData = new FormData(e.target);
  //   formData.append("buyer_id", buyer_id);
  //   axios
  //     .put(
  //       `${process.env.REACT_APP_BACKEND_URL}/v1/buyer/${buyer_id}`,
  //       formData
  //     )
  //     .then((res) => {
  //       alert("Update Success");
  //     })
  //     .catch((err) => {
  //       alert("Update Failed");
  //     });
  // };
  const handleSuccess = (data) => {
    console.log(data);
    alert("Update Success");
  };
  const handleUpdate = (e) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const buyer_id = data.buyer_id;
    e.preventDefault();
    let formData = new FormData(e.target);
    dispatch(updateBuyer(buyer_id, formData, handleSuccess));
  };

  // const deleteUser = (e) => {
  //   e.preventDefault();
  //   axios
  //   .delete(`${process.env.REACT_APP_BACKEND_URL}/user/delete/${buyer_id}`)
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/v1/address`, {
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

  const handleSuccessInsert = (data) => {
    alert("Insert Success");
  }
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
      // axios
      //   .post(`${process.env.REACT_APP_BACKEND_URL}/v1/address`, body, {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   })
      //   .then((res) => {
      //     setAddressForm(res.data.data);
      //     alert("Add Address Success");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     alert("Add Address Failed");
      //   });
      dispatch(insertAddress(body, handleSuccessInsert));
    }
  };

  const handleSuccessDelete = (data) => {
    console.log(data);
    alert("Delete Success");
  };
  const deleteAddress = (address_id) => {
    // axios
    //   .delete(`${process.env.REACT_APP_BACKEND_URL}/v1/address/${address_id}`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   })
    //   .then((res) => {
    //     setAddressForm(res.data.data);
    //     alert("Delete Address Success");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert("Delete Address Failed");
    //   });
    dispatch(deletedAddress(address_id, handleSuccessDelete));
  };

  const prepareDataAddress = (address_id) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/v1/address/${address_id}`, {
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
    dispatch(
      updatedAddress(editAddress.address_id, editAddress, handleSuccess)
    );
    // axios
    //   .put(
    //     `${process.env.REACT_APP_BACKEND_URL}/v1/address/${editAddress.address_id}`,
    //     editAddress,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setAddressForm(res.data.data);
    //     alert("Update Address Success");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert("Update Address Failed");
    //   });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
                                  defaultChecked={users?.gender == 1}
                                />{" "}
                                Pria
                              </p>
                              <p className="mx-2 text-muted">
                                <input
                                  type="radio"
                                  name="gender"
                                  value={2}
                                  defaultChecked={users?.gender == 2}
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
                      to="#packed"
                      onClick={() => setViewCollapse(2)}
                    >
                      Packed
                    </Link>
                    <Link
                      className="btn text-muted me-4 ms-4"
                      data-bs-toggle="collapse"
                      to="#sent"
                      onClick={() => setViewCollapse(3)}
                    >
                      Sent
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#completed"
                      onClick={() => setViewCollapse(4)}
                    >
                      Completed
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#cancel"
                      onClick={() => setViewCollapse(5)}
                    >
                      Order cancel
                    </Link>
                  </p>
                  <hr />
                  {allItem
                    ? allItem.map((item, index) => {
                        return (
                          <Card
                            title={item.name}
                            storetitle={item.seller_name}
                            image={item.image}
                            price={item.price * item.qty}
                            qty={item.qty}
                          />
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
                        color: "red",
                      }}
                      onClick={() => setViewCollapse(1)}
                    >
                      Not yet paid
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#packed"
                      onClick={() => setViewCollapse(2)}
                    >
                      Packed
                    </Link>
                    <Link
                      className="btn text-muted me-4 ms-4"
                      data-bs-toggle="collapse"
                      to="#sent"
                      onClick={() => setViewCollapse(3)}
                    >
                      Sent
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#completed"
                      onClick={() => setViewCollapse(4)}
                    >
                      Completed
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#cancel"
                      onClick={() => setViewCollapse(5)}
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
                              <Card
                                title={item.name}
                                storetitle={item.seller_name}
                                image={item.image}
                                price={item.price * item.qty}
                                qty={item.qty}
                              />
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
                      to="#packed"
                      style={{
                        borderBottom: "2px solid red",
                        color: "red",
                      }}
                      onClick={() => setViewCollapse(2)}
                    >
                      Packed
                    </Link>
                    <Link
                      className="btn text-muted me-4 ms-4"
                      data-bs-toggle="collapse"
                      to="#sent"
                      onClick={() => setViewCollapse(3)}
                    >
                      Sent
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#completed"
                      onClick={() => setViewCollapse(4)}
                    >
                      Completed
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#cancel"
                      onClick={() => setViewCollapse(5)}
                    >
                      Order cancel
                    </Link>
                  </p>
                  <hr />
                  <div className="collapse multi-collapse" id="packed">
                    <div className="container mt-5">
                      <div className={styles["card"]}>
                        <div className="card-body px-4 py-4">
                          <div className={styles["product"]}>
                            <div className="d-flex align-items-center">
                              <img
                                className={styles["product-img"]}
                                src={require("../../assets/Mask Group.png")}
                                alt="suite"
                              />
                              <div className={styles["brand"]}>
                                <h5>Men's formal suit - Black</h5>
                                <p>Zalora</p>
                              </div>
                            </div>
                            <p className={styles["price"]}>$ 20.0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                      to="#packed"
                      onClick={() => setViewCollapse(2)}
                    >
                      Packed
                    </Link>
                    <Link
                      className="btn text-danger me-4 ms-4"
                      data-bs-toggle="collapse"
                      to="#sent"
                      style={{
                        borderBottom: "2px solid red",
                        color: "red",
                      }}
                      onClick={() => setViewCollapse(3)}
                    >
                      Sent
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#completed"
                      onClick={() => setViewCollapse(4)}
                    >
                      Completed
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#cancel"
                      onClick={() => setViewCollapse(5)}
                    >
                      Order cancel
                    </Link>
                  </p>
                  <hr />
                  <div className="collapse multi-collapse" id="sent">
                    <div className="container mt-5">
                      <div className={styles["card"]}>
                        <div className="card-body px-4 py-4">
                          <div className={styles["product"]}>
                            <div className="d-flex align-items-center">
                              <img
                                className={styles["product-img"]}
                                src={require("../../assets/Mask Group.png")}
                                alt="suite"
                              />
                              <div className={styles["brand"]}>
                                <h5>Men's formal suit - Black</h5>
                                <p>Zalora</p>
                              </div>
                            </div>
                            <p className={styles["price"]}>$ 20.0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : viewCollapse === 4 ? (
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
                      to="#packed"
                      onClick={() => setViewCollapse(2)}
                    >
                      Packed
                    </Link>
                    <Link
                      className="btn text-muted me-4 ms-4"
                      data-bs-toggle="collapse"
                      to="#sent"
                      onClick={() => setViewCollapse(3)}
                    >
                      Sent
                    </Link>
                    <Link
                      className="btn text-danger me-4 "
                      data-bs-toggle="collapse"
                      to="#completed"
                      style={{
                        borderBottom: "2px solid red",
                        color: "red",
                      }}
                      onClick={() => setViewCollapse(4)}
                    >
                      Completed
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#cancel"
                      onClick={() => setViewCollapse(5)}
                    >
                      Order cancel
                    </Link>
                  </p>
                  <hr />
                  {allItem
                    ? allItem.map((item, index) => {
                        if (item.status === 1) {
                          return (
                            <div
                              className="collapse multi-collapse"
                              id="completed"
                            >
                              <Card
                                title={item.name}
                                storetitle={item.seller_name}
                                image={item.image}
                                price={item.price * item.qty}
                                qty={item.qty}
                              />
                            </div>
                          );
                        }
                      })
                    : null}
                </div>
              ) : viewCollapse === 5 ? (
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
                      to="#packed"
                      onClick={() => setViewCollapse(2)}
                    >
                      Packed
                    </Link>
                    <Link
                      className="btn text-muted me-4 ms-4"
                      data-bs-toggle="collapse"
                      to="#sent"
                      onClick={() => setViewCollapse(3)}
                    >
                      Sent
                    </Link>
                    <Link
                      className="btn text-muted me-4 "
                      data-bs-toggle="collapse"
                      to="#completed"
                      onClick={() => setViewCollapse(4)}
                    >
                      Completed
                    </Link>
                    <Link
                      className="btn text-danger me-4 "
                      data-bs-toggle="collapse"
                      to="#cancel"
                      style={{
                        borderBottom: "2px solid red",
                        color: "red",
                      }}
                      onClick={() => setViewCollapse(5)}
                    >
                      Order cancel
                    </Link>
                  </p>
                  <hr />
                  <div className="collapse multi-collapse" id="cancel">
                    <div className="container mt-5">
                      <div className={styles["card"]}>
                        <div className="card-body px-4 py-4">
                          <div className={styles["product"]}>
                            <div className="d-flex align-items-center">
                              <img
                                className={styles["product-img"]}
                                src={require("../../assets/Mask Group.png")}
                                alt="suite"
                              />
                              <div className={styles["brand"]}>
                                <h5>Men's formal suit - Black</h5>
                                <p>Zalora</p>
                              </div>
                            </div>
                            <p className={styles["price"]}>$ 20.0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
