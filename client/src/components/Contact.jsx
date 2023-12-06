import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallIcon from '@mui/icons-material/Call';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(null);
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2 mt-10'>
          <Link
          onClick={() => {
            navigator.clipboard.writeText(landlord.phone);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
          className='bg-green-600 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
          <CallIcon className='' />  Call Owner          
          </Link>
          {copied && (
            <Alert variant="filled" severity="success" className="fixed bottom-[10%] right-[5%] z-10 rounded-md bg-slate-100 p-2 ">
            Owner Number Copied!
            </Alert>)}
        </div>
      )}
    </>
  );
}
