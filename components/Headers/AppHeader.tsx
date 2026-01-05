"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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

  return (
    <div>
      <section className="hidden md:block">
        <div className="flex justify-center items-center pt-5">
          <Image src={`/logo.svg`} width={102} height={78.42} alt="logo" />
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
            <Link href="#">
              <div className="text-[#808080] hover:text-black text-[18px]">
                Shop
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
                    Categories
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
          </div>
        </div>
      </section>
      <section className="block md:hidden px-6 pt-10 pb-4">
        <div className="flex justify-between items-center">
          <Image src={`/menu.svg`} width={22} height={24} alt="menu" />
          <Image src={`/logo.svg`} width={41} height={31.52} alt="logo" />
        </div>
      </section>
    </div>
  );
};

export default AppHeader;
