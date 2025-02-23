import React, { useContext, useState, useEffect } from "react";
import "./page.css";
import { useParams } from "react-router-dom";
import { coinContext } from "../context/CoinContext";
import axios from "axios";
import LineChart from "../components/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(coinContext);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((res) => {
        setCoinData(res.data);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [coinId, currency]); // Added `coinId` dependency

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`
      )
      .then((res) => {
        console.log(res.data);
        setHistoricalData(res.data);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [coinId, currency]); // Added `coinId` dependency

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!coinData) {
    return <p>Data not found</p>;
  }

  return (
    <div className="coin">
      <div className="coin-name flex flex-col mb-10 items-center justify-center">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart flex flex-col gap-4">
        <LineChart historicalData={historicalData?.prices} name="Prices chart"/>
        <LineChart historicalData={historicalData?.market_caps} name="Market Cap Chart"/>
        <LineChart historicalData={historicalData?.total_volumes} name="Total Volume Chart"/>
      </div>
    </div>
  );
};

export default Coin;
