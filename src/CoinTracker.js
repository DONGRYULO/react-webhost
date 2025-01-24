import Button from "./Button"
import styles from "./App.module.css"
import {useState, useEffect} from "react"

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinName, setCoinName] = useState('');

  const [amount, setAmount] = useState(0); // USD, COIN 개수 입력에 들어갈 값
  const [btnConvert, setBtnConvert] = useState(true); // true : USD to COIN, false : COIN to USD

  useEffect(() => {
    console.log('API 호출 최초 한 번 실행');

    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((reponse) => reponse.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);        
        setCoinName(json[0].name);
      });      
  }, []);  
  
  const onChangeAmount = (e) => {
    console.log('onChangeAmount');

      setAmount(e.target.value);
  };

  const onClickConvert = () => {
    console.log('onClickConvert');

      setAmount(0);
      setBtnConvert((prev) => {
          return !prev;
      });
  };  

  const usdToCoinCal = (amount) => {      
      console.log('usdToCoinCal');
      console.log(coinName);
      
      let price;
      coins.forEach((item) => {
          if(item.name === coinName) {
            price = item.quotes.USD.price;
          }
      });      

      if(price === undefined){
        return 0;
      }else{
        return amount / price;
      }
  };  

  const onChageCoin = (e) => {
      console.log('onChageCoin');

      setCoinName(e.target.value);
  };

  return (    
    <div>
        <h1>The coins! {loading ? null : `(${coins.length})`}</h1>
        {
          loading ? 
          <strong>loading...</strong> : 
          <select value={coinName} onChange={onChageCoin}>          
            {coins.map((coin) => {
                return <option value={coin.name}>
                        {coin.name} ({coin.symbol}):{coin.quotes.USD.price} USD
                      </option>
            })}
         </select>         
        }                 

        <hr/>

        <div>                    
          <div>            
            <label>USD</label>
            <input
              onChange={onChangeAmount} 
              value={btnConvert? amount : null}
              placeholder="USD 입력" 
              disabled={btnConvert ? false : true}
            />
          </div>
          <h3>Convert</h3>
          <div>            
            <label>COIN</label>
            <input 
              onChange={onChangeAmount} 
              value={btnConvert? usdToCoinCal(amount) : null}
              placeholder="COIN 개수 입력"
              disabled={btnConvert ? true : false}
            />            
          </div>            

          <br/>
          {/* <button onClick={onClickCal}>계산</button> */}
          <button onClick={onClickConvert}>{btnConvert ? 'USD to COIN' : 'COIN to USD'}</button>           
        </div>

    </div>
  );
}

export default CoinTracker;
