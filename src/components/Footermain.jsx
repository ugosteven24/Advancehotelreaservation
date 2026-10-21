
import HomePage from "@/app/Homepage";
import Footer from "./Footer";
import HeaderBottom from "./HeaderBottom";
import HeaderMiddle from "./HeaderMiddle";
import HeaderStart from "./HeaderStart";


export default function Footermain() {
  return (
  
    <div className="sticky-footer sticky-content fix-bottom">
        <a href="demo1.html" className="sticky-link active">
            <i className="w-icon-home"></i>
            <p>Home</p>
        </a>
        <a href="shop-banner-sidebar.html" className="sticky-link">
            <i className="w-icon-category"></i>
            <p>Shop</p>
        </a>
        <a href="my-account.html" className="sticky-link">
            <i className="w-icon-account"></i>
            <p>Account</p>
        </a>
        <div className="cart-dropdown dir-up">
            <a href="cart.html" className="sticky-link">
                <i className="w-icon-cart"></i>
                <p>Cart</p>
            </a>
            <div className="dropdown-box">
                <div className="products">
                    <div className="product product-cart">
                        <div className="product-detail">
                            <h3 className="product-name">
                                <a href="product-default.html">Beige knitted elas<br/>tic
                                    runner shoes</a>
                            </h3>
                            <div className="price-box">
                                <span className="product-quantity">1</span>
                                <span className="product-price">$25.68</span>
                            </div>
                        </div>
                        <figure className="product-media">
                            <a href="product-default.html">
                                <img src="assets/images/cart/product-1.jpg" alt="product" height="84" width="94" />
                            </a>
                        </figure>
                        <button className="btn btn-link btn-close" aria-label="button">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="product product-cart">
                        <div className="product-detail">
                            <h3 className="product-name">
                                <a href="product-default.html">Blue utility pina<br/>fore
                                    denim dress</a>
                            </h3>
                            <div className="price-box">
                                <span className="product-quantity">1</span>
                                <span className="product-price">$32.99</span>
                            </div>
                        </div>
                        <figure className="product-media">
                            <a href="product-default.html">
                                <img src="assets/images/cart/product-2.jpg" alt="product" width="84" height="94" />
                            </a>
                        </figure>
                        <button className="btn btn-link btn-close" aria-label="button">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <div className="cart-total">
                    <label>Subtotal:</label>
                    <span className="price">$58.67</span>
                </div>

                <div className="cart-action">
                    <a href="cart.html" className="btn btn-dark btn-outline btn-rounded">View Cart</a>
                    <a href="checkout.html" className="btn btn-primary  btn-rounded">Checkout</a>
                </div>
            </div>
            {/* End of Dropdown Box */}
        </div>

        <div className="header-search hs-toggle dir-up">
            <a href="#" className="search-toggle sticky-link">
                <i className="w-icon-search"></i>
                <p>Search</p>
            </a>
            <form action="#" className="input-wrapper">
                <input type="text" className="form-control" name="search"  placeholder="Search"
                    required />
                <button className="btn btn-search" type="submit">
                    <i className="w-icon-search"/>
                </button>
            </form>
        </div>
    </div>
    
    
  );
}