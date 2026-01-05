import Image from "next/image";
import Link from "next/link";
import React from "react";
import Community from "../Forms/Community";

const AppFooter = () => {
  return (
    <div className="bg-[#F3F3F3]">
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
                    <Link href="/" className="text-[14px]">
                      About
                    </Link>
                  </div>
                  <div>
                    <Link href="/" className="text-[14px]">
                      Shop
                    </Link>
                  </div>
                  <div>
                    <Link href="/" className="text-[14px]">
                      Consultation
                    </Link>
                  </div>
                  <div>
                    <Link href="/" className="text-[14px]">
                      Contact
                    </Link>
                  </div>
                </section>
              </div>
              <div className="space-y-3">
                <div className="text-[#999999] text-[18px] capitalize">
                  Conntect with us
                </div>
                <section className="space-y-3">
                  <div>
                    <Link href="/" className="text-[14px]">
                      Home
                    </Link>
                  </div>
                </section>
              </div>
              <div className="space-y-3">
                <div className="text-[#999999] text-[18px]">Explore</div>
                <section className="space-y-3">
                  <div>
                    <Link href="/" className="text-[14px]">
                      We are here to support you on your anti-aging journey.
                    </Link>
                  </div>
                  <div>
                    <Link href="/" className="text-[14px]">
                      Got questions about the L.A.B. Method, products, or
                      consultations?
                    </Link>
                  </div>
                  <div>
                    <Link href="/" className="text-[14px]">
                      info@labmethod.com
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
