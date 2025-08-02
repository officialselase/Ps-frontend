import {
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-green-500 rounded-full"></div>
            </div>
            <div>
              <div className="text-xl font-bold text-amber-400">PLEROMA</div>
              <div className="text-xs text-white">SPRINGS FOUNDATION</div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Transforming global oral health with innovative education and
            partnerships.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.instagram.com/pleromasprings/"
              className="text-gray-400 hover:text-amber-400"
            >
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-400">
              <Twitter size={20} />
            </a>
            <a
              href="pleromaspringsfoundation@gmail.com"
              className="text-gray-400 hover:text-amber-400"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-400 mb-2">Foundation</h4>
          <ul className="space-y-1">
            <li>
              <Link
                to="/about-us"
                className="text-gray-400 hover:text-white text-sm"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/about-us#our-team"
                className="text-gray-400 hover:text-white text-sm"
              >
                Our Team
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-400 mb-2">Contact</h4>
          <ul className="space-y-1">
            <li className="flex items-center space-x-2">
              <MapPin size={16} />
              <span className="text-gray-400 text-sm">Accra, Ghana</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={16} />
              <span className="text-gray-400 text-sm">+233 (053) 015 4632</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} />
              <span className="text-gray-400 text-sm">
                pleromaspringsfoundation@gmail.com
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">
        © 2025 Pleroma Springs Foundation. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
