"use client";
import React, { useEffect, useRef } from "react";
import { IDockviewPanelProps } from "dockview-core";
import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";

const LiveTradesPanelClient: React.FC<IDockviewPanelProps> = () => {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const el = viewerRef.current;

    const setup = async () => {
      const table = await (
        await window.perspective.worker()
      ).table({
        price: [],
        quantity: [],
        timestamp: [],
      });

      el.load(table);
      el.setAttribute("row-pivots", '["timestamp"]');
      el.setAttribute("columns", '["price", "quantity"]');
      el.setAttribute("sort", '[["timestamp", "desc"]]');

      const socket = new WebSocket(
        "wss://stream.binance.com:9443/ws/btcusdt@trade"
      );

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        table.update([
          {
            price: parseFloat(msg.p),
            quantity: parseFloat(msg.q),
            timestamp: new Date(msg.T),
          },
        ]);
      };

      return () => socket.close();
    };

    setup();
  }, []);

  // @ts-ignore
  return <perspective-viewer ref={viewerRef}></perspective-viewer>;
};

export default LiveTradesPanelClient;
