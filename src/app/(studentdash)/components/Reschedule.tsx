"use client";

import React, { useState } from "react";
import { Calendar, Clock, X, Monitor } from "lucide-react";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock Data localized to this component as requested
const SESSION_DATA = {
  title: "Research Methodology Session",
  mentor: {
    name: "Pradhyumn Dhondi",
  },
  stats: {
    date: "2026-02-11",
    time: "10:30 - 11:30",
  }
};

const MOCK_TIME_SLOTS = [
  { id: 1, date: "Feb 13, 2026", time: "10:00 AM - 11:00 AM" },
  { id: 2, date: "Feb 13, 2026", time: "02:00 PM - 03:00 PM" },
  { id: 3, date: "Feb 14, 2026", time: "11:00 AM - 12:00 PM" },
  { id: 4, date: "Feb 13, 2026", time: "03:30 PM - 04:30 PM" },
  { id: 5, date: "Feb 14, 2026", time: "10:30 AM - 11:30 PM" },
];

export default function RescheduleModal({ isOpen, onClose }: RescheduleModalProps) {
  // Component-specific state
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

  // Don't render anything if the modal is closed
  if (!isOpen) return null;

  const toggleSlot = (id: number) => {
    setSelectedSlots((prev) => 
      prev.includes(id) ? prev.filter((slotId) => slotId !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end font-sans">
      
      {/* Overlay (makes the rest of the screen dull) */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Slide-over Content */}
      <div className="relative bg-white w-full max-w-[480px] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          
          {/* Header Icon & Close */}
          <div className="flex justify-between items-start mb-6">
            <div className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center shadow-sm">
              <Monitor size={20} className="text-gray-700" />
            </div>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900 transition-colors -mr-2">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          <h2 className="text-[22px] font-bold text-gray-900 mb-6">Reschedule Session</h2>

          {/* Current Session Box */}
          <div className="bg-[#F8FAFC] border border-gray-100 rounded-[12px] p-5 mb-8">
            <p className="text-[12px] text-gray-500 mb-2 font-medium">Current Session</p>
            <h3 className="text-[16px] font-bold text-gray-900 mb-2.5 leading-snug">
              {SESSION_DATA.title}
            </h3>
            <div className="flex items-center gap-4 text-[13px] text-gray-700 mb-2">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-500"/> {SESSION_DATA.stats.date}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-gray-500"/> {SESSION_DATA.stats.time}
              </div>
            </div>
            <p className="text-[13px] text-gray-500">with {SESSION_DATA.mentor.name}</p>
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
            onClick={onClose}
            className="flex-1 py-3.5 border border-gray-200 rounded-[10px] text-[14px] font-bold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-3.5 bg-[#042BFD] rounded-[10px] text-[14px] font-bold text-white hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}