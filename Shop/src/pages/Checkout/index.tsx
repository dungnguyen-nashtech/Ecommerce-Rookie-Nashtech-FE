import { Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { Banknote, ChevronLeft } from "lucide-react";
import { VNDCurrency } from "../../utils/functions.ts";
import { useCartStore } from "../../stores/cartStore.ts";
import { useUserStore } from "../../stores/userStore.ts";
import { QueryPostCreateOrder } from "../../services/queries/query-post.ts";
import { useNavigate } from "react-router";
import { QueryGetAddressByUserId } from "../../services/queries/query-get.ts";
import CenteredLoader from "../../components/Common/CenteredLoader.tsx";
import React from "react";
import { Link } from "react-router-dom";
import { PopupModal } from "../../components/Common/PopupModal.tsx";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const queryPostCreateOrder = QueryPostCreateOrder();

  const queryGetAddressByUserId = QueryGetAddressByUserId(userStore.user.id);

  const checkout = () => {
    const order = {
      totalQuantity: cartStore.totalQuantity,
      totalPrice: cartStore.totalPrice,
      userId: userStore.user.id
    };
    const orderDetails = [];
    cartStore.listCartItem.map((data) => {
      orderDetails.push({
        productId: data.productId,
        imageUrl: data.imageUrl,
        userId: userStore.user.id,
        productName: data.productName,
        quantity: data.quantity,
        price: data.price,
        description: data.description
      });
    });
    const orderSent = {
      order, orderDetails
    };

    cartStore.emptyCart();

    queryPostCreateOrder.mutate(orderSent, {
      onSuccess: (data) => {
        toast.info("Đặt hàng thành công");
        setTimeout(() => {
          navigate("/home");
        }, 1800);
      }
    });
  };

  if (queryGetAddressByUserId?.isLoading) {
    return <CenteredLoader />;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-container-info">
        <div className="checkout-container-content">
          <div className="checkout-container-content-logo">
            <img src="/logo.webp" alt="" />
          </div>

          <div className="checkout-container-content-info">
                        <span className="heading">
                            <h2>Thông tin mua hàng</h2>
                        </span>
            <div className="content">
              {queryGetAddressByUserId?.data === "" &&
                <h2>Bạn cần cập nhật địa chỉ trước khi mua hàng <Link to={"/info"}>tại đây</Link></h2>}
              {queryGetAddressByUserId?.data !== "" && <>
                <h2>ĐỊA CHỈ CỦA BẠN</h2>
                Quốc gia: {queryGetAddressByUserId?.data?.country}<br /><br />
                Tỉnh: {queryGetAddressByUserId?.data?.province}<br /><br />
                Thành phố: {queryGetAddressByUserId?.data?.city}<br /><br />
                Địa chỉ: {queryGetAddressByUserId?.data?.address}<br /><br />
                <h3 style={{ color: "red" }}>Sai địa chỉ, cập nhật <Link to={"/info"}>tại đây</Link></h3><br />
              </>
              }
              <TextField
                id="outlined-multiline-static"
                label="Ghi chú"
                multiline
                rows={4}
                placeholder="Nhắn nhủ shop tại đây"
              />
            </div>
          </div>
          <div className="checkout-container-content-shipping">
            <h2 className="heading">Vận chuyển</h2>
            <Stack direction="row" alignItems="center" justifyContent="space-between"
                   sx={{ mb: "20px" }}>
              <FormControlLabel checked={true} value="giaoHang" control={<Radio />} label="Giao hàng" />
              <span>{VNDCurrency(0)}</span>
            </Stack>
            <h2 className="heading">Giao hàng</h2>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={"cod"}
            >
              <Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: "20px" }}>
                  <FormControlLabel disabled={true} value="bank" control={<Radio />}
                                    label="Chuyển qua tài khoản ngân hàng hàng" />
                  <Banknote />
                </Stack>
                <p style={{
                  backgroundColor: "#f1f1f1",
                  borderRadius: "10px",
                  padding: "15px",
                  fontSize: "18px",
                  lineHeight: "25px"
                }}>
                  Quý khách vui lòng thanh toán qua số tài khoản: <br />

                  - Số Tài Khoản: 108317919999 (HSBC) <br />

                  - Chủ Tài Khoản: Dung Nguyen Nash

                </p>
              </Box>
              <Box>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: "20px" }}>
                  <FormControlLabel value="cod" control={<Radio />} label="Thanh toán khi nhận hàng (COD)" />
                  <Banknote />
                </Stack>
                <p style={{
                  backgroundColor: "#f1f1f1",
                  borderRadius: "10px",
                  padding: "15px",
                  fontSize: "18px",
                  lineHeight: "25px"
                }}>
                  Bạn chỉ phải thanh toán khi nhận được hàng

                </p>
              </Box>
            </RadioGroup>
            <Box className="checkout-container-order-total-mobile">
              <div className="item">
                <span>Tổng cộng</span>
                <span className="price">520.000đ</span>
              </div>
              <div className="item">
                            <span className="return">
                                <ChevronLeft />
                                <span>
                                    Quay về giỏ hàng
                                </span>
                            </span>
                <button>ĐẶT HÀNG</button>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <div className="checkout-container-order">
        <Typography variant="h6" sx={{ p: "15px 30px" }}>
          Đơn hàng ( 1 sản phẩm )
        </Typography>
        <Divider />
        <Box sx={{ p: "30px" }} className="checkout-container-order-list">
          {
            cartStore?.listCartItem.map((data, index: number) => (
              <div key={index} className="checkout-container-order-item">
                <div className="image">
                  <img
                    src={data.imageUrl}
                    alt="" />
                  <span className="quantity">
                                        {data.quantity}
                                    </span>
                </div>
                <div className="content">
                  <div className="name">
                    {data.productName}
                  </div>
                  <span className="category">
                                    {data.description}
                                    </span>
                </div>
                <div className="price">
                  {VNDCurrency(data.price * data.quantity)}
                </div>
              </div>
            ))
          }
        </Box>
        <Divider />
        <Box className="checkout-container-order-discount">
          <TextField size="small" id="outlined-basic" label="Nhập mã giảm giá" variant="outlined" />
          <div>
            <button>
              Áp dụng
            </button>

          </div>
        </Box>
        <Divider />
        <Box className="checkout-container-order-price">
          <div className="checkout-container-order-price-item">
            <span>Tạm tính</span>
            <span>{VNDCurrency(cartStore.totalPrice)}</span>
          </div>
          <div className="checkout-container-order-price-item">
            <span>Phí vận chuyển</span>
            <span>{VNDCurrency(0)}</span>
          </div>
        </Box>
        <Divider />
        <Box className="checkout-container-order-total">
          <div className="item">
            <span>Tổng cộng</span>
            <span className="price">{VNDCurrency(cartStore.totalPrice)}</span>
          </div>
          <br />
          <div className="item">
                        <span style={{ cursor: "pointer" }} onClick={() => navigate("/cart")} className="return">
                            <ChevronLeft />
                            <span>
                                Quay về giỏ hàng
                            </span>
                        </span>
            {cartStore.listCartItem.length != 0 && <button onClick={checkout}>ĐẶT HÀNG</button>}
          </div>
        </Box>
      </div>
      <PopupModal />
    </div>
  );
};

const OptionsList = [
  { title: "Option1", year: 1994 },
  { title: "Option2", year: 1972 }
];
export default Checkout;