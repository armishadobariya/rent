import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate()
  return (
    <div>
      <footer className="footer footer-center p-10 bg-slate-200 rounded text-black">
        <nav className="grid grid-flow-col gap-4">
          <Link to='/'>
            <a className="link link-hover" >Home</a>
          
          </Link>
          <a href="https://business.rentnest.in" className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.linkedin.com/company/rentnest/">
              <LinkedInIcon />
            </a>
            <a href="https://www.instagram.com/rentnestofficial/">
              <InstagramIcon />
            </a>
            <a href="https://www.youtube.com/@RentNestOfficial">
              <YouTubeIcon />
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2023 - All right reserved by RentNest</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
