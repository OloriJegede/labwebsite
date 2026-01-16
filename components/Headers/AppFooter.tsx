import Image from "next/image";
import Link from "next/link";
import React from "react";
import Community from "../Forms/Community";
import { Facebook, Instagram, Youtube } from "lucide-react";

const AppFooter = () => {
  return (
    <div className="bg-[#F3F3F3]" id="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-0 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="space-y-3">
                <div className="text-[#999999] text-[18px]">Explore</div>
                <section className="space-y-3">
                  <div>
                    <Link href="/" className="text-[14px]">
                      Home
                    </Link>
                  </div>
                  <div>
                    <Link href="/about" className="text-[14px]">
                      About
                    </Link>
                  </div>
                  <div>
                    <Link href="/consultation" className="text-[14px]">
                      Consultation
                    </Link>
                  </div>
                  <div>
                    <Link href="/contact-us" className="text-[14px]">
                      Contact
                    </Link>
                  </div>
                </section>
              </div>
              <div className="space-y-3">
                <div className="text-[#999999] text-[18px] capitalize">
                  Connect with us
                </div>
                <section className="space-y-3">
                  <div className="flex gap-4">
                    <Link
                      href="https://www.instagram.com/l.a.b.method?igsh=eDMxcWpyeDg5cWxv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <Instagram className="w-6 h-6" />
                    </Link>
                    <Link
                      href="https://www.tiktok.com/@drsashawynter?_r=1&_t=ZS-92UwCCOnEYa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </Link>
                    <Link
                      href="https://youtube.com/@l.a.b.method?si=_C895jaA8D0nSaiy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70 transition-opacity"
                    >
                      <Youtube className="w-6 h-6" />
                    </Link>
                  </div>
                </section>
              </div>
              <div className="space-y-3">
                <div className="text-[#999999] text-[18px]">Support</div>
                <section className="space-y-3">
                  <div>
                    <p className="text-[14px]">
                      We are here to support you on your anti-aging journey.
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px]">
                      Got questions about the L.A.B. Method, products, or
                      consultations?
                    </p>
                  </div>
                  <div>
                    <Link
                      href="mailto:info@mylabmethod.com"
                      className="text-[14px]"
                    >
                      info@mylabmethod.com
                    </Link>
                  </div>
                </section>
              </div>
            </section>
            <section className="pt-14">
              <Image src={`/logo2.svg`} alt="logo" width={131} height={93.97} />
              <div className="text-[14px] pt-3">
                © 2025 L.A.B, All Rights Reserved
              </div>
            </section>
          </div>
          <div className="">
            <Community />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;
