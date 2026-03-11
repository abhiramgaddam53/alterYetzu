"use client";

import React, { useState } from "react";
import { Search, Link as LinkIcon, Download } from "lucide-react";

// Mock data to match the exact screenshots provided
const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    title: "Advanced Insights into Cardiac Arrhythmias",
    sessionName: "Webinar: Breakthroughs in Cognitive Neurosciencebinar:",
    mentorImage: "https://ui-avatars.com/api/?name=Dr+Sophia&background=random",
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
    status: "DUE",
    date: "13 APR, 2026",
    type: "pending",
    colorScheme: "gray",
  },
  {
    id: 4,
    title: "Sustainable Energy Solutions for Tomorrow",
    sessionName: "1:1 Mentorship: The Rise of Edge Computing",
    mentorImage: "https://ui-avatars.com/api/?name=Dr+Tyler&background=random",
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
        image: "/images/file-format-red.svg"
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
        badgeBg: "bg-transparent",
        badgeText: "text-[#64748B]",
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredAssignments.map((item) => {
            const styles = getColorStyles(item.colorScheme);

            return (
              <div
                key={item.id}
                className={`relative rounded-[18px] p-[1.5px] bg-gradient-to-br ${styles.wrapperBorder} flex flex-col min-h-[260px]`}
              >
                <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-5 overflow-hidden h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/50">
                  
                  {/* Smooth Background Gradient inside card */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${styles.bgGradient} pointer-events-none z-0`}></div>
                  
                  {/* Top Row: Icon & Badge */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <img 
                      src={styles.image}
                      alt="Icon" 
                      className="w-[52px] h-[52px] object-contain" 
                    />
                    <span className={`${styles.badgeBg} ${styles.badgeText} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide`}>
                      {item.status}: {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-5 leading-snug pr-2">
                      {item.title}
                    </h3>

                    {/* Gray Session Box */}
                    <div className="flex items-center justify-between bg-[#F8FAFC] rounded-[10px] p-3 mb-5 mt-auto border border-gray-100">
                      <div className="flex items-start gap-2.5 pr-2">
                        <LinkIcon size={14} className="text-gray-400 mt-0.5 shrink-0" />
                        <span className="text-[12px] text-gray-600 line-clamp-2 leading-relaxed">
                          {item.sessionName}
                        </span>
                      </div>
                      <img 
                        src={item.mentorImage} 
                        alt="Mentor" 
                        className="w-7 h-7 rounded-full shrink-0 object-cover" 
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2.5">
                      <button className="flex-1 border border-[#042BFD] text-[#042BFD] bg-white rounded-lg py-2.5 text-[13px] font-medium hover:bg-blue-50 transition-colors">
                        {item.type === "pending" ? "Submit Assignment" : "Download Answer"}
                      </button>
                      <button className="p-2.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center justify-center shrink-0">
                        <Download size={18} strokeWidth={1.5} />
                      </button>
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