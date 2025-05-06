import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from "../about/about";

import img1 from "../../assets/images/medium-shot-business-women-high-five.jpeg";
import img2 from "../../assets/images/a3.jpg";
import img3 from "../../assets/images/two-business-partners-working-together-office-computer.jpeg";
// Removed unused img4 to fix ESLint warning

const slides = [
  {
    image: img1,
    title: "IT Career Development",
    description: "Enhance your skills with AI-powered learning and career growth strategies.",
    link: { text: "Explore Courses", url: "/courses" }
  },
  {
    image: img2,
    title: "Industry-Based Projects",
    description: "Learn job-ready skills with expert-led courses and real-world projects.",
    link: { text: "Explore Project", url: "/projects" }
  },
  {
    image: img3,
    title: "AI Career Guidance",
    description: "Chat with ITPathway AI to get personalized career recommendations.",
    link: { text: "Chat Now", url: "/chatbot" }
  }
];

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false
  };

  return (
    <div className="w-full pt-16">
      {/* Hero Slider Section */}
      <div className="relative w-full h-[90vh] md:h-screen">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-[90vh] md:h-screen">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-10 left-5 md:left-16 bg-black bg-opacity-60 p-6 md:p-8 rounded-xl text-white max-w-lg">
                <h1 className="text-3xl md:text-4xl font-bold">{slide.title}</h1>
                <p className="text-md md:text-lg mt-2">{slide.description}</p>
                <a
                  href={slide.link.url}
                  className="mt-4 inline-block bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition duration-300"
                >
                  {slide.link.text}
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* About Section */}
      <About />
    </div>
  );
};

export default Home;
