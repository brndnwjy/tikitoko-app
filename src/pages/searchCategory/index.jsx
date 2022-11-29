import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from "./searchCategory.module.css"
import mensuit from '../../assets/mensuit.png'
import icStar from '../../assets/icStar.svg'

import Navbar from '../../component/module/navbarLogin'
import CardProduct from '../../component/module/cardProduct'
import axios from 'axios'


const SearchCategory = () => {
  const [data, setData] = useState([])
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:4000/v1/product?category=${id}`)
      .then((response) => {
        console.log(response.data.data)
        setData(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <Navbar />
      <section className={`mt-5 ${styles.main}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5">
              <div className="d-flex flex-row">
                <p className={`me-3 ${styles.textInfocategory}`}>Home</p>
                <p className={`me-3 ${styles.textInfocategory}`}> > </p>
                <p className={`me-3 ${styles.textInfocategory}`}>Category</p>
                <p className={`me-3 ${styles.textInfocategory}`}> > </p>
                <p className={`me-3 ${styles.textInfocategory}`}>T-Shirt</p>
              </div>
            </div>
            {/* {JSON.stringify(data)} */}
            <p className={`mt-3 ${styles.textTitleCategory}`}> T-Shirt </p>
            <div className="row row-cols-1 row-cols-md-5 gx-0 gy-4">
              {
                data == 0 ? (<h4> Data Not Found</h4>) :
                  data.map((item, index) => (
                    <div key={index} className="col">
                      <Link to={`/v1/product/${item.product_id}`} className={styles.cstmLink}>
                        <div className="card h-100 mx-1">
                          <img src={item.image} className="card-img-top" alt="imgNew" style={{ height: "250px" }} />
                          <div className="card-body">
                            <h5 className={styles.cardTitle}>{item.name}</h5>
                            <p className={styles.textPricecard}>Rp. {item.price}</p>
                            <p className={styles.textBrand}>{item.seller_name}</p>
                            <div className="d-flex flex-row">
                              <img src={icStar} alt="icStar" />
                              <img src={icStar} alt="icStar" />
                              <img src={icStar} alt="icStar" />
                              <img src={icStar} alt="icStar" />
                              <img src={icStar} alt="icStar" />
                              <div className={`ms-2 ${styles.textStar}`}>(10)</div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                  ))
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SearchCategory