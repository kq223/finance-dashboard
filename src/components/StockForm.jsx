import React, { useState, useContext } from "react";
import { StockContext } from "../context/StockContext";
import axios from "axios";

const StockForm = () => {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const { stocks, setStocks } = useContext(StockContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!symbol || !quantity || !purchasePrice) {
      console.log("Missing required fields");
      return;
    }

    const apiKey = "demo";
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      console.log("API Response:", response.data); // Log API response
      const data = response.data["Global Quote"];
      if (data && data["05. price"]) {
        const currentPrice = parseFloat(data["05. price"]);
        const newStock = {
          symbol,
          quantity: parseFloat(quantity),
          purchasePrice: parseFloat(purchasePrice),
          currentPrice,
        };
        console.log("New Stock:", newStock); // Log new stock data
        setStocks((prevStocks) => {
          const updatedStocks = [...prevStocks, newStock];
          console.log("Updated Stocks in setStocks:", updatedStocks); // Log updated stocks
          return updatedStocks;
        });
        // Do not log stocks immediately after setStocks, because it is asynchronous
        setSymbol("");
        setQuantity("");
        setPurchasePrice("");
      } else {
        console.error("Invalid stock symbol or no price data");
      }
    } catch (error) {
      console.error("Invalid stock symbol or API error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Stock Symbol"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <input
        type="number"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        placeholder="Purchase Price"
        required
      />
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default StockForm;
