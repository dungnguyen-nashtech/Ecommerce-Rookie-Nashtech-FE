import { Heart, Settings } from "lucide-react";
import { Rating } from "@mui/material";
import React from "react";
import { VNDCurrency } from "../../utils/functions.ts";
import { useNavigate } from "react-router";

export const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  return (<>
    <div onClick={() => navigate(`/product/${product.id}`)} className="item" key={index}>
      <div className="item-image">
        <div className="item-image-bg">
                        <span className="item">
                          <Settings />
                        </span>
          <span className="item">
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
        <h2 className="title">{product?.name}</h2>
        <span className="price">
                        <span>{VNDCurrency(450000)} | </span> <Rating name="read-only" value={product?.averageRating}
                                                                      readOnly />
                      </span>
      </div>
    </div>
  </>);
};
