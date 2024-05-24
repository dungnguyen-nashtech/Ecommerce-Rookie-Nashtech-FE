import React from 'react';

import { Breadcrumbs, Checkbox, FormControlLabel, Slider } from "@mui/material";
import { ArrowDownNarrowWide, ChevronRight, ChevronsLeft, ChevronsRight, Heart, Settings } from "lucide-react";
import CategoryItemChildren from './CategoryItemChildren';

export interface IItemCategory {
  name: string,
  path: string,
  children?: IItemCategory[]
}

function LayoutProductFilter() {
  const [value, setValue] = React.useState<number[]>([20, 37]);
  const listCategory: IItemCategory[] = [
    {
      name: "Sản phẩm mới",
      path: ""
    },
    {
      name: "Sản phẩm hay mua",
      path: ""
    },
    {
      name: "Áo nữ",
      path: "",
      children: [
        {
          name: "Áo thun nữ",
          path: ""
        },
        {
          name: "Áo sơ mi nữ",
          path: ""
        }, {
          name: "Áo kiểu nữ",
          path: ""
        }
      ]
    },
    {
      name: "Áo nữ",
      path: "",
      children: [
        {
          name: "Áo thun nữ",
          path: ""
        },
        {
          name: "Áo sơ mi nữ",
          path: ""
        }, {
          name: "Áo kiểu nữ",
          path: ""
        }
      ]
    }
  ]
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const breadcrumbs: JSX.Element[] = [
    <span className="breadcrumb-item">
      Trang chủ
    </span>,
    <span className="breadcrumb-item active">
      Thời trang Nữ
    </span>
  ]
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
              <h2 className='title'>DANH MỤC SẢN PHẨM</h2>
              <ul className="category-list">
                {
                  listCategory.map((item: IItemCategory, index: number) => (
                    <CategoryItemChildren key={index} item={item} itemChildren={item.children} />
                  ))
                }
              </ul>
            </div>
            <div className="filter-list">
              <div className="filter-list-item">
                <h2 className='name'>Nơi bán</h2>
                <div className="filter-list-item-option">
                  <FormControlLabel control={<Checkbox size='small' defaultChecked />} label="TP.Hồ Chí Minh" />
                  <FormControlLabel control={<Checkbox size='small' defaultChecked />} label="TP.Hồ Chí Minh" />
                  <FormControlLabel control={<Checkbox size='small' defaultChecked />} label="TP.Hồ Chí Minh" />
                </div>
              </div>
              <div className="filter-list-item">
                <h2 className='name'>Chọn mức giá </h2>
                <div className="filter-list-item-option">
                  <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>
              <div className="filter-list-item">
                <h2 className='name'>Màu sắc</h2>
                <div className="filter-list-item-option">
                  <FormControlLabel control={<Checkbox size='small' defaultChecked />} label="Trắng" />
                  <FormControlLabel control={<Checkbox size='small' defaultChecked />} label="Đen " />
                  <FormControlLabel control={<Checkbox size='small' defaultChecked />} label="Hồng" />
                </div>
              </div>
            </div>
          </div>
          <div className="list-product-right">
            <div className="category-product-title">
              <h3 className="name">THỜI TRANG NỮ</h3>
              <span className="icon-filter">
                <ArrowDownNarrowWide />
                <span>
                  Sắp xếp
                </span>
              </span>
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
                        <span className=''>
                          <Heart className='wishList'  />
                        </span>
                      </div>
                      <img
                        src="https://bizweb.dktcdn.net/thumb/large/100/462/587/products/12-4d67873d-2641-4391-8b3d-b7a3699e9728.png?v=1698485974000"
                        alt="Product Image "
                        className="item-image-content"
                      />
                    </div>
                    <div className="item-content">
                      <h2 className="title">Quần dài nữ Yaki Jan Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores at cum consectetur, ipsam qui quidem debitis tempore voluptate, voluptatibus laudantium deleniti quae doloribus pariatur sit ullam quia ex dolor fugit.</h2>
                      <span className="price">
                        450,000đ
                      </span>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className='list-product-filter-pagination'>
              <ul className='list-product-filter-pagination-list'>
                <li className='list-product-filter-pagination-item'>
                  <ChevronsLeft size={16} />
                </li>
                {
                  Array.from({ length: 3 }).map((_, index: number) => (
                    <li key={index} className='list-product-filter-pagination-item'>
                      {index + 1}
                    </li>
                  ))
                }
                <li className='list-product-filter-pagination-item'>
                  ...
                </li>
                <li className='list-product-filter-pagination-item active'>
                 9
                </li>
                <li className='list-product-filter-pagination-item'>
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
