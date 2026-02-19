import React, { useEffect, useState } from "react";
import "./FetchProducts.css";
import { FaTrash, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, removeProduct } from "../redux/getproducts";
import Signup from "./Signup";
import Login from "./Login";
import GlobalNotification from "./Notificationpopup";

const FetchProducts = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  const [showSignup, setShowSignup] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [priceRanges, setPriceRanges] = useState([]);
  const [cart, setCart] = useState([]);

  const productsPerPage = 8;

  useEffect(() => {
    if (user) {
      dispatch(fetchProducts());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchItem);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchItem]);

  

  if (!user) {
    return (
      <>
        <GlobalNotification />
        {showSignup ? (
          <Signup goBackHome={() => setShowSignup(false)} />
        ) : (
          <Login goBackHome={() => setShowSignup(true)} />
        )}
      </>
    );
  }

  
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handlePriceChange = (range) => {
    if (priceRanges.includes(range)) {
      setPriceRanges(priceRanges.filter((r) => r !== range));
    } else {
      setPriceRanges([...priceRanges, range]);
    }
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const priceMatch =
      priceRanges.length === 0 ||
      priceRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });

    return searchMatch && priceMatch;
  });

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  

  return (
    <>
      <GlobalNotification />

      <div className="search-bar">
        <div className="search-input-item">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Products..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
      </div>

      <div className="products-page">
        <div className="price-sidebar">
          <h3>Filter by Price</h3>

          <label>
            <input
              type="checkbox"
              checked={priceRanges.includes("50-100")}
              onChange={() => handlePriceChange("50-100")}
            />
            ₹50 - ₹100
          </label>

          <label>
            <input
              type="checkbox"
              checked={priceRanges.includes("100-200")}
              onChange={() => handlePriceChange("100-200")}
            />
            ₹100 - ₹200
          </label>

          <label>
            <input
              type="checkbox"
              checked={priceRanges.includes("200-500")}
              onChange={() => handlePriceChange("200-500")}
            />
            ₹200 - ₹500
          </label>

          <label>
            <input
              type="checkbox"
              checked={priceRanges.includes("500-1000")}
              onChange={() => handlePriceChange("500-1000")}
            />
            ₹500 - ₹1000
          </label>
        </div>
        <div className="products-container">
          {currentProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"/> 
                <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>₹ {product.price}</p>

              <div className="product-buttons">
                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(product)}>
                  <FaShoppingCart /> Add
                </button>

                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(removeProduct(product.id))
                  }>
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default FetchProducts;



