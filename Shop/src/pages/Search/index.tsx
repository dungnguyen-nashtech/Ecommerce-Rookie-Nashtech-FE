import { Breadcrumbs } from "@mui/material";
import { ChevronRight } from "lucide-react";
import React from "react";
import { ProductCard } from "../../components/ProductCard";

const breadcrumbs: JSX.Element[] = [
  <span className="breadcrumb-item">
            Trang chủ
        </span>,
  <span className="breadcrumb-item active">
            Kết quả tìm kiếm
        </span>
];

const Search = () => {

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
        <div className="main-content-search">
          <h2 className="title-result">Có 10 kết quả tìm kiếm phù hợp </h2>
          <div className="main-content-search-list">
            {
              Array.from({ length: 9 }).map((_, index: number) => (
                  <ProductCard index={index} />
                )
              )
            }
          </div>
        </div>
      </div>
    </main>
  );
};
export default Search;