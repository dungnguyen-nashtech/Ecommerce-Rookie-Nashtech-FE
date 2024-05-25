import React from "react";

import {
  Breadcrumbs, Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem, Rating,
  Select,
  Slider
} from "@mui/material";
import { ChevronRight, ChevronsLeft, ChevronsRight, Heart, Settings } from "lucide-react";
import CategoryItemChildren from "./CategoryItemChildren";
import { QueryListCategory } from "../../../services/queries/query-get.ts";
import { CreateCategoryMenu } from "../../../config/utils.ts";

export interface IItemCategory {
  id?: number,
  name: string,
  path: string,
  children?: IItemCategory[]
}

function LayoutProductFilter() {
  const [priceRange, setPriceRange] = React.useState<number[]>([300_000, 1_500_000]);
  const [value, setValue] = React.useState<number | null>(2);

  const queryListCategory = QueryListCategory();

  if (queryListCategory.isLoading) {
    return <div>Loading...</div>;
  }

  // const handleChange = (_event: Event, newValue: number | number[]) => {
  //   setPriceRange(newValue as number[]);
  // };

  return (
    <main className="main-content">
      <div className="main-content-breadcrumb">
        <div className="main-content-breadcrumb-list">
          <Breadcrumbs
            separator={<ChevronRight className="icon" />}
            aria-label="breadcrumb">
            <br />
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
                <div className="filter-list-item-option">
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

              <div className="filter-list-item">
                <h2 className="name">Màu sắc</h2>
                <div className="filter-list-item-option">
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Trắng" />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Đen " />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Hồng" />
                </div>
              </div>
              {/*  */}
              <div className="filter-list-item">
                <h2 className="name">Màu sắc</h2>
                <div className="filter-list-item-option">
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Trắng" />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Đen " />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Hồng" />
                </div>
              </div>
              <div className="filter-list-item">
                <h2 className="name">Màu sắc</h2>
                <div className="filter-list-item-option">
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Trắng" />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Đen " />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Hồng" />
                </div>
              </div>
              <div className="filter-list-item">
                <h2 className="name">Màu sắc</h2>
                <div className="filter-list-item-option">
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Trắng" />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Đen " />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Hồng" />
                </div>
              </div>
              <div className="filter-list-item">
                <h2 className="name">Màu sắc</h2>
                <div className="filter-list-item-option">
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Trắng" />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Đen " />
                  <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Hồng" />
                </div>
              </div>
              
              {/*  */}
            </div>
          </div>
          <div className="list-product-right">
            <div className="category-product-title">
              <h3 className="name">THỜI TRANG NỮ</h3>
              {/*<span className="icon-filter">*/}
              {/*  <ArrowDownNarrowWide />*/}
              {/*  <span>*/}
              {/*    Sắp xếp*/}
              {/*  </span>*/}
              {/*</span>*/}
            </div>
            <div className="list-product-filter-category">
              {
                Array.from({ length: 9 }).map((_, index: number) => (
                  <div className="item" key={index}>
                    <div className="item-image">
                      <div className="item-image-bg">
                        <span>
                          <Settings />
                        </span>
                        <span className="">
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
                      <h2 className="title">Quần dài nữ Yaki Jan Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Dolores at cum consectetur, ipsam qui quidem debitis tempore voluptate, voluptatibus
                        laudantium deleniti quae doloribus pariatur sit ullam quia ex dolor fugit.</h2>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(_, newValue) => {
                          setValue(newValue);
                        }}
                      />
                      <span style={{ marginLeft: "4px" }} className="price">
                         450,000đ
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="list-product-filter-pagination">
              <ul className="list-product-filter-pagination-list">
                <li className="list-product-filter-pagination-item">
                  <ChevronsLeft size={16} />
                </li>
                {
                  Array.from({ length: 3 }).map((_, index: number) => (
                    <li key={index} className="list-product-filter-pagination-item">
                      {index + 1}
                    </li>
                  ))
                }
                <li className="list-product-filter-pagination-item">
                  ...
                </li>
                <li className="list-product-filter-pagination-item active">
                  9
                </li>
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
