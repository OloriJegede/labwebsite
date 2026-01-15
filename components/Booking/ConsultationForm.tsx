"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Script from "next/script";

interface AvailabilitySlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  price_per_hour: number;
}

interface BookedSlot {
  booking_date: string;
  start_time: string;
  end_time: string;
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

interface PayPalOrderActions {
  order: {
    create: (orderData: {
      purchase_units: Array<{
        amount: {
          value: string;
          currency_code: string;
        };
        description: string;
      }>;
    }) => Promise<string>;
    capture: () => Promise<{
      id: string;
      status: string;
      [key: string]: unknown;
    }>;
  };
}

interface PayPalButtonsComponentOptions {
  style?: {
    layout?: string;
    color?: string;
    shape?: string;
    label?: string;
  };
  createOrder: (data: Record<string, unknown>, actions: PayPalOrderActions) => Promise<string>;
  onApprove: (data: Record<string, unknown>, actions: PayPalOrderActions) => Promise<void>;
  onError?: (err: unknown) => void;
  onCancel?: () => void;
}

interface PayPalNamespace {
  Buttons: (options: PayPalButtonsComponentOptions) => {
    render: (selector: string) => void;
  };
}

declare global {
  interface Window {
    paypal?: PayPalNamespace;
  }
}

const ConsultationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<AvailabilitySlot[]>([]);
  const [bookingDate, setBookingDate] = useState("");
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [consultationId, setConsultationId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    age: "",
    occupation: "",
    goals: [] as string[],
    readinessScore: "",
    sleepHours: "",
    stressLevel: "",
    movement: [] as string[],
    skinConcerns: [] as string[],
    dietDescription: "",
    energyCrashes: "",
    takesSupplements: "",
    healthIssues: "",
    biggestChallenge: "",
    successVision: "",
  });

  useEffect(() => {
    fetchAvailability();
    fetchBookedSlots();
  }, []);

  useEffect(() => {
    if (bookingDate) {
      setSelectedSlots([]);
    }
  }, [bookingDate]);

  useEffect(() => {
    if (paypalLoaded && showPayPal && window.paypal) {
      renderPayPalButton();
    }
  }, [paypalLoaded, showPayPal]);

  const fetchAvailability = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("availability_slots")
        .select("*")
        .eq("is_active", true)
        .order("day_of_week", { ascending: true })
        .order("start_time", { ascending: true });

      if (error) throw error;
      setAvailableSlots(data || []);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const fetchBookedSlots = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("consultation_bookings")
        .select("booking_date, start_time, end_time")
        .gte("booking_date", new Date().toISOString().split("T")[0]);

      if (error) throw error;
      setBookedSlots(data || []);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    }
  };

  const isSlotBooked = (slot: AvailabilitySlot, date: string) => {
    return bookedSlots.some(
      (booked) =>
        booked.booking_date === date &&
        booked.start_time === slot.start_time &&
        booked.end_time === slot.end_time
    );
  };

  const getAvailableSlotsForDate = () => {
    if (!bookingDate) return [];

    const selectedDate = new Date(bookingDate + "T00:00:00");
    const dayOfWeek = selectedDate.getDay();

    return availableSlots.filter(
      (slot) =>
        slot.day_of_week === dayOfWeek && !isSlotBooked(slot, bookingDate)
    );
  };

  const toggleSlotSelection = (slot: AvailabilitySlot) => {
    setSelectedSlots((prev) => {
      const isSelected = prev.some((s) => s.id === slot.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== slot.id);
      } else {
        return [...prev, slot];
      }
    });
  };

  const calculateSlotDuration = (slot: AvailabilitySlot) => {
    const [startH, startM] = slot.start_time.split(":").map(Number);
    const [endH, endM] = slot.end_time.split(":").map(Number);
    return endH - startH + (endM - startM) / 60;
  };

  const calculateSlotPrice = (slot: AvailabilitySlot) => {
    const duration = calculateSlotDuration(slot);
    return slot.price_per_hour * duration;
  };

  const calculateTotalPrice = () => {
    return selectedSlots.reduce((total, slot) => {
      return total + calculateSlotPrice(slot);
    }, 0);
  };

  const calculateTotalDuration = () => {
    return selectedSlots.reduce((total, slot) => {
      return total + calculateSlotDuration(slot);
    }, 0);
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      if (currentArray.includes(value)) {
        return {
          ...prev,
          [field]: currentArray.filter((item) => item !== value),
        };
      } else {
        // Limit goals to 3
        if (field === "goals" && currentArray.length >= 3) {
          toast.error("Maximum 3 goals allowed");
          return prev;
        }
        return {
          ...prev,
          [field]: [...currentArray, value],
        };
      }
    });
  };

  const handleRadioChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSlots.length === 0 || !bookingDate) {
      toast.error("Please select a date and at least one time slot");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const totalPrice = calculateTotalPrice();

      // Insert consultation with pending payment status
      const { data: consultationData, error: consultationError } =
        await supabaseClient
          .from("consultations")
          .insert([
            {
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              phone_number: formData.phoneNumber,
              age: parseInt(formData.age),
              occupation: formData.occupation,
              goals: formData.goals,
              readiness_score: parseInt(formData.readinessScore),
              sleep_hours: formData.sleepHours,
              stress_level: formData.stressLevel,
              movement: formData.movement,
              skin_concerns: formData.skinConcerns,
              diet_description: formData.dietDescription,
              energy_crashes: formData.energyCrashes === "yes",
              takes_supplements: formData.takesSupplements === "yes",
              health_issues: formData.healthIssues === "yes",
              biggest_challenge: formData.biggestChallenge,
              success_vision: formData.successVision,
              payment_amount: totalPrice.toString(),
              payment_status: "pending",
            },
          ])
          .select()
          .single();

      if (consultationError) throw consultationError;

      setConsultationId(consultationData.id);

      // Insert booking details for each selected slot
      const bookingInserts = selectedSlots.map((slot) => {
        const duration = calculateSlotDuration(slot);
        const slotPrice = calculateSlotPrice(slot);

        return {
          consultation_id: consultationData.id,
          booking_date: bookingDate,
          start_time: slot.start_time,
          end_time: slot.end_time,
          duration_hours: duration,
          total_price: slotPrice,
        };
      });

      const { error: bookingError } = await supabaseClient
        .from("consultation_bookings")
        .insert(bookingInserts);

      if (bookingError) throw bookingError;

      setShowPayPal(true);
      toast.success("Consultation created! Please complete payment.");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while booking consultation";
      setError(errorMessage);
      toast.error("Failed to create consultation", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderPayPalButton = () => {
    const totalPrice = calculateTotalPrice();

    if (!window.paypal || !consultationId) return;

    const container = document.getElementById("paypal-button-container");
    if (!container || container.hasChildNodes()) return;

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
        },
        createOrder: (data: Record<string, unknown>, actions: PayPalOrderActions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice.toFixed(2),
                  currency_code: "USD",
                },
                description: `Consultation Booking - ${formData.firstName} ${formData.lastName} - ${bookingDate}`,
              },
            ],
          });
        },
        onApprove: async (data: Record<string, unknown>, actions: PayPalOrderActions) => {
          return actions.order.capture().then(async (details) => {
            // Update consultation payment status
            const { error: updateError } = await supabaseClient
              .from("consultations")
              .update({
                payment_status: "completed",
                payment_id: details.id,
              })
              .eq("id", consultationId);

            if (updateError) {
              console.error("Error updating payment status:", updateError);
              toast.error("Payment captured but status update failed");
              return;
            }

            // Send email notification
            await fetch("/api/send-booking-confirmation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                bookingDate,
                slots: selectedSlots.map((slot) => ({
                  startTime: slot.start_time,
                  endTime: slot.end_time,
                })),
                totalDuration: calculateTotalDuration(),
                totalPrice,
                paymentId: details.id,
              }),
            });

            toast.success("Payment successful!", {
              description: "Check your email for booking confirmation.",
            });

            setTimeout(() => {
              router.push("/");
            }, 2000);
          });
        },
        onError: (err: unknown) => {
          console.error("PayPal error:", err);
          toast.error("Payment failed. Please try again.");
        },
        onCancel: () => {
          toast.info("Payment cancelled. You can complete it later.");
        },
      })
      .render("#paypal-button-container");
  };

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`}
        onLoad={() => setPaypalLoaded(true)}
        strategy="lazyOnload"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-0 py-14">
        <h3 className="text-[56px] imbue-medium">Book a Consultation</h3>
        <div className="text-[16px] text-[#1A1A1A]">
          Fill in the information to book a consultation
        </div>

        {error && (
          <div className="mt-4 p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {!showPayPal ? (
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Booking Time Section */}
            <section className="pt-8">
              <div className="gotham-medium text-[24px] mb-2">
                Select Date & Time Slots
              </div>

              <div className="mb-6">
                <label className="text-[16px] block mb-2">Booking Date</label>
                <Input
                  required
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="h-[65px] border border-[#808080]"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                />
              </div>

              {bookingDate && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[16px]">
                      Available Time Slots for{" "}
                      {DAYS[new Date(bookingDate + "T00:00:00").getDay()]} -{" "}
                      {new Date(bookingDate).toLocaleDateString()}
                    </label>
                    {selectedSlots.length > 0 && (
                      <span className="text-sm text-gray-600">
                        {selectedSlots.length} slot
                        {selectedSlots.length !== 1 ? "s" : ""} selected
                      </span>
                    )}
                  </div>

                  {getAvailableSlotsForDate().length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-500">
                        No available time slots for this date. Please select
                        another date.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getAvailableSlotsForDate().map((slot) => {
                          const isSelected = selectedSlots.some(
                            (s) => s.id === slot.id
                          );
                          const duration = calculateSlotDuration(slot);
                          const slotPrice = calculateSlotPrice(slot);

                          return (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => toggleSlotSelection(slot)}
                              className={`p-4 border-2 rounded-lg text-left transition-all ${
                                isSelected
                                  ? "border-[#ECC5C0] bg-[#ECC5C0]/10"
                                  : "border-gray-300 hover:border-[#ECC5C0]/50"
                              }`}
                            >
                              <div className="font-semibold text-gray-900 text-lg">
                                {slot.start_time} - {slot.end_time}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                Duration: {duration}h
                              </div>
                              <div className="text-sm font-medium text-[#ECC5C0] mt-1">
                                ${slotPrice.toFixed(2)}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {selectedSlots.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mt-4">
                          <div className="font-semibold text-gray-800 mb-3">
                            Selected Time Slots:
                          </div>
                          <div className="space-y-2 mb-4">
                            {selectedSlots.map((slot) => (
                              <div
                                key={slot.id}
                                className="flex justify-between text-sm bg-white p-2 rounded"
                              >
                                <span className="text-gray-700">
                                  {slot.start_time} - {slot.end_time}
                                </span>
                                <span className="text-[#ECC5C0] font-medium">
                                  ${calculateSlotPrice(slot).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-3 border-t border-gray-300 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-800">
                                Total Duration:
                              </span>
                              <span className="text-gray-900">
                                {calculateTotalDuration()}h
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-gray-800">
                                Total Price:
                              </span>
                              <span className="text-xl font-bold text-[#ECC5C0]">
                                ${calculateTotalPrice().toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </section>

            <section className="pt-8">
              <div className="gotham-medium text-[24px] mb-2">
                Basic Information
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[16px]">First Name</label>
                  <Input
                    required
                    placeholder="First Name"
                    className="h-[65px] border border-[#808080]"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px]">Last Name</label>
                  <Input
                    required
                    placeholder="Last Name"
                    className="h-[65px] border border-[#808080]"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px]">Email Address</label>
                  <Input
                    required
                    type="email"
                    placeholder="Email Address"
                    className="h-[65px] border border-[#808080]"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px]">Phone Number</label>
                  <Input
                    required
                    placeholder="Phone Number"
                    className="h-[65px] border border-[#808080]"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px]">Age</label>
                  <Input
                    required
                    type="number"
                    placeholder="Age"
                    className="h-[65px] border border-[#808080]"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[16px]">Occupation</label>
                  <Input
                    required
                    placeholder="Occupation"
                    className="h-[65px] border border-[#808080]"
                    value={formData.occupation}
                    onChange={(e) =>
                      setFormData({ ...formData, occupation: e.target.value })
                    }
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="gotham-medium text-[24px] mb-2">Goals</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-[14px]">
                    What are your top 2–3 goals? (3 max)
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    {[
                      "Improve skin / slow aging",
                      "Fat loss (especially midsection)",
                      "Hormone balance",
                      "Energy/fatigue",
                      "Sleep",
                      "Stress management",
                    ].map((goal) => (
                      <div key={goal} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={goal}
                          className="w-5 h-5"
                          checked={formData.goals.includes(goal)}
                          onChange={() => handleCheckboxChange("goals", goal)}
                        />
                        <label htmlFor={goal} className="text-[14px]">
                          {goal}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    On a scale of 1–10, how ready are you to incorporate changes
                    into your daily routine?
                  </div>
                  <Input
                    required
                    type="number"
                    min="1"
                    max="10"
                    placeholder="Input a figure"
                    className="h-[65px] border border-[#808080]"
                    value={formData.readinessScore}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        readinessScore: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="gotham-medium text-[24px] mb-2">
                Lifestyle (L)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-[14px]">Sleep (hours/night)</div>
                  <div className="flex flex-col gap-4 mt-4">
                    {["<5", "5-6", "6-7", "7+"].map((hours) => (
                      <div key={hours} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`sleep-${hours}`}
                          name="sleepHours"
                          className="w-5 h-5"
                          checked={formData.sleepHours === hours}
                          onChange={() =>
                            handleRadioChange("sleepHours", hours)
                          }
                        />
                        <label
                          htmlFor={`sleep-${hours}`}
                          className="text-[14px]"
                        >
                          {hours}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[14px]">
                    How would you rate your stress level? (select one)
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    {["Low", "Moderate", "High"].map((level) => (
                      <div key={level} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`stress-${level}`}
                          name="stressLevel"
                          className="w-5 h-5"
                          checked={formData.stressLevel === level}
                          onChange={() =>
                            handleRadioChange("stressLevel", level)
                          }
                        />
                        <label
                          htmlFor={`stress-${level}`}
                          className="text-[14px]"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[14px]">
                    Movement (check all that apply)
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    {[
                      "Walking",
                      "Strength training",
                      "Intense cardio",
                      "Little to none",
                    ].map((activity) => (
                      <div key={activity} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={activity}
                          className="w-5 h-5"
                          checked={formData.movement.includes(activity)}
                          onChange={() =>
                            handleCheckboxChange("movement", activity)
                          }
                        />
                        <label htmlFor={activity} className="text-[14px]">
                          {activity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="gotham-medium text-[24px] mb-2">
                Appearance (A)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-[14px]">
                    Your main skin concerns (check all that apply)
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    {[
                      "Wrinkles/Sagging",
                      "Uneven tone",
                      "Dryness",
                      "Breakouts",
                      "Sensitivity",
                    ].map((concern) => (
                      <div key={concern} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={concern}
                          className="w-5 h-5"
                          checked={formData.skinConcerns.includes(concern)}
                          onChange={() =>
                            handleCheckboxChange("skinConcerns", concern)
                          }
                        />
                        <label htmlFor={concern} className="text-[14px]">
                          {concern}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="gotham-medium text-[24px] mb-2">
                Balanced Diet (B)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-[14px]">
                    How would you describe your diet?
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    {[
                      "Mostly protein and whole foods",
                      "Mixed",
                      "Inconsistent",
                    ].map((diet) => (
                      <div key={diet} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={diet}
                          name="dietDescription"
                          className="w-5 h-5"
                          checked={formData.dietDescription === diet}
                          onChange={() =>
                            handleRadioChange("dietDescription", diet)
                          }
                        />
                        <label htmlFor={diet} className="text-[14px]">
                          {diet}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[14px]">
                    Do you experience energy crashes or cravings for sugar?
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    {["yes", "no"].map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`crashes-${option}`}
                          name="energyCrashes"
                          className="w-5 h-5"
                          checked={formData.energyCrashes === option}
                          onChange={() =>
                            handleRadioChange("energyCrashes", option)
                          }
                        />
                        <label
                          htmlFor={`crashes-${option}`}
                          className="text-[14px]"
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[14px]">
                    Do you currently take supplements?
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    {["yes", "no"].map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`supplements-${option}`}
                          name="takesSupplements"
                          className="w-5 h-5"
                          checked={formData.takesSupplements === option}
                          onChange={() =>
                            handleRadioChange("takesSupplements", option)
                          }
                        />
                        <label
                          htmlFor={`supplements-${option}`}
                          className="text-[14px]"
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="gotham-medium text-[24px] mb-2">
                Context & Expectations
              </div>
              <div className="">
                <div>
                  <div className="text-[14px]">
                    Have you been told you have hormone, thyroid, or blood sugar
                    issues?
                  </div>
                  <div className="flex flex-col gap-4 mt-4">
                    {["yes", "no"].map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`health-${option}`}
                          name="healthIssues"
                          className="w-5 h-5"
                          checked={formData.healthIssues === option}
                          onChange={() =>
                            handleRadioChange("healthIssues", option)
                          }
                        />
                        <label
                          htmlFor={`health-${option}`}
                          className="text-[14px]"
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="text-[14px] pt-4 mb-2">
                    What has been your biggest challenge in improving your
                    health or appearance?
                  </div>
                  <Textarea
                    required
                    placeholder="Write here..."
                    className="h-[164px] border rounded-none border-[#808080]"
                    value={formData.biggestChallenge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        biggestChallenge: e.target.value,
                      })
                    }
                  />
                  <div className="text-[14px] pt-4 mb-2">
                    What would success look like for you in the next 3–6 months?
                  </div>
                  <Textarea
                    required
                    placeholder="Write here..."
                    className="h-[164px] border rounded-none border-[#808080]"
                    value={formData.successVision}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        successVision: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            <Button
              type="submit"
              disabled={loading || selectedSlots.length === 0}
              className="w-full h-[65px] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Processing..."
                : selectedSlots.length > 0
                  ? `Continue to Payment - $${calculateTotalPrice().toFixed(2)}`
                  : "Select Time Slots to Continue"}
            </Button>
          </form>
        ) : (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Complete Your Payment
                </h3>
                <p className="text-gray-600 text-sm">
                  Secure checkout with PayPal
                </p>
              </div>

              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-medium">
                    Booking Details:
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(bookingDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">
                      {calculateTotalDuration()}h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Slots:</span>
                    <span className="font-medium">{selectedSlots.length}</span>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-[#ECC5C0]">
                      ${calculateTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div id="paypal-button-container" className="min-h-[200px]"></div>

              <button
                onClick={() => {
                  setShowPayPal(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full mt-4 text-sm text-gray-600 hover:text-gray-800 underline"
              >
                ← Edit booking details
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ConsultationForm;
