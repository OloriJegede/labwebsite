"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { supabaseClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ConsultationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabaseClient
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
          },
        ]);

      if (error) throw error;

      toast.success("Consultation booked successfully!", {
        description: "We'll get back to you soon.",
      });

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while booking consultation";
      setError(errorMessage);
      toast.error("Failed to book consultation", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <form onSubmit={handleSubmit} className="space-y-10">
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
                  setFormData({ ...formData, readinessScore: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        <section>
          <div className="gotham-medium text-[24px] mb-2">Lifestyle (L)</div>
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
                      onChange={() => handleRadioChange("sleepHours", hours)}
                    />
                    <label htmlFor={`sleep-${hours}`} className="text-[14px]">
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
                      onChange={() => handleRadioChange("stressLevel", level)}
                    />
                    <label htmlFor={`stress-${level}`} className="text-[14px]">
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[14px]">Movement (check all that apply)</div>
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
          <div className="gotham-medium text-[24px] mb-2">Appearance (A)</div>
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
                      onChange={() => handleRadioChange("healthIssues", option)}
                    />
                    <label htmlFor={`health-${option}`} className="text-[14px]">
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
              <div className="text-[14px] pt-4 mb-2">
                What has been your biggest challenge in improving your health or
                appearance?
              </div>
              <Textarea
                required
                placeholder="Write here..."
                className="h-[164px] border rounded-none border-[#808080]"
                value={formData.biggestChallenge}
                onChange={(e) =>
                  setFormData({ ...formData, biggestChallenge: e.target.value })
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
                  setFormData({ ...formData, successVision: e.target.value })
                }
              />
            </div>
          </div>
        </section>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-[65px] text-lg"
        >
          {loading ? "Submitting..." : "Book Consultation"}
        </Button>
      </form>
    </div>
  );
};

export default ConsultationForm;
