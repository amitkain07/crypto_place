import React, { useContext, useEffect, useState } from "react";
import "./page.css";
import { coinContext } from "../context/CoinContext";
import {Link} from 'react-router-dom';

const Home = () => {
  const { allcoin, currency } = useContext(coinContext);
  const [displayCoin, setDisplayCoin] = useState([]);

  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allcoin);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const coins = allcoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allcoin);
  }, [allcoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            list="coinlist"
            type="text"
            value={input}
            placeholder="Search Crypto.."
            required
          />

          <datalist id="coinlist">
            {allcoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin?.slice(0, 10).map((item) => {
        
          return (
            <Link to={`/coin/${item.id}`} className="table-layout" key={item.id}>
              <p>{item.market_cap_rank}</p>
              <div className="flex gap-1.5 items-center">
                <img className="w-10" src={item.image} alt={item.image} />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>
                {currency.symbol} {item.current_price}
              </p>
              <p
                style={{
                  color: item.price_change_percentage_24h > 0 ? "green" : "red",
                }}
                className="text-center"
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100} %
              </p>

              <p className="text-right market-cap">
                {currency.symbol} {item.market_cap}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
