import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Testimonails from "./Testimonails";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  SwiperCore.use([Navigation]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div>
      <div className=" relative justify-center gap-6 text-center items-center py-8 md:py-20 md:pb-34 px-3 max-w-6xl mx-auto flex flex-col md:flex-row z-10 ">
        <div className="flex-1 flex justify-center items-start flex-col xl:px-0 sm:px-16 px-6 ">
          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="flex-1 font-poppins font-semibold sm:text-[55px] text-[45px] text-slate-200 sm:leading-[70px] leading-[75-px]">
              Discover Most Suitable
              <span className="text-gradient"> Rental Property </span>{" "}
            </h1>
          </div>
          <h1 className="font-poppins font-semibold sm:text-[55px] text-[45px] text-slate-200 sm:leading-[70px] leading-[75-px] w-full">
            in Bengaluru.
          </h1>
          <p className="font-poppins text-slate-200 font-bold text-[18px] leading-[30.8px] w-full  mt-5">
            Unlock the Door to Your Perfect Home in Bangalore with RentNest!
          </p>
          
          <div className=" mt-10 mx-auto cursor-pointer hidden md:flex">
            <div className="stats shadow m-3 bg-slate-200 ">
              <div className="stat">
                <div className="stat-value uppercase text-black text-2xl">Sell</div>
                <div className="stat-desc text-black mt-2">Sell your product</div>
              </div>
            </div>
            <div className="stats shadow m-3 bg-slate-200 ">
              <div className="stat">
                <div className="stat-value uppercase text-black text-2xl">Rent</div>
                <div className="stat-desc text-black mt-2">Rent any property</div>
              </div>
            </div>
            <div className="stats shadow m-3 bg-slate-200 ">
              <div className="stat">
                <div className="stat-value uppercase text-black text-2xl">Buy</div>
                <div className="stat-desc text-black mt-2">Buy rooms as rent</div>
              </div>
            </div>
          </div>
          <div className="w-full mt-10">
            <Link to="/search">
              <button
                type="button"
                className="text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-2xl px-5 py-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                <p>
                  <span>
                    Explore Now{" "}
                    <DoubleArrowIcon className="text-5xl items-center" />
                  </span>
                </p>
              </button>
            </Link>
          </div>
          <div className="mt-8 inline md:hidden mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-slate-200 p-3 rounded-lg flex items-center "
            >
              <input
                type="text"
                placeholder="Search location..."
                className="bg-transparent focus:outline-none w-64 text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>
                <FaSearch className="text-slate-600" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Swiper */}
      <div className="w-[100%] h-[700px] overflow-hidden absolute top-20 left-0 z-0">
        <div className="w-full h-full absolute top-0 left-0 bg-black opacity-30" />
        <img
          src="./hero_01.jpg"
          alt="hero image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Listing results */}
      <div className="bg-slate-200 max-w-8xl mx-auto p-3 px-3 md:px-10 flex flex-col gap-6 my-10 relative">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <Testimonails />
      </div>
    </div>
  );
}
