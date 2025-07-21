import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { ThemeProvider } from "./context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      staleTime :5*60*1000 ,
      gcTime :5*60*1000  ,
      retry :false ,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <div className="bg-background-to-br from-background to-muted ">
        <Header />
        <main className="container py-12 mx-auto">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
 
      </QueryClientProvider>
  );
}

export default App;
