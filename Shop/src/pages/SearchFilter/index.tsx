import { Breadcrumbs } from "@mui/material";
import { ChevronRight } from "lucide-react";
import React from "react";
import { ProductCard } from "../../components/ProductCard";
import { useLocation } from "react-router-dom";
import { QueryProductItemFilterPagination } from "../../services/queries/query-get.ts";
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

function getUniqueProducts(productItems: any[]): Product[] {
  const uniqueProductsMap = new Map<number, Product>();

  productItems.forEach(item => {
    if (!uniqueProductsMap.has(item.productId)) {
      uniqueProductsMap.set(item.productId, item.product);
    }
  });

  return Array.from(uniqueProductsMap.values());
}

const Filter = () => {
  const location = useLocation();
  const findParams = new URLSearchParams(location.search);

  let priceRangeFilter = findParams.get("priceRange");
  let variationCombinationFilter = findParams.get("variationCombination");

  if (priceRangeFilter === "100000,1500000") {
    priceRangeFilter = null;
  }
  if (variationCombinationFilter.includes("ALL")) {
    variationCombinationFilter = null;
  }
  const fieldRequestDtos = [];
  if (priceRangeFilter) {
    fieldRequestDtos.push({
      field: "price",
      value: priceRangeFilter,
      operator: "BETWEEN"
    });
  }
  if (variationCombinationFilter) {
    fieldRequestDtos.push({
      field: "variationCombination",
      value: variationCombinationFilter,
      operator: "EQM"
    });
  }

  const queryProductFilterPagination = QueryProductItemFilterPagination(fieldRequestDtos, findParams.get("sortType"), findParams.get("sortField"));


  if (queryProductFilterPagination?.isLoading) {
    return <CenteredLoader />;
  }

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
          <div className="main-content-search-list">
            {
              getUniqueProducts(queryProductFilterPagination?.data?.content).map((productUnique, index: number) => (
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
export default Filter;