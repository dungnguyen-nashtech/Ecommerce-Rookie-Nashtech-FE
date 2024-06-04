import { Box, Breadcrumbs, Tab, Tabs, TextField, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import React from "react";
import { AccountInfo } from "./AccountInfo.tsx";
import { AddressInfo } from "./Address.tsx";
import { OrderInfo } from "./OrderInfo.tsx";

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
                <OrderInfo />
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
