import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import MOJO from "../assets/products/MOJO.jpg";

function ShoppingList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2000/list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
  console.log(categories);

  return (
    <div>
      <ul className="mx-1 flex list-none flex-row flex-wrap justify-evenly gap-3 space-x-1  px-1 ">
        {productList.map(({ id, cover, name, prix, category, genre }) => (
          <ProductItem
            id={id}
            name={name}
            category={category}
            prix={prix}
            cover={MOJO}
            genre={genre}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
