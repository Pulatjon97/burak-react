import React from "react";
import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { plans } from "../../../lib/data/plans";

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        <Box className={"events-text"}>
          <span className={"category-title"}>Events</span>
        </Box>

        <Swiper
          className="events-info"
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
        >
          {plans.map((value) => (
              <SwiperSlide key={value.title} className={"events-info-frame"}>
                <div className={"events-img"}>
                  <img
                    src={value.img}
                    className="events-photo"
                    alt={value.title}
                  />
                </div>
                <Box className={"events-desc"}>
                  <Box className={"events-bott"}>
                    <Box className={"bott-left"}>
                      <div className={"event-title-speaker"}>
                        <strong>{value.title}</strong>
                        <div className={"event-organizator"}>
                          <img src="/icons/speaker.svg" alt="" />
                          <p className={"spec-text-author"}>{value.author}</p>
                        </div>
                      </div>

                      <p className={"text-desc"}> {value.desc} </p>

                      <div className={"bott-info"}>
                        <div className={"bott-info-main"}>
                          <img src="/icons/calendar.svg" alt="" />
                          {value.date}
                        </div>
                        <div className={"bott-info-main"}>
                          <img src="/icons/location.svg" alt="" />
                          {value.location}
                        </div>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
          ))}
        </Swiper>
        <Box className={"prev-next-frame"}>
          <button
            type="button"
            aria-label="Previous event"
            className="swiper-button-prev"
          >
            <img src="/icons/arrow-right.svg" alt="" />
          </button>
          <div className={"dot-frame-pagination swiper-pagination"}></div>
          <button
            type="button"
            aria-label="Next event"
            className="swiper-button-next"
          >
            <img
              src="/icons/arrow-right.svg"
              alt=""
              style={{ transform: "rotate(180deg)" }}
            />
          </button>
        </Box>
      </Stack>
    </div>
  );
}
