import Login from "@/components/Login/login";
import React from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default page;
