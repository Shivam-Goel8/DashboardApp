import React, { useState, useEffect } from "react";
import { FaBox, FaWarehouse, FaMoneyBillWave } from "react-icons/fa";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js';
import "./product.css";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    setProducts([
      { id: 1, name: "iPhone 15", price: 79999, stock: 10, image: "https://m.media-amazon.com/images/I/712SeOsnKUL._SX679_.jpg" },
      { id: 2, name: "Samsung S23", price: 74999, stock: 15, image: "https://m.media-amazon.com/images/I/61isPIHrHgL._AC_UY327_FMwebp_QL65_.jpg" },
      { id: 3, name: "MacBook Air", price: 114999, stock: 7, image: "https://m.media-amazon.com/images/I/316ArzLeJ2L._SX300_SY300_QL70_FMwebp_.jpg" },
      { id: 4, name: "Dell Inspiron", price: 65999, stock: 12, image: "https://m.media-amazon.com/images/I/41SEFoShskL._SY300_SX300_QL70_FMwebp_.jpg" },
      { id: 5, name: "AirPods Pro", price: 24999, stock: 25, image: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/14862da0-5dd4-4dee-964f-9d7350f6d9f9._CR0,0,1200,628_SX810_QL70_.jpeg" },
      { id: 6, name: "Sony Headphones", price: 19999, stock: 18, image: "https://m.media-amazon.com/images/I/61KmeiNKw3L._AC_UY327_FMwebp_QL65_.jpg" },
      { id: 7, name: "Apple Watch", price: 52999, stock: 9, image: "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/a69c9cc7-3b27-48ff-9339-aa86c9f14268._CR0,0,1200,628_SX764_QL70_.jpeg" },
      { id: 8, name: "OnePlus Nord", price: 29999, stock: 22, image: "https://m.media-amazon.com/images/I/61Io5-ojWUL._AC_UY327_FMwebp_QL65_.jpg" },
      { id: 9, name: "Asus ROG Laptop", price: 139999, stock: 5, image: "https://m.media-amazon.com/images/I/71cusSK7QxL._AC_UY327_FMwebp_QL65_.jpg" },
      { id: 10, name: "Lenovo ThinkPad", price: 88999, stock: 11, image: "https://m.media-amazon.com/images/I/61vqw4bMKTL._AC_UY327_FMwebp_QL65_.jpg" },
    ]);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    alert("Are you sure to delete the product");
  };

  const handleImageClick = (imageUrl) => {
    setEnlargedImage(imageUrl);
  };

  const ProductCard = ({ title, value, icon, bgColor }) => {
    return (
      <div className="product-card" style={{ background: bgColor }}>
        <div className="icon">{icon}</div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    );
  };



  return (
    <div className="product-container">
      <h1 className="heading_product">Product List</h1>

      {/* Product Summary Cards */}
      <div className="product-summary">
        <ProductCard title="Total Products" value={products.length} icon={<FaBox />} bgColor="#ffadad" />
        <ProductCard title="Total Stock" value={products.reduce((total, product) => total + product.stock, 0)} icon={<FaWarehouse />} bgColor="#ffd6a5" />
        <ProductCard title="Total Value" value={`₹${products.reduce((total, product) => total + product.price, 0)}`} icon={<FaMoneyBillWave />} bgColor="#caffbf" />
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        className="search-input-product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />



      {/* Product Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Name</th>
            <th>Price (₹)</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  width="50"
                  height="50"
                  style={{ cursor: 'pointer', borderRadius: '5px' }}
                  onClick={() => handleImageClick(product.image)} // Click to enlarge
                />
              </td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₹{product.price.toLocaleString()}</td>
              <td>{product.stock}</td>
              <td>
                <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div className="image-modal" onClick={() => setEnlargedImage(null)}>
          <img src={enlargedImage} alt="Enlarged" className="enlarged-image" />
        </div>
      )}


      {/* Sort Dropdown */}
      <select
        className="sort-dropdown"
        onChange={(e) => {
          const sortType = e.target.value;
          let sortedProducts = [...products];
          if (sortType === "price-asc") sortedProducts.sort((a, b) => a.price - b.price);
          if (sortType === "price-desc") sortedProducts.sort((a, b) => b.price - a.price);
          if (sortType === "stock") sortedProducts.sort((a, b) => a.stock - b.stock);
          setProducts(sortedProducts);
        }}
      >
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="stock">Stock</option>
      </select>

    </div>
  );
};

export default Product;
