function ProductItem({ id, cover, name, prix, category }) {
  return (
    <li key={id} className="">
      <img
        className="h-58 w-40 rounded-lg shadow-md lg:w-1/2"
        src={cover}
        alt={`${name} cover`}
      />
      <p className="text-ms ml-2 mt-1 capitalize">{name}</p>
      <p className="ml-2 text-sm font-thin text-gray-500">{category}</p>
      <p className="text-md ml-2 font-light text-cyan-700">{prix}</p>
    </li>
  );
}

export default ProductItem;
