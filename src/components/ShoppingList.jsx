import { productList } from "../datas/ProductList";
import ProductItem from "../components/ProductItem";

function ShoppingList() {
  const categories = productList.reduce(
    (acc, product) =>
      acc.includes(product.category) ? acc : acc.concat(product.category),
    []
  );

  return (
    <div>
      <ul className="mx-1 flex list-none flex-row flex-wrap justify-evenly gap-3 space-x-1  px-1 ">
        {productList.map(({ id, cover, name, prix, category, genre }) => (
          <ProductItem
            id={id}
            name={name}
            category={category}
            prix={prix}
            cover={cover}
            genre={genre}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
