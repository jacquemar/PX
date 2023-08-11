import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {store} from '../redux/store';
import { addToCart, removeFromCart, updateTotalQuantity, increaseQuantity } from '../redux/slices/cartSlice';
import { updateProductList } from '../redux/slices/productSlice';
import ProductItem from "../components/ProductItem";
import Pagination from "../components/Pagination";
import ProductDetailComponent from "../components/ProductDetailComponent";


function ShoppingList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(6);
  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;


  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [productList, setProductList] = useState([]);
  const totalQuantity = useSelector((state) => state.cart.cartItems.length);
  const ProductQuantity = useSelector((state) => state.cart.cartItems.itemId);

  useEffect(() => {

    fetch("http://localhost:2000/list")
      .then((res) => res.json())
      .then((data) => {
         
        setProductList(data);
       
         
      })
      .catch((err) => {
        console.log(err.message);
      });
          return () => {
    };
    
  }, []);

    const currentProduct = productList.slice(firstProductIndex, lastProductIndex);

  const { id } = useParams();
  const productId = productList?.find((product) => product._id === id);

  const categories = productList?.reduce(
    (acc, product) =>
      acc.includes(product.category) ? acc : acc.concat(product.category),
    []
  );

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  const handleAddToCart = (product) => {
    
      const productIndex = cartItems.findIndex((item) => item.id === product.id);
        if (productIndex !== -1) {
      // Si le produit est déjà présent dans le panier, augmentez la quantité de 1
      dispatch(increaseQuantity({ productId: product.id }));
    } else {
      // Sinon, ajoutez le produit au panier avec une quantité de 1
      dispatch(addToCart(product));
      dispatch(updateTotalQuantity(totalQuantity + 1));
    }
    
  };

  return (
    <div className="mb-24">
      <div className="">
<ul className="mx-1 flex list-none flex-row flex-wrap justify-evenly gap-3 space-x-1 px-1">
  {productList && productList.length > 0 ? (
    currentProduct.map(({ _id, cover, name, price, category, genre }) => (
      <ProductItem
        key={_id}
        id={_id}
        name={name}
        category={category}
        prix={price}
        cover={cover}
        genre={genre}
        addToCart={() => handleAddToCart({ id: _id, name, price, cover, quantity: 1 })}
        link={`/product/${_id}`}
      />
    ))
  ) : (
    <p>Loading...</p>
  )}
</ul>
      </div>
      <div className="">
  {productList && productList.length > 0 ? (
    <Pagination
      totalProduct={productList.length}
      productPerPage={productPerPage}
      setCurrentPage={setCurrentPage}
    />
  ) : (
    <p>Loading...</p>
  )}
</div>
      {id && <ProductDetailComponent addToCart={() => dispatch(addToCart(productId))} />}
    </div>
  );
}

export default ShoppingList;

