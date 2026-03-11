"use client";

import React from "react";
import { 
  DollarSign, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  ChevronRight, 
  ArrowRight, 
  FileText 
} from "lucide-react";

// Mock Data
const METRICS_DATA = [
  {
    id: 1,
    title: "TOTAL SPENT",
    value: "₹36,580",
    subtitle: "All-time paid Invoices",
    icon: DollarSign,
    colorScheme: "blue",
  },
  {
    id: 2,
    title: "OUTSTANDING AMOUNT",
    value: "₹21,476",
    subtitle: "Pending + failed invoices",
    icon: AlertCircle,
    colorScheme: "orange",
  },
  {
    id: 3,
    title: "ACTIVE SUBSCRIPTION",
    value: "Active",
    subtitle: "Pro Mentorship Plan - Monthly",
    icon: CheckCircle2,
    colorScheme: "green",
  },
  {
    id: 4,
    title: "LAST PAYMENT DATE",
    value: "01 Apr 2024",
    subtitle: "Webinar: Major Insights on Human Ner...",
    icon: Calendar,
    colorScheme: "purple",
  },
];

const INVOICES_DATA = [
  {
    id: "INV-2024-015",
    title: "International Publication Strategy - S...",
    type: "Mentorship",
    date: "05 Apr 2024",
    status: "Cancelled",
    amount: "₹9,440",
  },
  {
    id: "INV-2024-014",
    title: "Thesis Proposal – Urban Planning Study",
    type: "Webinar",
    date: "01 Apr 2024",
    status: "Failed",
    amount: "₹3,776",
  },
  {
    id: "INV-2024-013",
    title: "Dissertation Abstract & Executive",
    type: "Webinar",
    date: "25 Mar 2024",
    status: "Paid",
    amount: "₹5,310",
  },
  {
    id: "INV-2024-012",
    title: "Grant Writing Workshop - ICSSR Funding",
    type: "Cohort",
    date: "20 Mar 2024",
    status: "Pending",
    amount: "₹2,360",
  },
  {
    id: "INV-2024-011",
    title: "Research Methodology Workshop - 3 Sess...",
    type: "Mentorship",
    date: "15 Mar 2024",
    status: "Paid",
    amount: "₹7,080",
  },
];

// Helper for status styles
const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-[#ECFDF5] text-[#059669]";
    case "pending":
      return "bg-[#FFF7ED] text-[#EA580C]";
    case "failed":
      return "bg-[#FEF2F2] text-[#E11D48]";
    case "cancelled":
      return "bg-[#F1F5F9] text-[#64748B]";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// Helper for metric icon colors
const getMetricIconStyles = (colorScheme: string) => {
  switch (colorScheme) {
    case "blue":
      return "bg-[#EEF2FF] text-[#4F46E5]";
    case "orange":
      return "bg-[#FFF7ED] text-[#EA580C]";
    case "green":
      return "bg-[#ECFDF5] text-[#059669]";
    case "purple":
      return "bg-[#F3E8FF] text-[#7C3AED]";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

export default function PaymentsOverviewPage() {
  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] p-6 md:p-10 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Page Header */}
        <h1 className="text-[22px] md:text-[24px] font-bold text-gray-900 mb-8">
          Payments Overview
        </h1>

        {/* --- METRICS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {METRICS_DATA.map((metric) => {
            const Icon = metric.icon;
            const iconStyles = getMetricIconStyles(metric.colorScheme);

            return (
              <div 
                key={metric.id} 
                className="bg-white rounded-[20px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 flex flex-col"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 ${iconStyles}`}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  {metric.title}
                </h3>
                <p className="text-[24px] font-bold text-gray-900 mb-1.5 leading-none">
                  {metric.value}
                </p>
                <p className="text-[12px] text-gray-400 truncate pr-2">
                  {metric.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* --- PLAN BANNER --- */}
        <div className="  bg-gradient-to-b from-[#030213] via-[#1A1A4E] to-[#2D2D7E] rounded-[24px] p-6 md:p-8 lg:px-10 flex flex-col lg:flex-row justify-between lg:items-center gap-8 mb-8 shadow-md">
          
          {/* Left Side: Plan Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold text-[#8A88A4] uppercase tracking-wider">
                CURRENT PLAN
              </span>
              <span className="flex items-center gap-1.5 bg-[#059669]/10 border border-[#059669]/30 text-[#10B981] text-[11px] font-bold px-2.5 py-1 rounded-full">
                <CheckCircle2 size={12} strokeWidth={2.5} /> Active
              </span>
            </div>
            
            <h2 className="text-[24px]  font-medium text-white mb-1.5 leading-snug">
              Pro Mentorship Plan
            </h2>
            <p className="text-[13px] text-[#8A88A4] mb-6">
              Monthly • 5 services included
            </p>
            
            <button className="bg-white text-gray-900 font-bold text-[13px] px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-gray-100 transition-colors w-fit">
              Manage Plan <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Right Side: Price & Renewal */}
          <div className="flex flex-row items-center justify-between lg:justify-end gap-8 md:gap-16">
            <div className="text-left lg:text-right">
              <p className="text-[10px] font-bold text-[#8A88A4] uppercase tracking-wider mb-1.5">
                PLAN AMOUNT
              </p>
              <h3 className="text-[32px] md:text-[36px] font-bold text-white leading-none mb-1.5 flex items-baseline justify-start lg:justify-end">
                ₹4,999
              </h3>
              <p className="text-[12px] text-[#8A88A4]">
                per month
              </p>
            </div>
            
            {/* Divider Line */}
            <div className="w-[1px] h-[60px] bg-white/10 hidden md:block"></div>
            
            <div className="text-left">
              <p className="text-[10px] font-bold text-[#8A88A4] uppercase tracking-wider mb-1.5">
                RENEWAL DATE
              </p>
              <h3 className="text-[18px] font-bold text-white mb-1.5">
                01 May 2024
              </h3>
              <p className="text-[12px] text-[#8A88A4]">
                renews automatically
              </p>
            </div>
          </div>

        </div>

        {/* --- RECENT INVOICES --- */}
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] p-6 md:p-8">
          
          {/* Section Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[16px] font-bold text-gray-900">
              Recent Invoices
            </h2>
            <button className="text-[13px] font-semibold text-[#042BFD] hover:text-blue-800 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>

          {/* Invoices List */}
          <div className="flex flex-col">
            {INVOICES_DATA.map((invoice, index) => (
              <div 
                key={invoice.id} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 ${
                  index !== INVOICES_DATA.length - 1 ? 'border-b border-gray-100' : ''
                } hover:bg-gray-50/50 transition-colors rounded-xl px-2 -mx-2`}
              >
                
                {/* Left Side: Icon & Details */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-gray-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900 mb-1 line-clamp-1">
                      {invoice.title}
                    </h4>
                    <p className="text-[12px] font-medium text-gray-500">
                      {invoice.id} • {invoice.type} • {invoice.date}
                    </p>
                  </div>
                </div>

                {/* Right Side: Status & Amount */}
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full pl-14 sm:pl-0">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyles(invoice.status)}`}>
                    {invoice.status}
                  </span>
                  <span className="text-[15px] font-bold text-gray-900 min-w-[60px] text-right">
                    {invoice.amount}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}