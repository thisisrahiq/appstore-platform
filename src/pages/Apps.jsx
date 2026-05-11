import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import appsData from "../data/apps.json";
import AppCard from "../components/AppCard.jsx";
import { usePageTitle } from "../hooks/usePageTitle.js";

const CATEGORIES = ["Productivity", "Gaming", "Education"];

function formatDownloads(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function Apps() {
  usePageTitle("Apps | AppStore");

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 40 });
  }, []);

  const trending = [...appsData].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const mostDownloaded = [...appsData].sort((a, b) => b.downloads - a.downloads).slice(0, 4);

  const slides = [
    {
      title: "Spring promotion",
      subtitle: "Save on premium productivity bundles",
      image: appsData[1].banner,
      badge: "Promo",
    },
    {
      title: "New launch",
      subtitle: `${appsData[0].name} — learn to code the fun way`,
      image: appsData[0].banner,
      badge: "New",
    },
    {
      title: "Featured",
      subtitle: `${appsData[4].name} — built for async teams`,
      image: appsData[4].banner,
      badge: "Featured",
    },
  ];

  return (
    <div className="space-y-16">
      <section data-aos="fade-up">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="rounded-3xl overflow-hidden glass-card border border-white/10 !pb-12"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.title}>
              <div className="relative min-h-[220px] sm:min-h-[320px] md:min-h-[380px]">
                <img
                  src={s.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/80 to-transparent" />
                <div className="relative z-10 p-8 md:p-14 max-w-xl flex flex-col justify-center min-h-[220px] sm:min-h-[320px] md:min-h-[380px]">
                  <span className="badge badge-secondary badge-outline mb-3 w-fit">{s.badge}</span>
                  <h2 className="text-3xl md:text-5xl font-display font-bold">{s.title}</h2>
                  <p className="mt-3 text-base-content/80 text-lg">{s.subtitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section data-aos="fade-up">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Trending Apps</h2>
            <p className="text-base-content/60 text-sm mt-1">Highest ratings first</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((app) => (
            <AppCard key={app.id} app={app} showDownloads />
          ))}
        </div>
      </section>

      {CATEGORIES.map((cat) => {
        const list = appsData.filter((a) => a.category === cat);
        return (
          <section key={cat} data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          </section>
        );
      })}

      <section data-aos="fade-up" className="rounded-3xl glass-card border border-white/10 p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Most Downloaded</h2>
            <p className="text-base-content/60 mt-1">
              Apps users install again and again — ranked by total downloads.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mostDownloaded.map((app, i) => (
            <div key={app.id} className="relative">
              <span className="absolute -top-2 -left-2 z-10 badge badge-primary font-mono">
                #{i + 1}
              </span>
              <AppCard app={app} showDownloads />
              <p className="text-xs text-center text-base-content/50 mt-2">
                {formatDownloads(app.downloads)} total downloads
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
