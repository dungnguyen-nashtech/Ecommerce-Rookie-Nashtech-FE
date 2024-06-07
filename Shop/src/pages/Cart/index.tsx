import {
  Breadcrumbs,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { ChevronRight, Truck } from "lucide-react";
import React from "react";
import { useCartStore } from "../../stores/cartStore.ts";
import { VNDCurrency } from "../../utils/functions.ts";
import { useNavigate } from "react-router";
import { CHECKOUT_URL } from "../../utils/urls.ts";

const breadcrumbs: JSX.Element[] = [
  <span className="breadcrumb-item">
            Trang chủ
        </span>,
  <span className="breadcrumb-item active">
            Giỏ hàng
        </span>
];

const Cart = (): JSX.Element => {
  const cartStore = useCartStore();

  const navigate = useNavigate();

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
        <div className="main-content-heading-cart">
          GIỎ HÀNG CỦA BẠN
        </div>
        <div className="main-cart-content">
          <div className="main-cart-content-products">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Thông tin sản phẩm</TableCell>
                    <TableCell align="right">Đơn giá</TableCell>
                    <TableCell align="right">Số lượng </TableCell>
                    <TableCell align="right">THÀNH TIỀN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartStore?.listCartItem.map((row) => (
                    <TableRow
                      key={row.productName}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div className="table-product-img">
                          <img src={row.imageUrl} alt="" />
                          <div>
                            <h2>{row.productName}</h2>
                            <h3>{row.price}</h3>
                            <span onClick={() => cartStore.removeProductItemFromCart(row.productName, row.description)}
                                  style={{ outline: "1px solid blue", padding: "1px 2px" }} className="remove">
                                                            Xóa
                                                        </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {VNDCurrency(row.price)}
                      </TableCell>
                      <TableCell align="right">
                        <div className="quantity-product">
                          <button onClick={() => cartStore.decrementProductQuantity(row.productName, row.description)}
                                  className="minus">
                            -
                          </button>
                          <input type="text" value={row.quantity} />
                          <button onClick={() => cartStore.incrementProductQuantity(row.productName, row.description)}
                                  className="plus">
                            +
                          </button>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {VNDCurrency(row.price * row.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="product-total-price">
              <Button>Xoá tất cả</Button>
              <div className="product-total-buy">
                                                <span className="price">
                                    <h2>TỔNG SỐ LƯỢNG</h2>
                                    <span>
                                        {cartStore.totalQuantity}
                                    </span>
                                </span>
                <span className="price">
                                    <h2>TỔNG TIỀN</h2>
                                    <span>
                                        {VNDCurrency(cartStore.totalPrice)}
                                    </span>
                                </span>
                <button onClick={() => navigate(CHECKOUT_URL)}>
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
          <div className="main-cart-content-discounts">
            <div className="box">
              <div className="heading">
                                <span className="title">
                                        <b>PREE SHIP HCM</b>
                                        <h3>Freeship cho đơn hàng từ 999k</h3>
                                </span>
                <Truck size={32} color="#c2dfff" />
              </div>
              <div className="discount-code">
                <span>FREEFOREVER</span>
                <button>
                  coppy
                </button>
              </div>

            </div>
            <div className="box">
              <div className="heading">
                                <span className="title">
                                        <b>PREE SHIP HN</b>
                                        <h3>Freeship cho đơn hàng từ 999k</h3>
                                </span>
                <Truck size={32} color="#c2dfff" />
              </div>
              <div className="discount-code">
                <span>FREEFOREVER</span>
                <button>
                  coppy
                </button>
              </div>

            </div>
            <div className="box">
              <div className="heading">
                                <span className="title">
                                        <b>PREE SHIP ĐN</b>
                                        <h3>Freeship cho đơn hàng từ 999k</h3>
                                </span>
                <Truck size={32} color="#c2dfff" />
              </div>
              <div className="discount-code">
                <span>FREEFOREVER</span>
                <button>
                  coppy
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
};
export default Cart;