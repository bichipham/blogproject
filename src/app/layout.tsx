"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/reduxStore/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useEffect, useRef } from "react";
import type { EnhancedStore } from "@reduxjs/toolkit";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
