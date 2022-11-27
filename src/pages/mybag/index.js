import React, { useEffect } from 'react'
import styles from "./mybag.module.css"
import Navbar from '../../component/module/navbar'
import axios from 'axios';
import { useState } from 'react';
import Button from '../../component/button';

const Mybag = () => {
    const [bagState, setBagState] = useState([]);
    // const token = JSON.parse(localStorage.getItem("token"))
    const token = localStorage.getItem("token")
    const [sumarry, setSumarry] = useState([]);
    

    useEffect(() => {
        axios.get(`http://localhost:4000/v1/cart/`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then((response) => {
            console.log(response.data)
            setBagState(response.data)
        })
        .catch((err) => {
            alert("Account not found")
            console.log(err);
        })
    }, []) 

  return (
    <>
    <Navbar/>
    <div className={`${styles['main']}`}>
                <div className="container">
                    <h1 className={styles["title"]}>My Bag</h1>
                    <div className="row">
                            <div className="col-sm-7 mb-4">
                        <div className={styles["card"]}>
                                <div className="card-body px-4 py-3">
                                    <div className="flex d-flex align-items-center">
                                        <div className={styles["select"]}>
                                            <input className={styles["check"]} type="checkbox" />
                                        </div>
                                        <div className="row">
                                            <div className="flex d-flex">
                                            <div className="col-10">
                                            <h1 className={`${styles["selectall"]}`}>Select all items <span className={styles["selected"]}>(2 items selected)</span></h1>  
                                            </div>
                                             <div className="col-2 flex d-flex align-items-right">
                                             <button className={`${styles["delete"]}`}>Delete</button>
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="mt-3">
                        {
                        bagState.data ?
                        bagState.data.map((item, index) => (
                                <div className={`mb-3 ${styles["card"]}`}>
                                    <div className="card-body px-4 py-4">
                                        <div className={styles["product"]}>
                                            <div className="d-flex align-items-center">
                                                <input className={styles["check"]} type="checkbox" />
                                                <img className={styles["product-img"]} src={item.image} alt="suite" />
                                                <div className={styles["brand"]}>
                                                    <h5>{item.name}</h5>
                                                    <p>{item.seller_name}</p>
                                                </div>
                                            </div>
                                            <div className={`flex d-flex justify-content-center ${styles['count-product']}`}>
                                                <button className={styles["circle"]}>-</button>
                                                <p className={styles["sum"]}>{item.qty}</p>
                                                <button className={styles["circle"]}>+</button>
                                            </div>
                                            <p className={styles["price"]}>Rp{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                                                        )) : ""
                                                    }
                            </div>
                    </div>
                    <div className="col-sm-5 mb-4">
                        <div className={styles["card"]}>
                            <div className="card-body-right p-4">
                                <h3 className={styles["card-summary"]}>Shopping summary</h3>
                                <h5 className={styles["price"]}>Total price<span className="d-flex justify-content-end">Rp15000</span></h5>
                                <button className={`${styles['buy']}`}>Buy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
  )
}

export default Mybag