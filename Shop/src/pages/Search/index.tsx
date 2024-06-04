import { Breadcrumbs } from "@mui/material";
import { ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import { ProductCard } from "../../components/ProductCard";
import { useParams } from "react-router";
import { QuerySearchOneFilter } from "../../services/queries/query-search.ts";
import CenteredLoader from "../../components/Common/CenteredLoader.tsx";

const breadcrumbs: JSX.Element[] = [
  <span className="breadcrumb-item">
            Trang chủ
        </span>,
  <span className="breadcrumb-item active">
            Kết quả tìm kiếm
        </span>
];

const Search = () => {
  const { productName } = useParams();

  const querySearchOneFilterProduct = QuerySearchOneFilter();
  useEffect(() => {
    querySearchOneFilterProduct.mutate({
        data: {
          field: "name",
          operator: "CONTAINS",
          value: productName
        },
        url: "/product/search"
      }
    );
  }, [productName]);


  if (querySearchOneFilterProduct.isPending) {
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
          <h2 className="title-result">Có 10 kết quả tìm kiếm phù hợp </h2>
          <div className="main-content-search-list">
            {
              querySearchOneFilterProduct?.data?.map((product, index: number) => (
                  <ProductCard index={index} product={product} />
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