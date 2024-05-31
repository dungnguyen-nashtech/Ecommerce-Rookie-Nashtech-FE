import { ChevronDown, Heart, MapPin, Phone, Search, ShoppingCart, User } from "lucide-react";
import { listHeaderItem } from "../../data";
import { IHeaderItem } from "../../interface";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { HeaderCartItems } from "../HeaderCartItems";
import { useCartStore } from "../../stores/cartStore.ts";
import { CART_URL } from "../../utils/urls.ts";
import { useUserStore } from "../../stores/userStore.ts";

function Header() {

  const navigate = useNavigate();
  const cartStore = useCartStore();
  const userStore = useUserStore();

  const logout = () => {
    userStore.removeUser();
    navigate("/home");
  };

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
                <li onClick={() => navigate(item.path)} key={index} className="header-navbar-bottom-item">
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
            <div onClick={() => navigate("/wishlist")} className="header-account-item-handle">
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
            <div onClick={() => navigate("/info")} className="header-account-item-handle">
              <span className="background-icon">
                <User />
              </span>
              <span className="title">
                Tài khoản
              </span>
            </div>
            <div className="header-account-item-account">
              {!userStore?.isAuthenticated ? (
                <>
                  <span onClick={() => navigate("/sign-in")} className="item">
                    <LoginIcon />
                    <span>Đăng nhập</span>
                  </span>
                  <span onClick={() => navigate("/sign-up")} className="item">
                    <LogoutIcon />
                    <span>Đăng ký</span>
                  </span>
                </>
              ) : (
                <span onClick={() => logout()} className="item">
                  <LogoutIcon />
                  <span>Đăng xuất</span>
                </span>
              )}


            </div>
          </div>
          <div onClick={() => navigate(CART_URL)} className="header-account-item">
            <div className="header-account-item-handle">
              <span className="background-icon">
                <ShoppingCart />
              </span>
              <span className="title">
                Giỏ hàng
              </span>
            </div>
            {cartStore?.listCartItem.length != 0 ? <HeaderCartItems /> : <NoElementInCart />}
          </div>
        </div>

      </div>
    </header>
  );
}

const NoElementInCart = () => {
  return (<div className="header-account-item-cart ">
    <img src="/cart_empty.png" alt="image cart empty" className="image" />
    <span className="title">Không có sản phẩm nào trong giỏ hàng của bạn</span>
  </div>);
};

export default Header;
