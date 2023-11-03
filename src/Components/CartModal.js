import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const CartModal = ({
  openModal,
  handleCloseModal,
  cart,
  findTotalPrice,
  handleDecrementQuantity,
  handleIncrementQuantity,
  emptyCard,
  handleEmptyCart,
}) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {openModal && (
        <div
          id="cart-modal"
          onClick={handleCloseModal}
          className="fixed inset-0  flex items-start justify-end z-10 bg-black bg-opacity-50 "
        >
          <div
            className="absolute top-[120px] right-0 z-40  p-6 overflow-y-auto transition-transform translate-x-full bg-white w-[480px] overflow-x-auto dark:bg-gray-800"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-offset="200"
            onClick={(e) =>  e.stopPropagation()}
          >
            <div className="flex justify-between items-center gap-[60px] w-full">
              <h3 className="font-bold text-center ">My product</h3>
              <button
                className="  text-dark uppercase font-semibold   hover:transition-all  rounded text-[30px]"
                onClick={handleCloseModal}
              >
                <FontAwesomeIcon icon={faTimes} className="text-[23px]" />
              </button>
            </div>
            <div className=" relative z-20 max-h-[80vh] ">
              <span className="text-[30px] font-bold">
                {cart.length>0 && `Grand Total: $${findTotalPrice()}`}
              </span>
              {!cart.length ? (
                <p className="text-center p-[40px] text-[30px]">
                  No products available.
                </p>
              ) : (
                cart?.map((current) => (
                  <div
                    key={current.id}
                    className="flex items-center gap-[14px] border-2 border shadow-2xl mx-auto my-[30px] overflow-hidden my-[20px] "
                  >
                    <img
                      src={current.img}
                      alt="notFOUND"
                      className="w-[60px] h-[50px] "
                    />
                    <span className="inline-block  md:text-[18px] font-bold">
                      {current.name}
                    </span>
                    <span className="inline-block  md:text-[18px] font-bold">
                      price:$
                      {current.quantity < 1
                        ? current.productPrice
                        : current.price}
                    </span>
                    <div className="flex items-center justify-center gap-[12px]">
                      <button
                        className="px-[12px] bg-[#1D4ED8] text-[14px] text-[#ffff]"
                        onClick={() =>
                          handleIncrementQuantity(
                            current.id,
                            current.quantity,
                            current.price,
                            current.productPrice
                          )
                        }
                      >
                        +{" "}
                      </button>
                      <span className="text-[14px]">{current.quantity}</span>
                      <button
                        className="px-[12px] bg-[#B91C1C] text-[14px] text-[#ffff]"
                        onClick={() =>
                          handleDecrementQuantity(
                            current.id,
                            current.quantity,
                            current.price,
                            current.productPrice
                          )
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-between">
              {cart.length>0 && (
                <button
                  onClick={handleEmptyCart}
                  className=" p-[10px] bg-[#1D4ED8] text-[#fff]"
                >
                  Empty cart
                </button>
              )}
              {cart.length>0 && (
                <Link
                  to="/checkout"
                  className=" p-[10px] bg-[#1D4ED8] text-[#fff]"
                  onClick={handleCloseModal}
                >
                  Check Out
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
