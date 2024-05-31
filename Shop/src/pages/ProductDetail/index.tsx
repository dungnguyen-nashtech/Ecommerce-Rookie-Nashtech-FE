import {
  Avatar,
  Box,
  Breadcrumbs,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, Send, Settings } from "lucide-react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Slider, { Settings as SettingSilder } from "react-slick";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { QueryProductItemByProductId } from "../../services/queries/query-get.ts";
import { processProductItems } from "../../utils/functions.ts";
import { useCounter } from "@react-hookz/web";
import { useCartStore } from "../../stores/cartStore.ts";
import { QuerySearchOneFilter } from "../../services/queries/query-search.ts";
import { QueryCanUserComment } from "../../services/queries/query-post.ts";
import { useUserStore } from "../../stores/userStore.ts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const breadcrumbs = [
  <span className="breadcrumb-item">
            Trang chủ
        </span>,
  <span className="breadcrumb-item">
            Phụ kiện áo
        </span>,
  <span className="breadcrumb-item active">
            Phụ kiện áo cho nữ 2024
        </span>
];

const listImagesView: string[] = [
  "/view1.webp",
  "/view2.webp",
  "/view3.webp",
  "/view4.webp"
];

const ProductDetail = () => {
  const [quantityView, { inc: incMin, dec: decMin }] = useCounter(1, 100, 1);
  const [sizeView, setSizeView] = React.useState<string>("");
  const [colorView, setColorView] = React.useState<string>("");

  const [tab, setTab] = React.useState(0);
  const [valueStar, setValueStar] = React.useState<number | null>(0);
  const [imageView, setImageView] = React.useState<number>(0);

  const [productInfo, setProductInfo] = React.useState<any>({});

  const cartStore = useCartStore();
  const userStore = useUserStore();

  const { id: productId } = useParams();
  const queryProductItemByProductId = QueryProductItemByProductId(productId);
  const queryGetProductById = QuerySearchOneFilter();
  const queryCanUserComment = QueryCanUserComment();

  useEffect(() => {
    queryGetProductById.mutate({
        data: {
          field: "id",
          operator: "EQM",
          value: productId
        },
        url: "/product/search"
      }, {
        onSuccess: (data) => {
          setProductInfo(data[0]);
        }
      }
    );
    queryCanUserComment.mutate({
      productId: productId,
      userId: userStore.user.id
    });
  }, []);

  const productItemFilter = useRef(null);

  if (queryProductItemByProductId.isLoading) {
    return <div>Loading...</div>;
  }
  productItemFilter.current = processProductItems(queryProductItemByProductId?.data);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSizeView(event.target.value);
  };
  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorView(event.target.value);
  };
  const addToCart = () => {
    if (sizeView === "" || colorView === "") {
      return alert("Vui lòng chọn kích thước và màu sắc sản phẩm");
    }
    cartStore.addProductItemToCart({
      productId: productId,
      productName: productInfo?.name,
      quantity: quantityView,
      price: 123,
      description: sizeView + ":" + colorView,
      imageUrl: "https://bizweb.dktcdn.net/thumb/large/100/462/587/products/8-95409926-002a-4dd4-887b-c7dcd9d1d2f6.png?v=1715753763243"
    });
    console.log(quantityView, sizeView, colorView);
  };

  const availableColors = sizeView != "" ? productItemFilter.current.combinationMap[sizeView] : [];


  return (
    <main className="main-content">
      <div className="main-content-breadcrumb">
        <div className="main-content-breadcrumb-list">
          <Breadcrumbs
            separator={<ChevronRight className="icon" />}
            aria-label="breadcrumb"

          >
            {breadcrumbs}
          </Breadcrumbs>
        </div>
      </div>
      <div className="main-content-container">
        <div className="main-content-product">
          <div className="main-content-product-image">
            <div className="view-main">
                            <span
                              className="icon pre"
                              onClick={() => {
                                setImageView((pre) => pre === 0 ? listImagesView.length - 1 : pre - 1);
                                console.log(imageView);
                              }}
                            >
                                <ChevronLeft size={32} />
                            </span>
              <span
                className="icon next"
                onClick={() => setImageView((pre) => pre === listImagesView.length - 1 ? 0 : pre + 1)}
              >
                                <ChevronRight size={32} />
                            </span>
              <div
                className="view-main-image"
                style={{
                  backgroundImage: `url(${listImagesView[imageView]})`
                }}

              />
            </div>
            <div className="view-subs">
              {
                listImagesView.map((item: string, index: number) => (
                  <div
                    key={index}
                    className={`view-subs-item ${index === imageView && "active"}`}
                    onClick={() => setImageView(index)}
                  >
                    <div
                      className="view-subs-item-image"
                      style={{
                        backgroundImage: `url(${item})`
                      }}

                    />
                  </div>

                ))
              }
            </div>
          </div>
          <div className="main-content-product-info">
            <h2 className="main-content-product-info-name">
              {productInfo?.name}
            </h2>
            <span className="main-content-product-info-id">
                            Mã:  RR24KB05-S-DAIODF3FDOJGNVIO
                        </span>
            <span className="main-content-product-info-brand">
                            Thương hiệu: Rubies Rubies   |   Tình trạng: Còn hàng
                        </span>
            <span className="main-content-product-info-star">
                            <Rating name="read-only" value={4} readOnly />
                            <span className="sub-title">4/5</span>
                        </span>
            <span className="main-content-product-info-price">
                            780.000₫
                        </span>
            <Divider />
            <div className="main-content-product-info-sizes">
                            <span className="title">
                                Kích thước: {sizeView}
                            </span>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleChangeSize}
              >
                {productItemFilter?.current.sizes.map((item: string, index: number) => (
                  <FormControlLabel value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </div>
            <div className="main-content-product-info-colors">
                            <span className="title">
                                Màu sắc: {colorView}
                            </span>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleChangeColor}
              >
                {availableColors?.map((item: string, index: number) => (
                  <FormControlLabel value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </div>
            <br />
            <div className="main-content-product-info-quantity">
              <div className="quantity-product">
                <span onClick={() => decMin(1)} className="btn minus"><Minus /></span>
                <input type="text" value={quantityView} />
                <span onClick={() => incMin(1)} className="btn plus"><Plus /></span>
              </div>
              <div className="add-product">
                <button onClick={addToCart} className="add-product-btn">THÊM VÀO GIỎ HÀNG</button>
                <span className="add-product-wishlist">
                                    <FavoriteBorderIcon />
                  {/* <FavoriteIcon/> */}
                                </span>
              </div>
            </div>
            <span style={{ fontSize: "20px", color: "#484848" }}>
                            Trong kho: 231
                        </span>
          </div>
          <div className="main-content-product-detail">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs

                value={tab}

                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#871b1b"
                  }
                }}

                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                  borderRight: 1,
                  borderColor: "divider",
                  "& button ": {
                    bgcolor: "white",
                    color: "#6d6d6d"
                  },
                  "& button.Mui-selected": {
                    color: "#871b1b"
                  }
                }}
              >
                <Tab label="CHI TIẾT SIZE SẢN PHẨM" {...a11yProps(0)} />
                <Tab label="CHÍNH SÁCH ĐỔI TRẢ HÀNG" {...a11yProps(1)} />
                <Tab label="HƯỚNG DẪN DỬ DỤNG" {...a11yProps(2)} />
                <Tab label="ĐÁNH GIÁ VÀ BÌNH LUẬN" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tab} index={0}>
              Nội dụng để vào đây
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Nunc sed blandit libero volutpat sed. Non curabitur gravida arcu ac tortor dignissim.
              Suscipit tellus mauris a diam. Blandit aliquam etiam erat velit scelerisque.
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Nunc sed blandit libero volutpat sed. Non curabitur gravida arcu ac tortor dignissim.
              Suscipit tellus mauris a diam. Blandit aliquam etiam erat velit scelerisque.
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Nunc sed blandit libero volutpat sed. Non curabitur gravida arcu ac tortor dignissim.
              Suscipit tellus mauris a diam. Blandit aliquam etiam erat velit scelerisque.
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Nunc sed blandit libero volutpat sed. Non curabitur gravida arcu ac tortor dignissim.
              Suscipit tellus mauris a diam. Blandit aliquam etiam erat velit scelerisque.
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={2}>
              Nội dung để vào đây
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={3}>
              <div className="review-content-list not-scroll-ui">
                {
                  Array.from({ length: 5 }).map((_, index: number) => (
                    <div key={index} className="review-content-item">
                      <div className="review-content-image">
                        <Avatar>N</Avatar>
                      </div>
                      <div className="review-content-feedback">
                        <h2 className="name">Nguyễn Văn A</h2>
                        <Rating name="read-only" value={4} readOnly />
                        <p className="feedback">
                          Đây là 1 bình luận của khách hàng
                        </p>
                        <div className="image">
                          <img
                            src="https://bizweb.dktcdn.net/thumb/large/100/462/587/products/12-4d67873d-2641-4391-8b3d-b7a3699e9728.png?v=1698485974000"
                            alt="Product Image "
                          />
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="review-content-input">
                <div className="star">
                  {!queryCanUserComment?.data &&
                    <span className="warning">Mỗi lần mua chỉ có thể bình luận 1 lần, có thể bạn đã bình luận cho tất cả lần mua</span>}
                  <span className="name">Đánh giá sản phẩm</span>
                  <Rating
                    name="simple-controlled"
                    value={valueStar}
                    onChange={(_event, newValue) => {
                      setValueStar(newValue);
                    }}
                  />
                </div>
                <div className="feedback">
                  <input disabled={queryCanUserComment?.data != null} type="text"
                         placeholder="Nhập bình luận tại đây" />
                  <Send className="icon" />

                </div>
              </div>
            </CustomTabPanel>
          </div>
          <div className="main-content-product-related">
            <div className="content-product-related-heading">
              <h2 className="title">Sản Phẩm Bán Chạy</h2>
              <span className="line">

                            </span>
            </div>
            <div className="content-product-related-products">
              <Slider {...settingProducts}>

                {
                  Array.from({ length: 9 }).map((_, index: number) => (
                    <div className="item" key={index}>
                      <div style={{ width: "100%", padding: "0 10px" }}>
                        <div className="item-image">
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
                          <h2 className="title">Quần dài nữ Yaki Jan </h2>
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
        </div>
      </div>
    </main>
  );
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const settingProducts: SettingSilder = {
  // autoplay: true,
  slidesToShow: 4,
  centerPadding: "50px",

  slidesToScroll: 1,
  speed: 1000,
  arrows: true
};

export default ProductDetail;