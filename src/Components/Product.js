import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";

export const Product = ({ items, handleAddToCart, openModal,cart }) => {
  useEffect(() => {
    AOS.init();
  }, []);

 
  return (
    <>
      <div
        className="container mx-auto p-[40px] pt-[200px]"
      >
        <h2 className="md:mb-[80px] mb-[20px] text-center md:text-[30px] text-[25px] font-bold">
          Product List
        </h2>
        <div
          className="flex flex-wrap  md:gap-[60px] gap-[30px] items-center justify-center"
          data-aos="zoom-out"
          data-aos-duration="1000"
          data-aos-offset="200"
        >
          {items.length &&
            items?.map((current) => (
              <div
                key={current.id}
                className="border-2 border sm:max-w-[250px] max-w-[300px] p-[10px] shadow-2xl hover:scale-110 transform transition-transform duration-300 "
              >
                <img
                  src={current.img}
                  alt="ProductImage"
                  className="w-[300px] h-[200px] mb-[15px]"
                />
                <div className="flex flex-col">
                  <span className="inline-block mb-[10px] md:text-[24px] font-bold">
                    {current.name}
                  </span>
                  <span className="inline-block mb-[10px] md:text-[24px] font-bold">
                    Price: ${current.price}
                  </span>
                  <button
                    className="bg-[#2563EB] md:p-[12px] md:text-[24px] p-[4px] font-bold text-[#ffff]"
                    onClick={() => handleAddToCart(current)}
                    disabled={cart.find((item) => item.id === current.id)}
                  >
                    {cart.find((item) => item.id === current.id)
                      ? "Added"
                      : "Add to cart"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
