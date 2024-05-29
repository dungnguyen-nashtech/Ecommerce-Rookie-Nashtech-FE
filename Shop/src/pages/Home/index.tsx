import { CreditCard, Heart, Package, PackageOpen, Settings } from "lucide-react";
import React, { useEffect } from "react";
import Slider, { Settings as SettingSilder } from "react-slick";
import { randomNumber } from "../../utils/randomNumber.ts";
import { QueryListCategory } from "../../services/queries/query-get.ts";
import { QuerySearchOneFilter } from "../../services/queries/query-search.ts";

const Home = () => {

  const querySearchOneFilterProduct = QuerySearchOneFilter();

  useEffect(() => {
    querySearchOneFilterProduct.mutate({
      field: "isFeatured",
      operator: "EQM",
      value: "true"
    });
  }, []);


  if (querySearchOneFilterProduct.isPending) {
    return <div>Loading...</div>;
  }

  const listCarousel: string[] = [
    "/slider_1.webp",
    "/slider_2.webp",
    "/slider_3.webp"
  ];

  const listCarousel1 = [
    {
      img: "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/2.png?v=1681111963803",
      title: "Áo nữ 1"
    },
    {
      img: "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/2.png?v=1681111963803",
      title: "Áo nữ 2"
    },
    {
      img: "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/2.png?v=1681111963803",
      title: "Áo nữ 3"
    }
  ];

  const listCategory: string[] = [
    "Áo nữ",
    "Quần nữ",
    "Áo Nam",
    "Quần Nam"
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
    // autoplay: true,
    slidesToShow: 4,
    centerPadding: "40px",

    slidesToScroll: 1,
    speed: 1000,
    arrows: true
  };
  return (
    <main className="main-content">
      <div className="main-content-slider">
        <Slider {...settings}>
          {
            listCarousel.map((item: string, index: number) => (
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
              listCarousel1.map((item, index: number) => (
                <div className="content-home-category-item" key={index}>
                  <div className="content-home-category-item-content">
                    <img src={item.img}
                         alt="banner image home page" className="image" />
                    <div className="name">
                      <span>{item.title}</span>
                      <span className="quantity-category">{randomNumber(5, 15)}</span>
                    </div>
                  </div>
                </div>))
            }
          </Slider>
        </div>
        <div className="content-home-heading">
          <h2 className="title">Sản Phẩm Bán Chạy</h2>
          <span className="line">

                    </span>
        </div>
        <div className="content-home-products">
          <Slider {...settingProducts}>
            {
              Array.from({ length: 5 }).map((_, index: number) => (
                <div className="item" key={index}>
                  <div className="content">
                    <div className="item-image">
                                        <span className="rank">
                                            #{index + 1}
                                          <span className="rank-ping">
                                            </span>
                                        </span>
                      <div className="item-image-bg">
                                                <span className="item">
                                                    <Settings />
                                                </span>
                        <span className="item">
                                                    <Heart className="wishList" />
                                                </span>
                      </div>
                      <img
                        src="https://bizweb.dktcdn.net/thumb/large/100/462/587/products/12-4d67873d-2641-4391-8b3d-b7a3699e9728.png?v=1698485974000"
                        alt="Product Image "
                        className="item-image-content"
                      />
                    </div>
                    <div className="item-content">
                      <h2 className="title">Quần dài nữ Yaki Jan.</h2>
                      <span className="price">
                                                450,000đ
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