import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";

import mensuit from "../../assets/mensuit.png";
import icStar from "../../assets/icStar.svg";
import icCardTshirt from "../../assets/icCatTshirt.svg";
import icCardShorts from "../../assets/icCardShorts.svg";
import icCardJacket from "../../assets/icCardJacket.svg";
import icCardPants from "../../assets/icCardPants.svg";
import icCardShoes from "../../assets/icCardShoes.svg";
import icCardpromo1 from "../../assets/promoone.png";
import icCardpromo2 from "../../assets/promotwo.png";

import CardProduct from "../../component/module/cardProduct";
import Navbar from "../../component/module/navbar";
import NavbarLogin from "../../component/module/navbarLogin";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./test.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import axios from "axios";
// import { isHtmlElement } from "react-router-dom/dist/dom";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      return navigate(`/search?q=${search}`);
    }
  };

  // const [query, setQuery] = useState();

  // const handleSearch = (e) => {
  //   // e.preventDefault()
  //   if(e.key === "Enter"){
  //     if(query !== null){
  //       return navigate(`/search?search=${query}`)
  //     }alert('please input any character')
  //   }
  // }

  useEffect(() => {
    axios
      .get(`http://localhost:4000/v1/product`)
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
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
        setData(response.data.data);
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
      {localStorage.token ? <NavbarLogin /> : <Navbar tergetClick={(e) => setSearch(e.target.value)} searchData={handleSearch} />}

      {/* <!-- Modal --> */}
      {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Filter</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
              <button type="button" className="btn btn-primary">Apply</button>
            </div>
          </div>
        </div>
      </div> */}
      <section className={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 g-0">
              <div className={`d-flex flex-row py-5 ${styles.topSwiper}`}>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={20}
                  slidesPerGroup={1}
                  loop={true}
                  loopFillGroupWithBlank={true}
                  pagination={{
                    clickable: true,
                    // margin: "1500px",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    {" "}
                    <Link to={`/category`}>
                      {" "}
                      <img src={icCardpromo1} alt="icCard" />{" "}
                    </Link>{" "}
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <Link to={`/category`}>
                      {" "}
                      <img src={icCardpromo2} alt="icCard" />{" "}
                    </Link>{" "}
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <Link to={`/category`}>
                      {" "}
                      <img src={icCardpromo1} alt="icCard" />{" "}
                    </Link>{" "}
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <Link to={`/category`}>
                      {" "}
                      <img src={icCardpromo2} alt="icCard" />{" "}
                    </Link>{" "}
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <Link to={`/category`}>
                      {" "}
                      <img src={icCardpromo1} alt="icCard" />{" "}
                    </Link>{" "}
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <Link to={`/category`}>
                      {" "}
                      <img src={icCardpromo2} alt="icCard" />{" "}
                    </Link>{" "}
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 g-0">
              <div className={`d-flex flex-column ${styles.categorySwiper}`}>
                <p className={styles.textTitlemain}> Category </p>
                <p className={styles.textSubmain}>
                  What are you currently looking for
                </p>

                <Swiper
                  slidesPerView={5}
                  spaceBetween={30}
                  slidesPerGroup={1}
                  loop={true}
                  loopFillGroupWithBlank={true}
                  pagination={{
                    clickable: true,
                    // margin: "1500px",
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  {/* {
                    data.map((item, index) => (
                      <div key={index}> */}
                  <SwiperSlide>
                    {" "}
                    <Link to={`/v1/category/1`}>
                      {" "}
                      <img src={icCardTshirt} alt="icCard" />{" "}
                    </Link>{" "}
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <Link to={`/v1/category/2`}>
                      {" "}
                      <img src={icCardShorts} alt="icCard" />{" "}
                    </Link>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <Link to={`/v1/category/3`}>
                      {" "}
                      <img src={icCardJacket} alt="icCard" />{" "}
                    </Link>{" "}
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <Link to={`/v1/category/4`}>
                      {" "}
                      <img src={icCardPants} alt="icCard" />{" "}
                    </Link>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <Link to={`/v1/category/5`}>
                      {" "}
                      <img src={icCardShoes} alt="icCard" />{" "}
                    </Link>
                  </SwiperSlide>
                  {/* </div>
                    ))
                  } */}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 g-0">
              <div className={`d-flex flex-column mt-5 ${styles.newSide}`}>
                <p className={styles.textTitlemain}> New </p>
                <p className={styles.textSubmain}>
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
                  {data.length === 0 ? (
                    <h3> Data sudah habis </h3>
                  ) : (
                    data.map((item) => (
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
              </div>
            </div>
          </div>
          <div className='row'>
            <button className="btn btn-primary my-5 col-md-2  mx-auto" onClick={() => PreviousPage()}> Prev </button>
            <button className="btn btn-primary my-5 col-md-2  mx-auto">{page}</button>
            <button className="btn btn-primary my-5 col-md-2  mx-auto" disabled={data <= 0} onClick={() => NextPage()}>Next</button>
          </div>
          <div className="row">
            <div className="col-md-12 g-0">
              <div className={`d-flex flex-column mt-5 ${styles.popularSide}`}>
                <p className={styles.textTitlemain}> Popular </p>
                <p className={styles.textSubmain}>
                  Find clothes that are trending recently
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
                  {data.length === 0 ? (
                    <h3> Data sudah habis </h3>
                  ) : (
                    data.map((item) => (
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
                  <button className="btn btn-primary my-5 col-md-2  mx-auto" disabled={data <= 0} onClick={() => NextPage()}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;