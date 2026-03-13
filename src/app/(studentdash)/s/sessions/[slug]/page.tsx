"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Timer, 
  Users, 
  Link2, 
  Download, 
  MoreVertical,
  Monitor,
  X
} from "lucide-react";

// Mock Data for the specific session
const SESSION_DATA = {
  type: "Mentorship",
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
const MOCK_TIME_SLOTS = [
  { id: 1, date: "Feb 13, 2026", time: "10:00 AM - 11:00 AM" },
  { id: 2, date: "Feb 13, 2026", time: "02:00 PM - 03:00 PM" },
  { id: 3, date: "Feb 14, 2026", time: "11:00 AM - 12:00 PM" },
  { id: 4, date: "Feb 13, 2026", time: "03:30 PM - 04:30 PM" },
  { id: 5, date: "Feb 14, 2026", time: "10:30 AM - 11:30 PM" },
];

export default function SessionSlugPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false); 
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSlot = (id: number) => {
    setSelectedSlots(prev => 
      prev.includes(id) ? prev.filter(slotId => slotId !== id) : [...prev, id]
    );
  };
  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] mt-4 p-4 md:p-8 font-sans">
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
              <div className="relative flex items-center" ref={dropdownRef}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className={`w-11 h-11 border rounded-xl flex items-center justify-center transition-colors shrink-0 ${isMenuOpen ? 'border-gray-300 bg-gray-50 text-gray-900' : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                  <MoreVertical size={20} strokeWidth={2} className="pointer-events-none" />
                </button>

                {/* Popup Menu - Pinned exactly relative to the button */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-[115%] w-[220px] bg-white border border-gray-200 rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <button 
                      className="w-full text-left px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsRescheduleOpen(true); // Open the reschedule modal
                      }}
                    >
                      Reschedule
                    </button>
                    <button 
                      className="w-full text-left px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Copy Link to Interview
                    </button>
                    
                    {SESSION_DATA.type.toLowerCase() === 'mentorship' && (
                      <button 
                        className="w-full text-left px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Chat with Mentor
                      </button>
                    )}
                    
                    <div className="h-[1px] bg-gray-100 my-1.5"></div>
                    <div className="px-5 py-2 text-[13px] font-medium text-gray-400">
                      {SESSION_DATA.type} Session
                    </div>
                  </div>
                )}
                </div>
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
                  <div className="flex gap-4 items-start mb-4">
                    {/* Custom Gray SVG Icon */}
                    <img 
                      src="/images/green-file.svg" 
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
      {isRescheduleOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Overlay (makes the rest of the screen dull) */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsRescheduleOpen(false)}
          ></div>
          
          {/* Slide-over Content */}
          <div className="relative bg-white w-full max-w-[480px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="flex-1 overflow-y-auto p-6  custom-scrollbar">
              
              {/* Header Icon & Close */}
              <div className="flex justify-between items-start mb-3">
                <div className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center shadow-sm">
                  <Monitor size={20} className="text-gray-700" />
                </div>
                <button onClick={() => setIsRescheduleOpen(false)} className="p-1 text-gray-400 hover:text-gray-900 transition-colors -mr-2">
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              <h2 className="text-[22px] font-bold text-gray-900 mb-4">Reschedule Session</h2>

              {/* Current Session Box */}
              <div className="bg-[#F8FAFC] border border-gray-100 rounded-[12px] p-5 mb-8">
                <p className="text-[12px] text-gray-500 mb-2 font-medium">Current Session</p>
                <h3 className="text-[16px] font-bold text-gray-900 mb-2.5 leading-snug">Research Methodology Session</h3>
                <div className="flex items-center gap-4 text-[13px] text-gray-700 mb-2">
                  <div className="flex items-center gap-1.5"><Calendar size={14} className="text-gray-500"/> 2026-02-11</div>
                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-gray-500"/> 10:30 - 11:30</div>
                </div>
                <p className="text-[13px] text-gray-500">with Pradhyumn Dhondi</p>
              </div>

              {/* Reason Textarea */}
              <div className="mb-8">
                <label className="block text-[13px] font-bold text-gray-900 mb-3">
                  Reason for Rescheduling <span className="text-gray-900">*</span>
                </label>
                <textarea 
                  className="w-full border border-gray-200 rounded-[12px] p-4 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/20 focus:border-[#042BFD] min-h-[110px] resize-none transition-all"
                  placeholder="Please provide a brief explanation for the student..."
                ></textarea>
              </div>

              {/* Suggest Alternative Times Grid */}
              <div className="mb-8">
                <label className="block text-[13px] font-bold text-gray-900 mb-3">
                  Suggest Alternative Times <span className="text-gray-900">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {MOCK_TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlots.includes(slot.id);
                    return (
                      <div 
                        key={slot.id}
                        onClick={() => toggleSlot(slot.id)}
                        className={`border rounded-[12px] p-3.5 cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-[#042BFD] bg-[#F5F6FF]' 
                            : 'border-gray-200 hover:border-[#042BFD] hover:bg-[#F5F6FF]/50'
                        }`}
                      >
                        <p className={`text-[14px] font-bold mb-1.5 ${isSelected ? 'text-[#042BFD]' : 'text-gray-900'}`}>
                          {slot.date}
                        </p>
                        <p className={`text-[13px] ${isSelected ? 'text-[#042BFD]/80 font-medium' : 'text-gray-500'}`}>
                          {slot.time}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[13px] text-gray-500">Select one or more time slots to offer the student</p>
              </div>

              {/* Additional Message Textarea */}
              <div className="mb-4">
                <label className="block text-[13px] font-bold text-gray-900 mb-3">
                  Additional Message (Optional)
                </label>
                <textarea 
                  className="w-full border border-gray-200 rounded-[12px] p-4 text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042BFD]/20 focus:border-[#042BFD] min-h-[100px] resize-none transition-all"
                  placeholder="Add any additional context for the student..."
                ></textarea>
              </div>

            </div>

            {/* Footer Buttons */}
            <div className="p-6 md:p-8 flex items-center gap-4 border-t border-gray-100 bg-white shrink-0">
              <button 
                onClick={() => setIsRescheduleOpen(false)}
                className="flex-1 py-3.5 border border-gray-200 rounded-[10px] text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsRescheduleOpen(false)}
                className="flex-1 py-3.5 bg-[#042BFD] rounded-[10px] text-[14px] font-bold text-white hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}