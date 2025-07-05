export interface Trade {
  id: string;
  symbol: string;
  price: number;
  quantity: number;
  timestamp: Date;
}

export interface PriceDataPoint {
  time: Date;
  price: number;
  volume: number;
}

export function startMockTradeFeed(
  callback: (trade: Trade) => void
): () => void {
  const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT"];
  const interval = setInterval(() => {
    const trade: Trade = {
      id: Math.random().toString(36).substring(2),
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      price: 50000 + Math.random() * 1000,
      quantity: 0.1 + Math.random() * 10,
      timestamp: new Date(),
    };
    callback(trade);
  }, 1000);
  return () => clearInterval(interval);
}

export function startMockPriceFeed(
  callback: (data: PriceDataPoint) => void
): () => void {
  let lastPrice = 50000;
  const interval = setInterval(() => {
    const priceChange = (Math.random() - 0.5) * 100;
    lastPrice = Math.max(40000, Math.min(60000, lastPrice + priceChange));
    const data: PriceDataPoint = {
      time: new Date(),
      price: lastPrice,
      volume: 100 + Math.random() * 500,
    };
    callback(data);
  }, 1000);
  return () => clearInterval(interval);
}
