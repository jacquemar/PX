import { Link } from "react-router-dom";

function ProductItem({ id, cover, name, prix, category, addToCart }) {
  const handleToCart = () => {
    addToCart({ id, name, cover, price: prix });
  };
  return (
    <li key={`${id} name`} className="">
      <Link to={`/product/${id}`}>
        <img
          className=" h-58 w-40 rounded-lg object-cover shadow-md lg:w-1/2"
          src={cover}
          alt={`${name} cover`}
        />
      </Link>
      <div className="text-center">
        <div className="inline-block justify-center">
          <div>
            <p className="ml-2 mt-1 text-xl capitalize">{name}</p>
          </div>
          <div>
            <p className="ml-2 text-base font-thin text-gray-500">{category}</p>
          </div>
          <div>
            <p className="mb-2 ml-2 text-xl font-bold text-pxcolor">
              {prix} XOF
            </p>
          </div>
        </div>
        <div>
          <button
            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pxcolor to-blue-500 p-0.5 text-sm font-medium text-gray-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
            onClick={handleToCart}
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-400">
              Ajouter
            </span>
          </button>
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
