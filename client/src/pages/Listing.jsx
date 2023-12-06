import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import FavoriteIcon from '@mui/icons-material/Favorite';

import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";


export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  const handleGetOwnerDetails = () => {
    if (!currentUser) {
      const link = `/listing/${listing._id}`;
      localStorage.setItem("location", link);
      navigate("/sign-in");
    } else {
      setLoading(true);
      setContact(true);
      setLoading(false);

    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      navigate('/profile');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="relative">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div onClick={() => setFavorite(true)} className="absolute top-7 left-5 z-20 cursor-pointer">
             <FavoriteIcon sx={{fontSize:40}} className={`${favorite ? "text-red-600" : "text-white"} hover:text-red-600 cursor-pointer`}/>     
          </div>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {listing.name}
              </h1>
              <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>
              <div className="flex gap-4 mt-4">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    ₹{+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>

              <div className="mt-10">
                <div className="stats bg-slate-200 text-primary-content flex-col flex  sm:flex-row ">
                  <div className="stat place-items-center py-4 px-2">
                    <div className="stat-title text-black ">Monthly Rent</div>
                    <div className="stat-value text-2xl">
                      ₹{" "}
                      {listing.offer
                        ? listing.discountPrice.toLocaleString("en-IN")
                        : listing.regularPrice.toLocaleString("en-IN")}
                    </div>
                  </div>

                  {listing.depositPrice && 
                    <div className="stat place-items-center py-4 px-2">
                    <div className="stat-title text-black">Deposit Amount</div>
                    <div className="stat-value text-2xl">
                    ₹{" "}
                      { listing.depositPrice?.toLocaleString("en-IN")
                        }
                    </div>
                  </div>}
                </div>
              </div>

              {!contact && listing.userRef !== currentUser?._id  && (
                <button
                  onClick={handleGetOwnerDetails}
                  className="mt-10 flex w-full items-center justify-center uppercase rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {loading ? "Loading..." : "Contact Owner"}
                </button>
              )}
              {listing.userRef === currentUser?._id && currentUser && (
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="mt-10 flex w-full items-center justify-center uppercase rounded-md border border-transparent bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Edit Details
                  </button>
                </Link>
              )}
              {listing.userRef === currentUser?._id && currentUser && (
                <button  onClick={() => handleListingDelete(listing._id)} className="mt-10 flex w-full items-center justify-center uppercase rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Delete Details
                </button>
              )}

              {contact && <Contact listing={listing} />}
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {listing.description}
                  </p>
                  <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaBed className="text-lg" />
                      {listing.bedrooms > 1
                        ? `${listing.bedrooms} Beds `
                        : `${listing.bedrooms} Bed `}
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaBath className="text-lg" />
                      {listing.bathrooms > 1
                        ? `${listing.bathrooms} Baths `
                        : `${listing.bathrooms} Bath `}
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaParking className="text-lg" />
                      {listing.parking ? "Parking spot" : "No Parking"}
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaChair className="text-lg" />
                      {listing.furnished ? "Furnished" : "Not Furnished"}
                    </li>
                  </ul>
                </div>
              </div>

              {/* <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">Includes something</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">Includes something</span>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
