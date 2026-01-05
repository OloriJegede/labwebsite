"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { supabaseClient } from "@/lib/supabaseClient";
import Link from "next/link";

interface ConsultationStats {
  total: number;
  completed: number;
  pending: number;
  scheduled: number;
}

interface RecentActivity {
  id: string;
  first_name: string;
  last_name: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<ConsultationStats>({
    total: 0,
    completed: 0,
    pending: 0,
    scheduled: 0,
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all consultations
      const { data: consultations, error } = await supabaseClient
        .from("consultations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Calculate stats
      const total = consultations?.length || 0;
      const completed =
        consultations?.filter((c) => c.status === "completed").length || 0;
      const pending =
        consultations?.filter((c) => c.status === "pending").length || 0;
      const scheduled =
        consultations?.filter((c) => c.status === "scheduled").length || 0;

      setStats({ total, completed, pending, scheduled });

      // Get recent 5 activities
      setRecentActivities(consultations?.slice(0, 5) || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "scheduled":
        return "bg-blue-500";
      case "pending":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "completed";
      case "scheduled":
        return "scheduled";
      case "pending":
        return "pending";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const dashboardStats = [
    {
      title: "Total Consultations",
      value: stats.total.toString(),
      icon: Calendar,
      color: "bg-[#ECC5C0]",
      change: `${stats.pending} pending`,
    },
    {
      title: "Consultations Completed",
      value: stats.completed.toString(),
      icon: Calendar,
      color: "bg-[#D4A5A5]",
      change: `${Math.round((stats.completed / stats.total) * 100) || 0}% completion rate`,
    },
    {
      title: "Pending Consultations",
      value: stats.pending.toString(),
      icon: Clock,
      color: "bg-[#C4999B]",
      change: "Requires attention",
    },
    {
      title: "Scheduled Consultations",
      value: stats.scheduled.toString(),
      icon: Calendar,
      color: "bg-[#F5D5D0]",
      change: "Upcoming",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h3>
          <Link
            href="/admin/consultations"
            className="text-sm text-[#ECC5C0] hover:text-[#D4A5A5]"
          >
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <Link
                key={activity.id}
                href={`/admin/consultations/${activity.id}`}
                className="flex items-center justify-between text-sm hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 ${getStatusColor(activity.status)} rounded-full mr-3`}
                  ></div>
                  <span className="text-gray-600">
                    {activity.first_name} {activity.last_name} - Consultation{" "}
                    {getStatusText(activity.status)}
                  </span>
                </div>
                <span className="text-gray-400 text-xs">
                  {new Date(activity.created_at).toLocaleDateString()}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
