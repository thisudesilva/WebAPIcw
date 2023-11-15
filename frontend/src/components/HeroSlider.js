import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

import { EffectFade, Autoplay } from "swiper";

import Sunset from "../assets/img/heroSlider/sunset.jpg";
import Pool from "../assets/img/heroSlider/pool.jpg";
import Airballoon from "../assets/img/heroSlider/airbaloon.jpg";
import Kayaking from "../assets/img/heroSlider/kayaking.jpg";

const slides = [
  {
    title: "Air Balloon Adventure",
    paragraph:
      "Experience the thrill of a lifetime with our air balloon adventure.",
    bg: Airballoon,
    btnText: "Lets go",
  },
  {
    title: "Kayaking Excursion",
    paragraph:
      "Paddle through serene waters and discover hidden gems with our kayaking tours.",
    bg: Kayaking,
    btnText: "Lets go",
  },
  {
    title: "Relaxing Poolside Retreat",
    paragraph:
      "Unwind and rejuvenate by the poolside, surrounded by luxury and tranquility.",
    bg: Pool,
    btnText: "Lets go",
  },
  {
    title: "Breathtaking Sunset Views",
    paragraph:
      "Witness the mesmerizing beauty of sunsets in the most picturesque locations.",
    bg: Sunset,
    btnText: "Lets go",
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="heroSlider h-[600px] lg:h-[860px]"
    >
      {slides.map((slide, index) => {
        const { title, paragraph, bg, btnText } = slide;
        return (
          <SwiperSlide className="h-full relative" key={index}>
            <div className="absolute top-0 w-full h-full">
              <img className="object-cover h-full w-full" src={bg} alt="" />
            </div>
            <div className="absolute w-full h-full bg-black/20"></div>
            <div className="z-20 text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h1 className="text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[68px] leading-tight mb-6">
                {title}
              </h1>
              <div className="uppercase font-tertiary tracking-[6px] mb-5">
                {paragraph}
              </div>
              <button className="btn btn-lg btn-primary mx-auto">
                {btnText}
              </button>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
