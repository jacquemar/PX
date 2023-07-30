import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Footer, Categorie } from "../../components";
import ShoppingList from "../../components/ShoppingList";
import { addToCart } from "../../redux/actions";


const Home = () => {
  const dispatch = useDispatch();
 const cartItems = useSelector((state) => state.cart.cartItems);
    const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div>
      <div className="bg-gray-25">
        <Header />
        <Categorie />

        <div className="mt-4 flex">
          <p className="mr-16 mb-6 mt-4 ml-6 text-xl font-bold">
            Meilleurs Vente
          </p>
          <p className="ml-16 mb-6 mt-5 text-sm">voir tout</p>
        </div>
        <ShoppingList addToCart={handleAddToCart} />
      </div>
       <Footer />
    </div>
  );
};
export default Home;
