import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  return (
    <div className="add-product">
      <div className="add-product-item-field">
        <p>Product title</p>
        <input type="text" name="name" placeholder="Enter product title" />
      </div>
      <div className="add-product-price">
        <div className="add-product-item-field">
          <p>Product price</p>
          <input
            type="text"
            name="old-price"
            placeholder="Enter product price"
          />
        </div>
        <div className="add-product-item-field">
          <p>Offer price</p>
          <input type="text" name="new-price" placeholder="Enter offer price" />
        </div>
      </div>
      <div className="add-product-item-field">
        <p>Product Category</p>
        <select name="category" className="add-product-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="add-product-item-field">
        <label htmlFor="file-input">
          <img className="add-product-thumbnail-img" src={upload_area} alt="" />
        </label>
        <input type="file" name="image" id="file-input" hidden />
      </div>
      <button className="add-product-btn">ADD</button>
    </div>
  );
};

export default AddProduct;
