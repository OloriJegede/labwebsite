"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { supabaseClient } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";

interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  price_per_hour: number;
  is_active: boolean;
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AvailabilityManager = () => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlot, setNewSlot] = useState({
    day_of_week: 1,
    start_time: "09:00",
    end_time: "17:00",
    price_per_hour: 100,
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("availability_slots")
        .select("*")
        .order("day_of_week", { ascending: true })
        .order("start_time", { ascending: true });

      if (error) throw error;
      setSlots(data || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      toast.error("Failed to load availability slots");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlot = async () => {
    try {
      const { error } = await supabaseClient
        .from("availability_slots")
        .insert([newSlot]);

      if (error) throw error;

      toast.success("Availability slot added!");
      fetchSlots();
      setNewSlot({
        day_of_week: 1,
        start_time: "09:00",
        end_time: "17:00",
        price_per_hour: 100,
      });
    } catch (error) {
      console.error("Error adding slot:", error);
      toast.error("Failed to add slot");
    }
  };

  const handleDeleteSlot = async (id: string) => {
    try {
      const { error } = await supabaseClient
        .from("availability_slots")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Slot deleted!");
      fetchSlots();
    } catch (error) {
      console.error("Error deleting slot:", error);
      toast.error("Failed to delete slot");
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabaseClient
        .from("availability_slots")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success(`Slot ${!currentStatus ? "activated" : "deactivated"}!`);
      fetchSlots();
    } catch (error) {
      console.error("Error toggling slot:", error);
      toast.error("Failed to update slot");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Add New Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Day</label>
            <select
              value={newSlot.day_of_week}
              onChange={(e) =>
                setNewSlot({
                  ...newSlot,
                  day_of_week: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {DAYS.map((day, index) => (
                <option key={index} value={index}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <Input
              type="time"
              value={newSlot.start_time}
              onChange={(e) =>
                setNewSlot({ ...newSlot, start_time: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Time</label>
            <Input
              type="time"
              value={newSlot.end_time}
              onChange={(e) =>
                setNewSlot({ ...newSlot, end_time: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Price/Hour ($)
            </label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={newSlot.price_per_hour}
              onChange={(e) =>
                setNewSlot({
                  ...newSlot,
                  price_per_hour: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </div>
        <Button onClick={handleAddSlot}>
          <Plus className="w-4 h-4 mr-2" />
          Add Slot
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Current Availability</h3>
        <div className="space-y-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-medium">{DAYS[slot.day_of_week]}</div>
                <div className="text-sm text-gray-600">
                  {slot.start_time} - {slot.end_time}
                </div>
                <div className="text-sm font-semibold text-[#ECC5C0]">
                  ${slot.price_per_hour}/hour
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={slot.is_active ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleToggleActive(slot.id, slot.is_active)}
                >
                  {slot.is_active ? "Active" : "Inactive"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteSlot(slot.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          {slots.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No availability slots set
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityManager;
