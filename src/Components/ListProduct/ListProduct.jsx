import "./ListProduct.css";
import { useEffect, useState } from "react";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    await fetch("http://localhost:4000/api/products/all-products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products);
      });
  };

  const removeProduct = async (id) => {
    await fetch(`http://localhost:4000/api/products/remove`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="list-product-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-product-all-products">
        <hr />

        {allProducts.map((product, idx) => {
          return (
            <div
              key={product.id}
              className="list-product-format-main list-product-format"
            >
              <img className="list-product-icon" src={product.image} alt="" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => {
                  removeProduct(product._id);
                }}
                className="list-product-remove-icon"
                src={cross_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
