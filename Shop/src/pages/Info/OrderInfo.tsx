import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { QueryGetOrderDetailsByUserId } from "../../services/queries/query-get.ts";
import { useUserStore } from "../../stores/userStore.ts";
import CenteredLoader from "../../components/Common/CenteredLoader.tsx";

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

export function OrderInfo() {

  const userStore = useUserStore();
  const queryGetOrderDetailsByUserId = QueryGetOrderDetailsByUserId(userStore.user.id);

  if (queryGetOrderDetailsByUserId.isLoading) {
    return <CenteredLoader />;
  }

  console.log(queryGetOrderDetailsByUserId);

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
              <TableCell sx={{ minWidth: 170 }}>Loại</TableCell>
              <TableCell sx={{ minWidth: 170 }}>Giá</TableCell>
              <TableCell sx={{ minWidth: 170 }}>Số Lượng</TableCell>
              <TableCell sx={{ minWidth: 170 }}>Image</TableCell>
              <TableCell sx={{ minWidth: 170 }}>Ngày tạo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {queryGetOrderDetailsByUserId?.data?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <h2>{row.productName}</h2>
                    </div>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <h3>{row.description}</h3>
                    </div>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <h2>{row.price}</h2>
                    </div>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <h2>{row.quantity}</h2>
                    </div>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <img src={row.imageUrl} alt="" />
                    </div>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="table-product-img">
                    <div>
                      <h2>{row.createdOn}</h2>
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
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Divider />
      </TableContainer>
    </>

  }</>;
}