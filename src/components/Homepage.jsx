import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";


export default function HomePage() {
  return (
    
          <main className="main">
            <section className="intro-section">
                <div className="swiper-container swiper-theme nav-inner pg-inner swiper-nav-lg animation-slider pg-xxl-hide nav-xxl-show nav-hide"
                    data-swiper-options="{
                    'slidesPerView': 1,
                    'autoplay': {
                        'delay': 8000,
                        'disableOnInteraction': false
                    }
                }">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide banner banner-fixed intro-slide intro-slide1"
                            style={{backgroundImage: "url(assets/images/demos/demo1/sliders/slide-1.jpg)", backgroundColor: "#ebeef2"}}>
                            <div className="container">
                                <figure className="slide-image skrollable slide-animate">
                                    <img src="assets/images/demos/demo1/sliders/shoes.png" alt="Banner"
                                        data-bottom-top="transform: translateY(10vh);"
                                        data-top-bottom="transform: translateY(-10vh);" width="474" height="397"/>
                                </figure>
                                <div className="banner-content y-50 text-right">
                                    <h5 className="banner-subtitle font-weight-normal text-default ls-50 lh-1 mb-2 slide-animate"
                                        data-animation-options="{
                                    'name': 'fadeInRightShorter',
                                    'duration': '1s',
                                    'delay': '.2s'
                                }">
                                        Custom <span className="p-relative d-inline-block">Men’s</span>
                                    </h5>
                                    <h3 className="banner-title font-weight-bolder ls-25 lh-1 slide-animate"
                                        data-animation-options="{
                                    'name': 'fadeInRightShorter',
                                    'duration': '1s',
                                    'delay': '.4s'
                                }">
                                        RUNNING SHOES
                                    </h3>
                                    <p className="font-weight-normal text-default slide-animate" data-animation-options="{
                                    'name': 'fadeInRightShorter',
                                    'duration': '1s',
                                    'delay': '.6s'
                                }">
                                        Sale up to <span className="font-weight-bolder text-secondary">30% OFF</span>
                                    </p>

                                    <a href="shop-list.html"
                                        className="btn btn-dark btn-outline btn-rounded btn-icon-right slide-animate"
                                        data-animation-options="{
                                    'name': 'fadeInRightShorter',
                                    'duration': '1s',
                                    'delay': '.8s'
                                }">SHOP NOW<i className="w-icon-long-arrow-right"></i></a>

                                </div>
                               {/*  <!-- End of .banner-content -->*/}
                            </div>
                            {/*<!-- End of .container -->*/}
                        </div>
                        {/*<!-- End of .intro-slide1 -->*/}

                        <div className="swiper-slide banner banner-fixed intro-slide intro-slide2"
                            style={{backgroundImage: "url(assets/images/demos/demo1/sliders/slide-2.jpg)", backgroundColor: "#ebeef2"}}>
                            <div className="container">
                                <figure className="slide-image skrollable slide-animate" data-animation-options="{
                                    'name': 'fadeInUpShorter',
                                    'duration': '1s'
                                }">
                                    <img src="assets/images/demos/demo1/sliders/men.png" alt="Banner"
                                        data-bottom-top="transform: translateX(10vh);"
                                        data-top-bottom="transform: translateX(-10vh);" width="480" height="633"/>
                                </figure>
                                <div className="banner-content d-inline-block y-50">
                                    <h5 className="banner-subtitle font-weight-normal text-default ls-50 slide-animate"
                                        data-animation-options="{
                                        'name': 'fadeInUpShorter',
                                        'duration': '1s',
                                        'delay': '.2s'
                                    }">
                                        Mountain-<span className="text-secondary">Climbing</span>
                                    </h5>
                                    <h3 className="banner-title font-weight-bolder text-dark mb-0 ls-25 slide-animate"
                                        data-animation-options="{
                                        'name': 'fadeInUpShorter',
                                        'duration': '1s',
                                        'delay': '.4s'
                                    }">
                                        Hot & Packback
                                    </h3>
                                    <p className="font-weight-normal text-default slide-animate" data-animation-options="{
                                        'name': 'fadeInUpShorter',
                                        'duration': '1s',
                                        'delay': '.8s'
                                    }">
                                        Only until the end of this week.
                                    </p>
                                    <a href="shop-banner-sidebar.html"
                                        className="btn btn-dark btn-outline btn-rounded btn-icon-right slide-animate"
                                        data-animation-options="{
                                        'name': 'fadeInUpShorter',
                                        'duration': '1s',
                                        'delay': '1s'
                                    }">
                                        SHOP NOW<i className="w-icon-long-arrow-right"></i>
                                    </a>
                                </div>
                               { /* <!-- End of .banner-content --> */ }
                            </div>
                            {/* <!-- End of .container --> */ }
                        </div>
                        {/* <!-- End of .intro-slide2 --> */ }

                        <div className="swiper-slide banner banner-fixed intro-slide intro-slide3"
                            style={{backgroundImage: "url(assets/images/demos/demo1/sliders/slide-3.jpg)", backgroundColor: "#f0f1f2"}}>
                            <div className="container">
                                <figure className="slide-image skrollable slide-animate" data-animation-options="{
                                    'name': 'fadeInDownShorter',
                                    'duration': '1s'
                                }">
                                    <img src="assets/images/demos/demo1/sliders/skate.png" alt="Banner"
                                        data-bottom-top="transform: translateY(10vh);"
                                        data-top-bottom="transform: translateY(-10vh);" width={310} height={444}/>
                                </figure>
                                <div className="banner-content text-right y-50">
                                    <p className="font-weight-normal text-default text-uppercase mb-0 slide-animate"
                                        data-animation-options="{
                                        'name': 'fadeInLeftShorter',
                                        'duration': '1s',
                                        'delay': '.6s'
                                    }">
                                        Top weekly Seller
                                    </p>
                                    <h5 className="banner-subtitle font-weight-normal text-default ls-25 slide-animate"
                                        data-animation-options="{
                                        'name': 'fadeInLeftShorter',
                                        'duration': '1s',
                                        'delay': '.4s'
                                    }">
                                        Trending Collection
                                    </h5>
                                    <h3 className="banner-title p-relative font-weight-bolder ls-50 slide-animate"
                                        data-animation-options="{
                                        'name': 'fadeInLeftShorter',
                                        'duration': '1s',
                                        'delay': '.2s'
                                    }"><span className="text-white mr-4">Roller</span>-skate
                                    </h3>
                                    <div className="btn-group slide-animate" data-animation-options="{
                                        'name': 'fadeInLeftShorter',
                                        'duration': '1s',
                                        'delay': '.8s'
                                    }">
                                        <a href="shop-list.html"
                                            className="btn btn-dark btn-outline btn-rounded btn-icon-right">SHOP
                                            NOW<i className="w-icon-long-arrow-right"></i></a>
                                    </div>
                                    {/* <!-- End of .banner-content --> */}
                                </div>
                                {/* <!-- End of .container --> */}
                            </div>
                        </div>
                        {/* <!-- End of .intro-slide3 --> */}
                    </div>
                    <div className="swiper-pagination"></div>
                    <button className="swiper-button-next"></button>
                    <button className="swiper-button-prev"></button>
                </div>
                {/* <!-- End of .swiper-container --> */}
            </section>
            {/* <!-- End of .intro-section --> */}

            <div className="container">
                <div className="swiper-container appear-animate icon-box-wrapper br-sm mt-6 mb-6" data-swiper-options="{
                    'slidesPerView': 1,
                    'loop': false,
                    'breakpoints': {
                        '576': {
                            'slidesPerView': 2
                        },
                        '768': {
                            'slidesPerView': 3
                        },
                        '1200': {
                            'slidesPerView': 4
                        }
                    }
                }">
                    <div className="swiper-wrapper row cols-md-4 cols-sm-3 cols-1">
                        <div className="swiper-slide icon-box icon-box-side icon-box-primary">
                            <span className="icon-box-icon icon-shipping">
                                <i className="w-icon-truck"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title font-weight-bold mb-1">Free Shipping & Returns</h4>
                                <p className="text-default">For all orders over $99</p>
                            </div>
                        </div>
                        <div className="swiper-slide icon-box icon-box-side icon-box-primary">
                            <span className="icon-box-icon icon-payment">
                                <i className="w-icon-bag"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title font-weight-bold mb-1">Secure Payment</h4>
                                <p className="text-default">We ensure secure payment</p>
                            </div>
                        </div>
                        <div className="swiper-slide icon-box icon-box-side icon-box-primary icon-box-money">
                            <span className="icon-box-icon icon-money">
                                <i className="w-icon-money"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title font-weight-bold mb-1">Money Back Guarantee</h4>
                                <p className="text-default">Any back within 30 days</p>
                            </div>
                        </div>
                        <div className="swiper-slide icon-box icon-box-side icon-box-primary icon-box-chat">
                            <span className="icon-box-icon icon-chat">
                                <i className="w-icon-chat"></i>
                            </span>
                            <div className="icon-box-content">
                                <h4 className="icon-box-title font-weight-bold mb-1">Customer Support</h4>
                                <p className="text-default">Call or email us 24/7</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of Iocn Box Wrapper */}

                <div className="row category-banner-wrapper appear-animate pt-6 pb-8">
                    <div className="col-md-6 mb-4">
                        <div className="banner banner-fixed br-xs">
                            <figure>
                                <img src="assets/images/demos/demo1/categories/1-1.jpg" alt="Category Banner"
                                    width={610} height={160} style={{ backgroundColor: "#ecedec" }} />
                            </figure>
                            <div className="banner-content y-50 mt-0">
                                <h5 className="banner-subtitle font-weight-normal text-dark">Get up to <span
                                        className="text-secondary font-weight-bolder text-uppercase ls-25">20% Off</span>
                                </h5>
                                <h3 className="banner-title text-uppercase">Sports Outfits<br/><span
                                        className="font-weight-normal                       text-capitalize">Collection</span>
                                </h3>
                                <div className="banner-price-info font-weight-normal">Starting at <span
                                        className="text-secondary                       font-weight-bolder">$170.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="banner banner-fixed br-xs">
                            <figure>
                                <img src="assets/images/demos/demo1/categories/1-2.jpg" alt="Category Banner"
                                    width={610} height={160} style={{ backgroundColor: "#636363" }} />
                            </figure>
                            <div className="banner-content y-50 mt-0">
                                <h5 className="banner-subtitle font-weight-normal text-capitalize">New Arrivals</h5>
                                <h3 className="banner-title text-white text-uppercase">Accessories<br/><span
                                        className="font-weight-normal text-capitalize">Collection</span></h3>
                                <div className="banner-price-info text-white font-weight-normal text-capitalize">Only From
                                    <span className="text-secondary font-weight-bolder">$90.00</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of Category Banner Wrapper */}

                <div className="row deals-wrapper appear-animate mb-8">
                    <div className="col-lg-9 mb-4">
                        <div className="single-product h-100 br-sm">
                            <h4 className="title-sm title-underline font-weight-bolder ls-normal">
                                Deals Hot of The Day
                            </h4>
                            <div className="swiper">
                                <div className="swiper-container swiper-theme nav-top swiper-nav-lg" data-swiper-options="{
                                    'spaceBetween': 20,
                                    'slidesPerView': 1
                                }">
                                    <div className="swiper-wrapper row cols-1 gutter-no">
                                        <div className="swiper-slide">
                                            <div className="product product-single row">
                                                <div className="col-md-6">
                                                    <div className="product-gallery product-gallery-sticky product-gallery-vertical">
                                                        <div className="swiper-container product-single-swiper swiper-theme nav-inner">
                                                            <div className="swiper-wrapper row cols-1 gutter-no">
                                                                <div className="swiper-slide">
                                                                    <figure className="product-image">
                                                                        <img src="assets/images/demos/demo1/products/1-1-600x675.jpg"
                                                                            data-zoom-image="assets/images/demos/demo1/products/1-1-800x900.jpg"
                                                                            alt="Product Image" width={800}
                                                                            height={900}/>
                                                                    </figure>
                                                                </div>
                                                                <div className="swiper-slide">
                                                                    <figure className="product-image">
                                                                        <img src="assets/images/demos/demo1/products/1-2-600x675.jpg"
                                                                            data-zoom-image="assets/images/demos/demo1/products/1-2-800x900.jpg"
                                                                            alt="Product Image" width={800}
                                                                            height={900}/>
                                                                    </figure>
                                                                </div>
                                                                <div className="swiper-slide">
                                                                    <figure className="product-image">
                                                                        <img src="assets/images/demos/demo1/products/1-3-600x675.jpg"
                                                                            data-zoom-image="assets/images/demos/demo1/products/1-3-800x900.jpg"
                                                                            alt="Product Image" width={800}
                                                                            height={900}/>
                                                                    </figure>
                                                                </div>
                                                                <div className="swiper-slide">
                                                                    <figure className="product-image">
                                                                        <img src="assets/images/demos/demo1/products/1-4-600x675.jpg"
                                                                            data-zoom-image="assets/images/demos/demo1/products/1-4-800x900.jpg"
                                                                            alt="Product Image" width={800}
                                                                            height={900}/>
                                                                    </figure>
                                                                </div>
                                                            </div>
                                                            <button className="swiper-button-next"></button>
                                                            <button className="swiper-button-prev"></button>
                                                            <div className="product-label-group">
                                                                <label className="product-label label-discount">25%
                                                                    Off</label>
                                                            </div>
                                                        </div>
                                                        <div className="product-thumbs-wrap swiper-container"
                                                            data-swiper-options="{
                                                            'direction': 'vertical',
                                                            'breakpoints': {
                                                                '0': {
                                                                    'direction': 'horizontal',
                                                                    'slidesPerView': 4
                                                                },
                                                                '992': {
                                                                    'direction': 'vertical',
                                                                    'slidesPerView': 'auto'
                                                                }
                                                            }
                                                        }">
                                                            <div className="product-thumbs swiper-wrapper row cols-lg-1 cols-4 gutter-sm">
                                                                <div className="product-thumb swiper-slide">
                                                                    <img src="assets/images/demos/demo1/products/1-1-600x675.jpg"
                                                                        alt="Product thumb" width={60} height={68} />
                                                                </div>
                                                                <div className="product-thumb swiper-slide">
                                                                    <img src="assets/images/demos/demo1/products/1-2-600x675.jpg"
                                                                        alt="Product thumb" width={60} height={68} />
                                                                </div>
                                                                <div className="product-thumb swiper-slide">
                                                                    <img src="assets/images/demos/demo1/products/1-3-600x675.jpg"
                                                                        alt="Product thumb" width={60} height={68} />
                                                                </div>
                                                                <div className="product-thumb swiper-slide">
                                                                    <img src="assets/images/demos/demo1/products/1-4-600x675.jpg"
                                                                        alt="Product thumb" width={60} height={68} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="product-details scrollable">
                                                        <h2 className="product-title mb-1"><a
                                                                href="product-default.html">Coat Pool
                                                                Comfort Jacket</a></h2>

                                                        <hr className="product-divider"/>

                                                        <div className="product-price"><ins className="new-price ls-50">$150.00
                                                                -
                                                                $180.00</ins></div>

                                                        <div className="product-countdown-container flex-wrap">
                                                            <label className="mr-2 text-default">Offer Ends In:</label>
                                                            <div className="product-countdown countdown-compact"
                                                                data-until="2022, 12, 31" data-compact="true">
                                                                629 days, 11: 59: 52</div>
                                                        </div>

                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{width: "80%"}}></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                            <a href="#" className="rating-reviews">(3 Reviews)</a>
                                                        </div>

                                                        <div
                                                            className="product-form product-variation-form product-size-swatch mb-3">
                                                            <label className="mb-1">Size:</label>
                                                            <div
                                                                className="flex-wrap d-flex align-items-center product-variations">
                                                                <a href="#" className="size">Extra Large</a>
                                                                <a href="#" className="size">Large</a>
                                                                <a href="#" className="size">Medium</a>
                                                                <a href="#" className="size">Small</a>
                                                            </div>
                                                            <a href="#" className="product-variation-clean">Clean All</a>
                                                        </div>

                                                        <div className="product-variation-price">
                                                            <span></span>
                                                        </div>

                                                        <div className="product-form pt-4">
                                                            <div className="product-qty-form mb-2 mr-2">
                                                                <div className="input-group">
                                                                    <input className="quantity form-control" type="number"
                                                                        min="1" max="10000000"/>
                                                                    <button className="quantity-plus w-icon-plus"></button>
                                                                    <button
                                                                        className="quantity-minus w-icon-minus"></button>
                                                                </div>
                                                            </div>
                                                            <button className="btn btn-primary btn-cart">
                                                                <i className="w-icon-cart"></i>
                                                                <span>Add to Cart</span>
                                                            </button>
                                                        </div>

                                                        <div className="social-links-wrapper mt-1">
                                                            <div className="social-links">
                                                                <div className="social-icons social-no-color border-thin">
                                                                    <a href="#"
                                                                        className="social-icon social-facebook w-icon-facebook"></a>
                                                                    <a href="#"
                                                                        className="social-icon social-twitter w-icon-twitter"></a>
                                                                    <a href="#"
                                                                        className="social-icon social-pinterest fab fa-pinterest-p"></a>
                                                                    <a href="#"
                                                                        className="social-icon social-whatsapp fab fa-whatsapp"></a>
                                                                    <a href="#"
                                                                        className="social-icon social-youtube fab fa-linkedin-in"></a>
                                                                </div>
                                                            </div>
                                                            <span className="divider d-xs-show"></span>
                                                            <div className="product-link-wrapper d-flex">
                                                                <a href="#"
                                                                    className="btn-product-icon btn-wishlist w-icon-heart"></a>
                                                                <a href="#"
                                                                    className="btn-product-icon btn-compare btn-icon-left w-icon-compare"></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="product product-single row">
                                                <div className="col-md-6">
                                                    <div
                                                        className="product-gallery product-gallery-sticky product-gallery-vertical">
                                                        <div
                                                            className="swiper-container product-single-swiper swiper-theme nav-inner">
                                                            <div className="swiper-wrapper row cols-1 gutter-no">
                                                                <div className="swiper-slide">
                                                                    <figure className="product-image">
                                                                        <img src="assets/images/demos/demo1/products/2-1-600x675.jpg"
                                                                            data-zoom-image="assets/images/demos/demo1/products/2-1-800x900.jpg"
                                                                            alt="Product Image" width={800}
                                                                            height={900} />
                                                                    </figure>
                                                                </div>
                                                                <div className="swiper-slide">
                                                                    <figure className="product-image">
                                                                        <img src="assets/images/demos/demo1/products/2-2-600x675.jpg"
                                                                            data-zoom-image="assets/images/demos/demo1/products/2-2-800x900.jpg"
                                                                            alt="Product Image" width={800}
                                                                            height={900} />
                                                                    </figure>
                                                                </div>
                                                                <div className="swiper-slide">
                                                                    <figure className="product-image">
                                                                        <img src="assets/images/demos/demo1/products/2-3-600x675.jpg"
                                                                            data-zoom-image="assets/images/demos/demo1/products/2-3-800x900.jpg"
                                                                            alt="Product Image" width={800}
                                                                            height={900} />
                                                                    </figure>
                                                                </div>
                                                                <div className="swiper-slide">
                                                                    <figure className="product-image">
                                                                        <img src="assets/images/demos/demo1/products/2-4-600x675.jpg"
                                                                            data-zoom-image="assets/images/demos/demo1/products/2-4-800x900.jpg"
                                                                            alt="Product Image" width={800}
                                                                            height={900} />
                                                                    </figure>
                                                                </div>
                                                            </div>
                                                            <button className="swiper-button-next"></button>
                                                            <button className="swiper-button-prev"></button>
                                                            <div className="product-label-group">
                                                                <label className="product-label label-discount">25%
                                                                    Off</label>
                                                            </div>
                                                        </div>
                                                        <div className="product-thumbs-wrap swiper-container"
                                                            data-swiper-options="{
                                                            'breakpoints': {
                                                                '992': {
                                                                    'direction': 'vertical',
                                                                    'slidesPerView': 'auto'
                                                                }
                                                            }
                                                        }">
                                                            <div
                                                                className="product-thumbs swiper-wrapper row cols-lg-1 cols-4 gutter-sm">
                                                                <div className="product-thumb swiper-slide">
                                                                    <img src="assets/images/demos/demo1/products/2-1-600x675.jpg"
                                                                        alt="Product thumb" width={60} height={68} />
                                                                </div>
                                                                <div className="product-thumb swiper-slide">
                                                                    <img src="assets/images/demos/demo1/products/2-2-600x675.jpg"
                                                                        alt="Product thumb" width={60} height={68} />
                                                                </div>
                                                                <div className="product-thumb swiper-slide">
                                                                    <img src="assets/images/demos/demo1/products/2-3-600x675.jpg"
                                                                        alt="Product thumb" width={60} height={68} />
                                                                </div>
                                                                <div className="product-thumb swiper-slide">
                                                                    <img src="assets/images/demos/demo1/products/2-4-600x675.jpg"
                                                                        alt="Product thumb" width={60} height={68} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="product-details scrollable">
                                                        <h2 className="product-title mb-1"><a
                                                                href="product-default.html">Coat Pool
                                                                Comfort Jacket</a></h2>

                                                        <hr className="product-divider"/>

                                                        <div className="product-price"><ins className="new-price ls-50">$150.00
                                                                -
                                                                $180.00</ins></div>

                                                        <div className="product-countdown-container flex-wrap">
                                                            <label className="mr-2 text-default">Offer Ends In:</label>
                                                            <div className="product-countdown countdown-compact"
                                                                data-until="2022, 12, 31" data-compact="true">
                                                                629 days, 11: 59: 52</div>
                                                        </div>

                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{width: "80%"}}></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                            <a href="#" className="rating-reviews">(3 Reviews)</a>
                                                        </div>

                                                        <div
                                                            className="product-form product-variation-form product-size-swatch mb-3">
                                                            <label className="mb-1">Size:</label>
                                                            <div
                                                                className="flex-wrap d-flex align-items-center product-variations">
                                                                <a href="#" className="size">Extra Large</a>
                                                                <a href="#" className="size">Large</a>
                                                                <a href="#" className="size">Medium</a>
                                                                <a href="#" className="size">Small</a>
                                                            </div>
                                                            <a href="#" className="product-variation-clean">Clean All</a>
                                                        </div>

                                                        <div className="product-variation-price">
                                                            <span></span>
                                                        </div>

                                                        <div className="product-form pt-4">
                                                            <div className="product-qty-form mb-2 mr-2">
                                                                <div className="input-group">
                                                                    <input className="quantity form-control" type="number"
                                                                        min="1" max="10000000"/>
                                                                    <button className="quantity-plus w-icon-plus"></button>
                                                                    <button
                                                                        className="quantity-minus w-icon-minus"></button>
                                                                </div>
                                                            </div>
                                                            <button className="btn btn-primary btn-cart">
                                                                <i className="w-icon-cart"></i>
                                                                <span>Add to Cart</span>
                                                            </button>
                                                        </div>

                                                        <div className="social-links-wrapper mt-1">
                                                            <div className="social-links">
                                                                <div className="social-icons social-no-color border-thin">
                                                                    <a href="#"
                                                                        className="social-icon social-facebook w-icon-facebook"></a>
                                                                    <a href="#"
                                                                        className="social-icon social-twitter w-icon-twitter"></a>
                                                                    <a href="#"
                                                                        className="social-icon social-pinterest fab fa-pinterest-p"></a>
                                                                    <a href="#"
                                                                        className="social-icon social-whatsapp fab fa-whatsapp"></a>
                                                                    <a href="#"
                                                                        className="social-icon social-youtube fab fa-linkedin-in"></a>
                                                                </div>
                                                            </div>
                                                            <span className="divider d-xs-show"></span>
                                                            <div className="product-link-wrapper d-flex">
                                                                <a href="#"
                                                                    className="btn-product-icon btn-wishlist w-icon-heart"></a>
                                                                <a href="#"
                                                                    className="btn-product-icon btn-compare btn-icon-left w-icon-compare"></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="swiper-button-prev"></button>
                                    <button className="swiper-button-next"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-4">
                        <div className="widget widget-products widget-products-bordered h-100">
                            <div className="widget-body br-sm h-100">
                                <h4 className="title-sm title-underline font-weight-bolder ls-normal mb-2">Top 20 Best
                                    Seller</h4>
                                <div className="swiper">
                                    <div className="swiper-container swiper-theme nav-top" data-swiper-options="{
                                        'slidesPerView': 1,
                                        'spaceBetween': 20,
                                        'breakpoints': {
                                            '576': {
                                                'slidesPerView': 2
                                            },
                                            '768': {
                                                'slidesPerView': 3
                                            },
                                            '992': {
                                                'slidesPerView': 1
                                            }
                                        }
                                    }">
                                        <div className="swiper-wrapper row cols-lg-1 cols-md-3">
                                            <div className="swiper-slide product-widget-wrap">
                                                <div className="product product-widget bb-no">
                                                    <figure className="product-media">
                                                        <a href="product-default.html">
                                                            <img src="assets/images/demos/demo1/products/2-1.jpg"
                                                                alt="Product" width={105} height={118} />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <a href="product-default.html">Kitchen Cooker</a>
                                                        </h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{width: "60%"}}></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="product-price">
                                                            <ins className="new-price">$150.60</ins>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product product-widget bb-no">
                                                    <figure className="product-media">
                                                        <a href="product-default.html">
                                                            <img src="assets/images/demos/demo1/products/2-2.jpg"
                                                                alt="Product" width={105} height={118} />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <a href="product-default.html">Professional Pixel Camera</a>
                                                        </h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{width: "60%"}}></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="product-price">
                                                            <ins className="new-price">$215.68</ins><del
                                                                className="old-price">$230.45</del>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product product-widget">
                                                    <figure className="product-media">
                                                        <a href="product-default.html">
                                                            <img src="assets/images/demos/demo1/products/2-3.jpg"
                                                                alt="Product" width={105} height={118} />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <a href="product-default.html">Sport Women’s Wear</a>
                                                        </h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{width: "60%"}}></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="product-price">
                                                            <ins className="new-price">$220.20</ins><del
                                                                className="old-price">$300.62</del>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide product-widget-wrap">
                                                <div className="product product-widget bb-no">
                                                    <figure className="product-media">
                                                        <a href="product-default.html">
                                                            <img src="assets/images/demos/demo1/products/2-4.jpg"
                                                                alt="Product" width={105} height={118} />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <a href="product-default.html">Latest Speaker</a>
                                                        </h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{ width: '60%' }}  ></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="product-price">
                                                            <ins className="new-price">$250.68</ins>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product product-widget bb-no">
                                                    <figure className="product-media">
                                                        <a href="product-default.html">
                                                            <img src="assets/images/demos/demo1/products/2-5.jpg"
                                                                alt="Product" width={105} height={118} />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <a href="product-default.html">Men's Black Wrist Watch</a>
                                                        </h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{ width: '100%' }}  ></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="product-price">
                                                            <ins className="new-price">$135.60</ins><del
                                                                className="old-price">$155.70</del>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product product-widget">
                                                    <figure className="product-media">
                                                        <a href="product-default.html">
                                                            <img src="assets/images/demos/demo1/products/2-6.jpg"
                                                                alt="Product" width={105} height={118} />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <a href="product-default.html">Wash Machine</a>
                                                        </h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{ width: '100%' }}  ></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="product-price">
                                                            <ins className="new-price">$215.68</ins>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="swiper-slide product-widget-wrap">
                                                <div className="product product-widget bb-no">
                                                    <figure className="product-media">
                                                        <a href="product-default.html">
                                                            <img src="assets/images/demos/demo1/products/2-7.jpg"
                                                                alt="Product" width={105} height={118} />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <a href="product-default.html">Security Guard</a>
                                                        </h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{ width: '100%' }}  ></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="product-price">
                                                            <ins className="new-price">$320.00</ins>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product product-widget bb-no">
                                                    <figure className="product-media">
                                                        <a href="product-default.html">
                                                            <img src="assets/images/demos/demo1/products/2-8.jpg"
                                                                alt="Product" width={105} height={118} />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <a href="product-default.html">Apple Super Notecom</a>
                                                        </h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{ width: '100%' }}  ></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="product-price">
                                                            <ins className="new-price">$243.30</ins><del
                                                                className="old-price">$253.50</del>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product product-widget">
                                                    <figure className="product-media">
                                                        <a href="product-default.html">
                                                            <img src="assets/images/demos/demo1/products/2-9.jpg"
                                                                alt="Product" width={105} height={118} />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            <a href="product-default.html">HD Television</a>
                                                        </h4>
                                                        <div className="ratings-container">
                                                            <div className="ratings-full">
                                                                <span className="ratings" style={{ width: '60%' }}  ></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="product-price">
                                                            <ins className="new-price">$450.68</ins><del
                                                                className="old-price">$500.00</del>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="swiper-button-next"></button>
                                        <button className="swiper-button-prev"></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- End of Deals Wrapper -->*/}
            </div>

            <section className="category-section top-category bg-grey pt-10 pb-10 appear-animate">
                <div className="container pb-2">
                    <h2 className="title justify-content-center pt-1 ls-normal mb-5">Top Categories Of The Month</h2>
                    <div className="swiper">
                        <div className="swiper-container swiper-theme pg-show" data-swiper-options="{
                            'spaceBetween': 20,
                            'slidesPerView': 2,
                            'breakpoints': {
                                '576': {
                                    'slidesPerView': 3
                                },
                                '768': {
                                    'slidesPerView': 5
                                },
                                '992': {
                                    'slidesPerView': 6
                                }
                            }
                        }">
                            <div className="swiper-wrapper row cols-lg-6 cols-md-5 cols-sm-3 cols-2">
                                <div
                                    className="swiper-slide category category-classNameic category-absolute overlay-zoom br-xs">
                                    <a href="shop-banner-sidebar.html" className="category-media">
                                        <img src="assets/images/demos/demo1/categories/2-1.jpg" alt="Category"
                                            width={130} height={130}/>
                                    </a>
                                    <div className="category-content">
                                        <h4 className="category-name">Fashion</h4>
                                        <a href="shop-banner-sidebar.html"
                                            className="btn btn-primary btn-link btn-underline">Shop
                                            Now</a>
                                    </div>
                                </div>
                                <div
                                    className="swiper-slide category category-classNameic category-absolute overlay-zoom br-xs">
                                    <a href="shop-banner-sidebar.html" className="category-media">
                                        <img src="assets/images/demos/demo1/categories/2-2.jpg" alt="Category"
                                            width={130} height={130}/>
                                    </a>
                                    <div className="category-content">
                                        <h4 className="category-name">Furniture</h4>
                                        <a href="shop-banner-sidebar.html"
                                            className="btn btn-primary btn-link btn-underline">Shop
                                            Now</a>
                                    </div>
                                </div>
                                <div
                                    className="swiper-slide category category-classNameic category-absolute overlay-zoom br-xs">
                                    <a href="shop-banner-sidebar.html" className="category-media">
                                        <img src="assets/images/demos/demo1/categories/2-3.jpg" alt="Category"
                                            width={130} height={130}/>
                                    </a>
                                    <div className="category-content">
                                        <h4 className="category-name">Shoes</h4>
                                        <a href="shop-banner-sidebar.html"
                                            className="btn btn-primary btn-link btn-underline">Shop
                                            Now</a>
                                    </div>
                                </div>
                                <div
                                    className="swiper-slide category category-classNameic category-absolute overlay-zoom br-xs">
                                    <a href="shop-banner-sidebar.html" className="category-media">
                                        <img src="assets/images/demos/demo1/categories/2-4.jpg" alt="Category"
                                            width={130} height={130}/>
                                    </a>
                                    <div className="category-content">
                                        <h4 className="category-name">Sports</h4>
                                        <a href="shop-banner-sidebar.html"
                                            className="btn btn-primary btn-link btn-underline">Shop
                                            Now</a>
                                    </div>
                                </div>
                                <div
                                    className="swiper-slide category category-classNameic category-absolute overlay-zoom br-xs">
                                    <a href="shop-banner-sidebar.html" className="category-media">
                                        <img src="assets/images/demos/demo1/categories/2-5.jpg" alt="Category"
                                            width={130} height={130}/>
                                    </a>
                                    <div className="category-content">
                                        <h4 className="category-name">Games</h4>
                                        <a href="shop-banner-sidebar.html"
                                            className="btn btn-primary btn-link btn-underline">Shop
                                            Now</a>
                                    </div>
                                </div>
                                <div
                                    className="swiper-slide category category-classNameic category-absolute overlay-zoom br-xs">
                                    <a href="shop-banner-sidebar.html" className="category-media">
                                        <img src="assets/images/demos/demo1/categories/2-6.jpg" alt="Category"
                                            width={130} height={130}/>
                                    </a>
                                    <div className="category-content">
                                        <h4 className="category-name">Computers</h4>
                                        <a href="shop-banner-sidebar.html"
                                            className="btn btn-primary btn-link btn-underline">Shop
                                            Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- End of .category-section top-category -->*/}

            <div className="container">
                <h2 className="title justify-content-center ls-normal mb-4 mt-10 pt-1 appear-animate">Popular Departments
                </h2>
                <div className="tab tab-nav-boxed tab-nav-outline appear-animate">
                    <ul className="nav nav-tabs justify-content-center" role="tablist">
                        <li className="nav-item mr-2 mb-2">
                            <a className="nav-link active br-sm font-size-md ls-normal" href="#tab1-1">New arrivals</a>
                        </li>
                        <li className="nav-item mr-2 mb-2">
                            <a className="nav-link br-sm font-size-md ls-normal" href="#tab1-2">Best seller</a>
                        </li>
                        <li className="nav-item mr-2 mb-2">
                            <a className="nav-link br-sm font-size-md ls-normal" href="#tab1-3">most popular</a>
                        </li>
                        <li className="nav-item mr-0 mb-2">
                            <a className="nav-link br-sm font-size-md ls-normal" href="#tab1-4">Featured</a>
                        </li>
                    </ul>
                </div>
                {/*<!-- End of Tab -->*/}
                <div className="tab-content product-wrapper appear-animate">
                    <div className="tab-pane active pt-4" id="tab1-1">
                        <div className="row cols-xl-5 cols-md-4 cols-sm-3 cols-2">
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-1-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-1-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">classNameic Hat</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(1 Reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$53.00</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s White
                                                Handbag</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "80%"}} ></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$26.62</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-3.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                        <div className="product-label-group">
                                            <label className="product-label label-discount">7% Off</label>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Multi Funtional Apple
                                                iPhone</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(5 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">136.26</ins>
                                            <del className="old-price">$145.90</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-4-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-4-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Fashion Blue Towel</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(8 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$26.55 - $29.99</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-5.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                        <div className="product-label-group">
                                            <label className="product-label label-discount">4% Off</label>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Apple Super Notecom</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(4 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$243.30</ins>
                                            <del className="old-price">$253.50</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-6-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-6-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s Comforter</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(10 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$32.00 - $33.26</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-7.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Multi-colorful Music</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$260.59 - $297.83</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-8-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-8-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Comfortable Backpack</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(6 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$45.90</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-9.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Data Transformer Tool
                                            </a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <span className="price">$64.47</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-10.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s hairdye</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <span className="price">$173.84</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   { /*<!-- End of Tab Pane -->*/ }
                    <div className="tab-pane pt-4" id="tab1-2">
                        <div className="row cols-xl-5 cols-md-4 cols-sm-3 cols-2">
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-4-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-4-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Fashion Blue Towel</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(8 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$26.55 - $29.99</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-3.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                        <div className="product-label-group">
                                            <label className="product-label label-discount">7% Off</label>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Multi Funtional Apple
                                                iPhone</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(5 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">136.26</ins>
                                            <del className="old-price">$145.90</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-8-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-8-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Comfortable Backpack</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(6 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$45.90</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-9.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Data Transformer Tool
                                            </a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <span className="price">$64.47</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-5.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                        <div className="product-label-group">
                                            <label className="product-label label-discount">4% Off</label>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Apple Super Notecom</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(4 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$243.30</ins>
                                            <del className="old-price">$253.50</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-6-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-6-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s Comforter</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(10 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$32.00 - $33.26</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-7.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Multi-colorful Music</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$260.59 - $297.83</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-1-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-1-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">classNameic Hat</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(1 Reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$53.00</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s White
                                                Handbag</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "80%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$26.62</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-10.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s hairdye</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <span className="price">$173.84</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<!-- End of Tab Pane -->*/}
                    <div className="tab-pane pt-4" id="tab1-3">
                        <div className="row cols-xl-5 cols-md-4 cols-sm-3 cols-2">
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-9.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Data Transformer Tool
                                            </a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <span className="price">$64.47</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-1-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-1-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">classNameic Hat</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(1 Reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$53.00</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-3.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                        <div className="product-label-group">
                                            <label className="product-label label-discount">7% Off</label>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Multi Funtional Apple
                                                iPhone</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(5 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">136.26</ins>
                                            <del className="old-price">$145.90</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s White
                                                Handbag</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "80%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$26.62</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-10.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s hairdye</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <span className="price">$173.84</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-8-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-8-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Comfortable Backpack</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(6 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$45.90</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-5.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                        <div className="product-label-group">
                                            <label className="product-label label-discount">4% Off</label>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Apple Super Notecom</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(4 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$243.30</ins>
                                            <del className="old-price">$253.50</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-7.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Multi-colorful Music</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$260.59 - $297.83</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-6-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-6-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s Comforter</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(10 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$32.00 - $33.26</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-4-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-4-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Fashion Blue Towel</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(8 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$26.55 - $29.99</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   {/* <!-- End of Tab Pane -->*/}
                    <div className="tab-pane pt-4" id="tab1-4">
                        <div className="row cols-xl-5 cols-md-4 cols-sm-3 cols-2">
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-4-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-4-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Fashion Blue Towel</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(8 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$26.55 - $29.99</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-10.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s hairdye</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <span className="price">$173.84</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-9.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Data Transformer Tool
                                            </a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <span className="price">$64.47</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-8-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-8-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Comfortable Backpack</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(6 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$45.90</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s White
                                                Handbag</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "80%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$26.62</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-5.jpg" alt="Product"
                                                width="300" height="338" />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                        <div className="product-label-group">
                                            <label className="product-label label-discount">4% Off</label>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Apple Super Notecom</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(4 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$243.30</ins>
                                            <del className="old-price">$253.50</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-3.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                        <div className="product-label-group">
                                            <label className="product-label label-discount">7% Off</label>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Multi Funtional Apple
                                                iPhone</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(5 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">136.26</ins>
                                            <del className="old-price">$145.90</del>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-7.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Multi-colorful Music</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(3 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$260.59 - $297.83</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-6-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-6-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">Women’s Comforter</a>
                                        </h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "100%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(10 reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$32.00 - $33.26</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-wrap">
                                <div className="product text-center">
                                    <figure className="product-media">
                                        <a href="product-default.html">
                                            <img src="assets/images/demos/demo1/products/3-1-1.jpg" alt="Product"
                                                width={300} height={338} />
                                            <img src="assets/images/demos/demo1/products/3-1-2.jpg" alt="Product"
                                                width={300} height={338} />
                                        </a>
                                        <div className="product-action-vertical">
                                            <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                title="Add to cart"></a>
                                            <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                title="Add to wishlist"></a>
                                            <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                title="Quickview"></a>
                                            <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                title="Add to Compare"></a>
                                        </div>
                                    </figure>
                                    <div className="product-details">
                                        <h4 className="product-name"><a href="product-default.html">classNameic Hat</a></h4>
                                        <div className="ratings-container">
                                            <div className="ratings-full">
                                                <span className="ratings" style={{width: "60%"}}></span>
                                                <span className="tooltiptext tooltip-top"></span>
                                            </div>
                                            <a href="product-default.html" className="rating-reviews">(1 Reviews)</a>
                                        </div>
                                        <div className="product-price">
                                            <ins className="new-price">$53.00</ins>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<!-- End of Tab Pane -->*/}
                </div>
                {/*<!-- End of Tab Content -->*/}

                <div className="row category-cosmetic-lifestyle appear-animate mb-5">
                    <div className="col-md-6 mb-4">
                        <div className="banner banner-fixed category-banner-1 br-xs">
                            <figure>
                                <img src="assets/images/demos/demo1/categories/3-1.jpg" alt="Category Banner"
                                    width={610} height={200} style={{ backgroundColor: '#3B4B48' }}  />
                            </figure>
                            <div className="banner-content y-50 pt-1">
                                <h5 className="banner-subtitle font-weight-bold text-uppercase">Natural Process</h5>
                                <h3 className="banner-title font-weight-bolder text-capitalize text-white">Cosmetic
                                    Makeup<br/>Professional</h3>
                                <a href="shop-banner-sidebar.html"
                                    className="btn btn-white btn-link btn-underline btn-icon-right">Shop Now<i
                                        className="w-icon-long-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="banner banner-fixed category-banner-2 br-xs">
                            <figure>
                                <img src="assets/images/demos/demo1/categories/3-2.jpg" alt="Category Banner"
                                    width={610} height={200} style={{ backgroundColor: '#E5E5E5' }} />
                            </figure>
                            <div className="banner-content y-50 pt-1">
                                <h5 className="banner-subtitle font-weight-bold text-uppercase">Trending Now</h5>
                                <h3 className="banner-title font-weight-bolder text-capitalize">Women's
                                    Lifestyle<br/>Collection</h3>
                                <a href="shop-banner-sidebar.html"
                                    className="btn btn-dark btn-link btn-underline btn-icon-right">Shop Now<i
                                        className="w-icon-long-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- End of Category Cosmetic Lifestyle -->*/}

                <div className="product-wrapper-1 appear-animate mb-5">
                    <div className="title-link-wrapper pb-1 mb-4">
                        <h2 className="title ls-normal mb-0">Clothing & Apparel</h2>
                        <a href="shop-boxed-banner.html" className="font-size-normal font-weight-bold ls-25 mb-0">More
                            Products<i className="w-icon-long-arrow-right"></i></a>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-sm-4 mb-4">
                            <div className="banner h-100 br-sm" style={{ backgroundImage: 'url(assets/images/demos/demo1/banners/2.jpg)', backgroundColor: '#ebeced' }}>
                      
                                <div className="banner-content content-top">
                                    <h5 className="banner-subtitle font-weight-normal mb-2">Weekend Sale</h5>
                                    <hr className="banner-divider bg-dark mb-2"/>
                                    <h3 className="banner-title font-weight-bolder ls-25 text-uppercase">
                                        New Arrivals<br/> <span
                                            className="font-weight-normal text-capitalize">Collection</span>
                                    </h3>
                                    <a href="shop-banner-sidebar.html"
                                        className="btn btn-dark btn-outline btn-rounded btn-sm">shop Now</a>
                                </div>
                            </div>
                        </div>
                        {/*<!-- End of Banner -->*/}
                        <div className="col-lg-9 col-sm-8">
                            <div className="swiper-container swiper-theme" data-swiper-options="{
                                'spaceBetween': 20,
                                'slidesPerView': 2,
                                'breakpoints': {
                                    '992': {
                                        'slidesPerView': 3
                                    },
                                    '1200': {
                                        'slidesPerView': 4
                                    }
                                }
                            }">
                                <div className="swiper-wrapper row cols-xl-4 cols-lg-3 cols-2">
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="#">
                                                    <img src="assets/images/demos/demo1/products/4-1.jpg" alt="Product"
                                                        width={216} height={243} />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Men’s
                                                        Clothing</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$23.99</ins><del
                                                        className="old-price">$25.68</del>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="#">
                                                    <img src="assets/images/demos/demo1/products/4-5-1.jpg"
                                                        alt="Product" width={216} height={243} />
                                                    <img src="assets/images/demos/demo1/products/4-5-2.jpg"
                                                        alt="Product" width={216} height={243} />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Best Travel
                                                        Bag</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$25.68</ins><del
                                                        className="old-price">$28.99</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="#">
                                                    <img src="assets/images/demos/demo1/products/4-2-1.jpg"
                                                        alt="Product" width={216} height={243} />
                                                    <img src="assets/images/demos/demo1/products/4-2-2.jpg"
                                                        alt="Product" width={216} height={243} />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Women’s Fashion
                                                        Handbag </a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$25.68</ins><del
                                                        className="old-price">$25.89</del>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="#">
                                                    <img src="assets/images/demos/demo1/products/4-6.jpg" alt="Product"
                                                        width={216} height={243} />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Gray Leather
                                                        Shoes</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$26.88</ins><del
                                                        className="old-price">$27.89</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="#">
                                                    <img src="assets/images/demos/demo1/products/4-3.jpg" alt="Product"
                                                        width={216} height={243} />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Black Winter
                                                        Skating</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$40.86</ins><del
                                                        className="old-price">$45.89</del>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="#">
                                                    <img src="assets/images/demos/demo1/products/4-7.jpg" alt="Product"
                                                        width={216} height={243} />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Men's Black
                                                        Wrist
                                                        Watch</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$135.60</ins><del
                                                        className="old-price">$155.70</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="#">
                                                    <img src="assets/images/demos/demo1/products/4-4-1.jpg"
                                                        alt="Product" width={216} height={243} />
                                                    <img src="assets/images/demos/demo1/products/4-4-2.jpg"
                                                        alt="Product" width={216} height={243} />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Sport Women's
                                                        Wear</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$220.20</ins><del
                                                        className="old-price">$300.62</del>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="#">
                                                    <img src="assets/images/demos/demo1/products/4-8.jpg" alt="Product"
                                                        width={216} height={243} />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Women’s Hiking
                                                        Hat</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <span className="price">$53.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of Product Wrapper 1 */}

                <div className="product-wrapper-1 appear-animate mb-8">
                    <div className="title-link-wrapper pb-1 mb-4">
                        <h2 className="title ls-normal mb-0">Consumer Electric</h2>
                        <a href="shop-boxed-banner.html" className="font-size-normal font-weight-bold ls-25 mb-0">More
                            Products<i className="w-icon-long-arrow-right"></i></a>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-sm-4 mb-4">
                            <div className="banner h-100 br-sm" style={{backgroundImage: `url(assets/images/demos/demo1/banners/3.jpg)`}}>
                                <div className="banner-content content-top">
                                    <h5 className="banner-subtitle text-white font-weight-normal mb-2">New Collection</h5>
                                    <hr className="banner-divider bg-white mb-2"/>
                                    <h3 className="banner-title text-white font-weight-bolder text-uppercase ls-25">
                                        Top Camera <br/> <span
                                            className="font-weight-normal text-capitalize">Mirrorless</span>
                                    </h3>
                                    <a href="shop-banner-sidebar.html"
                                        className="btn btn-white btn-outline btn-rounded btn-sm">shop now</a>
                                </div>
                            </div>
                        </div>
                        {/* End of Banner */}
                        <div className="col-lg-9 col-sm-8">
                            <div className="swiper-container swiper-theme" data-swiper-options="{
                                'spaceBetween': 20,
                                'slidesPerView': 2,
                                'breakpoints': {
                                    '992': {
                                        'slidesPerView': 3
                                    },
                                    '1200': {
                                        'slidesPerView': 4
                                    }
                                }
                            }">
                                <div className="swiper-wrapper row cols-xl-4 cols-lg-3 cols-2">
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/5-1-1.jpg"
                                                        alt="Product" width={216} height={243} />
                                                    <img src="assets/images/demos/demo1/products/5-1-2.jpg"
                                                        alt="Product" width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                                <div className="product-label-group">
                                                    <label className="product-label label-discount">6% Off</label>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Professional
                                                        Pixel
                                                        Camera</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "100%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(5
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$215.68</ins><del
                                                        className="old-price">$230.45</del>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/5-5.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Latest
                                                        Speaker</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$250.68</ins>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/5-2-1.jpg"
                                                        alt="Product" width="216" height="243" />
                                                    <img src="assets/images/demos/demo1/products/5-2-2.jpg"
                                                        alt="Product" width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Wash Machine</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "100%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(9
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$215.68</ins>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/5-6.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Security
                                                        Guard</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$320.00</ins>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/5-3.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                                <div className="product-label-group">
                                                    <label className="product-label label-discount">10% Off</label>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">HD
                                                        Television</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$450.68</ins><del
                                                        className="old-price">$500.00</del>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/5-7.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                                <div className="product-label-group">
                                                    <label className="product-label label-discount">10% Off</label>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">USB Receipt</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "100%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(5
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$26.89</ins><del
                                                        className="old-price">$29.79</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/5-4.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Data Transformer
                                                        Tool</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "100%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(6
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$64.47</ins>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/5-8.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                                <div className="product-label-group">
                                                    <label className="product-label label-discount">7% Off</label>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Multi Functional
                                                        Apple iPhone</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "100%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(9
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$136.26</ins><del
                                                        className="old-price">$145.90</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                            {/* End of Produts */}
                        </div>
                    </div>
                </div>
                {/* End of Product Wrapper 1 */}

                <div className="banner banner-fashion appear-animate br-sm mb-9" 
                style={{backgroundImage: "url(assets/images/demos/demo1/banners/4.jpg)", backgroundColor: "#383839"}}>
                    <div className="banner-content align-items-center">
                        <div className="content-left d-flex align-items-center mb-3">
                            <div className="banner-price-info font-weight-bolder text-secondary text-uppercase lh-1 ls-25">
                                25
                                <sup className="font-weight-bold">%</sup><sub className="font-weight-bold ls-25">Off</sub>
                            </div>
                            <hr className="banner-divider bg-white mt-0 mb-0 mr-8"/>
                        </div>
                        <div className="content-right d-flex align-items-center flex-1 flex-wrap">
                            <div className="banner-info mb-0 mr-auto pr-4 mb-3">
                                <h3 className="banner-title text-white font-weight-bolder text-uppercase ls-25">For Today's
                                    Fashion</h3>
                                <p className="text-white mb-0">Use code
                                    <span
                                        className="text-dark bg-white font-weight-bold ls-50 pl-1 pr-1 d-inline-block">Black
                                        <strong>12345</strong></span> to get best offer.</p>
                            </div>
                            <a href="shop-banner-sidebar.html"
                                className="btn btn-white btn-outline btn-rounded btn-icon-right mb-3">Shop Now<i
                                    className="w-icon-long-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
                {/* End of Banner Fashion */}

                <div className="product-wrapper-1 appear-animate mb-7">
                    <div className="title-link-wrapper pb-1 mb-4">
                        <h2 className="title ls-normal mb-0">Home Garden & Kitchen</h2>
                        <a href="shop-boxed-banner.html" className="font-size-normal font-weight-bold ls-25 mb-0">More
                            Products<i className="w-icon-long-arrow-right"></i></a>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-sm-4 mb-4">
                            <div className="banner h-100 br-sm" style={{ backgroundImage: "url(assets/images/demos/demo1/banners/5.jpg)", backgroundColor: "#EAEFF3" }}>
                                <div className="banner-content content-top">
                                    <h5 className="banner-subtitle font-weight-normal mb-2">Deals And Promotions</h5>
                                    <hr className="banner-divider bg-dark mb-2"/>
                                    <h3 className="banner-title font-weight-bolder text-uppercase ls-25">
                                        Trending <br/> <span className="font-weight-normal text-capitalize">House
                                            Utensil</span>
                                    </h3>
                                    <a href="shop-banner-sidebar.html"
                                        className="btn btn-dark btn-outline btn-rounded btn-sm">shop now</a>
                                </div>
                            </div>
                        </div>
                        {/* End of Banner */}
                        <div className="col-lg-9 col-sm-8">
                            <div className="swiper-container swiper-theme" data-swiper-options="{
                                'spaceBetween': 20,
                                'slidesPerView': 2,
                                'breakpoints': {
                                    '992': {
                                        'slidesPerView': 3
                                    },
                                    '1200': {
                                        'slidesPerView': 4
                                    }
                                }
                            }">
                                <div className="swiper-wrapper row cols-xl-4 cols-lg-3 cols-2">
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/6-1.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Home Sofa</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "100%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(5
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$75.99</ins>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/6-5.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Electric
                                                        Rice-Cooker</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$215.00</ins>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/6-2-1.jpg"
                                                        alt="Product" width="216" height="243" />
                                                    <img src="assets/images/demos/demo1/products/6-2-2.jpg"
                                                        alt="Product" width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                                <div className="product-label-group">
                                                    <label className="product-label label-discount">21% Off</label>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Kitchen
                                                        Table</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "100%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(9
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$75.50</ins><del
                                                        className="old-price">$95.68</del>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/6-6.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Kitchen
                                                        Cooker</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$150.60</ins>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/6-3-1.jpg"
                                                        alt="Product" width="216" height="243" />
                                                    <img src="assets/images/demos/demo1/products/6-3-2.jpg"
                                                        alt="Product" width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Table Lamp</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "60%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(3
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$45.60</ins>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/6-7.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                                <div className="product-label-group">
                                                    <label className="product-label label-discount">12% Off</label>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Electric Frying
                                                        Pan</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "100%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(5
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$137.35</ins><del
                                                        className="old-price">$155.65</del>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide product-col">
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/6-4.jpg" alt="Product"
                                                        width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                                <div className="product-label-group">
                                                    <label className="product-label label-discount">18% Off</label>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Latest Chair</a>
                                                </h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "100%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(6
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$70.00</ins><del
                                                        className="old-price">$85.00</del>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-wrap product text-center">
                                            <figure className="product-media">
                                                <a href="product-default.html">
                                                    <img src="assets/images/demos/demo1/products/6-8-1.jpg"
                                                        alt="Product" width="216" height="243" />
                                                    <img src="assets/images/demos/demo1/products/6-8-2.jpg"
                                                        alt="Product" width="216" height="243" />
                                                </a>
                                                <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-cart w-icon-cart"
                                                        title="Add to cart"></a>
                                                    <a href="#" className="btn-product-icon btn-wishlist w-icon-heart"
                                                        title="Add to wishlist"></a>
                                                    <a href="#" className="btn-product-icon btn-quickview w-icon-search"
                                                        title="Quickview"></a>
                                                    <a href="#" className="btn-product-icon btn-compare w-icon-compare"
                                                        title="Add to Compare"></a>
                                                </div>
                                            </figure>
                                            <div className="product-details">
                                                <h4 className="product-name"><a href="product-default.html">Automatic
                                                        Crusher</a></h4>
                                                <div className="ratings-container">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{width: "100%"}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                    <a href="product-default.html" className="rating-reviews">(9
                                                        reviews)</a>
                                                </div>
                                                <div className="product-price">
                                                    <ins className="new-price">$220.25</ins>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-pagination"></div>
                            </div>
                            {/* End of Produts */}
                        </div>
                    </div>
                </div>
                {/* End of Product Wrapper 1 */}

                <h2 className="title title-underline mb-4 ls-normal appear-animate">Our Clients</h2>
                <div className="swiper-container swiper-theme brands-wrapper mb-9 appear-animate" data-swiper-options="{
                    'spaceBetween': 0,
                    'slidesPerView': 2,
                    'breakpoints': {
                        '576': {
                            'slidesPerView': 3
                        },
                        '768': {
                            'slidesPerView': 4
                        },
                        '992': {
                            'slidesPerView': 5
                        },
                        '1200': {
                            'slidesPerView': 6
                        }
                    }
                }">
                    <div className="swiper-wrapper row gutter-no cols-xl-6 cols-lg-5 cols-md-4 cols-sm-3 cols-2">
                        <div className="swiper-slide brand-col">
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/1.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/2.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                        </div>
                        <div className="swiper-slide brand-col">
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/3.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/4.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                        </div>
                        <div className="swiper-slide brand-col">
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/5.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/6.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                        </div>
                        <div className="swiper-slide brand-col">
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/7.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/8.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                        </div>
                        <div className="swiper-slide brand-col">
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/9.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/10.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                        </div>
                        <div className="swiper-slide brand-col">
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/11.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                            <figure className="brand-wrapper">
                                <img src="assets/images/demos/demo1/brands/12.png" alt="Brand" width="410"
                                    height="186" />
                            </figure>
                        </div>
                    </div>
                </div>
                {/* End of Brands Wrapper */}

                <div className="post-wrapper appear-animate mb-4">
                    <div className="title-link-wrapper pb-1 mb-4">
                        <h2 className="title ls-normal mb-0">From Our Blog</h2>
                        <a href="blog-listing.html" className="font-weight-bold font-size-normal">View All Articles</a>
                    </div>
                    <div className="swiper">
                        <div className="swiper-container swiper-theme" data-swiper-options="{
                            'slidesPerView': 1,
                            'spaceBetween': 20,
                            'breakpoints': {
                                '576': {
                                    'slidesPerView': 2
                                },
                                '768': {
                                    'slidesPerView': 3
                                },
                                '992': {
                                    'slidesPerView': 4
                                }
                            }
                        }">
                            <div className="swiper-wrapper row cols-lg-4 cols-md-3 cols-sm-2 cols-1">
                                <div className="swiper-slide post text-center overlay-zoom">
                                    <figure className="post-media br-sm">
                                        <a href="post-single.html">
                                            <img src="assets/images/demos/demo1/blogs/1.jpg" alt="Post" width="280"
                                                height="180" style={{backgroundColor: "#4b6e91"}} />
                                        </a>
                                    </figure>
                                    <div className="post-details">
                                        <div className="post-meta">
                                            by <a href="#" className="post-author">John Doe</a>
                                            - <a href="#" className="post-date mr-0">03.05.2021</a>
                                        </div>
                                        <h4 className="post-title"><a href="post-single.html">Aliquam tincidunt mauris
                                                eurisus</a>
                                        </h4>
                                        <a href="post-single.html" className="btn btn-link btn-dark btn-underline">Read
                                            More<i className="w-icon-long-arrow-right"></i></a>
                                    </div>
                                </div>
                                <div className="swiper-slide post text-center overlay-zoom">
                                    <figure className="post-media br-sm">
                                        <a href="post-single.html">
                                            <img src="assets/images/demos/demo1/blogs/2.jpg" alt="Post" width="280"
                                                height="180" style={{backgroundColor: "#cec9cf"}} />
                                        </a>
                                    </figure>
                                    <div className="post-details">
                                        <div className="post-meta">
                                            by <a href="#" className="post-author">John Doe</a>
                                            - <a href="#" className="post-date mr-0">03.05.2021</a>
                                        </div>
                                        <h4 className="post-title"><a href="post-single.html">Cras ornare tristique elit</a>
                                        </h4>
                                        <a href="post-single.html" className="btn btn-link btn-dark btn-underline">Read
                                            More<i className="w-icon-long-arrow-right"></i></a>
                                    </div>
                                </div>
                                <div className="swiper-slide post text-center overlay-zoom">
                                    <figure className="post-media br-sm">
                                        <a href="post-single.html">
                                            <img src="assets/images/demos/demo1/blogs/3.jpg" alt="Post" width="280"
                                                height="180" style={{backgroundColor: "#c9c7bb"}} />
                                        </a>
                                    </figure>
                                    <div className="post-details">
                                        <div className="post-meta">
                                            by <a href="#" className="post-author">John Doe</a>
                                            - <a href="#" className="post-date mr-0">03.05.2021</a>
                                        </div>
                                        <h4 className="post-title"><a href="post-single.html">Vivamus vestibulum ntulla nec
                                                ante</a>
                                        </h4>
                                        <a href="post-single.html" className="btn btn-link btn-dark btn-underline">Read
                                            More<i className="w-icon-long-arrow-right"></i></a>
                                    </div>
                                </div>
                                <div className="swiper-slide post text-center overlay-zoom">
                                    <figure className="post-media br-sm">
                                        <a href="post-single.html">
                                            <img src="assets/images/demos/demo1/blogs/4.jpg" alt="Post" width="280"
                                                height="180" style={{backgroundColor: "#d8dce0"}} />
                                        </a>
                                    </figure>
                                    <div className="post-details">
                                        <div className="post-meta">
                                            by <a href="#" className="post-author">John Doe</a>
                                            - <a href="#" className="post-date mr-0">03.05.2021</a>
                                        </div>
                                        <h4 className="post-title"><a href="post-single.html">Fusce lacinia arcuet nulla</a>
                                        </h4>
                                        <a href="post-single.html" className="btn btn-link btn-dark btn-underline">Read
                                            More<i className="w-icon-long-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
                {/* Post Wrapper */}

                <h2 className="title title-underline mb-4 ls-normal appear-animate">Your Recent Views</h2>
                <div className="swiper-container swiper-theme shadow-swiper appear-animate pb-4 mb-8" data-swiper-options="{
                    'spaceBetween': 20,
                    'slidesPerView': 2,
                    'breakpoints': {
                        '576': {
                            'slidesPerView': 3
                        },
                        '768': {
                            'slidesPerView': 5
                        },
                        '992': {
                            'slidesPerView': 6
                        },
                        '1200': {
                            'slidesPerView': 8
                        }
                    }
                }">
                    <div className="swiper-wrapper row cols-xl-8 cols-lg-6 cols-md-4 cols-2">
                        <div className="swiper-slide product-wrap mb-0">
                            <div className="product text-center product-absolute">
                                <figure className="product-media">
                                    <a href="https://www.portotheme.com/html/wolmart/product-defaproduct-default.html">
                                        <img src="assets/images/demos/demo1/products/7-1.jpg" alt="Category image"
                                            width="130" height="146" style={{backgroundColor: "#fff"}} />
                                    </a>
                                </figure>
                                <h4 className="product-name">
                                    <a href="product-default.html">Women's Fashion Handbag</a>
                                </h4>
                            </div>
                        </div>
                        {/*<!-- End of Product Wrap -->*/}
                        <div className="swiper-slide product-wrap mb-0">
                            <div className="product text-center product-absolute">
                                <figure className="product-media">
                                    <a href="https://www.portotheme.com/html/wolmart/product-defaproduct-default.html">
                                        <img src="assets/images/demos/demo1/products/7-2.jpg" alt="Category image"
                                            width="130" height="146" style={{backgroundColor: "#fff"}} />
                                    </a>
                                </figure>
                                <h4 className="product-name">
                                    <a href="product-default.html">Electric Frying Pan</a>
                                </h4>
                            </div>
                        </div>
                        {/* End of Product Wrap */}
                        <div className="swiper-slide product-wrap mb-0">
                            <div className="product text-center product-absolute">
                                <figure className="product-media">
                                    <a href="https://www.portotheme.com/html/wolmart/product-defaproduct-default.html">
                                        <img src="assets/images/demos/demo1/products/7-3.jpg" alt="Category image"
                                            width="130" height="146" style={{backgroundColor: "#fff"}} />
                                    </a>
                                </figure>
                                <h4 className="product-name">
                                    <a href="product-default.html">Black Winter Skating</a>
                                </h4>
                            </div>
                        </div>
                        {/* End of Product Wrap */}
                        <div className="swiper-slide product-wrap mb-0">
                            <div className="product text-center product-absolute">
                                <figure className="product-media">
                                    <a href="https://www.portotheme.com/html/wolmart/product-defaproduct-default.html">
                                        <img src="assets/images/demos/demo1/products/7-4.jpg" alt="Category image"
                                            width="130" height="146" style={{backgroundColor: "#fff"}} />
                                    </a>
                                </figure>
                                <h4 className="product-name">
                                    <a href="product-default.html">HD Television</a>
                                </h4>
                            </div>
                        </div>
                        {/* End of Product Wrap */}
                        <div className="swiper-slide product-wrap mb-0">
                            <div className="product text-center product-absolute">
                                <figure className="product-media">
                                    <a href="https://www.portotheme.com/html/wolmart/product-defaproduct-default.html">
                                        <img src="assets/images/demos/demo1/products/7-5.jpg" alt="Category image"
                                            width="130" height="146" style={{backgroundColor: "#fff"}} />
                                    </a>
                                </figure>
                                <h4 className="product-name">
                                    <a href="product-default.html">Home Sofa</a>
                                </h4>
                            </div>
                        </div>
                        {/* End of Product Wrap */}
                        <div className="swiper-slide product-wrap mb-0">
                            <div className="product text-center product-absolute">
                                <figure className="product-media">
                                    <a href="https://www.portotheme.com/html/wolmart/product-defaproduct-default.html">
                                        <img src="assets/images/demos/demo1/products/7-6.jpg" alt="Category image"
                                            width="130" height="146" style={{backgroundColor: "#fff"}} />
                                    </a>
                                </figure>
                                <h4 className="product-name">
                                    <a href="product-default.html">USB Receipt</a>
                                </h4>
                            </div>
                        </div>
                        {/* End of Product Wrap */}
                        <div className="swiper-slide product-wrap mb-0">
                            <div className="product text-center product-absolute">
                                <figure className="product-media">
                                    <a href="https://www.portotheme.com/html/wolmart/product-defaproduct-default.html">
                                        <img src="assets/images/demos/demo1/products/7-7.jpg" alt="Category image"
                                            width="130" height="146" style={{backgroundColor: "#fff"}} />
                                    </a>
                                </figure>
                                <h4 className="product-name">
                                    <a href="product-default.html">Electric Rice-Cooker</a>
                                </h4>
                            </div>
                        </div>
                        {/* End of Product Wrap */}
                        <div className="swiper-slide product-wrap mb-0">
                            <div className="product text-center product-absolute">
                                <figure className="product-media">
                                    <a href="https://www.portotheme.com/html/wolmart/product-defaproduct-default.html">
                                        <img src="assets/images/demos/demo1/products/7-8.jpg" alt="Category image"
                                            width="130" height="146" style={{backgroundColor: "#fff"}} />
                                    </a>
                                </figure>
                                <h4 className="product-name">
                                    <a href="product-default.html">Table Lamp</a>
                                </h4>
                            </div>
                        </div>
                        {/* End of Product Wrap */}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                {/* End of Reviewed Producs */}
            </div>
            {/*End of Catainer */}
        </main>
  );
}
