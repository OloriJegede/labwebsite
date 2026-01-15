"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Briefcase,
  CheckCircle,
  CreditCard,
  Calendar,
  Clock,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

interface Consultation {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  age: number;
  occupation: string;
  stress_level: string;
  readiness_score: number;
  payment_status: string;
  payment_amount?: string;
  payment_id?: string;
  payment_date?: string;
  created_at: string;
  status: string;
  goals: string[];
  sleep_hours: string;
  movement: string[];
  skin_concerns: string[];
  diet_description: string;
  energy_crashes: boolean;
  takes_supplements: boolean;
  health_issues: boolean;
  biggest_challenge: string;
  success_vision: string;
}

interface BookingSlot {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  total_price: number;
}

const ConsultationDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchConsultationData();
    }
  }, [id]);

  const fetchConsultationData = async () => {
    if (!id) {
      setError("Invalid consultation ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      const {
        data: { user },
        error: authError,
      } = await supabaseClient.auth.getUser();

      if (authError || !user) {
        setError("You must be logged in to view this page");
        toast.error("Authentication required");
        router.push("/auth");
        return;
      }

      // Fetch consultation data
      const { data: consultationData, error: consultationError } =
        await supabaseClient
          .from("consultations")
          .select("*")
          .eq("id", id)
          .single();

      if (consultationError) {
        console.error("Supabase error:", consultationError);
        throw new Error(consultationError.message);
      }

      if (!consultationData) {
        throw new Error("Consultation not found");
      }

      setConsultation(consultationData);

      // Fetch booking slots
      const { data: slotsData, error: slotsError } = await supabaseClient
        .from("consultation_bookings")
        .select("*")
        .eq("consultation_id", id)
        .order("booking_date", { ascending: true })
        .order("start_time", { ascending: true });

      if (slotsError) {
        console.error("Error fetching slots:", slotsError);
      } else {
        setBookingSlots(slotsData || []);
      }
    } catch (error: unknown) {
      console.error("Error fetching consultation:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load consultation"
      );
      toast.error("Failed to load consultation");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return;

    try {
      const { error } = await supabaseClient
        .from("consultations")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      if (consultation) {
        setConsultation({ ...consultation, status: newStatus });
      }

      toast.success("Status updated successfully!");
    } catch (error: unknown) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTotalDuration = () => {
    return bookingSlots.reduce((total, slot) => total + slot.duration_hours, 0);
  };

  const getTotalPrice = () => {
    return bookingSlots.reduce((total, slot) => total + slot.total_price, 0);
  };

  const formatTime = (time: string) => {
    // Convert 24h format to 12h format
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ECC5C0] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading consultation...</p>
        </div>
      </div>
    );
  }

  if (error || !consultation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-800 font-semibold mb-2">
              Error Loading Consultation
            </p>
            <p className="text-red-600 text-sm mb-4">
              {error || "Consultation not found"}
            </p>
            <Link
              href="/admin/consultations"
              className="inline-flex items-center gap-2 text-[#ECC5C0] hover:text-[#D4A5A5]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Consultations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link
        href="/admin/consultations"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Consultations
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            {consultation.first_name} {consultation.last_name}
          </h2>
          <p className="text-gray-600 mt-1">Consultation Details</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleStatusChange("scheduled")}
            disabled={consultation.status === "scheduled"}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mark as Scheduled
          </button>
          <button
            onClick={() => handleStatusChange("completed")}
            disabled={consultation.status === "completed"}
            className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mark as Completed
          </button>
        </div>
      </div>

      {/* Booking Information - NEW SECTION */}
      {bookingSlots.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-[#ECC5C0]">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-[#ECC5C0]" />
            <h3 className="text-xl font-bold text-gray-800">Booking Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-[#ECC5C0]" />
                <span className="text-sm font-medium text-gray-700">
                  Total Duration
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {getTotalDuration()} hour{getTotalDuration() !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#ECC5C0]" />
                <span className="text-sm font-medium text-gray-700">
                  Number of Slots
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {bookingSlots.length} slot{bookingSlots.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-[#ECC5C0]" />
                <span className="text-sm font-medium text-gray-700">
                  Total Amount
                </span>
              </div>
              <p className="text-2xl font-bold text-[#ECC5C0]">
                ${getTotalPrice().toFixed(2)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-lg mb-3 text-gray-800">
              Scheduled Time Slots:
            </h4>
            {bookingSlots.map((slot) => (
              <div
                key={slot.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#ECC5C0] transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#ECC5C0]" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {new Date(slot.booking_date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatTime(slot.start_time)} -{" "}
                        {formatTime(slot.end_time)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">
                        {slot.duration_hours}h
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="font-semibold text-[#ECC5C0]">
                        ${slot.total_price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5 text-[#ECC5C0]" />
            <h3 className="font-semibold text-gray-800">Basic Info</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-gray-600">Email:</span>{" "}
              <span className="font-medium">{consultation.email}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Phone:</span>{" "}
              <span className="font-medium">{consultation.phone_number}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Age:</span>{" "}
              <span className="font-medium">{consultation.age}</span>
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Submitted:</span>{" "}
              <span className="font-medium">
                {new Date(consultation.created_at).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-5 h-5 text-[#D4A5A5]" />
            <h3 className="font-semibold text-gray-800">Occupation</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">{consultation.occupation}</p>
            <p className="text-sm">
              <span className="text-gray-600">Stress Level:</span>{" "}
              <span
                className={`font-medium ${
                  consultation.stress_level === "High"
                    ? "text-red-600"
                    : consultation.stress_level === "Moderate"
                      ? "text-orange-600"
                      : "text-green-600"
                }`}
              >
                {consultation.stress_level}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-[#C4999B]" />
            <h3 className="font-semibold text-gray-800">Readiness</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              {consultation.readiness_score}
            </span>
            <span className="text-gray-600">/10</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Commitment to change</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard className="w-5 h-5 text-[#F5D5D0]" />
            <h3 className="font-semibold text-gray-800">Payment</h3>
          </div>
          <div className="space-y-2">
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                consultation.payment_status
              )}`}
            >
              {consultation.payment_status.charAt(0).toUpperCase() +
                consultation.payment_status.slice(1)}
            </span>
            {consultation.payment_amount && (
              <p className="text-sm">
                <span className="text-gray-600">Amount:</span>{" "}
                <span className="font-medium">
                  ${consultation.payment_amount}
                </span>
              </p>
            )}
            {consultation.payment_id && (
              <p className="text-sm">
                <span className="text-gray-600">ID:</span>{" "}
                <span className="font-medium text-xs break-all">
                  {consultation.payment_id}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Top Goals</h3>
        <div className="flex flex-wrap gap-2">
          {consultation.goals.map((goal: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#ECC5C0] text-white rounded-full text-sm"
            >
              {goal}
            </span>
          ))}
        </div>
      </div>

      {/* Lifestyle */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Lifestyle (L)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Sleep (hours/night)</p>
            <p className="font-medium">{consultation.sleep_hours}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Stress Level</p>
            <p className="font-medium">{consultation.stress_level}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Movement</p>
            <p className="font-medium">{consultation.movement.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Appearance (A)</h3>
        <div>
          <p className="text-sm text-gray-600 mb-2">Main Skin Concerns:</p>
          <div className="flex flex-wrap gap-2">
            {consultation.skin_concerns.map(
              (concern: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                >
                  {concern}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Balanced Diet */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Balanced Diet (B)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Diet Description</p>
            <p className="font-medium">{consultation.diet_description}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Energy Crashes/Cravings
            </p>
            <p className="font-medium">
              {consultation.energy_crashes ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Takes Supplements</p>
            <p className="font-medium">
              {consultation.takes_supplements ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      {/* Context & Expectations */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">
          Context & Expectations
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Health Issues (Hormone/Thyroid/Blood Sugar)
            </p>
            <p className="font-medium">
              {consultation.health_issues ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Biggest Challenge</p>
            <p className="font-medium">{consultation.biggest_challenge}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">
              Success Vision (3-6 months)
            </p>
            <p className="font-medium">{consultation.success_vision}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationDetail;
