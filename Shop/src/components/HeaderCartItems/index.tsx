import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useCartStore } from "../../stores/cartStore.ts";
import { VNDCurrency } from "../../utils/functions.ts";

export const HeaderCartItems = () => {
  const cartStore = useCartStore();
  return (
    <>
      <div className="header-account-item-cart has-products">
        <div className="cart-header">
          <h3>GIỎ HÀNG</h3>
        </div>
        <div className="cart-content">
          {
            cartStore?.listCartItem && cartStore.listCartItem.map((cartItem, index: number) => (
              <div key={index} className="cart-content-items">
                <div className="image">
                  <img
                    src={cartItem.imageUrl}
                    alt="Product Image "
                  />
                </div>
                <div className="content ">
                  <div className="content-name-product">
                    <div className="content-name-product-name">
                      <h2 className="title">{cartItem.productName}</h2>
                      <span className="category">
                              {cartItem.description}
                            </span>
                    </div>
                    <span onClick={() => cartStore?.removeProductItemFromCart(cartItem.productName, cartItem.description)}
                          className="content-name-product-remove">
                            <HighlightOffIcon />
                          </span>
                  </div>
                  <div className="content-price-product">
                    <div className="quantity-product">
                      <button
                        onClick={() => cartStore?.decrementProductQuantity(cartItem.productName, cartItem.description)}
                        className="minus">
                        -
                      </button>
                      <input type="text" value={cartItem.quantity} />
                      <button
                        onClick={() => cartStore?.incrementProductQuantity(cartItem.productName, cartItem.description)}
                        className="plus">
                        +
                      </button>
                    </div>
                    <span className="price">
                            {VNDCurrency(cartItem.price)}
                          </span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="cart-footer">
          <div className="total-price">
            <h2 className="title">Tổng số lượng: </h2>
            <span className="price">
                 - {cartStore?.totalQuantity} -
                  </span>
          </div>
          <div className="total-price">
            <h2 className="title">Tổng tiền: </h2>
            <span className="price">
                    {VNDCurrency(cartStore?.totalPrice)}
                  </span>
          </div>
          <button className="cart-footer-button">
            Xem giỏ hàng
          </button>
        </div>
      </div>
    </>
  );
};
