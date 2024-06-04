import { Rating } from "@mui/material";
import { CreditCard, Heart, Package, PackageOpen, Settings } from "lucide-react";
import React, { useEffect } from "react";
import Slider, { Settings as SettingSilder } from "react-slick";
import { QuerySearchOneFilter } from "../../services/queries/query-search.ts";
import { VNDCurrency } from "../../utils/functions.ts";
import { DEFAULT_IMAGE_PRODUCT } from "../../utils/constant.ts";
import { useNavigate } from "react-router";
import CenteredLoader from "../../components/Common/CenteredLoader.tsx";

const listCaurousel: string[] = [
  "/slider_1.webp",
  "/slider_2.webp",
  "/slider_3.webp"
];
const listCategory: any[] = [
  {
    name: "Quần nữ",
    img: "https://bizweb.dktcdn.net/thumb/large/100/462/587/products/hinh-san-pham-up-website-b71782cd-9bbb-4e82-9c5b-a1ef980bf36c.png?v=1668108227000"
  },
  {
    name: "Áo nữ",
    img: "https://bizweb.dktcdn.net/thumb/large/100/462/587/products/66c5d96c-04ab-478d-91f8-529f17a17f3e.png?v=1679418018000"
  },
  {
    name: "Váy dài",
    img: "https://bizweb.dktcdn.net/thumb/large/100/462/587/products/29-1dd6a935-d5de-4234-beee-bfbf480293f8.png?v=1717221145633"
  }
];
const settings: SettingSilder = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 1000,
  autoplay: true,
  arrows: false
};

const settingCategory: SettingSilder = {
  autoplay: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerPadding: "40px",
  speed: 1000,
  arrows: true
};
const settingProducts: SettingSilder = {
  slidesToShow: 4,
  centerPadding: "40px",
  slidesToScroll: 1,
  speed: 1000,
  arrows: true
};
const Home = () => {
  const navigate = useNavigate();

  const querySearchOneFilterProduct = QuerySearchOneFilter();
  useEffect(() => {
    querySearchOneFilterProduct.mutate({
        data: {
          field: "isFeatured",
          operator: "EQM",
          value: "true"
        },
        url: "/product/search"
      }
    );
  }, []);


  if (querySearchOneFilterProduct.isPending) {
    return <CenteredLoader />;
  }


  return (
    <main className="main-content">
      <div className="main-content-slider">
        <Slider {...settings}>
          {
            listCaurousel.map((item: string, index: number) => (
              <div className="main-content-slider-item" key={index}>
                <img src={`${item}`} alt="banner image home page" className="image" />
              </div>))
          }
        </Slider>
      </div>
      <div className="main-content-home">
        <div className="content-home-shipping">
          <div className="content-home-shipping-item">
            <Package size={32} />
            <div className="content">
              <h2>Vận chuyển <b>MIỄN PHÍ</b></h2>
              <h2>Trong khu vực <b>TP.HCM</b></h2>
            </div>
          </div>
          <div className="content-home-shipping-item">
            <CreditCard size={32} />
            <div className="content">
              <h2>Tích điểm Nâng hạng</h2>
              <b>THẺ THÀNH VIÊN</b>
            </div>
          </div>
          <div className="content-home-shipping-item">
            <CreditCard size={32} />
            <div className="content">
              <h2>Tiến hành <b>THANH TOÁN </b></h2>
              <h2>Với nhiều <b>PHƯƠNG THỨC</b></h2>
            </div>
          </div>
          <div className="content-home-shipping-item">
            <PackageOpen size={32} />
            <div className="content">
              <b>100% HOÀN TIỀN</b>
              <h2>nếu sản phẩm lỗi</h2>
            </div>
          </div>
        </div>
        <div className="content-home-category">
          <Slider {...settingCategory}>
            {
              listCategory.map((item: any, index: number) => (
                <div className="content-home-category-item" key={index}>
                  <div className="content-home-category-item-content">
                    <img src={item.img}
                         alt="banner image home page" className="image" />
                    <div className="name">
                      <span className="name">{item?.name}</span>
                    </div>
                  </div>
                </div>))
            }
          </Slider>
        </div>
        <div className="content-home-heading">
          <h2 className="title">Sản Phẩm Bán Chạy</h2>
          <span className="line"></span>
        </div>
        <div className="content-home-products">
          <Slider {...settingProducts}>

            {
              querySearchOneFilterProduct?.isSuccess && querySearchOneFilterProduct.data.map((productItem, index: number) => (
                <div className="item" key={index}>
                  <div className="content">
                    <div className="item-image">
                                        <span className="rank">
                                            #{index + 1}
                                          <span className="rank-ping">
                                            </span>
                                        </span>
                      <div className="item-image-bg">
                                                <span onClick={() => navigate(`/product/${productItem.id}`)}
                                                      className="item">
                                                    <Settings />
                                                </span>
                        <span className="item">
                                                    <Heart className="wishList" />
                                                </span>
                      </div>
                      <img
                        src={productItem?.imageUrl ?
                          productItem?.imageUrl :
                          DEFAULT_IMAGE_PRODUCT
                        }
                        alt="Product Image "
                        className="item-image-content"
                      />
                    </div>
                    <div className="item-content">
                      <h2 className="title">{productItem.name}</h2>
                      <span className="price">
                                                <span>{VNDCurrency(productItem.price)} | </span> <Rating
                        name="read-only" value={productItem.averageRating}
                        readOnly />
                                            </span>
                    </div>
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>

      </div>
      <div className="bg-img-sub-footer">
        <img
          src="https://bizweb.dktcdn.net/100/462/587/themes/880841/assets/bg_banner_big.jpg?1713177410075"
          alt="bg sub footer" className="image" />
      </div>
    </main>
  );
};
export default Home;