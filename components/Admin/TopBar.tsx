"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, ChevronDown } from "lucide-react";
import { supabaseClient } from "@/lib/supabaseClient";

interface UserProfile {
  email: string;
  full_name?: string;
}

const TopBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabaseClient.auth.getUser();

      if (error) throw error;

      if (user) {
        // Fetch profile from profiles table
        const { data: profile, error: profileError } = await supabaseClient
          .from("profiles")
          .select("email, full_name")
          .eq("id", user.id)
          .single();

        if (profileError) {
          // If profile doesn't exist, use user email
          setUserProfile({ email: user.email || "Admin User" });
        } else {
          setUserProfile(profile);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get current route name
  const getRouteName = () => {
    const route = pathname.split("/").pop();
    if (pathname === "/admin") return "Dashboard";
    return route ? route.charAt(0).toUpperCase() + route.slice(1) : "Dashboard";
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      router.push("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out");
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName =
    userProfile?.full_name || userProfile?.email?.split("@")[0] || "Admin User";

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          {getRouteName()}
        </h1>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 transition-colors"
            disabled={loading}
          >
            <div className="w-8 h-8 bg-[#ECC5C0] rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {loading
                  ? "..."
                  : getInitials(userProfile?.full_name || userProfile?.email)}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {loading ? "Loading..." : displayName}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {isDropdownOpen && !loading && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {userProfile?.full_name || "Admin User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userProfile?.email || "admin@example.com"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
