import React from "react";
import { StockProvider } from "./context/StockContext";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import "./index.css";

const App = () => {
  return (
    <StockProvider>
      <div className="container">
        <h1>Finance Dashboard</h1>
        <StockForm />
        <StockList />
      </div>
    </StockProvider>
  );
};

export default App;
