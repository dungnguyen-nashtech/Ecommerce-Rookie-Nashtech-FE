import {
  Box,
  Breadcrumbs,
  Divider,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import { ChevronRight } from "lucide-react";
import React from "react";
import { AccountInfo } from "./AccountInfo.tsx";
import { AddressInfo } from "./Address.tsx";

const breadcrumbs: JSX.Element[] = [
  <span className="breadcrumb-item">
            Trang chủ
        </span>,
  <span className="breadcrumb-item active">
            Trang khách hàng
        </span>
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{
        width: "100%"
      }}
    >
      {value === index && (
        <Box className="not-scroll-ui" sx={{
          p: 3,
          overflowY: "scroll",
          height: 400,
          width: "100%"
        }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

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
  createData("Đầm nữ dài", "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/1.png?v=1681111938193", "M / ĐEN", "230.000đ", 1, "300.000đ"),
  createData("Đầm nữ dài", "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/1.png?v=1681111938193", "M / ĐEN", "230.000đ", 1, "300.000đ"),
  createData("Đầm nữ dài", "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/1.png?v=1681111938193", "M / ĐEN", "230.000đ", 1, "300.000đ"),
  createData("Đầm nữ dài", "https://bizweb.dktcdn.net/thumb/large/100/462/587/collections/1.png?v=1681111938193", "M / ĐEN", "230.000đ", 1, "300.000đ")
];

const Info = (): JSX.Element => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        <div className="main-content-info">
          <div className="main-content-info-tabs">
            <Box
              sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: 500 }}
            >
              <div style={{ width: "200px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 40, width: "200px" }}>
                </div>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
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
                  <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
                  <Tab label="Đơn hàng của bạn" {...a11yProps(1)} />
                  <Tab label="Đổi mật khẩu" {...a11yProps(2)} />
                  <Tab label="Sổ địa chỉ" {...a11yProps(3)} />
                </Tabs>

              </div>
              <TabPanel value={value} index={0}>
                <AccountInfo />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <h2>ĐƠN HÀNG CỦA BẠN</h2>
                {

                  Array.from({ length: 5 }).map((_, index: number) => (
                    <>
                      <Typography sx={{ fontSize: 26, fontWeight: 600, color: "#871b1b" }}>Mã đơn hàng:
                        #000{index + 1} - Ngày 12/04/2024 - 19:00</Typography>
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
                              <TableCell sx={{ minWidth: 170 }}>Thông tin sản phẩm</TableCell>
                              <TableCell sx={{ minWidth: 170 }}>Thông tin sản phẩm</TableCell>
                              <TableCell sx={{ minWidth: 170 }}>Thông tin sản phẩm</TableCell>
                              <TableCell sx={{ minWidth: 170 }}>Thông tin sản phẩm</TableCell>
                              <TableCell sx={{ minWidth: 170 }}>Thông tin sản phẩm</TableCell>
                              <TableCell sx={{ minWidth: 170 }} align="right">Đơn giá</TableCell>
                              <TableCell sx={{ minWidth: 170 }} align="right">Số lượng </TableCell>
                              <TableCell sx={{ minWidth: 170 }} align="right">THÀNH TIỀN</TableCell>
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
                                    <img src={row.image} alt="" />
                                    <div>
                                      <h2>{row.name}</h2>
                                      <h3>{row.category}</h3>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <div className="table-product-img">
                                    <img src={row.image} alt="" />
                                    <div>
                                      <h2>{row.name}</h2>
                                      <h3>{row.category}</h3>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <div className="table-product-img">
                                    <img src={row.image} alt="" />
                                    <div>
                                      <h2>{row.name}</h2>
                                      <h3>{row.category}</h3>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <div className="table-product-img">
                                    <img src={row.image} alt="" />
                                    <div>
                                      <h2>{row.name}</h2>
                                      <h3>{row.category}</h3>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  <div className="table-product-img">
                                    <img src={row.image} alt="" />
                                    <div>
                                      <h2>{row.name}</h2>
                                      <h3>{row.category}</h3>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell align="right">
                                  {row.price}
                                </TableCell>
                                <TableCell align="right">
                                  {row.quantity}
                                </TableCell>
                                <TableCell align="right">
                                  {row.totalPrice}
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

                  ))
                }
              </TabPanel>
              <TabPanel value={value} index={2}>
                <h2>ĐỔI MẬT KHẨU</h2>
                <div>
                  <h3>Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu khó đoán</h3>
                  <div style={{
                    display: "flex",
                    flexDirection: "column", gap: "20px",
                    marginTop: "30px"
                  }}>
                    <TextField
                      required
                      id="filled-required"
                      label="Mật khẩu cũ"
                      variant="standard"
                      sx={{
                        width: "400px"
                      }}
                    />
                    <TextField
                      required
                      id="filled-required"
                      label="Mật khẩu mới"
                      variant="standard"
                      sx={{
                        width: "400px"
                      }}
                    />
                    <TextField
                      required
                      id="filled-required"
                      label="Xác nhận mật khẩu"
                      variant="standard"
                      sx={{
                        width: "400px"
                      }}
                    />
                    <button style={{
                      backgroundColor: "black",
                      borderRadius: "5px",
                      padding: "10px 0",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      width: "300px"
                    }}>
                      ĐẶT LẠI MẬT KHẨU
                    </button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <AddressInfo />
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Info;
