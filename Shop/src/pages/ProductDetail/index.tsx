import {
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
import { ChevronLeft, ChevronRight, Minus, Plus, Send } from "lucide-react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { QueryProductItemByProductId } from "../../services/queries/query-get.ts";
import { processProductItems, VNDCurrency } from "../../utils/functions.ts";
import { useCounter } from "@react-hookz/web";
import { useCartStore } from "../../stores/cartStore.ts";
import { QuerySearchOneFilter } from "../../services/queries/query-search.ts";
import { QueryCanUserComment } from "../../services/queries/query-post.ts";
import { useUserStore } from "../../stores/userStore.ts";
import Avatar from "@mui/material/Avatar";
import { Clear } from "@mui/icons-material";
import { QueryDeleteRating } from "../../services/queries/query-delete.ts";

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

const getProductByVariation = (products: any[], variationCombination: string) => {
  return products.find(product => product.variationCombination === variationCombination);
};

const ProductDetail = () => {
  const [quantityView, { inc: incMin, dec: decMin }] = useCounter(1, 100, 1);
  const [sizeView, setSizeView] = React.useState<string>("");
  const [colorView, setColorView] = React.useState<string>("");

  const [tab, setTab] = React.useState(0);
  const [valueStar, setValueStar] = React.useState<number | null>(0);
  const [imageView, setImageView] = React.useState<number>(0);

  const [productInfo, setProductInfo] = React.useState<any>({});
  const [selectedProductItem, setSelectedProductItem] = React.useState(null);

  const cartStore = useCartStore();
  const userStore = useUserStore();

  const { id: productId } = useParams();

  const queryProductItemByProductId = QueryProductItemByProductId(productId);
  const queryGetProductById = QuerySearchOneFilter();
  const queryCanUserComment = QueryCanUserComment();
  const queryDeleteRating = QueryDeleteRating();

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

  useEffect(() => {
    if (sizeView && colorView) {
      const variationCombination = `${sizeView}:${colorView}`;
      const productItem = getProductByVariation(queryProductItemByProductId?.data, variationCombination);
      setSelectedProductItem(productItem);
    }
  }, [sizeView, colorView]);

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
      imageUrl: productInfo.imageUrl
    });
  };

  const availableColors = sizeView != "" ? productItemFilter.current.combinationMap[sizeView] : [];
  console.log(productInfo);
  const deleteRating = (ratingId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this rating?");
    if (confirmed) {
      queryDeleteRating.mutate(ratingId, {
        onSuccess: async () => {
          window.location.reload();
        }
      });
    }
  };

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

            <span className="main-content-product-info-brand">
              Thương hiệu: Rubies Melodies
              <br /><br />
              Tình trạng: {
              selectedProductItem ?
                (selectedProductItem.availableStock > 0 ? "Còn hàng" : "Hết hàng")
                : ("Select item first")
            }
                        </span>
            <span className="main-content-product-info-star">
                            <Rating name="read-only" value={4} readOnly />
                            <span className="sub-title">{productInfo.averageRating}</span>
                        </span>
            <span className="main-content-product-info-price">
                            {selectedProductItem ? VNDCurrency(selectedProductItem.price) : "Select item first"}
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
            {selectedProductItem && quantityView > selectedProductItem.availableStock && "Vượt quá số lượng trong kho"}
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
                                </span>
              </div>
            </div>
            <span style={{ fontSize: "20px", color: "#484848" }}>
                            Trong kho: {selectedProductItem ? selectedProductItem.availableStock : "Select item first"}
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
                <Tab label="CHI TIẾT SẢN PHẨM" {...a11yProps(0)} />
                <Tab label="CHÍNH SÁCH ĐỔI TRẢ HÀNG" {...a11yProps(1)} />
                <Tab label="HƯỚNG DẪN DỬ DỤNG" {...a11yProps(2)} />
                <Tab label="ĐÁNH GIÁ VÀ BÌNH LUẬN" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tab} index={0}>
              Description: {productInfo.description} <br />
              Categories: {productInfo?.categories?.map(category => category.name).join(", ")}
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
              + Sản phẩm lỗi, hỏng do quá trình sản xuất hoặc vận chuyện <br />
              + Nằm trong chính sách đổi trả sản phẩm của shop<br />
              + Sản phẩm còn nguyên tem mác chưa qua sử dụng và chưa giặt là<br />
              + Thời gian đổi trả nhỏ hơn 15 ngày kể từ ngày nhận hàng<br />
              + Chi phí bảo hành về sản phẩm, vận chuyển khách hàng chịu chi phí<br />
              Điều kiện đổi trả hàng:<br />
              - Sản phẩm gửi lại phải còn nguyên đai nguyên kiện<br />
              - Phiếu bảo hành (nếu có) và tem của công ty trên sản phẩm còn nguyên vẹn.<br />
              - Sản phẩm đổi/ trả phải còn đầy đủ hộp, giấy Hướng dẫn sử dụng và chưa qua sử dụng.<br />
              - Quý khách chịu chi phí vận chuyển, đóng gói, thu hộ tiền, chi phí liên lạc tối đa tương đương 20% giá
              trị đơn hàng.
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={2}>
              Để mặc được áo khoác kéo khoá thì chúng mình phải xác định được phía trước, phía sau, mặt trái, mặt phải
              của áo. <br /> <br />Khi mặc áo đầu tiên cô sẽ cầm vào cổ áo và đúc lần lượt từng tay vào ống tay
              áo.<br /><br /> Sau
              đó cô
              sẽ cầm
              kéo 2 vạt áo để 2 vạt áo bằng nhau.<br /> <br />Tay trái cô giữ khóa tay kia cô khéo léo luồn nửa khóa bên
              kia
              vào đầu
              khóa, sau đó tay trái cô giữ chặt đầu khoá phía dưới. <br /><br /> Tay phải cô cầm lấy núm khoá và từ từ
              kéo
              khoá lên
              trên.
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={3}>
              <div className="review-content-list not-scroll-ui">
                {
                  productInfo?.ratings?.map((ratingOfProduct, index: number) => (
                    <div key={index} className="review-content-item">
                      <div className="review-content-image">
                        <Avatar alt="Remy Sharp" />
                      </div>
                      <div className="review-content-feedback">
                        <h2 className="name">Nguyễn Văn A</h2>
                        <Rating name="read-only" value={ratingOfProduct.ratingValue} readOnly />
                        <p className="feedback">
                          {ratingOfProduct.reviewValue}
                          {userStore.user.id === ratingOfProduct.userId &&
                            <Clear onClick={() => deleteRating(ratingOfProduct.id as string)}
                                   style={{ marginLeft: "1rem", cursor: "pointer" }} />
                          }
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className="review-content-input">
                {queryCanUserComment?.data == -1 ?
                  <span className="warning">Mỗi lần mua chỉ có thể bình luận 1 lần, có thể bạn đã bình luận cho tất cả lần mua</span>
                  :
                  <>
                    <div className="star">
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
                      <input type="text"
                             placeholder="Nhập bình luận tại đây" />
                      <Send className="icon" />
                    </div>
                  </>
                }

              </div>
            </CustomTabPanel>
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

export default ProductDetail;