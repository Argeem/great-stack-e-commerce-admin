import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "",
    image: "",
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/api/products/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(JSON.stringify(product));
      await fetch("http://localhost:4000/api/products/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Product added successfully") {
            alert("Product added successfully");
          } else {
            alert("Failed to add product");
          }
        });
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-item-field">
        <p>Product title</p>
        <input
          value={productDetails.name}
          type="text"
          name="name"
          placeholder="Enter product title"
          onChange={changeHandler}
        />
      </div>
      <div className="add-product-price">
        <div className="add-product-item-field">
          <p>Product price</p>
          <input
            value={productDetails.old_price}
            type="text"
            name="old_price"
            placeholder="Enter product price"
            onChange={changeHandler}
          />
        </div>
        <div className="add-product-item-field">
          <p>Offer price</p>
          <input
            value={productDetails.new_price}
            type="text"
            name="new_price"
            placeholder="Enter offer price"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="add-product-item-field">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          name="category"
          className="add-product-selector"
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="add-product-item-field">
        <label htmlFor="file-input">
          <img
            className="add-product-thumbnail-img"
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={addProduct} className="add-product-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
