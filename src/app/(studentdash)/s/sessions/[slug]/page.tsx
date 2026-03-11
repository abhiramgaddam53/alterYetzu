"use client";

import React from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Timer, 
  Users, 
  Link2, 
  Download 
} from "lucide-react";

// Mock Data for the specific session
const SESSION_DATA = {
  type: "Webinar",
  title: "Management of Acute Coronary Syndromes: Evidence-Based Updates",
  mentor: {
    name: "Dr. Sophia Tyler",
    role: "Associate Professor, Cambridge Institute",
    avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
  },
  stats: {
    date: "23 Feb, 2026",
    time: "4:15 PM - 6:15 PM",
    duration: "120 min",
    attendees: "143 attendees", 
  },
  assignments: [
    {
      id: 1,
      title: "Obstetric Case- Third Trimester Bleeding",
      due: "26 FEB, 2026",
    },
    {
      id: 2,
      title: "Managing Obstetric: Addressing Trimester",
      due: "31 MAR, 2026",
    }
  ],
  resources: [
    {
      id: 1,
      title: "Pre-Session Reading Material.pdf",
    },
    {
      id: 2,
      title: "Additional Reference Article.pdf",
    },
    {
      id: 3,
      title: "Insights into Acute Coronary.pdf",
    }
  ]
};

export default function SessionSlugPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] font-medium mb-6 px-2">
          <Link href="/s/sessions" className="text-gray-500 hover:text-gray-900 transition-colors">
            Sessions
          </Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-gray-900 truncate">
            {SESSION_DATA.type}: {SESSION_DATA.title}
          </span>
        </div>

        {/* --- TOP CARD (Main Details) --- */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] mb-6 p-6 md:p-8">
          
          <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8 mb-8">
            
            {/* Title & Mentor */}
            <div className="flex-1">
              <h1 className="text-[24px] md:text-[28px] font-bold text-gray-900 leading-snug mb-6 max-w-4xl">
                {SESSION_DATA.type}: {SESSION_DATA.title}
              </h1>
              
              <div className="flex items-center gap-4">
                <img 
                  src={SESSION_DATA.mentor.avatar} 
                  alt={SESSION_DATA.mentor.name} 
                  className="w-12 h-12 rounded-full object-cover shrink-0" 
                />
                <div>
                  <h3 className="text-[16px] font-semibold text-gray-900 leading-snug">
                    {SESSION_DATA.mentor.name}
                  </h3>
                  <p className="text-[14px] text-gray-500">
                    {SESSION_DATA.mentor.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0 mt-2 xl:mt-0">
              <button className="flex items-center gap-2 bg-[#111111] hover:bg-black text-white px-6 py-2.5 rounded-xl text-[14px] font-medium transition-colors shadow-sm">
                <img src="/images/google-video.svg" alt="Meet" className="w-5 h-5 object-contain" />
                Join Now
              </button>
              <button className="border border-[#042BFD] text-[#042BFD] hover:bg-blue-50 px-6 py-2.5 rounded-xl text-[14px] font-medium transition-colors">
                Reschedule
              </button>
              <button className="p-2.5 border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors shrink-0">
                <Link2 size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Info Strip (Rounded Gray Box) */}
          <div className="grid grid-cols-2 md:grid-cols-4 bg-[#F8FAFC] rounded-[16px] py-6 border border-gray-50">
            <div className="flex flex-col items-center justify-center gap-3 md:border-r border-gray-200">
              <Calendar size={22} className="text-gray-500" strokeWidth={1.5} />
              <span className="text-[15px] font-medium text-gray-700">{SESSION_DATA.stats.date}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 md:border-r border-gray-200">
              <Clock size={22} className="text-gray-500" strokeWidth={1.5} />
              <span className="text-[15px] font-medium text-gray-700">{SESSION_DATA.stats.time}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 md:border-r border-gray-200 mt-6 md:mt-0">
              <Timer size={22} className="text-gray-500" strokeWidth={1.5} />
              <span className="text-[15px] font-medium text-gray-700">{SESSION_DATA.stats.duration}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 mt-6 md:mt-0">
              <Users size={22} className="text-gray-500" strokeWidth={1.5} />
              <span className="text-[15px] font-medium text-gray-700">{SESSION_DATA.stats.attendees}</span>
            </div>
          </div>
          
        </div>

        {/* --- BOTTOM GRID (Assignments & Resources) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Assignments Column */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-[18px] font-bold text-gray-900">Assignments</h2>
              <span className="bg-[#F1F5F9] text-gray-600 text-[12px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {SESSION_DATA.assignments.length}
              </span>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {SESSION_DATA.assignments.map((assignment) => (
                <div 
                  key={assignment.id} 
                  className="border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-300 transition-colors bg-white h-full"
                >
                  <div className="flex gap-4 items-start mb-6">
                    {/* Custom Gray SVG Icon */}
                    <img 
                      src="/images/file-format.svg" 
                      alt="Assignment" 
                      className="w-[48px] h-[48px] shrink-0 object-contain" 
                    />
                    <div className="pt-1">
                      <h4 className="text-[16px] font-semibold text-gray-900 leading-snug mb-2.5">
                        {assignment.title}
                      </h4>
                      <span className="inline-block bg-[#F8FAFC] text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        DUE: {assignment.due}
                      </span>
                    </div>
                  </div>
                  
                  {/* Button aligned to the bottom right */}
                  <div className="flex justify-end mt-auto">
                    <button className="px-5 py-2.5 border border-gray-200 text-gray-900 font-medium text-[14px] rounded-xl hover:bg-gray-50 transition-colors">
                      Open Workspace
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Column */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-[18px] font-bold text-gray-900">Resources</h2>
              <span className="bg-[#F1F5F9] text-gray-600 text-[12px] font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {SESSION_DATA.resources.length}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {SESSION_DATA.resources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-gray-300 transition-colors bg-white"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Simulated Blue PDF Icon */}
                    <div className="w-12 h-12 rounded-[14px] bg-[#EEF2FF] text-[#042BFD] flex items-center justify-center shrink-0">
                      <span className="text-[12px] font-bold uppercase tracking-wider">PDF</span>
                    </div>
                    <h4 className="text-[15px] font-medium text-gray-900 truncate pr-4">
                      {resource.title}
                    </h4>
                  </div>
                  <button className="w-11 h-11 flex items-center justify-center border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shrink-0">
                    <Download size={20} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}