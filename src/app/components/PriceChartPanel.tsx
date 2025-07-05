"use client";
import React, { useEffect, useState } from "react";
import { IDockviewPanelProps } from "dockview-core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  TimeScale,
  Tooltip,
  Legend
);

export const PriceChartPanel: React.FC<IDockviewPanelProps> = () => {
  const [priceData, setPriceData] = useState<any>({
    labels: [],
    prices: [],
    volumes: [],
  });
  console.log("priceData", priceData);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
    );
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const k = msg.k;
      const time = new Date(k.t);
      const price = parseFloat(k.c);
      const volume = parseFloat(k.v);
      setPriceData((prev: any) => ({
        labels: [...prev.labels.slice(-49), time],
        prices: [...prev.prices.slice(-49), price],
        volumes: [...prev.volumes.slice(-49), volume],
      }));
    };
    return () => ws.close();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "scroll",
        height: "calc(100vh - 100px)",
        padding: "50px",
        gap: "50px",
      }}
    >
      <div>
        <p style={{ color: "#fff" }}>Prices</p>
        <div style={{ height: "500px" }}>
          <Line
            data={{
              labels: priceData.labels,
              datasets: [
                {
                  label: "Price",
                  data: priceData.prices,
                  borderColor: "rgba(75,192,192,1)",
                  backgroundColor: "rgba(75,192,192,0.2)",
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  type: "time",
                  time: { unit: "minute" },
                },
              },
            }}
          />
        </div>
      </div>
      <div>
        <p style={{ color: "#fff" }}>Volumes</p>
        <div style={{ height: "500px" }}>
          <Bar
            data={{
              labels: priceData.labels,
              datasets: [
                {
                  label: "Volume",
                  data: priceData.volumes,
                  backgroundColor: "rgba(153, 102, 255, 0.5)",
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  type: "time",
                  time: { unit: "minute" },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
