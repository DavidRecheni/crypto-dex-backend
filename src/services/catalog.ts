const coinsList = () => {
  const coins = [];

  coins.push({ id: 'BTC', name: 'Bitcoin', regex: '' });
  coins.push({ id: 'ETH', name: 'Ethereum', regex: '' });
  coins.push({ id: 'BNB', name: 'Binance Coin', regex: '' });
  coins.push({ id: 'ADA', name: 'Cardano', regex: '' });
  coins.push({ id: 'SOL', name: 'Solana', regex: '' });
  coins.push({ id: 'XRP', name: 'Ripple', regex: '' });
  coins.push({ id: 'LUNA', name: 'Terra', regex: '' });
  coins.push({ id: 'DOGE', name: 'Dogecoin', regex: '' });
  coins.push({ id: 'DOT', name: 'Polkadot', regex: '' });
  coins.push({ id: 'AVAX', name: 'Avalanche', regex: '' });
  coins.push({ id: 'LTC', name: 'LiteCoin', regex: '' });
  coins.push({ id: 'BCH', name: 'Binance Cash', regex: '' });
  coins.push({ id: 'XLM', name: 'Stellar', regex: '' });
  coins.push({ id: 'XMR', name: 'Monero', regex: '' });
  coins.push({ id: 'EOS', name: 'EOS', regex: '' });
  coins.push({ id: 'ZEC', name: 'ZCash', regex: '' });

  return coins;
};

export default coinsList;
