import React from "react";
import { useParams } from "react-router";
import { QueryGetProductByCategoryName } from "../../services/queries/query-get.ts";
import { ProductCard } from "../../components/ProductCard";
import { Breadcrumbs } from "@mui/material";
import { ChevronRight } from "lucide-react";
import CenteredLoader from "../../components/Common/CenteredLoader.tsx";

const breadcrumbs: JSX.Element[] = [
  <span className="breadcrumb-item">
            Trang chủ
        </span>,
  <span className="breadcrumb-item active">
            Kết quả tìm kiếm
        </span>
];

interface Product {
  id: number;
  name: string;
  description: string;
  averageRating: number;
  imageUrl: string | null;
  price: number;
  createdOn: string;
  lastUpdatedOn: string;
  isFeatured: boolean;
}

const Category = () => {
  const { categoryName } = useParams();
  const queryGetProductByCategoryName = QueryGetProductByCategoryName(categoryName);

  if (queryGetProductByCategoryName?.isLoading) {
    return <CenteredLoader />;
  }
  console.log(queryGetProductByCategoryName);

  return (
    <main className="main-content">
      <h1>Category</h1>
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
          <div className="main-content-search-list">
            {
              queryGetProductByCategoryName?.data?.map((productUnique: any, index: number) => (
                  <ProductCard index={index} product={productUnique} />
                )
              )
            }
          </div>
        </div>
      </div>
    </main>
  );
};
export default Category;