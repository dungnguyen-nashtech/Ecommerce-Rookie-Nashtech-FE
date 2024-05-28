import { ChevronDown, Heart, MapPin, Phone, Search, ShoppingCart, User } from "lucide-react";
import { listHeaderItem } from "../../data";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { IHeaderItem } from "../../payloads/interface/formInput.ts";

function Header() {
  return (
    <header className="header">
      <div className="header_container header-content-header">
        <div className="header-logo">
          <img src="/logo.webp" alt="Website logo image" className="header-logo-image" />
        </div>
        <div className="header-navbar">
          <div className="header-navbar-top">
            <div className="header-navbar-top-item">
              <span className="background-icon">
                <Phone />
              </span>
              <span className="title">
                HOTLINE: <b>070 347 0938</b>
              </span>
            </div>
            <div className="header-navbar-top-item">
              <span className="background-icon">
                <MapPin />
              </span>
              <span className="title">
                Hệ thống cửa hàng
              </span>
            </div>
            <div className="header-navbar-top-search">
              <div className="input">
                <input type="text" placeholder="Tìm kiếm sản phẩm" />
                <span>
                  <Search className="icon" />
                </span>
                <div className="list-search">
                  {
                    Array.from({ length: 3 }).map((_, index: number) => (
                      <div key={index} className="list-search-item">
                        <div className="image">
                          <img
                            src="https://bizweb.dktcdn.net/thumb/large/100/462/587/products/12-4d67873d-2641-4391-8b3d-b7a3699e9728.png?v=1698485974000"
                            alt="" />
                        </div>
                        <div className="content">
                          <h2>Áo thun nữ</h2>
                          <span>
                            450.000đ
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="header-navbar-bottom">
            <ul className="header-navbar-bottom-list">
              {listHeaderItem.map((item: IHeaderItem, index: number) => (
                <li key={index} className="header-navbar-bottom-item">
                  <div className="header-navbar-bottom-item-handle">
                    <span>
                      {
                        item.name
                      }
                    </span>
                    {
                      item.children && (
                        <span>
                          <ChevronDown size={19} />
                        </span>

                      )
                    }
                  </div>
                  {
                    item.children && (
                      <ul className="header-navbar-bottom-children">
                        {
                          item.children.map((child: IHeaderItem, i: number) => (
                            <li key={i} className="header-navbar-bottom-children-item">
                              {child.name}
                            </li>
                          ))
                        }
                      </ul>
                    )
                  }
                </li>
              ))
              }
            </ul>
          </div>
        </div>
        <div className="header-account">
          <div className="header-account-item">
            <div className="header-account-item-handle">
              <span className="background-icon">
                <Heart />
              </span>
              <span className="title">
                Yêu thích
              </span>
            </div>
            <span className="quantity">
              0
            </span>
          </div>
          <div className="header-account-item">
            <div className="header-account-item-handle">
              <span className="background-icon">
                <User />
              </span>
              <span className="title">
                Tài khoản
              </span>
            </div>
            <div className="header-account-item-account">
              <span className="item">
                <LoginIcon />
                <span>Đăng nhập</span>
              </span>
              <span className="item">
                <LogoutIcon />
                <span>Đăng ký</span>
              </span>
            </div>
          </div>
          <div className="header-account-item">
            <div className="header-account-item-handle">
              <span className="background-icon">
                <ShoppingCart />
              </span>
              <span className="title">
                Giỏ hàng
              </span>
            </div>
            {/* <div className="header-account-item-cart ">
              <img src="/cart_empty.png" alt="image cart empty" className="image" />
              <span className="title">Không có sản phẩm nào trong giỏ hàng của bạn</span>
            </div> */}
            <div className="header-account-item-cart has-products">
              <div className="cart-header">
                <h3>GIỎ HÀNG</h3>
              </div>
              <div className="cart-content">
                {
                  Array.from({ length: 3 }).map((_, index: number) => (
                    <div key={index} className="cart-content-items">
                      <div className="image">
                        <img
                          src="https://bizweb.dktcdn.net/thumb/large/100/462/587/products/12-4d67873d-2641-4391-8b3d-b7a3699e9728.png?v=1698485974000"
                          alt="Product Image "
                        />
                      </div>
                      <div className="content ">
                        <div className="content-name-product">
                          <div className="content-name-product-name">
                            <h2 className="title">Đầm dài phụ nữ</h2>
                            <span className="category">
                              M / Đen
                            </span>
                          </div>
                          <span className="content-name-product-remove">
                            <HighlightOffIcon />
                          </span>
                        </div>
                        <div className="content-price-product">
                          <div className="quantity-product">
                            <button className="minus">
                              -
                            </button>
                            <input type="text" value={0} />
                            <button className="plus">
                              +
                            </button>
                          </div>
                          <span className="price">
                            250.000d
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="cart-footer">
                <div className="total-price">
                  <h2 className="title">Tổng tiền: </h2>
                  <span className="price">
                    234.000 đ
                  </span>
                </div>
                <button className="cart-footer-button">
                  Xem giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
