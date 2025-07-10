import { useTheme } from "../../context/theme-provider";
import { Link } from "react-router-dom";
import { GoSun, GoMoon } from "react-icons/go";
import CitySearch from "../search";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 ">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={theme === "dark" ? "/logo.png" : "/logo2.png"}
            alt="logo"
            className="h-14"
          />
        </Link>

        <div className="flex gap-7 justify-center items-center">
          <CitySearch />
          <div
            className={`cursor-pointer transition-transform duration-500 ${
              theme === "dark" ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            {theme === "dark" ? (
              <GoSun className=" text-yellow-400 text-xl rotate-0 transition-all" />
            ) : (
              <GoMoon className="text-xl rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
