"use client";

import React, { useState, useEffect } from "react";
import Community from "./Community";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const CommunityDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the dialog
    const hasSeenDialog = localStorage.getItem("hasSeenCommunityDialog");

    if (!hasSeenDialog) {
      // Show dialog after 3 seconds delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Mark as seen in localStorage when closed
      localStorage.setItem("hasSeenCommunityDialog", "true");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="[&>button]:text-black [&>button]:hover:text-black">
        <Community />
      </DialogContent>
    </Dialog>
  );
};

export default CommunityDialog;
