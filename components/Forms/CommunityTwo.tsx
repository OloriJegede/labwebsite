"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Script from "next/script";

interface CommunityProps {
  onSuccess?: () => void;
}

const Community = ({ onSuccess }: CommunityProps = {}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      const data = await response.json(); // <--- Parse the response

      if (!response.ok) {
        // Use the actual error from the server
        throw new Error(data.error || "Server failed to subscribe");
      }

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
      });

      // Call onSuccess callback if provided (for dialog)
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to subscribe. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=WmEjJb`}
        strategy="lazyOnload"
      />

      <div className="bg-black p-6 md:p-12 text-white space-y-5" id="community">
        {success ? (
          <div className="text-center py-8">
            <div className="text-[#ECC5C0] text-xl font-semibold mb-2">
              ✓ Successfully subscribed!
            </div>
            <p className="text-gray-300">
              Thank you for joining our community. Check your email for updates.
            </p>
          </div>
        ) : (
          <>
            <div className="text-[40px] md:text-[56px] imbue-medium leading-[100%]">
              Join the L.A.B. Community
            </div>
            <div className="text-[14px] md:text-[16px]">
              Get weekly science-informed lifestyle tips, beauty insights, food
              guides, and more.
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="bg-black text-white border-white placeholder:text-gray-400"
              />
              <Input
                type="text"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="bg-black text-white border-white placeholder:text-gray-400"
              />
              <Input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-black text-white border-white placeholder:text-gray-400"
              />
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <div className="pt-5">
                <Button
                  type="submit"
                  disabled={loading}
                  className="hover:bg-white text-black bg-[#ECC5C0] w-full"
                >
                  {loading ? "Subscribing..." : "Subscribe Now"}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Community;
