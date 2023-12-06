import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import Lottie from 'lottie-react'
import animationData from '../../public/animation.json'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="hero bg-white">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center relative lg:text-left hidden sm:inline">

          <Lottie animationData={animationData} className="w-full h-full" />
          <h1 className="absolute top-28 left-[35%] font-bold text-black text-3xl">Connect with Owners </h1>


        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white p-5 ">
          <h1 className="text-5xl font-bold text-center text-black">Signup</h1>

          <form
            onSubmit={handleSubmit}
            className="card-body flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Username"
              className="border p-3 rounded-lg text-black bg-white"
              id="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg text-black bg-white"
              id="email"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Phone Number"
              className="border p-3 rounded-lg text-black bg-white"
              id="phone"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg text-black bg-white"
              id="password"
              onChange={handleChange}
            />

            <div className="form-control mt-6">
              <button
                disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <OAuth />
          </form>
          <div className="flex gap-2 mx-auto">
            <p>Have an account?</p>
            <Link to={"/sign-in"}>
              <span className="text-blue-700">Sign in</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
    // <div className='p-3 max-w-lg mx-auto'>
    //   <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
    //   <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    //     <input
    //       type='text'
    //       placeholder='username'
    //       className='border p-3 rounded-lg'
    //       id='username'
    //       onChange={handleChange}
    //     />
    //     <input
    //       type='email'
    //       placeholder='email'
    //       className='border p-3 rounded-lg'
    //       id='email'
    //       onChange={handleChange}
    //     />
    //     <input
    //       type='password'
    //       placeholder='password'
    //       className='border p-3 rounded-lg'
    //       id='password'
    //       onChange={handleChange}
    //     />

    //     <button
    //       disabled={loading}
    //       className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
    //     >
    //       {loading ? 'Loading...' : 'Sign Up'}
    //     </button>
    //     <OAuth/>
    //   </form>
    //   <div className='flex gap-2 mt-5'>
    //     <p>Have an account?</p>
    //     <Link to={'/sign-in'}>
    //       <span className='text-blue-700'>Sign in</span>
    //     </Link>
    //   </div>
    //   {error && <p className='text-red-500 mt-5'>{error}</p>}
    // </div>
  );
}
