import { Breadcrumbs } from "@mui/material";
import { ChevronRight } from "lucide-react";
import React from "react";
import { WishListItem } from "./WishListItem.tsx";

const WishList = (): JSX.Element => {
  const breadcrumbs: JSX.Element[] = [
    <span className="breadcrumb-item">
            Trang chủ
        </span>,
    <span className="breadcrumb-item active">
            Sản phẩm yêu thích
        </span>
  ];
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
        <div className="main-content-wishlist">
          <h2 className="title-result">sản phẩm yêu thích </h2>
          <div className="main-content-wishlist-list">
            {
              Array.from({ length: 9 }).map((_, index: number) => (
                <WishListItem index={index} />
              ))
            }
          </div>
        </div>
      </div>
    </main>
  );
};
export default WishList;