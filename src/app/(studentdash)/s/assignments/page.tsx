"use client";

import React, { useState } from "react";
import { Search, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

// Mock data to match the exact screenshots provided
const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    title: "Advanced Insights into Cardiac Arrhythmias",
    sessionName: "Webinar: Breakthroughs in Cognitive Neurosciencebinar:",
    mentorImage: "https://ui-avatars.com/api/?name=Dr+Sophia&background=random",
    mentorName: "Dr. Sophia Tyler",
    status: "OVERDUE",
    date: "26 FEB, 2026",
    type: "pending",
    colorScheme: "red",
  },
  {
    id: 2,
    title: "Breaking Down the Latest Trends in Machine Learning",
    sessionName: "Cohort: The Rise of Edge Computing",
    mentorImage: "https://ui-avatars.com/api/?name=John+Doe&background=random",
    mentorName: "John Doe",
    status: "DUE",
    date: "1 MAR, 2026",
    type: "pending",
    colorScheme: "orange",
  },
  {
    id: 3,
    title: "Understanding Blockchain's Impact on Finance",
    sessionName: "1:1 Mentorship: The Rise of Edge Computing",
    mentorImage: "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
    mentorName: "Jane Smith",
    status: "DUE",
    date: "13 APR, 2026",
    type: "pending",
    colorScheme: "gray",
  },
  {
    id: 4,
    title: "Sustainable Energy Solutions for Tomorrow",
    sessionName: "1:1 Mentorship: The Rise of Edge Computing",
    mentorImage: "https://ui-avatars.com/api/?name=Dr+Sophia&background=random",
    mentorName: "Dr. Sophia Tyler",
    status: "DUE",
    date: "10 JULY, 2026",
    type: "pending",
    colorScheme: "gray",
  },
  {
    id: 5,
    title: "Advanced Insights into Cardiac Arrhythmias",
    sessionName: "Webinar: Breakthroughs in Cognitive Neurosciencebinar:",
    mentorImage: "https://ui-avatars.com/api/?name=Dr+Sophia&background=random",
    mentorName: "Dr. Sophia Tyler",
    status: "SUBMITTED ON",
    date: "09 FEB, 2026",
    type: "completed",
    colorScheme: "green",
  },
  {
    id: 6,
    title: "Understanding Blockchain's Impact on Finance",
    sessionName: "Webinar: Breakthroughs in Cognitive Neurosciencebinar:",
    mentorImage: "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
    mentorName: "Jane Smith",
    status: "SUBMITTED ON",
    date: "02 FEB, 2026",
    type: "completed",
    colorScheme: "green",
  },
];

const getColorStyles = (colorScheme: string) => {
  switch (colorScheme) {
    case "red":
      return {
        wrapperBorder: "from-[#FECDD3] via-transparent to-[#FECDD3]",
        bgGradient: "from-[#FFF0F2] via-white via-40% to-white",
        badgeBg: "bg-[#FFF0F2]",
        badgeText: "text-[#E11D48]",
        image: "/images/file-format-red1.svg"
      };
    case "orange":
      return {
        wrapperBorder: "from-[#FED7AA] via-transparent to-[#FED7AA]",
        bgGradient: "from-[#FFF7ED] via-white via-40% to-white",
        badgeBg: "bg-[#FFF7ED]",
        badgeText: "text-[#EA580C]",
        image: "/images/file-format-orange.svg"
      };
    case "green":
      return {
        wrapperBorder: "from-[#A7F3D0] via-transparent to-[#A7F3D0]",
        bgGradient: "from-[#ECFDF5] via-white via-40% to-white",
        badgeBg: "bg-[#D1FAE5]",
        badgeText: "text-[#065F46]",
        image: "/images/file-format-green.svg"
      };
    case "gray":
    default:
      return {
        wrapperBorder: "from-[#E2E8F0] via-transparent to-[#E2E8F0]",
        bgGradient: "from-[#F8FAFC] via-white via-40% to-white",
        badgeBg: "bg-[#F1F5F9]",
        badgeText: "text-[#475569]",
        image: "/images/file-format-gray.svg"
      };
  }
};

export default function AssignmentPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "completed">("pending");

  // Filter assignments based on the active tab
  const filteredAssignments = MOCK_ASSIGNMENTS.filter(
    (assignment) => assignment.type === activeTab
  );

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans">
      
      {/* --- FULL WIDTH HEADER --- */}
      <div className="bg-white px-6 md:px-10 pt-8 border-b border-gray-200">
        <h1 className="text-[22px] font-bold text-gray-900 mb-6">Assignments</h1>
        
        {/* Tabs */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all -mb-[2px] ${
              activeTab === "pending"
                ? "border-[#042BFD] text-gray-900 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
            }`}
          >
            Pending
            {activeTab === "pending" ? (
              <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#042BFD] text-white text-[10px] font-medium">
                6
              </span>
            ) : (
              <span className="text-gray-400 text-xs font-medium">6</span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all -mb-[2px] ${
              activeTab === "completed"
                ? "border-[#042BFD] text-gray-900 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
            }`}
          >
            Completed
            {activeTab === "completed" ? (
              <span className="flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#042BFD] text-white text-[10px] font-medium">
                2
              </span>
            ) : (
              <span className="text-gray-400 text-xs font-medium">2</span>
            )}
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="p-6 md:px-10 max-w-[1600px] mx-auto mt-2">
        
        {/* Search Bar */}
        <div className="mb-6 max-w-[360px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Search by assignment, session or mentor"
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[10px] text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredAssignments.map((item) => {
            const styles = getColorStyles(item.colorScheme);

            return (
              <div
                key={item.id}
                className={`relative rounded-[20px] p-[1px] bg-gradient-to-br ${styles.wrapperBorder} flex flex-col min-h-[280px]`}
              >
                <div className="relative flex-1 flex flex-col bg-white rounded-[18px] p-6 overflow-hidden h-full shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/50">
                  
                  {/* Smooth Background Gradient inside card */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${styles.bgGradient} pointer-events-none z-0 opacity-60`}></div>
                  
                  {/* Top Row: Icon & Badge */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <img 
                      src={styles.image}
                      alt="Icon" 
                      className="w-[54px] h-[54px] object-contain opacity-90" 
                    />
                    <span className={`${styles.badgeBg} ${styles.badgeText} text-[11px] font-medium px-3.5 py-1.5 rounded-full tracking-wide uppercase`}>
                      {item.status}: {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <Link href={`/s/assignments/${item.title}`} className="text-[17px] hover:underline font-bold text-gray-900 mb-5 leading-snug pr-2">
                      {item.title}
                    </Link>

                    {/* Gray Session Box */}
                    <div className="flex items-center justify-between bg-[#F8FAFC] rounded-[12px] p-3 mb-5 mt-auto border border-gray-100/80">
                      <div className="flex items-start gap-2.5 pr-2">
                        <LinkIcon size={16} className="text-gray-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                        <span className="text-[14px] text-gray-800 leading-snug">
                          {item.sessionName}
                        </span>
                      </div>
                      
                      {/* Avatar with Custom Tooltip */}
                      <div className="relative group shrink-0">
                        <img 
                          src={item.mentorImage} 
                          alt={item.mentorName} 
                          className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all" 
                        />
                        
                        {/* Tooltip Content (Below Avatar, Pointing Up) */}
                        <div className="absolute top-[calc(100%+12px)] right-[-6px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-max">
                          <div className="bg-[#262626] text-white text-[14px] font-medium px-4 py-2 rounded-[8px] shadow-xl relative">
                            {item.mentorName}
                            {/* Up pointing triangle pointer */}
                            <div className="absolute -top-1.5 right-[16px] w-3 h-3 bg-[#262626] rotate-45 rounded-sm"></div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Button (Right Aligned) */}
                    <div className="flex justify-end">
                      <Link href={`/s/assignments/${item.title}`} className="border border-[#042BFD] text-[#042BFD] bg-white rounded-[10px] px-6 py-2 text-[14px] font-medium hover:bg-blue-50 transition-colors">
                        Open Workspace
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
}