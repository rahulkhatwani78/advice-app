import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LoadingMask from "./loader.svg";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [showLoadingMask, setShowLoadingMask] = useState(false);
  useEffect(() => {
    setShowLoadingMask(true);
    fetchAdvice();
  }, []);
  const fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        setAdvice(advice);
        setShowLoadingMask(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="app">
      <div className="card">
        {showLoadingMask ? (
          <img className="loading-mask" src={LoadingMask} alt="loadingMask" />
        ) : (
          <h1 className="heading">{advice}</h1>
        )}
        <button
          className="button"
          onClick={() => {
            setShowLoadingMask(true);
            fetchAdvice();
          }}
        >
          <span>Give me advice!</span>
        </button>
      </div>
    </div>
  );
};

export default App;
