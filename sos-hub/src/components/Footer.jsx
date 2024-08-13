import { Link } from "react-router-dom";
import facebook from "../assets/icons/facebook.svg";
import instagram from "../assets/icons/instagram.svg";
import twitter from "../assets/icons/twitter.svg";

const Footer = () => {
  return (
    <footer className="bg-pink-500 py-6">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 gap-6 md:flex md:justify-between text-white">
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-lg font-semibold mb-2">Links</h2>
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col items-start md:items-center justify-center">
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
          <p className="mb-1">
            Email:{" "}
            <a href="mailto:hallo@soshub.com" className="hover:underline">
              hallo@soshub.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+4769257990" className="hover:underline">
            69 25 79 90
            </a>
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end justify-center">
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
          <a
              href="#"
            >
              <img src={facebook} alt="Facebook" className="w-6 h-6" />
            </a>
            <a
              href="#"
            >
              <img src={instagram} alt="Instagram" className="w-6 h-6" />
            </a>
            <a
              href="#"
            >
              <img src={twitter} alt="Twitter" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
