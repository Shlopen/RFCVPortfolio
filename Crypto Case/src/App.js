import { useState, useEffect, useRef } from "react";
import "./styles.css";

function CoinWallet() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("Loading...");
  const [prevPrice, setPrevPrice] = useState(0);
  const [status, setStatus] = useState("-");
  const ID = useRef(0);
  const initialCOINS = [
    { id: ID.current, name: "DOGE", price: price, status: status }
  ];

  const [COINS, setCOINS] = useState(initialCOINS);

  //---------API CALL--------------------
  function buildURL(name) {
    const APIKEY =
      "INSERT KEY HERE";
    let COIN = name;
    const URL =
      "https://min-api.cryptocompare.com/data/price?fsym=" +
      COIN +
      "&tsyms=EUR&api_key=" +
      APIKEY;

    return URL;
  }

  function DeleteCoin(id) {
    setCOINS(COINS.filter((COINS) => COINS.id !== id));
  }

  async function AddCoin(text) {
    ID.current = ID.current + 1;
    const newCoin = {
      id: ID.current,
      name: text.toUpperCase(),
      price: price,
      status: "-"
    };
    if (COINS.some((COINS) => COINS.name === newCoin.name) === true) {
      alert("Invalid token: Token already exists.");
    } else {
      let URLCheck = buildURL(text.toUpperCase());
      // API CHECK
      try {
        const check = await fetch(URLCheck);
        const checkres = await check.json();
        if (checkres.Response === "Error") {
          alert("Invalid token");
        } else {
          setCOINS([...COINS, newCoin]);
        }
      } catch (err) {
        alert("Invalid token");
        console.log("Error" + err);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    AddCoin(e.target[0].value);
    e.target[0].value = "";
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedCoins = await Promise.all(
        COINS.map(async (coin) => {
          const URL = buildURL(coin.name);
          const prevPrice = coin.price;
          try {
            const response = await fetch(URL);
            const jsonData = await response.json();
            const price = jsonData.EUR + "€";

            let status = "-";
            if (prevPrice === price) {
              status = "-";
            } else if (prevPrice < price) {
              status = "▲";
            } else if (prevPrice > price) {
              status = "▼";
            }

            return {
              ...coin,
              price: price,
              status: status
            };
          } catch (error) {
            console.log(`Error: ${error}`);
            return coin;
          }
        })
      );

      setCOINS(updatedCoins);
    }, 5000);

    return () => clearInterval(interval);
  }, [COINS]);

  const coinsList = COINS.map((COINS) => (
    <>
      <tr key={COINS.id}>
        <td>{COINS.name}</td>
        <td>{COINS.price}</td>
        <td>{COINS.status}</td>
        <td>
          <button key={COINS.id} onClick={() => DeleteCoin(COINS.id)}>
            DELETE
          </button>
        </td>
      </tr>
    </>
  ));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search a crypto token..." />
      </form>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td>INVALID</td>
            </tr>
          ) : (
            coinsList
          )}
        </tbody>
      </table>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Crypto Case</h1>
      <CoinWallet />
    </div>
  );
}
