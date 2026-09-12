import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Map,
  BookOpen,
  MessageSquare,
  User,
  Search,
  Bell,
  ChevronDown,
  X,
  GraduationCap,
  Bookmark,
  LogOut,
  Sparkles,
  Compass,
  MapPin,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../lib/auth";

export type StudentDockItem = "dashboard" | "journey" | "hub" | "discussions" | "profile";

export interface StudentSpatialLayoutProps {
  activeDockItem: StudentDockItem;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  categoryTabs?: { key: string; label: string }[];
  activeCategory?: string;
  onSelectCategory?: (key: string) => void;
  children: React.ReactNode;
}

export const StudentSpatialLayout: React.FC<StudentSpatialLayoutProps> = ({
  activeDockItem,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Cari materi, rumus, kuis...",
  categoryTabs,
  activeCategory,
  onSelectCategory,
  children,
}) => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const displayName = profile?.full_name || "Ahmad Rizky Pratama";
  const displayClass = profile?.class_name || "Kelas 11 A";
  const displayXp = profile?.xp ?? 0;

  const handleLogout = () => {
    logout();
    navigate("/masuk");
  };

  const dockLinks: { id: StudentDockItem; label: string; path: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard Utama", path: "/app/dashboard", icon: Home },
    { id: "journey", label: "Peta Distrik", path: "/app/journey", icon: Map },
    { id: "hub", label: "Sigma Hub (Modul)", path: "/app/hub", icon: BookOpen },
    { id: "discussions", label: "Forum Diskusi", path: "/app/discussions", icon: MessageSquare },
    { id: "profile", label: "Profil Siswa", path: "/app/profile", icon: User },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-[#0d0e14] text-slate-100 flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-x-hidden font-sans select-none">
      {/* ==================================================================== */}
      {/* 1. ROOM INTERIOR BACKGROUND (Apple VisionOS / Spatial Concept)       */}
      {/* ==================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
          alt="Room Ambient Background"
          className="w-full h-full object-cover opacity-20 filter blur-[8px] scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#06080e]/95 via-[#0c0d16]/85 to-[#12131f]/80" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-3xl" />
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN SPATIAL CONTAINER (Detached Left Dock + Main Glass Window)   */}
      {/* ==================================================================== */}
      <div className="relative z-10 w-full max-w-[1580px] flex items-start gap-3 sm:gap-4 lg:gap-5 min-h-[820px]">
        {/* ================================================================== */}
        {/* A. DETACHED VERTICAL PILL DOCK (Left Floating Pill)                */}
        {/* ================================================================== */}
        <aside className="w-13 sm:w-14 lg:w-[62px] rounded-full bg-[#181a24]/80 border border-white/[0.16] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.18)] backdrop-blur-2xl py-6 sm:py-7 px-2 flex flex-col items-center justify-center gap-6 sm:gap-7 shrink-0 transition-transform sticky top-20">
          {dockLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeDockItem === item.id;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`grid h-10 w-10 place-items-center rounded-full transition-all cursor-pointer group relative ${
                  isActive
                    ? "text-white bg-white/15 shadow-inner scale-110 border border-white/20"
                    : "text-slate-400 hover:text-cyan-400 hover:bg-white/10"
                }`}
                title={item.label}
              >
                <Icon size={19} className={isActive ? "stroke-[2.2] text-white" : ""} />
                {/* Floating tooltip */}
                <span className="pointer-events-none absolute left-full ml-3 hidden group-hover:block whitespace-nowrap rounded-lg bg-slate-950/95 border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xl z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </aside>

        {/* ================================================================== */}
        {/* B. MAIN CURVED FROSTED GLASS WINDOW                                */}
        {/* ================================================================== */}
        <main className="flex-1 rounded-[36px] sm:rounded-[42px] bg-[#11131e]/75 border border-white/[0.14] shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.22)] backdrop-blur-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-x-hidden overflow-y-auto max-h-[92vh] min-h-[820px]">
          <div className="space-y-6 sm:space-y-7">
            {/* -------------------------------------------------------------- */}
            {/* 1. TOP HEADER BAR INSIDE THE WINDOW                            */}
            {/* -------------------------------------------------------------- */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full lg:w-64 xl:w-72">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery ?? ""}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="h-10 w-full rounded-full bg-[#1c1f2e]/80 border border-white/10 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-400 outline-none focus:border-cyan-400/50 focus:bg-[#222638] transition-all shadow-inner"
                />
              </div>

              {/* Center: Main Navigation Pills (Relocated from Topbar) */}
              <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 max-w-full">
                {[
                  { id: "hub", label: "Sigma Hub", path: "/app/hub", icon: Compass },
                  { id: "journey", label: "Peta Distrik", path: "/app/journey", icon: MapPin },
                  { id: "dashboard", label: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
                  { id: "discussions", label: "Forum Diskusi", path: "/app/discussions", icon: MessageSquare },
                  { id: "profile", label: "Profil", path: "/app/profile", icon: User },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeDockItem === item.id;
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4.5 py-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-white text-slate-950 font-black shadow-lg shadow-white/20 scale-[1.02]"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
                      }`}
                      title={item.label}
                    >
                      <Icon size={14} className={isActive ? "text-slate-950 stroke-[2.2]" : "text-slate-400"} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Right: Circular Bell + User Profile Pill */}
              <div className="flex items-center gap-3 self-end lg:self-auto shrink-0">
                {/* Circular Bell Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowNotification(!showNotification)}
                    className="grid h-10 w-10 place-items-center rounded-full bg-[#1c1f2e]/80 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer relative shadow-md"
                    title="Pengumuman Guru Pengampu"
                  >
                    <Bell size={16} />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                  </button>

                  {/* Notification Popover */}
                  {showNotification && (
                    <div className="absolute right-0 top-12 z-50 w-72 rounded-3xl border border-white/20 bg-[#161826]/95 p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                        <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                          <Bell size={13} /> Pengumuman TKA
                        </span>
                        <button
                          onClick={() => setShowNotification(false)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <GraduationCap size={14} className="text-amber-400" /> Ust. Ahmad Fauzi, S.Pd.
                        </div>
                        <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                          Assalamu'alaikum siswa-siswi MAS Darunnajah 9. Sesi simulasi kuis Distrik 1 &amp; 2 siap dikerjakan. Target kelulusan skor 75+.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Pill */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="rounded-full bg-[#1c1f2e]/80 border border-white/10 px-3.5 py-1.5 flex items-center gap-2.5 hover:border-white/30 transition-all cursor-pointer shadow-md"
                  >
                    <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 grid place-items-center text-slate-950 font-black text-xs shadow">
                      {displayName.charAt(0).toUpperCase()}
                    </div>

                    <div className="text-left pr-0.5">
                      <div className="text-xs font-bold text-white leading-tight">{displayName}</div>
                      <div className="text-[10px] text-cyan-300 font-mono leading-none mt-0.5">
                        {displayClass} • {displayXp} XP
                      </div>
                    </div>

                    <ChevronDown size={14} className="text-slate-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl border border-white/15 bg-[#141624]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95">
                      <Link
                        to="/app/profile"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        <User size={14} className="text-cyan-400" /> Profil &amp; Statistik
                      </Link>
                      <Link
                        to="/app/journey"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        <Bookmark size={14} className="text-amber-400" /> Peta Capaian Distrik
                      </Link>
                      <Link
                        to="/app/discussions"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        <MessageSquare size={14} className="text-purple-400" /> Forum Tanya Guru
                      </Link>
                      <div className="my-1 border-t border-white/10" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/15 hover:text-rose-200 cursor-pointer"
                      >
                        <LogOut size={14} /> Keluar Akun
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 2. MAIN PAGE CONTENT INSIDE FROSTED GLASS WINDOW               */}
            {/* -------------------------------------------------------------- */}
            <div>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentSpatialLayout;
