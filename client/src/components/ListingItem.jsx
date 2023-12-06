import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed, FaChair } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ListingItem({ listing }) {

  const [discPerc, setDiscPerc] = useState(null);

  useEffect(() =>{
    const discountPerc = (((listing.regularPrice - listing.discountPrice)/listing.regularPrice) * 100).toFixed(0);
    setDiscPerc(discountPerc);
  }, [listing.offer])

  

  return (
    <div className="bg-white relative shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[320px]">
      
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
       {listing.offer &&  <div className="bg-green-700 text-white absolute top-0 right-0 w-22 h-10 z-10 p-2 font-bold ">
          {discPerc}% Off
        </div>}
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-1">
            {listing.description}
          </p>
          <div className="text-slate-700 flex gap-8 mx-auto">
            <div className="font-bold text-xs flex flex-col items-center">
              <FaBed className="text-green-700 text-lg" />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds `
                : `${listing.bedrooms} Bed `}
            </div>
            <div className="font-bold text-xs flex flex-col items-center">
              <FaBath className="text-green-700 text-lg" />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms `
                : `${listing.bathrooms} Bathroom `}
            </div>
            <div className="font-bold text-xs flex flex-col items-center">
              <FaChair className="text-green-700 text-lg" />
              {listing.furnished ? ` Furnished ` : ` Not Furnished`}
            </div>
          </div>
          
        </div>
        <div className="flex flex-col">
            <div className="stats bg-slate-700 text-white rounded-none ">
              <div className="stat px-4 py-2 place-items-center">
                <div className="stat-title text-normal text-white ">
                {listing.type === 'rent' ? ' Monthly Rent' : "Sale"}
                </div>
                <div className="stat-value text-2xl">
                ₹{" "}{listing.offer
              ? listing.discountPrice.toLocaleString('en-IN')
              : listing.regularPrice.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="stat px-4 py-2 ">
                <div className="stat-actions">
                  <button className="btn btn-sm  bg-white text-black hover:bg-green-600 hover:text-white">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* <p className='text-slate-500 mt-2 font-semibold border-black border-2'>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>
          <button></button> */}
          </div>
      </Link>
    </div>
  );
}
