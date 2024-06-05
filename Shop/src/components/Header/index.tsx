import { ChevronDown, Heart, MapPin, Phone, ShoppingCart, User } from "lucide-react";

import { IHeaderItem } from "../../interface";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { HeaderCartItems } from "../HeaderCartItems";
import { useCartStore } from "../../stores/cartStore.ts";
import { CART_URL } from "../../utils/urls.ts";
import { useUserStore } from "../../stores/userStore.ts";
import { QueryListCategory } from "../../services/queries/query-get.ts";
import CenteredLoader from "../Common/CenteredLoader.tsx";
import React, { useEffect, useState } from "react";
import { InputSearch } from "./InputSearch.tsx";
import { QueryPostLogout } from "../../services/queries/query-post.ts";

export const listHeaderItemInit: IHeaderItem[] = [
  {
    name: "Trang chủ",
    path: "/home"
  },
  {
    name: "Thời trang nữ",
    path: "/shop"
  },
  {
    name: "Danh Mục",
    path: "",
    children: []
  },
  {
    name: "Tin tức thời trang",
    path: "",
    children: [
      {
        name: "Chanel",
        path: ""
      },
      {
        name: "Gucci",
        path: ""
      },
      {
        name: "Hermès",
        path: ""
      },
      {
        name: "Louis Vuitton",
        path: ""
      }
    ]
  },
  {
    name: "Trợ giúp",
    path: ""
  },
  {
    name: "Khuyến mãi",
    path: ""
  }
];

function addChildsToDanhMuc(products: any[]): any[] {
  const danhMucItem = listHeaderItemInit.find(item => item.name === "Danh Mục");
  if (danhMucItem && danhMucItem.children) {
    products.forEach((category: { name: any; id: any; }) => {
      danhMucItem.children.push({
        name: category.name,
        path: `/category/${category.name}`
      });
    });
  } else {
    console.error("Danh Mục not found");
  }

  return listHeaderItemInit;
}

function Header() {

  const queryListCategory = QueryListCategory();
  const [listHeaderItem, setListHeaderItem] = useState([]);

  const navigate = useNavigate();
  const cartStore = useCartStore();
  const userStore = useUserStore();

  const queryPostLogout = QueryPostLogout(userStore.user.email);


  useEffect(() => {
    if (queryListCategory?.data) {
      const updatedListHeaderItem = addChildsToDanhMuc(queryListCategory.data);
      setListHeaderItem(updatedListHeaderItem);
    }
  }, [queryListCategory?.data]);

  const logout = () => {
    queryPostLogout.mutate(null, {
      onSuccess: () => {
        userStore.removeUser();
        navigate("/home");
      }
    });
  };

  if (queryListCategory.isLoading) {
    return <CenteredLoader />;
  }

  return (
    <header className="header">
      <div className="header_container header-content-header">
        <div onClick={() => navigate("/home")} className="header-logo">
          <img src="/logo.webp" alt="Website logo image" className="header-logo-image" />
        </div>
        <div className="header-navbar">
          <div className="header-navbar-top">
            <div className="header-navbar-top-item">
              <span className="background-icon">
                <Phone />
              </span>
              <span className="title">
                HOTLINE: <b>028 3810 6200</b>
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
              <InputSearch />
            </div>
          </div>
          <div className="header-navbar-bottom">
            <ul className="header-navbar-bottom-list">
              {listHeaderItem?.map((item: IHeaderItem, index: number) => (
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
                            <li onClick={() => navigate(`/category/${child.name}`)} key={i}
                                className="header-navbar-bottom-children-item">
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
                <User color={userStore.isAuthenticated ? "black" : ""} />
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
          <div className="header-account-item">
            <div className="header-account-item-handle">
              <span className="background-icon">
                <ShoppingCart onClick={() => navigate(CART_URL)} />
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
