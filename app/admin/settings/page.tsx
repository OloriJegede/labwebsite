"use client";

import React, { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Plus, Trash2, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  price_per_hour: number;
  is_active: boolean;
  created_at?: string;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const SettingsPage = () => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    day_of_week: 1,
    start_time: "09:00",
    end_time: "17:00",
    price_per_hour: 100,
    is_active: true,
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("availability_slots")
        .select("*")
        .gte("day_of_week", 1)
        .lte("day_of_week", 5)
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

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that end time is after start time
    if (formData.end_time <= formData.start_time) {
      toast.error("End time must be after start time");
      return;
    }

    try {
      const { error } = await supabaseClient
        .from("availability_slots")
        .insert([formData]);

      if (error) throw error;

      toast.success("Time slot added successfully!");
      setShowAddForm(false);
      setFormData({
        day_of_week: 1,
        start_time: "09:00",
        end_time: "17:00",
        price_per_hour: 100,
        is_active: true,
      });
      fetchSlots();
    } catch (error) {
      console.error("Error adding slot:", error);
      toast.error("Failed to add time slot");
    }
  };

  const handleUpdateSlot = async (
    id: string,
    updates: Partial<AvailabilitySlot>
  ) => {
    try {
      const { error } = await supabaseClient
        .from("availability_slots")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast.success("Time slot updated successfully!");
      fetchSlots();
    } catch (error) {
      console.error("Error updating slot:", error);
      toast.error("Failed to update time slot");
    }
  };

  const handleDeleteSlot = async (id: string) => {
    if (!confirm("Are you sure you want to delete this time slot?")) return;

    try {
      const { error } = await supabaseClient
        .from("availability_slots")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Time slot deleted successfully!");
      fetchSlots();
    } catch (error) {
      console.error("Error deleting slot:", error);
      toast.error("Failed to delete time slot");
    }
  };

  const toggleSlotStatus = async (id: string, currentStatus: boolean) => {
    await handleUpdateSlot(id, { is_active: !currentStatus });
  };

  // Group slots by day
  const slotsByDay = slots.reduce(
    (acc, slot) => {
      const day = slot.day_of_week;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(slot);
      return acc;
    },
    {} as Record<number, AvailabilitySlot[]>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ECC5C0] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Availability Settings
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your consultation time slots (Monday - Friday). Add multiple
            slots per day for flexible scheduling.
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2"
        >
          {showAddForm ? (
            <>
              <X className="w-4 h-4" /> Cancel
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" /> Add Time Slot
            </>
          )}
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {DAYS.map((day, index) => {
          const daySlots = slotsByDay[index + 1] || [];
          const activeSlots = daySlots.filter((s) => s.is_active).length;
          return (
            <div
              key={day}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
            >
              <div className="text-sm font-medium text-gray-600">{day}</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">
                {activeSlots}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {daySlots.length > activeSlots &&
                  `(${daySlots.length - activeSlots} inactive)`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Add New Time Slot
          </h3>
          <form
            onSubmit={handleAddSlot}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Day of Week
              </label>
              <select
                value={formData.day_of_week}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    day_of_week: parseInt(e.target.value),
                  })
                }
                className="w-full h-[45px] border border-gray-300 rounded-lg px-3"
                required
              >
                {DAYS.map((day, index) => (
                  <option key={index + 1} value={index + 1}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <Input
                type="time"
                value={formData.start_time}
                onChange={(e) =>
                  setFormData({ ...formData, start_time: e.target.value })
                }
                className="h-[45px]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <Input
                type="time"
                value={formData.end_time}
                onChange={(e) =>
                  setFormData({ ...formData, end_time: e.target.value })
                }
                className="h-[45px]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per Hour ($)
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={formData.price_per_hour}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price_per_hour: parseFloat(e.target.value),
                  })
                }
                className="h-[45px]"
                required
              />
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <Button type="submit" className="w-full">
                Add Time Slot
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Slots Grouped by Day */}
      <div className="space-y-6">
        {DAYS.map((day, dayIndex) => {
          const daySlots = slotsByDay[dayIndex + 1] || [];

          if (daySlots.length === 0) return null;

          return (
            <div
              key={day}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#ECC5C0]" />
                    {day}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {daySlots.length} slot{daySlots.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {daySlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-[#ECC5C0] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-lg font-semibold text-gray-900">
                            {slot.start_time} - {slot.end_time}
                          </div>
                          <div className="text-sm text-[#ECC5C0] font-medium mt-1">
                            ${slot.price_per_hour}/hour
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            toggleSlotStatus(slot.id, slot.is_active)
                          }
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            slot.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {slot.is_active ? "Active" : "Inactive"}
                        </button>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                          Duration:{" "}
                          {(() => {
                            const [startH, startM] = slot.start_time
                              .split(":")
                              .map(Number);
                            const [endH, endM] = slot.end_time
                              .split(":")
                              .map(Number);
                            const hours = endH - startH;
                            const mins = endM - startM;
                            const totalHours = hours + mins / 60;
                            return `${totalHours}h`;
                          })()}
                        </div>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {slots.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            No time slots configured yet.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Add your first time slot to start accepting consultations.
          </p>
          <Button
            onClick={() => setShowAddForm(true)}
            className="mt-4 flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" /> Add Your First Slot
          </Button>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
