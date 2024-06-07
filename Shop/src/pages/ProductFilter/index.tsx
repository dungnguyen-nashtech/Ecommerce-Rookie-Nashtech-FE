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
import { ChevronRight, ChevronsLeft, ChevronsRight, Filter, X } from "lucide-react";
import CategoryItemChildren from "./CategoryItemChildren.tsx";
import { ProductCard } from "../../components/ProductCard";
import { VNDCurrency } from "../../utils/functions.ts";
import CenteredLoader from "../../components/Common/CenteredLoader.tsx";
import { QueryListCategory, QueryProductPagination } from "../../services/queries/query-get.ts";
import { CreateCategoryMenu } from "../../config/utils.ts";
import { useCounter, useList } from "@react-hookz/web";
import { PopupModal } from "../../components/Common/PopupModal.tsx";
import { toast } from "react-toastify";
import { clsx } from "clsx";
import { useNavigate } from "react-router";

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
  const [openFilterMobile, setOpenFilterMobile] = React.useState<boolean>(false);

  const [priceRange, setPriceRange] = React.useState<number[]>([100_000, 1_500_000]);
  const [sortObj, setSortObj] = React.useState({ field: "createdOn", type: "DESC" });
  const [
    variationCombination,
    {
      updateAt: updateVariationCombinationAt,
      reset: resetVariationCombination
    }
  ] = useList(["ALL", "ALL"]);
  const [page, { inc: incPage, dec: decPage, set: setPage }] = useCounter(1, 100, 1);

  const queryListCategory = QueryListCategory();
  const queryAllProduct = QueryProductPagination(page);

  const navigate = useNavigate();

  if (queryListCategory.isLoading || queryAllProduct.isLoading) {
    return <CenteredLoader />;
  }

  const handleChangePrice = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };
  const decPagePagination = () => {
    if (page === 1) {
      toast.info("Đây là trang đầu tiên");
      return;
    }
    decPage(1);
  };
  const incPagePagination = () => {
    if (page === queryAllProduct?.data.totalPages) {
      toast.info("Đây là trang cuối cùng tiên");
      return;
    }
    incPage(1);
  };

  const handleSubmitFilter = () => {
    navigate("/filter?priceRange=" + priceRange.join(",") + "&variationCombination=" + variationCombination.join(":") + "&sortField=" + sortObj.field + "&sortType=" + sortObj.type);
    // console.log(priceRange, sortObj);
    // console.log(variationCombination);
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
          <div
            className="main-content-filter-mobile"
            onClick={() => setOpenFilterMobile(r => !r)}
          >
            <Filter />
          </div>
          <div className={`filter-product-left ${openFilterMobile ? "active" : ""}`}>
            <div className="filter-close-mobile">
              <span onClick={() => setOpenFilterMobile(r => !r)}>
                <X />
              </span>
            </div>
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
                    onChange={handleChangePrice}
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
                <h2 className="name">KÍCH CỠ</h2>
                <div className="filter-list-item-option">
                  <FormControl style={{ marginTop: "0.7rem" }} fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={"ALL"}
                      onChange={(e) => updateVariationCombinationAt(0, e.target.value as string)}
                    >
                      {SIZE_FILTER.map((size: string, index) => (
                        <MenuItem key={index} value={size}>{size}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                      onChange={(e) => updateVariationCombinationAt(1, e.target.value as string)}
                    >
                      {COLOR_FILTER.map((color: string, index) => (
                        <MenuItem key={index} value={color}>{color}</MenuItem>
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
                      value={sortObj.field}
                      label="Sắp Xếp"
                      onChange={(e) => setSortObj((prevSortObj) => ({
                        ...prevSortObj,
                        field: e.target.value as string
                      }))}
                    >
                      <MenuItem value={"createdOn"}>Ngày tạo</MenuItem>
                      <MenuItem value={"lastUpdatedOn"}>Ngày cập nhật</MenuItem>
                      <MenuItem value={"price"}>Giá</MenuItem>
                      <MenuItem value={"availableStock"}>Tồn Kho</MenuItem>
                      <MenuItem value={50}>Đánh giá</MenuItem>
                      <MenuItem value={60}>Nổi bật</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl style={{ marginTop: "10px" }} fullWidth>
                    <InputLabel id="sort-label">Loại</InputLabel>
                    <Select
                      labelId="sort-label"
                      id="sort-label-select"
                      value={sortObj.type}
                      label="Loại"
                      onChange={(e) => setSortObj((prevSortObj) => ({
                        ...prevSortObj,
                        type: e.target.value as string
                      }))}
                    >
                      <MenuItem value={"ASC"}>Tăng dần</MenuItem>
                      <MenuItem value={"DESC"}>Giảm dần</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Button onClick={handleSubmitFilter} style={{ marginTop: "0.8rem" }} variant={"contained"}>Tìm
                  Kiếm</Button>
              </div>

            </div>
          </div>
          <div className="list-product-right">
            <div className="category-product-title">
              <h3 className="name">THỜI TRANG NỮ</h3>

            </div>
            <div className="list-product-filter-category">
              {
                queryAllProduct?.data.content.map((productGet: any, index: number) => (
                  <ProductCard product={productGet} index={index} />
                ))
              }
            </div>
            <div className="list-product-filter-pagination">
              <ul className="list-product-filter-pagination-list">
                <li onClick={() => decPagePagination()} className="list-product-filter-pagination-item">
                  <ChevronsLeft size={16} />
                </li>
                {
                  Array.from({ length: queryAllProduct?.data.totalPages }).map((_, index: number) => (
                    <li key={index}
                        onClick={() => setPage(index + 1)}
                        className={clsx("list-product-filter-pagination-item", index + 1 === page && "active")}>
                      {index + 1}
                    </li>
                  ))
                }
                <li onClick={() => incPagePagination()} className="list-product-filter-pagination-item">
                  <ChevronsRight size={16} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <PopupModal />
    </main>

  );
}

export default LayoutProductFilter;
