import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import React from "react";

function createData(
  name: string,
  image: string,
  category: string,
  price: string,
  quantity: number,
  totalPrice: string
) {
  return { name, image, category, price, quantity, totalPrice };
}

const rows = [
  createData("Đầm nữ dài sad ád ád ádja odjpsa jopdjp odpo jaspjd poạd ọpasod da ád á dá psado jsao jopasjop", "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/1.png?v=1681111938193", "M / ĐEN", "230.000đ", 1, "300.000đ"),
  createData("Đầm nữ dài", "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/1.png?v=1681111938193", "M / ĐEN", "230.000đ", 1, "300.000đ"),
  createData("Đầm nữ dài", "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/1.png?v=1681111938193", "M / ĐEN", "230.000đ", 1, "300.000đ"),
  createData("Đầm nữ dài", "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/1.png?v=1681111938193", "M / ĐEN", "230.000đ", 1, "300.000đ")
];

export function OrderInfo() {
  return <>{
    <>
      {/*<Typography sx={{ fontSize: 26, fontWeight: 600, color: "#871b1b" }}>Mã đơn hàng:*/}
      {/*  #000{index + 1} - Ngày 12/04/2024 - 19:00</Typography>*/}
      <TableContainer component={Paper}
                      sx={{
                        mb: "90px",
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: "950px"
                      }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align={"center"} sx={{ minWidth: 170 }}>Tên Sản Phẩm</TableCell>
              <TableCell sx={{ minWidth: 170 }}>Giá</TableCell>
              <TableCell sx={{ minWidth: 170 }}>Số Lượng</TableCell>
              <TableCell sx={{ minWidth: 170 }}>Image</TableCell>
              <TableCell sx={{ minWidth: 170 }}>Ngày tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <h2>{row.name}</h2>
                      <h3>{row.category}</h3>
                    </div>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <h2>{row.name}</h2>
                      <h3>{row.category}</h3>
                    </div>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <h2>{row.name}</h2>
                      <h3>{row.category}</h3>
                    </div>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <img src={row.image} alt="" />
                    </div>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <h2>{row.name}</h2>
                      <h3>{row.category}</h3>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell component="th" scope="row" colSpan={4} sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between"
              }}>
                                                                <span>
                                                                    Tổng tiền :</span>
                <Typography sx={{ color: "#871b1b" }}>230.000đ</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Divider />
      </TableContainer>
    </>

  }</>;
}