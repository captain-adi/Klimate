import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { ThemeProvider } from "./context/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="bg-background-to-br from-background to-muted ">
        <Header />
        <main className="container">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
