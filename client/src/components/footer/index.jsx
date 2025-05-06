import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookSquare, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="relative bg-black text-gray-400 pt-12 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Top Section */}
        <div className="flex flex-wrap text-left lg:text-left">
          
          {/* Left Section */}
          <div className="w-full lg:w-6/12 px-6">
            <h4 className="text-2xl font-bold text-white">Empower Your IT Career with ITPathway</h4>
            <p className="text-md mt-2 mb-4 text-gray-400">
              Join ITPathway to access AI-driven career insights, expert-led IT courses, and a thriving tech community.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-gray-800 hover:bg-blue-500 text-white p-3 rounded-full transition-all duration-300">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-300">
                <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-600 text-white p-3 rounded-full transition-all duration-300">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-6/12 px-6 mt-8 lg:mt-0">
            <div className="flex flex-wrap">
              
              {/* ITPathway Resources */}
              <div className="w-full lg:w-6/12 mb-6">
                <h5 className="text-lg font-semibold text-white mb-3">ITPathway Resources</h5>
                <ul className="space-y-2">
                  <li><a className="hover:text-gray-300 transition" href="/about">About ITPathway</a></li>
                  <li><a className="hover:text-gray-300 transition" href="/chatbot">AI Career Chatbot</a></li>
                  <li><a className="hover:text-gray-300 transition" href="/courses">Explore IT Courses</a></li>
                  <li><a className="hover:text-gray-300 transition" href="/community">Join Our Community</a></li>
                </ul>
              </div>

              {/* IT Career & Policies */}
              <div className="w-full lg:w-6/12 mb-6">
                <h5 className="text-lg font-semibold text-white mb-3">IT Career & Policies</h5>
                <ul className="space-y-2">
                  <li><a className="hover:text-gray-300 transition" href="/projects">Tech Projects</a></li>
                  <li><a className="hover:text-gray-300 transition" href="/privacy-policy">Privacy Policy</a></li>
                  <li><a className="hover:text-gray-300 transition" href="/terms">Terms & Conditions</a></li>
                  <li><a className="hover:text-gray-300 transition" href="/contact">Contact ITPathway</a></li>
                </ul>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <hr className="my-8 border-gray-700" />
        <div className="flex flex-wrap justify-center md:justify-between text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ITPathway - Ahamed Saajith.
          </p>
        </div>

      </div>
    </footer>
  );
}
