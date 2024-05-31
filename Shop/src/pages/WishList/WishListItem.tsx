import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";
import { VNDCurrency } from "../../utils/functions.ts";
import { Rating } from "@mui/material";

export const WishListItem = ({ index }) => {
  return (
    <div className="item" key={index}>
      <div className="item-image">
        <div className="item-image-bg">
                                            <span className="item">
                                                <FavoriteIcon className="wishList" />
                                            </span>
        </div>
        <img
          src="https://bizweb.dktcdn.net/thumb/large/100/462/587/products/12-4d67873d-2641-4391-8b3d-b7a3699e9728.png?v=1698485974000"
          alt="Product Image "
          className="item-image-content"
        />
      </div>
      <div className="item-content">
        <h2 className="title">Quần dài nữ Yaki Jan Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Dolores at cum consectetur, ipsam qui quidem debitis tempore voluptate, voluptatibus laudantium
          deleniti quae doloribus pariatur sit ullam quia ex dolor fugit.</h2>
        <span className="price">
                                            <span>{VNDCurrency(450000)} | </span> <Rating name="read-only" value={4}
                                                                                          readOnly />
                                        </span>
      </div>
    </div>
  );
};