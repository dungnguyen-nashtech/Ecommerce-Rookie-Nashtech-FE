import React from "react";

import {
  Breadcrumbs,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider
} from "@mui/material";
import { ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import CategoryItemChildren from "./CategoryItemChildren.tsx";
import { ProductCard } from "../../components/ProductCard";
import { VNDCurrency } from "../../utils/functions.ts";
import CenteredLoader from "../../components/Common/CenteredLoader.tsx";
import { QueryAllProduct, QueryListCategory } from "../../services/queries/query-get.ts";
import { CreateCategoryMenu } from "../../config/utils.ts";

export interface IItemCategory {
  id?: number
  name: string,
  path: string,
  children?: IItemCategory[]
}

const breadcrumbs: JSX.Element[] = [
  <span className="breadcrumb-item">
      Trang chủ
    </span>,
  <span className="breadcrumb-item active">
      Thời trang Nữ
    </span>
];
const SIZE_FILTER = ["ALL", "XS", "S", "M", "L", "XL"];
const COLOR_FILTER = ["ALL", "Trắng", "Đen", "Hồng Nhạt", "Cam Nhạt", "Da Đậm", "Nâu", "Xanh Lá", "Tím Nhạt", "Xám", "Đỏ"];

function LayoutProductFilter() {
  const [priceRange, setPriceRange] = React.useState<number[]>([100_000, 1_500_000]);
  const queryListCategory = QueryListCategory();
  const queryAllProduct = QueryAllProduct();

  if (queryListCategory.isLoading || queryAllProduct.isLoading) {
    return <CenteredLoader />;
  }
  console.log(queryAllProduct?.data);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
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
        <div className="main-content-product-filter">
          <div className="filter-product-left">
            <div className="filter-product-left-category">
              <h2 className="title">DANH MỤC SẢN PHẨM</h2>
              <ul className="category-list">
                {
                  CreateCategoryMenu(queryListCategory?.data)?.map((item: IItemCategory) => (
                    <CategoryItemChildren key={item.id} item={item} itemChildren={item.children} />
                  ))
                }
              </ul>
            </div>
            <div className="filter-list">
              <div className="filter-list-item">
                <h2 className="name">Nơi bán</h2>
                <div className="filter-list-item-option">
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="TP.Hồ Chí Minh" />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="TP.Hà Nội" />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="TP.Đà Nẵng" />
                </div>
              </div>
              <div className="filter-list-item">
                <h2 className="name">Chọn mức giá </h2>
                <div className="filter-list-item-option filter-list-item-price">
                  <Slider
                    value={priceRange}
                    onChange={handleChange}
                    valueLabelDisplay={"on"}
                    step={100_000}
                    getAriaValueText={(value: number) => `${value} VNĐ`}
                    min={300_000}
                    max={1_500_000}
                  />
                  {VNDCurrency(priceRange[0])} - {VNDCurrency(priceRange[1])}
                </div>
              </div>
              <div className="filter-list-item">
                <h2 className="name">Màu sắc</h2>
                <div className="filter-list-item-option">
                  <FormControl style={{ marginTop: "0.7rem" }} fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={"ALL"}
                    >
                      {COLOR_FILTER.map((color: string, index) => (
                        <MenuItem key={index} value={color}>{color}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="filter-list-item">
                <h2 className="name">KÍCH CỠ</h2>
                <div className="filter-list-item-option">
                  <FormControl style={{ marginTop: "0.7rem" }} fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={"ALL"}
                    >
                      {SIZE_FILTER.map((size: string, index) => (
                        <MenuItem key={index} value={size}>{size}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="filter-list-item">
                <h2 className="name">SẮP XẾP</h2>
                <div style={{ marginTop: "1.5rem" }} className="filter-list-item-option">
                  <FormControl fullWidth>
                    <InputLabel id="sort-label">Sắp Xếp</InputLabel>
                    <Select
                      labelId="sort-label"
                      id="sort-label-select"
                      value={10}
                      label="Sắp Xếp"
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Ngày tạo</MenuItem>
                      <MenuItem value={20}>Ngày cập nhật</MenuItem>
                      <MenuItem value={30}>Tên</MenuItem>
                      <MenuItem value={40}>Giá</MenuItem>
                      <MenuItem value={50}>Đánh giá</MenuItem>
                      <MenuItem value={60}>Nổi bật</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl style={{ marginTop: "10px" }} fullWidth>
                    <InputLabel id="sort-label">Loại</InputLabel>
                    <Select
                      labelId="sort-label"
                      id="sort-label-select"
                      value={20}
                      label="Loại"
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Tăng dần</MenuItem>
                      <MenuItem value={20}>Giảm dần</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Button>Xoá sắp xếp</Button>
              </div>

            </div>
          </div>
          <div className="list-product-right">
            <div className="category-product-title">
              <h3 className="name">THỜI TRANG NỮ</h3>

            </div>
            <div className="list-product-filter-category">
              {
                queryAllProduct?.data.map((productGet: any, index: number) => (
                  <ProductCard product={productGet} index={index} />
                ))
              }
            </div>
            <div className="list-product-filter-pagination">
              <ul className="list-product-filter-pagination-list">
                <li className="list-product-filter-pagination-item">
                  <ChevronsLeft size={16} />
                </li>
                {
                  Array.from({ length: 1 }).map((_, index: number) => (
                    <li key={index} className="list-product-filter-pagination-item active">
                      {index + 1}
                    </li>
                  ))
                }
                {/*<li className="list-product-filter-pagination-item">*/}
                {/*  ...*/}
                {/*</li>*/}
                {/*<li className="list-product-filter-pagination-item active">*/}
                {/*  9*/}
                {/*</li>*/}
                <li className="list-product-filter-pagination-item">
                  <ChevronsRight size={16} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LayoutProductFilter;
