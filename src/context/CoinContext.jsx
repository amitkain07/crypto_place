import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const coinContext = createContext();

const CoinContextProvider = (props) => {
    const [allcoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$",
    });

    // useEffect(() => {
    //     //👍👍👍👍 you can do like this
    //     const fetchCoins = async () => {
    //             try {
    //                     const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`);
    //                     // console.log("Fetched Data:", res.data);
    //                     setAllCoin(res.data); // Directly setting the response data
    //                 } catch (error) {
    //                         console.error("Error fetching data:", error);
    //                     }
    //                 };
                    
    //                 fetchCoins();
    // }, [currency]);
                    
    //👍👍👍👍 you can do like this
    
    
    useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`)
        .then(res => {
            setAllCoin(res.data)
        }).catch(error => console.log(error))
    }, [currency]);

    const contextValue = {
        allcoin,
        currency,
        setCurrency,
    };

    return (
        <coinContext.Provider value={contextValue}>
            {props.children}
        </coinContext.Provider>
    );
};

export default CoinContextProvider;
