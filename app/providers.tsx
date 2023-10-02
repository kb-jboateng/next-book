"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { BookProvider } from "./context/BookContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <BookProvider>
          { children }
        </BookProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}