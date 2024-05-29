import React from "react";
import {createRoot} from "react-dom/client";

import App from "./App";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);


const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: 5, retryDelay: 1000}}
});

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </React.StrictMode>
);
