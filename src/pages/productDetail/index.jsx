import React, { useEffect, useState } from "react";
import styles from "./productDetail.module.css";
import Navbar from "../../component/module/navbar";
import NavbarLogin from "../../component/module/navbarLogin";

import icStar from "../../assets/icStar.svg";
import icMinus from "../../assets/minus-icon.svg";
import icPlus from "../../assets/plus-icon.svg";
import icBigstar from "../../assets/Star.svg";

import CardProduct from "../../component/module/cardProduct";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./coba.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [recomend, setRecomend] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();
  let [count, setCount] = useState(0);

  function incrementCount() {
    count = count + 1;
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    setCount(count);
  }
  useEffect(() => {
    axios
      .get(`http://localhost:4000/v1/product/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        // router.push('/login')
      });
  }, []);

  const [update, setUpdate] = useState({
    pid: id,
    qty: (count),
  });

  const handlePostBag = (e) => {
    e.preventDefault();
    // const data = JSON.parse(localStorage.getItem("data"))
    const token = localStorage.getItem("token");
    const form = {
      pid: id,
      qty: update.qty,
    };

    axios
      .post(`http://localhost:4000/v1/cart`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // setImage("");
        alert("Success");
        return navigate("/mybag");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/v1/product`)
      .then((response) => {
        console.log(response.data.data);
        setRecomend(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        // router.push('/login')
      });
  }, []);


  const [sort, setSort] = useState("product_id");
  const [asc, setAsc] = useState("asc");
  const [page, setPage] = useState(1);
  useEffect(() => {
    getDataProduct(sort, asc, 5, page);
  }, [sort, asc, page]);
  const getDataProduct = (sort, asc, limit, page) => {
    axios
      .get(
        `http://localhost:4000/v1/product?sortby=${sort}&order=${asc}&limit=${limit}${page ? `&page=${page}` : ""
        }`
      )
      .then((response) => {
        console.log(response.data.data);
        setRecomend(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        // router.push('/login')
      });
  };

  const handleSorting = () => {
    if (sort == "product_id") {
      setSort("name");
    } else {
      setSort("product_id");
    }
    getDataProduct(sort, asc, 5, page);
  };

  const handleSortasc = () => {
    if (asc == "asc") {
      setAsc("desc");
    } else {
      setAsc("asc");
    }
    getDataProduct(sort, asc, 5, page);
  };

  const NextPage = () => {
    setPage(page + 1);
    getDataProduct(sort, asc, 5, page);
    console.log(page);
  };
  const PreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      console.log(page);
      getDataProduct(sort, asc, 5, page - 1);
    }
  };

  
  return (
    <>
      {localStorage.token ? <NavbarLogin /> : <Navbar />}
      <section className={`mt-5 ${styles.main}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5">
              <div className={`d-flex flex-row ${styles.sideInfocategory}`}>
                <p className={`me-3 ${styles.textInfocategory}`}>Home</p>
                <p className={`me-3 ${styles.textInfocategory}`}> &gt; </p>
                <p className={`me-3 ${styles.textInfocategory}`}>Category</p>
                <p className={`me-3 ${styles.textInfocategory}`}> &gt; </p>
                <p className={`me-3 ${styles.textInfocategory}`}>T-Shirt</p>
              </div>
            </div>
          </div>
          <div className={`row ${styles.pageOne}`}>
            <div className={`col-md-4 ${styles.leftsideImage}`}>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide>
                  <img src={data.image} alt="gambar" />
                </SwiperSlide>
                {/* <SwiperSlide>
                  <img src={shirttwo} alt='gambar' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={shirtthree} alt='gambar' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={shirtfour} alt='gambar' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={shirtfive} alt='gambar' />
                </SwiperSlide> */}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={data.image} //ini 4 harusnya
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                {/* <SwiperSlide>
                  <img src={data.image} alt='gambar' />
                </SwiperSlide> */}
                {/* <SwiperSlide>
                  <img src={shirttwo} alt='gambar' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={shirtthree} alt='gambar' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={shirtfour} alt='gambar' />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={shirtfive} alt='gambar' />
                </SwiperSlide> */}
              </Swiper>
            </div>
            <div className={`col-md-8 ${styles.rightsideInformation}`}>
              <p className={styles.textTitleproduct}>{data.name}</p>
              <p className={styles.textBrandproduct}>{data.seller_name}</p>
              <div className="d-flex flex-row">
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <div className={`ms-2 ${styles.textStar}`}>(10)</div>
              </div>
              <p className={`mt-4 ${styles.textPrice}`}>Price</p>
              <p className={styles.textPricetag}>{data.price}</p>
              <p className={`mt-5 ${styles.textColor}`}>Color</p>
              <div className="d-flex flex-row">
                <button className={`me-3 ${styles.colorBlack}`}> </button>
                <button className={`me-3 ${styles.colorRed}`}> </button>
                <button className={`me-3 ${styles.colorBlue}`}> </button>
                <button className={`me-3 ${styles.colorGreen}`}> </button>
              </div>
              <p className={`mt-5 ${styles.quantity} `}>Jumlah</p>
              <div className="d-flex flex-row">
                <button className={styles.icMinus} disabled={count <= 0} onClick={decrementCount}>
                  <img src={icMinus} alt="icMinus" />
                </button>
                <div className={`mx-3 mt-1 ${styles.textCount}`}>{count}</div>
                <button className={styles.icPlus} onClick={incrementCount}>
                  <img src={icPlus} alt="icPlus" />
                </button>
              </div>
              <div className="d-flex flex-row mt-5">
                <Link to={`/chat`}>
                  <button className={` py-2 ${styles.btnChat}`}>Chat</button>
                </Link>
                <Link to={`/mybag`}>
                  <button
                    className={`mx-3 py-2 ${styles.btnaddBag}`}
                    onClick={(e) => handlePostBag(e)}
                  >
                    Add Bag
                  </button>
                </Link>
                <Link to={`/chat`}>
                  <button className={`py-2 ${styles.btnbuyNow}`}>
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className={`row py-5 ${styles.pageTwo}`}>
            <p className={styles.textTitlepagetwo}>Informasi Produk</p>
            <p className={`mt-4 ${styles.textSubtitle}`}>Condition</p>
            <p className={styles.textNew}>New</p>
            <p className={`mt-4 ${styles.textSubtitle}`}>Description</p>
            <p className={`pe-5 ${styles.textDescription}`}>
              {data.description}
            </p>
            <p className={`mt-5 ${styles.textTitlepagetwo}`}>Product Review</p>
            <div className="d-flex flex-row">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                  <p className={styles.textBigratingleft}> 5.0 </p>
                  <p className={styles.textRatingleft}> /10 </p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icBigstar} alt="icbigStar" />
                  <img src={icBigstar} alt="icbigStar" />
                  <img src={icBigstar} alt="icbigStar" />
                  <img src={icBigstar} alt="icbigStar" />
                  <img src={icBigstar} alt="icbigStar" />
                </div>
              </div>
              <div className="d-flex flex-column ms-5">
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: "20px" }} />
                  <p className={styles.textRating}>5</p>
                  <div className={`mx-3 mt-2 ${styles.linered}`}></div>
                  <p className={styles.textRating}>4</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: "20px" }} />
                  <p className={styles.textRating}>4</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRating}>0</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: "20px" }} />
                  <p className={styles.textRating}>3</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRating}>0</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: "20px" }} />
                  <p className={styles.textRating}>2</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRating}>0</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: "20px" }} />
                  <p className={styles.textRating}>1</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRatingbtm}>0</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className={`row ${styles.pageThree}`}>
            <p className={styles.Titlepagethree}>You can also like this</p>
            <p className={styles.Subtitlepagethree}>
              You’ve never seen it before!
            </p>
            <div className="dropdown mb-5">
              <button className={`btn btn-secondary dropdown-toggle ${styles.spanCostumsort}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sort
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" href="#" onClick={() => handleSortasc()}>Sortir berdasarkan{asc}</Link></li>
                <li><Link className="dropdown-item" href="#" onClick={() => handleSorting()}>Sortir berdasarkan {sort}</Link></li>
              </ul>
            </div>
            <div className="row row-cols-1 row-cols-md-5 gx-0 gy-4">
              {/* {JSON.stringify(data)} */}
              {recomend.length === 0 ? (
                <h3> Data sudah habis </h3>
              ) : (
                recomend.map((item) => (
                  <CardProduct
                    byId={`/v1/product/${item.product_id}`}
                    linkImage={item.image}
                    nameProduct={item.name}
                    priceProduct={item.price}
                    sellerProduct={item.seller}
                  />
                ))
              )}
            </div>
            <div className='row'>
              <button className="btn btn-primary my-5 col-md-2  mx-auto" onClick={() => PreviousPage()}> Prev </button>
              <button className="btn btn-primary my-5 col-md-2  mx-auto">{page}</button>
              <button className="btn btn-primary my-5 col-md-2  mx-auto" disabled={recomend <= 0} onClick={() => NextPage()}>Next</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetail;
