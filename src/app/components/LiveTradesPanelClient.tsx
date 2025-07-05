// "use client";
// import React, { useEffect, useRef } from "react";
// import { IDockviewPanelProps } from "dockview-core";
// import "@finos/perspective-viewer";
// import "@finos/perspective-viewer-datagrid";
// import { Table } from "@finos/perspective";

// interface PerspectiveViewerElement extends HTMLElement {
//   load: (table: Table) => void;
//   setAttribute: (name: string, value: string) => void;
//   delete: () => void;
// }

// const LiveTradesPanelClient: React.FC<IDockviewPanelProps> = () => {
//   const viewerRef = useRef<PerspectiveViewerElement | null>(null);

//   useEffect(() => {
//     const el = viewerRef.current;
//     if (!el || !window.perspective) return;

//     let table: Table | null = null;
//     let socket: WebSocket | null = null;

//     const setup = async () => {
//       // Initialize Perspective worker and table
//       const worker = window.perspective.worker();
//       table = await worker.table({
//         price: "float",
//         quantity: "float",
//         timestamp: "datetime",
//       });

//       el.load(table);
//       el.setAttribute("row-pivots", '["timestamp"]');
//       el.setAttribute("columns", '["price", "quantity"]');
//       el.setAttribute("sort", '[["timestamp", "desc"]]');

//       socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

//       socket.onmessage = (event) => {
//         const msg = JSON.parse(event.data);
//         table!.update([
//           {
//             price: parseFloat(msg.p),
//             quantity: parseFloat(msg.q),
//             timestamp: new Date(msg.T),
//           },
//         ]);
//       };
//     };

//     setup().catch((error) => {
//       console.error("Error setting up Perspective viewer:", error);
//     });

//     return () => {
//       if (socket) socket.close();
//       if (table) table.delete();
//       if (viewerRef.current) viewerRef.current.delete();
//     };
//   }, []);

//   // @ts-expect-error
//   return <perspective-viewer ref={viewerRef} />;
// };

// export default LiveTradesPanelClient;

import { DockviewPanelApi, DockviewApi } from "dockview-react";

interface LiveTradesPanelProps {
  api: DockviewPanelApi;
  containerApi: DockviewApi;
  params: any;
}

export default function LiveTradesPanel({
  api,
  containerApi,
  params,
}: LiveTradesPanelProps) {
  return <p style={{ color: "#fff" }}>Live Trades Panel</p>;
}
