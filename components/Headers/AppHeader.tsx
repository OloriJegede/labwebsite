"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppHeader = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-white">
      <section className="hidden md:block">
        <div className="flex justify-center items-center pt-5 transition-all duration-300 ease-in-out">
          <Image
            src={
              isScrolled
                ? "https://res.cloudinary.com/dtci8qu00/image/upload/v1768559920/Wordmark_-_Black_l0huxy.png"
                : `/logo.svg`
            }
            width={isScrolled ? 500 : 102}
            height={78.42}
            alt="logo"
            className="transition-all duration-300 ease-in-out"
            priority
          />
        </div>
        <div className="border-[0.5px] border-y-[#999999] py-3 mt-5">
          <div className="flex justify-center items-center space-x-8">
            <Link href="/">
              <div
                className={`${
                  pathname === "/" ? "text-black" : "text-[#808080]"
                } hover:text-black text-[18px]`}
              >
                Home
              </div>
            </Link>
            <Link href="/about">
              <div className="text-[#808080] hover:text-black text-[18px]">
                About
              </div>
            </Link>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div
                    className={`${
                      pathname.includes("/lifestyle") ||
                      pathname.includes("/appearance") ||
                      pathname.includes("/balance-diet")
                        ? "text-black"
                        : "text-[#808080]"
                    } hover:text-black text-[18px] flex items-center gap-1`}
                  >
                    Pillars
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2 w-[317px]">
                  <DropdownMenuLabel>
                    <Link href={`/lifestyle`}>Lifestyle</Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/appearance`}>Appearance</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/balance-diet`}>Balance Diet</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link href="/consultation">
              <div
                className={`${
                  pathname === "/consultation" ? "text-black" : "text-[#808080]"
                } hover:text-black text-[18px]`}
              >
                Consultation
              </div>
            </Link>
            <Link href="/contact-us">
              <div
                className={`${
                  pathname === "/contact-us" ? "text-black" : "text-[#808080]"
                } hover:text-black text-[18px]`}
              >
                Contact
              </div>
            </Link>
            <Link href={`/#footer`}>
              <Button size={"lg"} className="bg-[#ECC5C0] text-black">
                Subscribe
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="block md:hidden px-6 pt-10 pb-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Image src={`/menu.svg`} width={22} height={24} alt="menu" />
          </button>
          <div className="flex justify-center items-center transition-all duration-300 ease-in-out">
            <Image
              src={
                isScrolled
                  ? "https://res.cloudinary.com/dtci8qu00/image/upload/v1768559920/Wordmark_-_Black_l0huxy.png"
                  : `/logo.svg`
              }
              width={isScrolled ? 280 : 41}
              height={31}
              alt="logo"
              className="transition-all duration-300 ease-in-out"
              priority
            />
          </div>
          <Link href="/#community" aria-label="Subscribe">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 7 10-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 left-0 h-full w-full bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center px-6 pt-10 pb-6 border-b">
                <Image src={`/logo.svg`} width={41} height={31.52} alt="logo" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col px-6 py-6 space-y-6">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <div
                    className={`${pathname === "/" ? "text-black font-semibold" : "text-[#808080]"} text-lg`}
                  >
                    Home
                  </div>
                </Link>

                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  <div
                    className={`${pathname === "/about" ? "text-black font-semibold" : "text-[#808080]"} text-lg`}
                  >
                    About
                  </div>
                </Link>

                <div className="space-y-3">
                  <div className="text-black font-semibold text-lg">
                    Pillars
                  </div>
                  <div className="pl-4 space-y-3">
                    <Link
                      href="/lifestyle"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div
                        className={`${pathname.includes("/lifestyle") ? "text-black font-semibold" : "text-[#808080]"} text-base`}
                      >
                        Lifestyle
                      </div>
                    </Link>
                    <Link
                      href="/appearance"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div
                        className={`${pathname.includes("/appearance") ? "text-black font-semibold" : "text-[#808080]"} text-base`}
                      >
                        Appearance
                      </div>
                    </Link>
                    <Link
                      href="/balance-diet"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div
                        className={`${pathname.includes("/balance-diet") ? "text-black font-semibold" : "text-[#808080]"} text-base`}
                      >
                        Balance Diet
                      </div>
                    </Link>
                  </div>
                </div>

                <Link
                  href="/consultation"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={`${pathname === "/consultation" ? "text-black font-semibold" : "text-[#808080]"} text-lg`}
                  >
                    Consultation
                  </div>
                </Link>

                <Link
                  href="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div
                    className={`${pathname === "/contact-us" ? "text-black font-semibold" : "text-[#808080]"} text-lg`}
                  >
                    Contact
                  </div>
                </Link>
                {/* <Link href={`/#footer`}>
                  <Button size={"lg"} className="bg-[#ECC5C0] text-black">
                    Subscribe
                  </Button>
                </Link> */}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppHeader;
