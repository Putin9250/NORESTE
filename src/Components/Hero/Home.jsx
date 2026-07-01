import "./Home.scss";

import { Swiper, SwiperSlide } from "swiper/react";

// Import modules directly from swiper/modules
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import hero1 from "../../assets/Hero2.jpg";
import hero2 from "../../assets/Hero3.jpg";
import hero3 from "../../assets/Hero4.jpg";

const slides = [
  {
    image: hero1,
    title: "Think Beyond Headlines",
    subtitle:
      "Deep geopolitical research, strategic intelligence and policy insights.",
  },
  {
    image: hero2,
    title: "Global Affairs Reimagined",
    subtitle:
      "Understanding power, diplomacy, economics and international relations.",
  },
  {
    image: hero3,
    title: "Ideas That Shape Tomorrow",
    subtitle:
      "Research reports, strategic analysis and future-oriented thinking.",
  },
];

function Home() {
  return (
    <section className="hero">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="heroSwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay"></div>

              <div className="content">
                <span>THINK TANK</span>

                <h1>{slide.title}</h1>

                <p>{slide.subtitle}</p>

                <div className="buttons">
                  <button className="primary">
                    Explore Research
                  </button>

                  <button className="secondary">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Home;