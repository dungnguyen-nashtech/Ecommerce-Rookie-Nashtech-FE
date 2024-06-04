import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import { CONSTANT_PROVINCE } from "../../utils/addres_constants/province.ts";
import { getDistrictsByProvinceCode } from "../../utils/addres_constants/getDistrictsByProvinceCode.ts";
import { useInput } from "../../utils/useInput.ts";
import { useUserStore } from "../../stores/userStore.ts";
import { QueryPostCreateAddressForUser } from "../../services/queries/query-post.ts";
import { QueryGetAddressByUserId } from "../../services/queries/query-get.ts";
import CenteredLoader from "../../components/Common/CenteredLoader.tsx";

function findProvinceNameByCode(code: string): string | undefined {
  const province = CONSTANT_PROVINCE.data.data.find(item => item.code === code);
  return province ? province.name : undefined;
}

export function AddressInfo() {
  const [provinceCode, setProvinceCode] = useState<string>("");
  const [districtValue, setDistrictValue] = useState<string>("");
  const addressInput = useInput("");

  const userStore = useUserStore();


  const queryPostCreateAddressForUser = QueryPostCreateAddressForUser();
  const queryGetAddressByUserId = QueryGetAddressByUserId(userStore.user.id);


  const districtsByProvince = useMemo(() => {
    return getDistrictsByProvinceCode(provinceCode);
  }, [provinceCode]);

  const submitAddress = () => {
    const addressSend: any = {
      country: "Việt Nam",
      province: findProvinceNameByCode(provinceCode),
      city: districtValue,
      address: addressInput.value,
      userId: userStore.user.id
    };
    queryPostCreateAddressForUser.mutate(addressSend, {
      onSuccess: () => {
        alert("Thêm địa chỉ thành công");
      },
      onError: () => {
        alert("Thêm địa chỉ thất bại");
      }

    });
  };

  if (queryGetAddressByUserId?.isLoading) {
    return <CenteredLoader />;
  }

  console.log(queryGetAddressByUserId?.data);

  return (
    <>

      {queryGetAddressByUserId?.data !== "" && <>
        <h2>ĐỊA CHỈ CỦA BẠN</h2>
        Quốc gia: {queryGetAddressByUserId?.data?.country}<br />
        Tỉnh: {queryGetAddressByUserId?.data?.province}<br />
        Thành phố: {queryGetAddressByUserId?.data?.city}<br />
        Địa chỉ: {queryGetAddressByUserId?.data?.address}<br />
      </>}
      <div>
        <div style={{
          display: "flex",
          flexDirection: "column", gap: "4px",
          marginTop: "30px"
        }}>
          <InputLabel id="demo-simple-select-standard-label">Quốc Gia</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            sx={{ width: "400px" }}
            value={"Việt Nam"}
            label="Age"
          >
            <MenuItem value={"Việt Nam"}>{"Việt Nam"}</MenuItem>
          </Select>

          <InputLabel id="demo-simple-select-standard-label">Tỉnh</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            sx={{ width: "400px" }}
            onChange={(event: any) => setProvinceCode(event?.target?.value)}
            label="Age"
          >
            {CONSTANT_PROVINCE?.data?.data?.map((item, index) =>
              <MenuItem
                key={index} value={item.code}>
                {item.name}
              </MenuItem>
            )}
          </Select>

          <InputLabel id="demo-simple-select-standard-label">Thành Phố</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            sx={{ width: "400px" }}
            onChange={(event: any) => setDistrictValue(event?.target?.value)}
            label="Age"
          >
            {districtsByProvince?.map((item, index) =>
              <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
            )}
          </Select>
          <br />
          <TextField
            {...addressInput}
            required
            id="filled-required"
            label="Địa Chỉ"
            variant="standard"
            sx={{
              width: "400px"
            }}
          />
        </div>
      </div>
      <button style={{
        backgroundColor: "#871b1b",
        borderRadius: "5px",
        padding: "10px 30px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        width: "auto",
        marginTop: "50px",
        border: "none"
      }}
              onClick={submitAddress}
      >
        {queryGetAddressByUserId?.data === "" ? "Thêm địa chỉ" : "Update địa chỉ"}
      </button>
    </>
  );
}