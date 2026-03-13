"use client";

import React from "react";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  ExternalLink
} from "lucide-react";

// --- MOCK API RESPONSE DATA ---
// Toggle `hasStarted` and `isCompleted` to test the different UI states
const MOCK_API_DATA = {
  hasStarted: true, // Set to true to see the populated dashboard
  progress: {
    courseName: "Data Science",
    progressPercentage: 25, 
    isCompleted: false // Change to TRUE (along with hasStarted: true) to see the Completed banner state
  },
  user: {
    name: "Natalia",
  },
  // Data for the populated state grids
  focusThisWeek: [
    { 
      id: 1, type: "purple", title: "Webinar: Major Insights on Human Nervous System with Dr. Rao", 
      date: "22 Feb, 2026", time: "3:00 PM", badgeText: "Today", badgeClasses: "bg-[#7B42F6] text-white", icon: "/images/video-chat.svg" 
    },
    { 
      id: 2, type: "green", title: "Assignment: Obstetric Case- Third Trimester Bleeding", 
      date: "Due on: 24 Feb, 2026", time: null, badgeText: "Due in 2 Days", badgeClasses: "bg-[#FFF4E5] text-[#F58220] border border-[#FFE0B2]", icon: "/images/file-edit.svg" 
    },
    { 
      id: 3, type: "orange", title: "1:1 Mentorship with Dr. Nikhitha Vimal", 
      date: "26 Feb, 2026", time: "7:00 PM", badgeText: null, badgeClasses: "", icon: "/images/User2.svg" 
    },
    { 
      id: 4, type: "blue", title: "Cohort: Drug Dose Calculation Exercise with Dr. Rao", 
      date: "27 Feb, 2026", time: "7:00 PM", badgeText: null, badgeClasses: "", icon: "/images/team.svg" 
    },
  ],
  upcomingSessions: [
    { id: 1, title: "Cohort: Major Insights on Human Nervous System with Dr. Rao", date: "21 Feb, 2026", time: "3:00 PM", theme: "purple" },
    { id: 2, title: "Cohort: Major Insights on Human Nervous System with Dr. Rao", date: "21 Feb, 2026", time: "3:00 PM", theme: "teal" },
    { id: 3, title: "Cohort: Major Insights on Human Nervous System with Dr. Rao", date: "23 Feb, 2026", time: "3:00 PM", theme: "orange" }
  ],
  pendingAssignments: [
    { id: 1, title: "Obstetric Case- Third Trimester Bleeding", subtitle: "Drug Dose Calculation Exercise with Dr. Rao", due: "24 Feb, 2026" },
    { id: 2, title: "Obstetric Case- Third Trimester Bleeding", subtitle: "Drug Dose Calculation Exercise with Dr. Rao", due: "24 Feb, 2026" }
  ],
  feedbacks: [
    { id: 1, doctor: "Dr. Nikhil Nath", subject: "Drug Dose Calculation Exercise with Dr.Nikhil Nath", text: "Great effort, but remember to double-check your calculations for pediatric dosages. See attached notes for areas to improve." },
    { id: 2, doctor: "Dr. Rao", subject: "Deep Dive in Human Nervous System with Dr. Rao", text: "Great effort, but remember to double-check your calculations for pediatric dosages. See attached notes for areas to improve." }
  ]
};

// --- HELPER COMPONENTS & STYLES ---
const ViewDetailsButton = ({ variant = "outline" }: { variant?: "solid" | "outline" }) => {
  if (variant === "solid") {
    return (
      <button className="w-full bg-[#111111] hover:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-auto shrink-0">
        View Details
      </button>
    );
  }
  return (
    <button className="w-full bg-white hover:bg-gray-50 text-[#111111] border border-gray-200 text-sm font-medium py-2.5 rounded-lg transition-colors mt-auto shrink-0">
      View Details
    </button>
  );
};

const getFocusCardTheme = (type: string) => {
  switch (type) {
    case 'purple': return { border: "from-[#C4A9FF] via-transparent to-[#C4A9FF]", bg: "from-[#F3EDFF]", btn: "solid" as const };
    case 'green': return { border: "from-[#A3DFB3] via-transparent to-[#A3DFB3]", bg: "from-[#E6F5EE]", btn: "outline" as const };
    case 'orange': return { border: "from-[#FAD0A5] via-transparent to-[#FAD0A5]", bg: "from-[#FFF3E3]", btn: "outline" as const };
    case 'blue': return { border: "from-[#9FE4EE] via-transparent to-[#9FE4EE]", bg: "from-[#E6F8FA]", btn: "outline" as const };
    default: return { border: "from-gray-200 via-transparent to-gray-200", bg: "from-gray-50", btn: "outline" as const };
  }
};

const getUpcomingTheme = (theme: string) => {
  switch(theme) {
    case 'teal': return { border: "border-teal-100", btnBg: "bg-[#F2FAFA] hover:bg-[#E5F5F5]", btnText: "text-[#2F9089]" , background : "bg-teal-50"  };
    case 'orange': return { border: "border-orange-100", btnBg: "bg-[#FFF8F2] hover:bg-[#FFF0E5]", btnText: "text-[#D97706]",background : "bg-orange-50" };
    case 'purple': return { border: "border-purple-100", btnBg: "bg-[#F9F6FF] hover:bg-[#F3EFFF]", btnText: "text-[#7B42F6]",background : "bg-purple-50" };
    default: return { border: "border-gray-200", btnBg: "bg-gray-50 hover:bg-gray-100", btnText: "text-gray-600",background : "bg-gray-50" };
  }
};

export default function OverviewPage() {
  const data = MOCK_API_DATA;
  
  // Derived State Logic
  const isEmpty = !data.hasStarted;
  const isCompleted = data.progress.isCompleted;
  const ringProgress = isEmpty ? 0 : (isCompleted ? 100 : data.progress.progressPercentage);

  const bannerTitle = isEmpty ? `Welcome ${data.user.name} 👋🏼` : `Welcome ${data.user.name}. You're on track...`;
  const bannerSubtitle = isEmpty 
    ? "Get your journey started with you with the varieties of sessions in Yetzu."
    : `You're making great progress in your <span class="font-semibold text-gray-700">${data.progress.courseName}</span> journey. Keep the momentum going!`;

  const trackerSteps = [
    { id: 1, label: "Signed up!", icon: "/images/shake-hand.svg", active: true },
    { id: 2, label: "Sessions", icon: "/images/calander.svg", active: false },
    { id: 3, label: "Assignments", icon: "/images/assignment.svg", active: false },
    { id: 4, label: isCompleted ? "Completed" : "Certifications", icon: isCompleted ? "/images/flag.svg" : "/images/certificate.svg", active: isCompleted }
  ];

  return (
    <main className="p-4 md:p-6 lg:p-8 max-w-[1600px] font-sans mx-auto flex flex-col gap-5 bg-gray-50 min-h-screen overflow-x-hidden">
      
      {/* =========================================
          1. DYNAMIC TOP BANNER 
          ========================================= */}
      <div className="flex flex-col xl:flex-row items-center justify-between bg-white border border-gray-100 shadow-sm rounded-2xl p-6 gap-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-50 via-transparent to-transparent pointer-events-none"></div>
        <img 
          src="/images/clip-path.svg" 
          alt="Background pattern" 
          className="absolute left-[15%] top-1/2 -translate-y-1/2 h-[150%] min-w-[300px] object-cover pointer-events-none z-0 opacity-70" 
        />

        <div className="flex flex-col sm:flex-row items-center sm:items-start xl:items-center gap-5 z-10 w-full xl:w-auto text-center sm:text-left">
          <div 
            className={`relative rounded-full flex items-center justify-center shrink-0 ${isEmpty ? 'w-[68px] h-[68px]' : 'w-[76px] h-[76px]'}`}
            style={{ background: ringProgress > 0 ? `conic-gradient(#042BFD ${ringProgress}%, #f3f4f6 ${ringProgress}%)` : 'transparent' }}
          >
            <div className={`rounded-full overflow-hidden bg-white ${ringProgress > 0 ? 'w-[68px] h-[68px] border-[3px] border-white' : 'w-full h-full'}`}>
              <img src={`https://ui-avatars.com/api/?name=${data.user.name}&background=random`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl md:text-[22px] font-bold text-gray-900 leading-tight">{bannerTitle}</h1>
            <p className="text-sm text-gray-500 mt-1.5 max-w-lg" dangerouslySetInnerHTML={{ __html: bannerSubtitle }} />
          </div>
        </div>

        {!isEmpty && (
          <div className="flex items-center justify-start xl:justify-end overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 z-10 no-scrollbar">
            {trackerSteps.map((step, index) => {
              const isLast = index === trackerSteps.length - 1;
              return (
                <React.Fragment key={step.id}>
                  <div className={`flex flex-col items-center gap-1.5 shrink-0 transition-opacity ${step.active ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img src={step.icon} alt={step.label} className="max-w-full max-h-full object-contain drop-shadow-sm" />
                    </div>
                    <span className={`text-[12px] font-medium ${step.active ? 'text-gray-900' : 'text-gray-500'}`}>{step.label}</span>
                  </div>
                  {!isLast && (
                    index === 0 ? (
                      <div className="w-16 h-[4px] bg-gray-200 rounded-full mb-6 mx-3 shrink-0 relative flex items-center">
                        <div className="w-[60%] h-full rounded-full bg-[#10B981]"></div>
                        <div className="absolute left-[60%] w-2.5 h-2.5 bg-[#10B981] rounded-full -ml-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                      </div>
                    ) : (
                      <div className="w-8 h-[2px] border-t-2 border-dashed border-gray-300 mb-6 mx-3 shrink-0 opacity-50"></div>
                    )
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================
          2. EMPTY STATE VIEW
          ========================================= */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm py-20 px-6 min-h-[500px] w-full">
          {/* Simulated Central Graphic */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 mb-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-3xl"></div>
            <img src="/images/empty-state-graphic.png" alt="Learning Journey" className="relative z-10 w-full h-full object-contain" />
          </div>
          
          <h2 className="text-xl md:text-[24px] font-bold text-gray-900 mb-3 text-center">Your learning journey starts here</h2>
          <p className="text-center text-sm text-gray-500 max-w-[550px] mb-8 leading-relaxed">
            Explore webinars, cohorts, and 1:1 mentorships across a wide range of topics.<br className="hidden md:block" />
            Start learning from expert educators and unlock exclusive resources and study materials.
          </p>
          
          <button className="bg-[#111111] hover:bg-black text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2.5 transition-colors text-[14px]">
            Explore Courses <ExternalLink size={16} />
          </button>
        </div>
      )}

      {/* =========================================
          3. POPULATED DASHBOARD VIEW 
          ========================================= */}
      {!isEmpty && (
        <>
          {/* Focus For This Week */}
          <div className="border border-gray-100 shadow-sm rounded-2xl p-6 bg-white w-full overflow-hidden">
           
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">FOCUS FOR THIS WEEK</h2>
              <div className="flex gap-2 shrink-0">
                <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-400 transition-colors"><ChevronLeft size={16} /></button>
                <button className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 transition-colors"><ChevronRight size={16} /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {data.focusThisWeek.map((item) => {
                const theme = getFocusCardTheme(item.type);
                return (
                  <div key={item.id} className={`relative rounded-[18px] p-[1.5px] bg-gradient-to-br ${theme.border} flex flex-col min-h-[260px]`}>
                    <div className="relative flex-1 flex flex-col bg-white rounded-[16px] p-5 overflow-hidden h-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                      <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} via-white to-white pointer-events-none z-0`}></div>
                      
                      <div className="absolute top-5 left-5 z-10">
                        <img src={item.icon} alt="Icon" className="w-[68px] h-[68px]" />
                      </div>

                      {item.badgeText && (
                        <div className="flex justify-end mb-8 relative z-20">
                          <span className={`${item.badgeClasses} text-[11px] font-bold px-3 py-1 rounded-full uppercase shrink-0`}>
                            {item.badgeText}
                          </span>
                        </div>
                      )}

                      <div className={`relative z-20 flex-1 flex flex-col h-full justify-end ${!item.badgeText ? 'mt-18' : 'mt-3'}`}>
                        <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">{item.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-[13px] font-medium text-gray-500 mb-6">
                          <span className="flex items-center gap-1.5 whitespace-nowrap"><Calendar size={14} /> {item.date}</span>
                          {item.time && <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} /> {item.time}</span>}
                        </div>
                        <ViewDetailsButton variant={theme.btn} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          

          {/* Bottom Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            
            {/* Upcoming Sessions */}
            <div className="border border-gray-100 bg-white rounded-2xl p-5 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Upcoming Sessions</h2>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{data.upcomingSessions.length}</span>
              </div>
              <div className="space-y-4 flex-1">
                {data.upcomingSessions.map((session) => {
                  const theme = getUpcomingTheme(session.theme);
                  return (
                    <div key={session.id} className={`border ${theme.border} rounded-xl p-1 overflow-hidden flex flex-col ${theme.background} shadow-[0_2px_8px_rgba(0,0,0,0.02)]`}>
                      <div className="p-4 bg-white rounded-xl flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900 mb-4 leading-snug">{session.title}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                            <Calendar size={14} className="shrink-0 text-gray-400" /> {session.date}
                          </span>
                          <span className="flex items-center gap-1.5 text-[13px] text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
                            <Clock size={14} className="shrink-0 text-gray-400" /> {session.time}
                          </span>
                        </div>
                      </div>
                      <button className={`w-full ${theme.btnBg} ${theme.btnText} text-[14px] font-medium py-3 transition-colors shrink-0`}>
                        View Details
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pending Assignments */}
            <div className="border border-gray-100 bg-white rounded-2xl p-5 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pending Assignments</h2>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{data.pendingAssignments.length}</span>
              </div>
              <div className="space-y-4 flex-1">
                {data.pendingAssignments.map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-xl overflow-hidden flex p-1 bg-[#F5F6FF] flex-col  shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div className="p-4 bg-white rounded-xl mb-2 flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900 mb-4 leading-snug">{assignment.title}</h3>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white">
                          <Paperclip size={14} className="text-gray-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{assignment.subtitle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg whitespace-nowrap w-fit">
                          <Calendar size={14} className="text-gray-400 shrink-0" /> Due on: {assignment.due}
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
                      Open Workspace
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedbacks */}
            <div className="border border-gray-100 bg-white rounded-2xl p-5 shadow-sm overflow-hidden md:col-span-2 xl:col-span-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Feedbacks</h2>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{data.feedbacks.length}</span>
              </div>
              <div className="space-y-4 flex-1">
                {data.feedbacks.map((feedback) => (
                  <div key={feedback.id} className="border border-gray-200 rounded-xl p-1 overflow-hidden flex flex-col bg-[#F5F6FF] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div className="p-4 bg-white rounded-xl flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900 mb-4">{feedback.doctor}</h3>
                      <div className="flex items-start gap-2 text-[13px] text-gray-600 border border-gray-200 px-3 py-2 rounded-lg bg-white mb-3">
                        <Paperclip size={14} className="text-gray-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feedback.subject}</span>
                      </div>
                      <div className="bg-[#F6F8FA] p-3 rounded-lg text-[13px] text-gray-700 italic leading-relaxed">
                        {feedback.text}
                      </div>
                    </div>
                    <button className="w-full bg-[#F5F6FF] hover:bg-[#EBEBF5] text-[#4B4B87] font-medium text-[14px] py-3 transition-colors shrink-0">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      )}

    </main>
  );
}