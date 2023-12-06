import React, { useEffect } from 'react'

const SearchResults = () => {

    useEffect(() =>{
        const fetchListing = async () =>{
            const res = await fetch(`/api/listing/get?`);
            const data = await res.json();
            const locationList = [];
             data.map((listing) =>{
                locationList.push(listing.address)
            })
            console.log(locationList);
        }

    },[])
  return (
    <ul className='bg-red-600 text-white '>
       <li>Search 1</li> 
       <li>Search 1</li> 
       <li>Search 1</li> 
       <li>Search 1</li> 
    </ul>
  )
}

export default SearchResults