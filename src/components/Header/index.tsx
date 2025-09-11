import { Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white shadow flex items-center justify-between px-6 py-3 z-50">
      {/* Logo */}
      <div className="font-bold text-lg">MySocial</div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-6">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none flex-1"
          />
        </div>
      </div>

      {/* Profile Icon */}
      <button className="rounded-full bg-gray-200 p-2">
        <User className="w-6 h-6 text-gray-600" />
      </button>
    </header>
  );
};

export default Header;
