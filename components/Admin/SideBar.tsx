"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, FileText, Users, Calendar, Settings } from "lucide-react";

const SideBar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/admin", icon: Home },
    { name: "Consultations", href: "/admin/consultations", icon: Calendar },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-sm min-h-screen">
      <div className="p-6">
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900 border-r-4 border-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideBar;
