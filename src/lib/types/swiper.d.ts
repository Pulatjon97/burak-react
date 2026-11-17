declare module "swiper" {
  interface SwiperModule {
    name: string;
  }

  export const Autoplay: SwiperModule;
  export const FreeMode: SwiperModule;
  export const Navigation: SwiperModule;
  export const Pagination: SwiperModule;
  export const Thumbs: SwiperModule;
}
