import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SearchResults from './SearchResults';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchResults, setIsSearchResults] = useState(false)

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    setIsSearchResults(true)

    }


  }, [location.search]);
  return (
    <header className='bg-white'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <div className="logo__section w-28 sm:w-48">
            <img src="./logo.png" alt="img" />
          </div>
        </Link>
        <form
          onSubmit={handleSubmit}
          className='bg-slate-200 p-3 rounded-lg md:flex items-center hidden '
        >
          <input
            type='text'
            placeholder='Search location...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-black'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        
        <div className="flex gap-4">
          <Link to="/" className="hidden md:inline">
            <button
              type="button"
              className="p-2 px-5 border-2 border-black rounded-lg text-bold text-black uppercase hover:bg-black hover:text-white transition ease-in-out delay-150"
            >
              Home
            </button>
          </Link>
          {currentUser && (
            <Link to="/create-listing" className="none md:inline ">
              <button
                type="button"
                className="uppercase  border-2 border-black hidden text-black md:inline text-bold p-2 px-5  rounded-lg hover:bg-black hover:text-white transition ease-in-out delay-150"
              >
                List Property
              </button>
            </Link>
          )}

          <Link to="/profile">
            {currentUser ? (
              <div >
                <img src={currentUser.avatar} className="rounded-full h-11 w-11 object-cover" alt='profile pic' />
              </div>
              
            ) : (
              <button className="uppercase p-2 px-5 border-2 border-black text-black rounded-lg text-bold hover:bg-black hover:text-white transition ease-in-out delay-150 ">
                {" "}
                Login
              </button>
              
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
