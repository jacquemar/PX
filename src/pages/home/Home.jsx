import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header, Footer, Categorie } from "../../components";
import ShoppingList from "../../components/ShoppingList";
import { addToCart } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div>
      <div className="bg-gray-25">
        <Header />
        <Categorie />

        <div className="mt-4 flex">
          <p className="mb-6 ml-6 mr-16 mt-4 text-xl font-bold">
            Meilleurs Vente
          </p>
          <p className="mb-6 ml-16 mt-5 text-sm">voir tout</p>
        </div>
        <ShoppingList addToCart={handleAddToCart} />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
