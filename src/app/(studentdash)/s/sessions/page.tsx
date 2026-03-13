"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, Calendar, Clock, MoreVertical, Link2 } from "lucide-react";
import Link from "next/link"; 
import RescheduleModal from "../../components/Reschedule";

// Mock Data
const MOCK_SESSIONS = [
  // --- FOCUS FOR TODAY ---
  {
    id: "1",
    slug: "major-insights-human-nervous-system",
    title: "Webinar: Major Insights on Human Nervous System",
    type: "webinar",
    mentor: {
      name: "Dr. Sophia Tyler",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
    },
    date: "22 Feb, 2026",
    time: "3:00 PM - 4:30 PM",
    badge: "STARTS IN 12 MINS",
    badgeType: "purple",
    tab: "upcoming",
    isFocusToday: true,
  },
  {
    id: "2",
    slug: "1-1-mentorship-future-renewable-energy",
    title: "1:1 Mentorship: The Future of Renewable Energy",
    type: "mentorship",
    mentor: {
      name: "Dr. Mathew Thomas",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Mathew+Thomas&background=random",
    },
    date: "22 Feb, 2026",
    time: "6:15 AM - 7:15 PM",
    badge: "TODAY • 6:15 PM",
    badgeType: "orange",
    tab: "upcoming",
    isFocusToday: true,
  },
  // --- UPCOMING SESSIONS ---
  {
    id: "3",
    slug: "cohort-advanced-methods-data-viz",
    title: "Cohort: Advanced Methods in Data Visualization",
    type: "cohort",
    mentor: {
      name: "Dr. Elf Manie",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Elf+Manie&background=random",
    },
    date: "23 Feb, 2026",
    time: "4:15 PM - 6:15 PM",
    tab: "upcoming",
    isFocusToday: false,
  },
  {
    id: "4",
    slug: "webinar-breakthroughs-cognitive-neuroscience",
    title: "Webinar: Breakthroughs in Cognitive Neuroscience",
    type: "webinar",
    mentor: {
      name: "Dr. Elf Manie",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Elf+Manie&background=random",
    },
    date: "24 Feb, 2026",
    time: "4:15 PM - 6:15 PM",
    tab: "upcoming",
    isFocusToday: false,
  },
  {
    id: "5",
    slug: "1-1-mentorship-future-renewable-energy-2",
    title: "1:1 Mentorship: The Future of Renewable Energy",
    type: "mentorship",
    mentor: {
      name: "Dr. Mathew Thomas",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Mathew+Thomas&background=random",
    },
    date: "26 Feb, 2026",
    time: "11:15 AM - 1:15 PM",
    tab: "upcoming",
    isFocusToday: false,
  },
  // --- COMPLETED ---
  {
    id: "6",
    slug: "webinar-completed-1",
    title: "Webinar: Major Insights on Human Nervous System",
    type: "webinar",
    mentor: {
      name: "Dr. Sophia Tyler",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
    },
    date: "22 Feb, 2026",
    time: "3:00 PM - 4:30 PM",
    tab: "completed",
    isFocusToday: false,
  },
  {
    id: "7",
    slug: "webinar-completed-2",
    title: "Webinar: Breakthroughs in Cognitive Neuroscience",
    type: "webinar",
    mentor: {
      name: "Dr. Elf Manie",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Elf+Manie&background=random",
    },
    date: "23 Feb, 2026",
    time: "4:15 PM - 6:15 PM",
    tab: "completed",
    isFocusToday: false,
  },
  // --- MISSED ---
  {
    id: "8",
    slug: "webinar-missed-1",
    title: "Webinar: Major Insights on Human Nervous System",
    type: "missed", 
    mentor: {
      name: "Dr. Sophia Tyler",
      role: "Associate Professor, XYZ Institute",
      avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
    },
    date: "22 Feb, 2026",
    time: "3:00 PM - 4:30 PM",
    tab: "missed",
    isFocusToday: false,
  },
];

const getThemeStyles = (type: string, badgeType?: string) => {
  let badgeClasses = "";
  if (badgeType === "purple") badgeClasses = "bg-[#E0D4F5] text-[#7B42F6]";
  else if (badgeType === "orange") badgeClasses = "bg-[#FFEDD5] text-[#EA580C]";
  else badgeClasses = "bg-gray-100 text-gray-600"; 

  switch (type) {
    case "webinar":
      return {
        wrapperBorder: "from-[#C4A9FF] via-transparent to-[#C4A9FF]",
        bgGradient: "from-[#F3EDFF] via-white via-40% to-white",
        icon: "/images/video-chat.svg",
        badgeClasses,
      };
    case "mentorship":
      return {
        wrapperBorder: "from-[#FAD0A5] via-transparent to-[#FAD0A5]",
        bgGradient: "from-[#FFF3E3] via-white via-40% to-white",
        icon: "/images/User2.svg",
        badgeClasses,
      };
    case "cohort":
      return {
        wrapperBorder: "from-[#9FE4EE] via-transparent to-[#9FE4EE]",
        bgGradient: "from-[#E6F8FA] via-white via-40% to-white",
        icon: "/images/team.svg",
        badgeClasses,
      };
    case "missed":
      return {
        wrapperBorder: "from-[#FECDD3] via-transparent to-[#FECDD3]",
        bgGradient: "from-[#FFF0F2] via-white via-40% to-white",
        icon: "/images/video-chat.svg", 
        badgeClasses,
      };
    default:
      return {
        wrapperBorder: "from-gray-200 via-transparent to-gray-200",
        bgGradient: "from-gray-50 via-white via-40% to-white",
        icon: "/images/video-chat.svg",
        badgeClasses,
      };
  }
};

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "missed">("upcoming");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const filteredSessions = MOCK_SESSIONS.filter((s) => s.tab === activeTab);
  const focusTodaySessions = filteredSessions.filter((s) => s.isFocusToday);
  const otherSessions = filteredSessions.filter((s) => !s.isFocusToday);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderCard = (session: any, isFocus: boolean) => {
    const theme = getThemeStyles(session.type, session.badgeType);
    const isDropdownOpen = openDropdownId === session.id;

    return (
      <div
        key={session.id}
        className={`relative rounded-[18px] p-[1.5px] bg-gradient-to-br ${theme.wrapperBorder} flex flex-col min-h-[300px]`}
      >
        <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-4 h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100/50">
          
          <div className={`absolute inset-0 rounded-[16px] bg-gradient-to-b ${theme.bgGradient} pointer-events-none z-0`}></div>

          <div className="flex justify-between items-start mb-6 relative z-10">
            <img src={theme.icon} alt="Icon" className="w-[64px] h-[64px] object-contain opacity-90" />
            {session.badge && (
              <span className={`${theme.badgeClasses} text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1.5 shadow-sm`}>
                {session.badge === "STARTS IN 12 MINS" && <Clock size={14} />}
                {session.badge}
              </span>
            )}
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
            <Link href={`sessions/${session.slug}`} className="hover:underline">
              <h3 className="text-[18px] font-bold text-gray-900 mb-5 leading-snug pr-2 line-clamp-2">
                {session.title}
              </h3>
            </Link>

            <div className="flex items-center gap-3 mb-6 mt-auto">
              <img src={session.mentor.avatar} alt="Mentor" className="w-11 h-11 rounded-full object-cover shrink-0" />
              <div>
                <p className="text-[14px] font-semibold text-gray-900 leading-none mb-1">{session.mentor.name}</p>
                <p className="text-[12px] text-gray-500">{session.mentor.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#F8FAFC] rounded-[10px] px-4 py-3 mb-6 w-full border border-gray-50">
              <div className="flex items-center gap-2 text-[13px] font-medium text-gray-600">
                <Calendar size={16} className="text-gray-400" /> {session.date}
              </div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-gray-600">
                <Clock size={16} className="text-gray-400" /> {session.time}
              </div>
            </div>

            <div className="flex justify-end gap-3 relative">
              {isFocus && activeTab === "upcoming" ? (
                <Link href={`sessions/${session.slug}`}>
                  <button className="px-6 bg-[#111111] hover:bg-black text-white rounded-[10px] py-2.5 text-[14px] font-medium transition-colors h-11">
                    Join Session
                  </button>
                </Link>
              ) : (
                <Link href={`sessions/${session.slug}`}>
                  <button className="px-6 border border-[#042BFD] text-[#042BFD] bg-white rounded-[10px] py-2.5 text-[14px] font-medium hover:bg-blue-50 transition-colors h-11">
                    View Details
                  </button>
                </Link>
              )}
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdownId(isDropdownOpen ? null : session.id);
                }}
                className="w-11 h-11 border border-gray-200 rounded-[10px] text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center justify-center shrink-0"
              >
                <MoreVertical size={20} />
              </button>

              {isDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 bottom-[110%] mb-2 w-48 bg-white border border-gray-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200"
                >
                  <button 
                    className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setOpenDropdownId(null);   // 1. Close the dropdown menu
                      setIsRescheduleOpen(true); // 2. Open the Reschedule modal
                    }}
                  >
                    Reschedule
                  </button>
                
                  <button 
                    className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenDropdownId(null)}
                  >
                    Copy Link to Interview
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] font-sans">
      
      {/* --- HEADER --- */}
      <div className="bg-white px-6 md:px-10 pt-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-[22px] font-bold text-gray-900">Sessions</h1>
          
          <div className="relative w-full md:w-[320px]">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Search by session, mentor or topic"
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center gap-8">
          {(["upcoming", "completed", "missed"] as const).map((tab) => {
            const isActive = activeTab === tab;
            let count = MOCK_SESSIONS.filter((s) => s.tab === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3.5 flex items-center gap-2 border-b-2 transition-all -mb-[2px] capitalize ${
                  isActive
                    ? "border-[#042BFD] text-gray-900 font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-700 font-medium"
                }`}
              >
                {tab}
                <span 
                  className={`flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-medium ${
                    isActive 
                      ? tab === "missed" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600" 
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="p-6 md:px-10 max-w-[1600px] mx-auto mt-2">
        
        {activeTab === "upcoming" ? (
          <>
            {/* Focus For Today */}
            {focusTodaySessions.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    FOCUS FOR TODAY
                  </span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                {/* Fixed to max 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {focusTodaySessions.map((session) => renderCard(session, true))}
                </div>
              </div>
            )}

            {/* Upcoming Sessions */}
            {otherSessions.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    UPCOMING SESSIONS
                  </span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                {/* Fixed to max 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherSessions.map((session) => renderCard(session, false))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Completed / Missed Tab View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredSessions.map((session) => renderCard(session, false))}
            
            {filteredSessions.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-500">
                No sessions found in this category.
              </div>
            )}
          </div>
        )}

      </div>
      <RescheduleModal 
                      isOpen={isRescheduleOpen} 
                      onClose={() => setIsRescheduleOpen(false)} 
                    />
    </div>
  );
}