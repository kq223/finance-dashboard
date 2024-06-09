import React, { useContext, useEffect, useCallback } from "react";
import axios from "axios";
import { StockContext } from "../context/StockContext";

const StockList = () => {
  const { stocks, setStocks } = useContext(StockContext);

  const fetchCurrentPrices = useCallback(async () => {
    const apiKey = "demo"; // Replace with your API key
    const updatedStocks = await Promise.all(
      stocks.map(async (stock) => {
        const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${apiKey}`;
        try {
          const response = await axios.get(apiUrl);
          console.log(
            "API Response for stock symbol:",
            stock.symbol,
            response.data
          ); // Log API response
          const data = response.data["Global Quote"];
          if (data && data["05. price"]) {
            const currentPrice = parseFloat(data["05. price"]);
            return { ...stock, currentPrice };
          }
        } catch (error) {
          console.error("Error fetching stock data", error);
        }
        return stock;
      })
    );
    setStocks(updatedStocks);
  }, [stocks, setStocks]);

  useEffect(() => {
    if (stocks.length > 0) {
      fetchCurrentPrices();
    }
  }, [stocks, fetchCurrentPrices]);

  useEffect(() => {
    console.log("Stocks in StockList:", stocks); // Log stocks in StockList
  }, [stocks]);

  return (
    <div>
      <h2>Stock List</h2>
      {stocks.length > 0 ? (
        <ul>
          {stocks.map((stock, index) => (
            <li key={index}>
              <p>
                <span>Symbol:</span> {stock.symbol}
              </p>
              <p>
                <span>Quantity:</span> {stock.quantity}
              </p>
              <p>
                <span>Purchase Price:</span> {stock.purchasePrice}
              </p>
              <p>
                <span>Current Price:</span> {stock.currentPrice}
              </p>
              <p>
                <span>Profit/Loss:</span>{" "}
                <span
                  className={
                    stock.currentPrice - stock.purchasePrice >= 0
                      ? "profit"
                      : "loss"
                  }
                >
                  {(stock.currentPrice - stock.purchasePrice) * stock.quantity}
                </span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No stocks available</p>
      )}
    </div>
  );
};

export default StockList;
