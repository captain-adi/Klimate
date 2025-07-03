import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { ThemeProvider } from "./context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <div className="bg-background-to-br from-background to-muted ">
        <Header />
        <main className="container">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
     <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  );
}

export default App;
