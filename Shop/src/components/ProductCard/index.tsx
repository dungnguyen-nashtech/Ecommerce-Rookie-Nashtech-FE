import { Heart, Settings } from "lucide-react";
import { Rating } from "@mui/material";
import React from "react";
import { VNDCurrency } from "../../utils/functions.ts";
import { useNavigate } from "react-router";
import { DEFAULT_IMAGE_PRODUCT } from "../../utils/constant.ts";

export const ProductCard = ({ product, index }) => {
  console.log(product);
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
          src={product?.imageUrl ?
            product?.imageUrl :
            DEFAULT_IMAGE_PRODUCT}
          alt="Product Image "
          className="item-image-content"
        />
      </div>
      <div className="item-content">
        <h2 className="title">{product?.name}</h2>
        <span className="price">
                        <span>{VNDCurrency(product?.price)} | </span> <Rating name="read-only"
                                                                              value={product?.averageRating}
                                                                              readOnly />
                      </span>
      </div>
    </div>
  </>);
};
