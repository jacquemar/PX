import React, { Children, useState, useEffect } from "react";
import { Header, Footer, Categorie } from "../../components";
import coverPhoto from "../../assets/photocover.jpg";
import { useParams } from "react-router-dom";
import {
  addToCart,
  updateTotalQuantity,
  increaseQuantity,
} from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/ProductItem";
function Photos() {
  const [selectedCategory, setSelectedCategory] = useState("photo");

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [productList, setProductList] = useState([]);
  const totalQuantity = useSelector((state) => state.cart.cartItems.length);
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

  const categories = productList.reduce(
    (acc, product) =>
      acc.includes(product.category) ? acc : acc.concat(product.category),
    []
  );
  const { id } = useParams();
  const productId = productList?.find((product) => product._id === id);

  const genderList = productList.reduce(
    (acc, product) =>
      acc.includes(product.gender) ? acc : acc.concat(product.gender),
    []
  );
  const filteredGenderList = genderList.filter((cat) =>
    productList.some(
      (product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase() &&
        product.gender === cat
    )
  );
  const filterProduct = productList.filter(
    (product) => product.category === "photo" || product.category === "Photo"
  );
  return (
    <div>
      <Header />
      <h1 className=" text-center text-xl font-black">
        PHOTOS / PHOTOS CADRES
      </h1>
      <div className="mx-12 mt-4 h-40 rounded-lg md:mx-60">
        <img
          src={coverPhoto}
          alt="coverimage"
          className="w-12/12 mt-4 h-40 rounded-lg object-cover object-center"
        />
      </div>
      <p className="mb-6 ml-6 mr-16 mt-6 text-lg font-bold"> Genre</p>
      <ul className="relative flex items-center overflow-x-auto">
        {filteredGenderList.map((cat) => (
          <li
            key={cat}
            className="m-1 inline-block snap-x gap-3 text-base  font-semibold capitalize"
          >
            <div className=" tex h-16 w-32 scroll-m-2 scroll-smooth rounded-md bg-white  text-center shadow-xl">
              {cat}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex">
        <p className="mb-6 ml-6 mr-11 mt-4 text-xl font-bold">
          Les Plus achetés
        </p>
        <p className="mb-6 ml-16 mt-5 text-sm">voir tout</p>
      </div>
      <ul className="mx-1 flex list-none flex-row flex-wrap justify-evenly gap-3 space-x-1  px-1 ">
        <div className="h-50 w-40 rounded-lg  lg:w-1/2">
          <div className="h-6 w-36 ">
            <p className="mt-10 text-center font-thin">
              Personnaliser vos Photos
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mx-auto mt-2 h-10 w-10 "
            >
              <path
                fillRule="evenodd"
                d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z"
                clipRule="evenodd"
              />
              <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
            </svg>

            <input
              type="file"
              className=" file: file:bg-slate-100
          block
          w-full
          file:mt-8
          file:rounded-full
          file:border-cyan-700
          file:font-normal
          file:opacity-40"
            />
          </div>
        </div>
        {filterProduct.map(({ _id, cover, name, price, category, genre }) => (
          <ProductItem
            key={_id}
            id={_id}
            name={name}
            category={category}
            prix={price}
            cover={cover}
            genre={genre}
            addToCart={() =>
              handleAddToCart({
                id: _id,
                name,
                price,
                cover,
                quantity: 1,
              })
            }
            link={`/product/${_id}`}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Photos;
