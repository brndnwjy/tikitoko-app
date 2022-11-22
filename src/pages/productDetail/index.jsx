import React, { useRef, useState } from 'react'
import styles from "./productDetail.module.css"
import Navbar from '../../component/module/navbar'

import icStar from '../../assets/icStar.svg'
import icMinus from '../../assets/minus-icon.svg'
import icPlus from '../../assets/plus-icon.svg'
import icBigstar from '../../assets/Star.svg'
import shirtone from '../../assets/bajusatu.png'
import shirttwo from '../../assets/bajudua.png'
import shirtthree from '../../assets/baju3.png'
import shirtfour from '../../assets/baju4.png'
import shirtfive from '../../assets/baju5.png'

import CardProduct from '../../component/module/cardProduct'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./coba.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";



const ProductDetail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Navbar />
      <section className={`mt-5 ${styles.main}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5">
              <div className={`d-flex flex-row ${styles.sideInfocategory}`}>
                <p className={`me-3 ${styles.textInfocategory}`}>Home</p>
                <p className={`me-3 ${styles.textInfocategory}`}> > </p>
                <p className={`me-3 ${styles.textInfocategory}`}>Category</p>
                <p className={`me-3 ${styles.textInfocategory}`}> > </p>
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
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                <SwiperSlide>
                  <img src={shirtone} alt='gambar' />
                </SwiperSlide>
                <SwiperSlide>
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
                </SwiperSlide>
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={shirtone} alt='gambar' />
                </SwiperSlide>
                <SwiperSlide>
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
                </SwiperSlide>
              </Swiper>
            </div>
            <div className={`col-md-8 ${styles.rightsideInformation}`}>
              <p className={styles.textTitleproduct}>Baju Muslim Pria</p>
              <p className={styles.textBrandproduct}>Zalora Cloth</p>
              <div className="d-flex flex-row">
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <img src={icStar} alt="icStar" />
                <div className={`ms-2 ${styles.textStar}`}>(10)</div>
              </div>
              <p className={`mt-4 ${styles.textPrice}`}>Price</p>
              <p className={styles.textPricetag}>$ 20.0</p>
              <p className={`mt-5 ${styles.textColor}`}>Color</p>
              <div className="d-flex flex-row">
                <button className={`me-3 ${styles.colorBlack}`}> </button>
                <button className={`me-3 ${styles.colorRed}`}> </button>
                <button className={`me-3 ${styles.colorBlue}`}> </button>
                <button className={`me-3 ${styles.colorGreen}`}> </button>
              </div>
              <p className={`mt-5 ${styles.quantity}`}>Jumlah</p>
              <div className="d-flex flex-row">
                <button className={styles.icMinus}>
                  <img src={icMinus} alt="icMinus" />
                </button>
                <div className={`mx-3 mt-1 ${styles.textCount}`}>10</div>
                <button className={styles.icPlus}>
                  <img src={icPlus} alt="icPlus" />
                </button>
              </div>
              <div className="d-flex flex-row mt-5">
                <button className={` py-2 ${styles.btnChat}`}>
                  Chat
                </button>
                <button className={`mx-3 py-2 ${styles.btnaddBag}`}>
                  Add Bag
                </button>
                <button className={`py-2 ${styles.btnbuyNow}`}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className={`row py-5 ${styles.pageTwo}`}>
            <p className={styles.textTitlepagetwo}>Informasi Produk</p>
            <p className={`mt-4 ${styles.textSubtitle}`}>Condition</p>
            <p className={styles.textNew}>New</p>
            <p className={`mt-4 ${styles.textSubtitle}`}>Description</p>
            <p className={`pe-5 ${styles.textDescription}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.

              Donec non magna rutrum, pellentesque augue eu, sagittis velit. Phasellus quis laoreet dolor. Fusce nec pharetra quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent sed enim vel turpis blandit imperdiet ac ac felis. Etiam tincidunt tristique placerat. Pellentesque a consequat mauris, vel suscipit ipsum.
              Donec ac mauris vitae diam commodo vehicula. Donec quam elit, sollicitudin eu nisl at, ornare suscipit magna.

              Donec non magna rutrum, pellentesque augue eu, sagittis velit. Phasellus quis laoreet dolor. Fusce nec pharetra quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent sed enim vel turpis blandit imperdiet ac ac felis.

              In ultricies rutrum tempus. Mauris vel molestie orci.</p>

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
                  <img src={icStar} alt="icStar" style={{ height: '20px' }} />
                  <p className={styles.textRating}>5</p>
                  <div className={`mx-3 mt-2 ${styles.linered}`}></div>
                  <p className={styles.textRating}>4</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: '20px' }} />
                  <p className={styles.textRating}>4</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRating}>0</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: '20px' }} />
                  <p className={styles.textRating}>3</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRating}>0</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: '20px' }} />
                  <p className={styles.textRating}>2</p>
                  <div className={`mx-3 mt-2 ${styles.linewhite}`}></div>
                  <p className={styles.textRating}>0</p>
                </div>
                <div className="d-flex flex-row">
                  <img src={icStar} alt="icStar" style={{ height: '20px' }} />
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
            <p className={styles.Subtitlepagethree}>You’ve never seen it before!</p>
            <div className="row row-cols-1 row-cols-md-5 gx-0 gy-4">
              <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetail