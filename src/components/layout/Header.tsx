import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, Sun, Moon, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useTheme } from '../../hooks/useTheme';
import { useToast } from '../ui/Toast';

interface HeaderProps {
  onAuthClick: () => void;
}

export default function Header({ onAuthClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { showToast } = useToast();

  const getFirstName = () => {
    const fullName = profile?.full_name || user?.user_metadata?.full_name || '';
    if (fullName) {
      return fullName.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Account';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  const categories = [
    { name: 'T-Shirts', href: '/category/t-shirts' },
    { name: 'Shirts', href: '/category/shirts' },
    { name: 'Tracks & Pants', href: '/category/tracks-pants' },
    { name: 'Jackets & Hoodies', href: '/category/jackets-hoodies' },
    { name: 'Sports Wear', href: '/category/sports-wear' },
  ];

  return (
    <header className="bg-dark/95 backdrop-blur-md text-gray-100 shadow-sm sticky top-0 z-40 transition-all border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-gray-300 transition-colors">
              Reeback Fashion
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide py-1 group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </Link>
            
            <div className="relative group py-1"
                 onMouseEnter={() => setIsCategoryOpen(true)}
                 onMouseLeave={() => setIsCategoryOpen(false)}>
              <button className="flex items-center text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide outline-none">
                Categories
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : 'opacity-70'}`} />
              </button>
              
              <div className={`absolute top-full left-0 w-64 bg-dark/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl py-3 mt-2 transition-all duration-300 transform origin-top-left ${isCategoryOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.href}
                    className="block px-5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 hover:pl-7 transition-all duration-300"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/products"
              className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide py-1 group"
            >
              All Products
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </Link>

            <Link
              to="/wholesale"
              className="relative text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-medium tracking-wide py-1 group"
            >
              Wholesale
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </Link>
            
            <Link
              to="/stores"
              className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium tracking-wide py-1 group"
            >
              Our Stores
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
            </Link>
          </div>

          <div className="flex items-center space-x-5">
            <button
              onClick={toggleTheme}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-all p-2 transform hover:scale-110 active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {isSearchOpen ? (
              <div className="absolute inset-0 bg-dark/95 z-50 flex items-center px-4 md:static md:inset-auto md:bg-transparent md:px-0 md:z-auto md:flex">
                <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full md:w-48 bg-gray-800 text-white text-sm rounded-full pl-4 pr-10 py-2.5 md:py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all border border-gray-700 shadow-inner"
                    autoFocus
                    onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                  />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-3 p-1 text-gray-400 hover:text-white">
                    <X className="w-5 h-5 md:w-4 md:h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <button onClick={() => setIsSearchOpen(true)} className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-all p-2 transform hover:scale-110 active:scale-95" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
            )}

            <Link
              to="/cart"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-all p-2 transform hover:scale-110 active:scale-95 relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-emerald-500 text-white shadow-sm text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-all p-2 transform hover:scale-110 active:scale-95 outline-none">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl py-2">
                    <div className="px-4 py-2 border-b border-gray-800 mb-2">
                    <span className="block text-sm text-white font-medium truncate">{profile?.full_name || user?.user_metadata?.full_name || getFirstName()}</span>
                    <span className="block text-xs text-gray-400 truncate">{user?.email}</span>
                  </div>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  >
                    My Orders
                  </Link>
                  {profile?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      await signOut();
                      showToast('Signed out successfully', 'success');
                      navigate('/');
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors mt-2 border-t border-gray-800 pt-2"
                  >
                    Sign Out
                  </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full transition-all p-2 transform hover:scale-110 active:scale-95"
                aria-label="Sign in"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white p-1 ml-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100 pb-4 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="border-t border-gray-800 mt-2 pt-4 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <div className="px-3 py-2 text-base font-medium text-gray-500">Categories</div>
            <div className="pl-6 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="block px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              to="/wholesale"
              className="block px-3 py-2 rounded-md text-base font-medium text-emerald-400 hover:text-emerald-300 hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wholesale
            </Link>
            <Link
              to="/stores"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Stores
            </Link>

            {user && (
              <>
                <div className="px-3 py-2 text-base font-medium text-gray-500 border-t border-gray-800 mt-2 pt-2">My Account</div>
                <div className="pl-6 space-y-1">
                  <Link
                    to="/account"
                    className="block px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-3 py-2 rounded-md text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  {profile?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 rounded-md text-sm text-emerald-400 hover:text-emerald-300 hover:bg-gray-800 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      setMobileMenuOpen(false);
                      await signOut();
                      showToast('Signed out successfully', 'success');
                      navigate('/');
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
