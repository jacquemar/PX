// ProductDetailComponent.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  updateTotalQuantity,
  updateTotalPrice,
} from "../redux/slices/cartSlice";
import Footer from "./footer/Footer";

function ProductDetailComponent() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.cartItems.length);
  const [productItem, setProductItem] = useState(null);

  function formatProductItem(productItem) {
    return {
      id: productItem._id,
      name: productItem.name,
      category: productItem.category,
      gender: productItem.gender,
      price: productItem.price,
      cover: productItem.cover,
      quantity: 1,
    };
  }

  useEffect(() => {
    fetch(`http://localhost:2000/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductItem(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);
  console.log(productItem);

  const handleAddToCart = (product) => {
    const formattedProductItem = formatProductItem(productItem);
    const productIndex = cartItems.findIndex(
      (item) => item.id === formattedProductItem
    );
    if (productIndex !== -1) {
      // Si le produit est déjà présent dans le panier, augmentez la quantité de 1
      dispatch(increaseQuantity({ productId: formattedProductItem }));
    } else {
      // Sinon, ajoutez le produit au panier avec une quantité de 1
      dispatch(addToCart(formattedProductItem));
      dispatch(updateTotalQuantity(totalQuantity + 1));
    }
  };

  if (!productItem) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fillRule="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fillRule="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fillRule="currentFill"
          />
        </svg>
        <span className="sr-only mt-11 text-center">Loading...</span>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li key={productItem.gender}>
                <div className="flex items-center">
                  <a className="mr-2 text-sm font-medium text-gray-900">
                    {productItem.category}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fillRule="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>

              <li className="text-sm">
                <a
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {productItem.name}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={productItem.cover}
                alt={productItem.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={productItem.cover}
                alt={productItem.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {productItem.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Information du produit</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {productItem.price} XOF
              </p>

              <div className="mt-4">
                <button
                  onClick={handleAddToCart}
                  className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-pxcolor px-8 py-3 text-base font-medium text-white hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Ajouter au Ticket
                </button>
              </div>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {productItem.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Détails</h3>

                <div className="mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetailComponent;
