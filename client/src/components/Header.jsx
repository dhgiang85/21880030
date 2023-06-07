import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";

const Header = ({ setSearchTerm, searchTerm }) => {
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    navigate("/");
  };
  return (
    <header className="border-b fixed top-0 w-full z-50 bg-white flex items-center">
      <div className="container">
        <nav className="flex justify-between items-center py-1 space-x-4">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold w-44 text-center pr-2">
              <i className="fa-solid fa-clipboard-question mr-2 text-cyan-800"></i>
              Question
            </a>
            <ul className="flex ml-3">
              <li>
                <a
                  href="/"
                  className=" hover:text-gray-900 px-2 py-1 rounded-md text-sm font-medium"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>
          {/* search input full with */}
          <div className="grow relative">
            <input
              type="text"
              className="border border-neutral-400 rounded w-full px-1 py-1 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute top-0 flex items-center h-full ml-2">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>

          {/* <div className="flex items-center space-x-2">
            <a href="/" className="btn-secondary">
              Log in
            </a>
            <a href="/" className="btn-primary">
              Sign Up
            </a>
          </div> */}
          <ProfileInfo />
        </nav>
      </div>
    </header>
  );
};
export default Header;
