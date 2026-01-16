import React from "react";
import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="text-[40px] md:text-[96px] leading-[100%] imbue">
            Get in Touch
          </div>
          <p className="text-[18px]">
            We are here to support you on your anti-aging journey.
          </p>
          <p className="text-[18px]">
            Got questions about the L.A.B. Method, products, or consultations?
          </p>
          <p className="text-[18px] gotham-regular">
            Email:{" "}
            <Link
              href="mailto:info@mylabmethod.com"
              className="hover:underline"
            >
              info@mylabmethod.com
            </Link>
          </p>
        </div>
        <div className="space-y-3">
          <div className="text-[40px] md:text-[96px] leading-[100%] imbue">
            Connect with us
          </div>
          <p className="text-[18px]">
            Follow our community for daily aging-well insights.
          </p>
          <div className="flex gap-4 pt-3">
            <Link
              href="https://www.instagram.com/l.a.b.method?igsh=eDMxcWpyeDg5cWxv"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Instagram className="w-8 h-8" />
            </Link>
            <Link
              href="https://www.tiktok.com/@drsashawynter?_r=1&_t=ZS-92UwCCOnEYa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </Link>
            <Link
              href="https://youtube.com/@l.a.b.method?si=_C895jaA8D0nSaiy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              <Youtube className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
