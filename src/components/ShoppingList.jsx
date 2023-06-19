// ShoppingList.js
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import Pagination from "../components/Pagination";
import { CartContext } from "../components/CartContext";
import ProductDetailComponent from "../components/ProductDetailComponent";

function ShoppingList() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(6);
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const currentProduct = productList.slice(firstProductIndex, lastProductIndex);
  const {
    cartItems,
    removeFromCart,
    addToCart,
    calculateTotalPrice,
    setCartItems,
  } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:2000/list")
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const { id } = useParams();
  const productId = productList.find((product) => product._id === id);

  const categories = productList.reduce(
    (acc, product) =>
      acc.includes(product.category) ? acc : acc.concat(product.category),
    []
  );

  return (
    <div className="mb-24">
      <div className="">
        <ul className="mx-1 flex list-none flex-row flex-wrap justify-evenly gap-3 space-x-1  px-1 ">
          {currentProduct.map(
            ({ _id, cover, name, price, category, genre }) => (
              <ProductItem
                key={_id}
                id={_id}
                name={name}
                category={category}
                prix={price}
                cover={cover}
                genre={genre}
                addToCart={addToCart}
                link={`/product/${_id}`}
              />
            )
          )}
        </ul>
      </div>
      <div className="">
        <Pagination
          totalProduct={productList.length}
          productPerPage={productPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {id && <ProductDetailComponent addToCart={addToCart} />}
    </div>
  );
}

export default ShoppingList;
