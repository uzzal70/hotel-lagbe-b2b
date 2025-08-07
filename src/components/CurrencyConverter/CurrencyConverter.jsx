import { useState } from 'react';
import companyInfo from '../../common/companyInfo';

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BDT');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState('');

  const exchangeRates = {
    [companyInfo.currencyType]: 1, // 1 BDT = 1 BDT
    USD: 0.0091, // 1 USD = 84 BDT (Assuming 1 USD = 84 BDT)
    EUR: 0.0085, // 1 EUR = 95 BDT (Assuming 1 EUR = 95 BDT)
    AED: 0.0333, // 1 AED = 22.7 BDT (Assuming 1 AED = 22.7 BDT)
  };

  const convertCurrency = () => {
    const amountValue = parseFloat(amount);
    if (!isNaN(amountValue)) {
      const result =
        (amountValue * exchangeRates[toCurrency]) / exchangeRates[fromCurrency];
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount('Invalid amount');
    }
  };

  const convertCurrencys = (amount) => {
    const amountValue = parseFloat(amount);
    if (!isNaN(amountValue)) {
      const result =
        (amountValue * exchangeRates[toCurrency]) / exchangeRates['BDT'];
      return result.toFixed(2); // Round to 2 decimal places
    } else {
      return null; // or handle error as needed
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleConvert = () => {
    convertCurrency();
  };

  return (
    <div>
      <h2>Currency Converter {convertCurrencys(110)}</h2>
      <div>
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
      </div>
      <div>
        <label>
          From:
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option value="BDT">BDT</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          To:
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="AED">AED</option>
          </select>
        </label>
      </div>
      <div>
        <button onClick={handleConvert}>Convert</button>
      </div>
      <div>
        <h3>Converted Amount: {convertedAmount}</h3>
      </div>
    </div>
  );
}

export default CurrencyConverter;
