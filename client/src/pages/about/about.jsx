import React from "react";
import introImage from "../../assets/images/a2.jpg"; // ✅ Used below in the <img>

const About = () => {
  return (
    <section className="py-20 bg-gray-100 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Get started with ITPathway
          </h2>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={introImage}
              alt="Introduction"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              About ITPathway
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              <strong>ITPathway</strong> is a smart career guidance platform designed
              for IT students and tech enthusiasts. It delivers personalized course recommendations, curated project ideas, and AI-powered chatbot support to help users navigate the ever-evolving tech landscape.
              Whether you're starting your journey or aiming to upskill, ITPathway is your dedicated companion for a successful tech career.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
