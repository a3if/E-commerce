import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/slices/modalSlice";

export const Header = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await dispatch(fetchCartProduct());
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   })();
  // }, [dispatch]);

  return (
    <>
      <div className=" fixed left-0 right-0 p-[30px] flex justify-between bg-[#1D4ED8] items-center z-40">
        <a href="/">
          <h1 className="md:text-[40px] text-[28px] text-[#ffff]">
            E-commerce
          </h1>
        </a>
        <p className="absolute right-[18px] top-[20px] text-[18px] w-[30px] h-[30px] bg-[#991B1B] border rounded-[150px] text-center font-bold text-[#fff]">
          {cart?.length}
        </p>
        <FontAwesomeIcon
          icon={faCartPlus}
          onClick={handleOpenModal}
          className="md:text-[40px] text-[28px] text-[#ffff]"
        />
      </div>
    </>
  );
};
