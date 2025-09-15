"use client";
import React from "react";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const Testimonials = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false, speed: 1, startDelay: 1000 }),
  ]);
  const originalTestimonials = [
    {
      name: "Alex Johnson",
      role: "Software Engineer at Google",
      feedback:
        "This platform made building my portfolio effortless. Within minutes, I had a clean, recruiter-friendly site ready to share.",
    },
    {
      name: "Maria Lopez",
      role: "UX Designer at Spotify",
      feedback:
        "The templates are stunning and professional. I got multiple interview calls right after updating my portfolio.",
    },
    {
      name: "Daniel Smith",
      role: "Product Manager at Amazon",
      feedback:
        "What impressed me most was how optimized the design is for recruiters. My skills were highlighted perfectly.",
    },
    {
      name: "Alex Johnson",
      role: "Software Engineer at Google",
      feedback:
        "This platform made building my portfolio effortless. Within minutes, I had a clean, recruiter-friendly site ready to share.",
    },
  ];

  const testimonials = [...originalTestimonials, ...originalTestimonials];

  return (
    <section className="relative z-10 max-w-[85rem] mx-auto md:px-6 md:py-20 pt-20">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Loved by Professionals Worldwide
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-lg">
          Join thousands of users who are landing their dream jobs with
          AI-powered portfolios.
        </p>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] md:flex-[0_0_33.333%] min-w-0 pl-4"
            >
              <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  “{t.feedback}”
                </p>
                <div className="text-sm text-gray-400">
                  <span className="font-semibold text-white">{t.name}</span> ·{" "}
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;