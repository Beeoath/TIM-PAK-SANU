import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  BookOpen,
  ChevronRight,
  Play,
  Shield,
  Target,
  CheckCircle2,
  Clock,
  Flame,
  FileText,
  X,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "../lib/auth";
import { DISTRICTS, MODULES, SigmaModule } from "../lib/sigmaData";
import { MASCOTS } from "../lib/brand";
import { StudentSpatialLayout } from "../components/StudentSpatialLayout";

// User provided math artwork & photography
import mathBrainImg from "../assets/images/chalkboard_math_brain_1789064453101.jpg";
import neonPhysicsImg from "../assets/images/neon_physics_architecture_1789064468041.jpg";
import darkPendantImg from "../assets/images/dark_pendant_papers_1789064485174.jpg";
import ipadCalculusImg from "../assets/images/ipad_calculus_notes_1789064500969.jpg";

export default function SigmaHub() {
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Semua Distrik");
  const [selectedModule, setSelectedModule] = useState<SigmaModule | null>(null);

  const categoryTabs = [
    { key: "Semua Distrik", label: "Semua Distrik" },
    { key: "Aljabar & Matriks", label: "Aljabar & Matriks" },
    { key: "Fungsi & Kalkulus", label: "Fungsi & Kalkulus" },
    { key: "Geometri & Vektor", label: "Geometri & Vektor" },
    { key: "Trigonometri", label: "Trigonometri" },
    { key: "Peluang & Data", label: "Peluang & Data" },
  ];

  // Filter modules based on search and district category
  const filteredDistricts = useMemo(() => {
    return DISTRICTS.filter((dist) => {
      // Category filter
      if (activeCategory !== "Semua Distrik") {
        if (activeCategory === "Aljabar & Matriks" && dist.id !== 1) return false;
        if (activeCategory === "Fungsi & Kalkulus" && dist.id !== 2) return false;
        if (activeCategory === "Geometri & Vektor" && dist.id !== 3) return false;
        if (activeCategory === "Trigonometri" && dist.id !== 4) return false;
        if (activeCategory === "Peluang & Data" && dist.id !== 5) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const distMatch =
          dist.name.toLowerCase().includes(q) ||
          dist.guardian.toLowerCase().includes(q) ||
          dist.description.toLowerCase().includes(q);
        const modMatch = MODULES.some(
          (m) =>
            m.districtId === dist.id &&
            (m.title.toLowerCase().includes(q) ||
              m.subtitle.toLowerCase().includes(q) ||
              m.description.toLowerCase().includes(q))
        );
        return distMatch || modMatch;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  const activeModule = MODULES[0];

  const userXp = profile?.xp ?? 0;
  const completedDistrictsCount = profile?.completed_modules?.length ?? 0;
  const progressPercent = Math.min(100, Math.round((completedDistrictsCount / 5) * 100));

  return (
    <StudentSpatialLayout
      activeDockItem="hub"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Cari modul, topik matematika, rumus TKA..."
      categoryTabs={categoryTabs}
      activeCategory={activeCategory}
      onSelectCategory={setActiveCategory}
    >
      <div className="space-y-6 sm:space-y-7">
        {/* ================================================================== */}
        {/* 1. HERO BANNER: SPATIAL LEARNING HUB WELCOME                       */}
        {/* ================================================================== */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[34px] border border-white/[0.14] bg-gradient-to-r from-[#0d162d]/95 via-[#101b38]/85 to-[#0b1024]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/15 px-3 py-1 font-mono text-[11px] font-black text-cyan-300 shadow-sm">
                  <Sparkles size={13} /> LEVEL {profile?.level || 1} GUARDIAN
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] font-semibold text-slate-300">
                  {profile?.class_name || "Kelas 11 A"} • MAS Darunnajah 9
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                SIGMA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300">Learning Hub</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Pusat kurikulum dan bank modul matematika berorientasi Tes Kemampuan Akademik (TKA). Pelajari materi teoritis, diskusikan rumus esensial, dan tuntaskan simulasi kuis dengan target nilai kelulusan 75+.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/app/materi/${activeModule.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-white/20 hover:bg-slate-200 hover:scale-105 transition-all cursor-pointer"
                >
                  <Play size={15} fill="currentColor" />
                  Lanjut Belajar: {activeModule.title.split(":")[0]}
                </Link>
                <Link
                  to="/app/journey"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  <Compass size={15} /> Buka Peta Distrik
                </Link>
              </div>
            </div>

            {/* User XP & Milestone Stat Card (Status Akumulasi) */}
            <div className="w-full lg:w-80 rounded-2xl border border-white/15 bg-black/40 p-5 backdrop-blur-xl shadow-xl space-y-4 shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Akumulasi Kemajuan
                </span>
                <span className="font-mono text-xs text-cyan-400 font-black">
                  {userXp} XP
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 shadow-[0_0_12px_#00f0ff]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-center">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-display text-lg font-black text-white">
                    {completedDistrictsCount} / 5
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Distrik Dikuasai</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-display text-lg font-black text-slate-300">
                    {completedDistrictsCount > 0 ? `${Math.min(100, Math.round((userXp / (completedDistrictsCount * 100)) * 10))}%` : "0%"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Rata-rata Skor TKA</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. DISTRICT & MODULES CATALOG                                     */}
        {/* ================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Target size={18} className="text-cyan-400" /> 5 Distrik Pembelajaran SIGMA
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pilih distrik untuk meninjau silabus materi pembelajaran, trik cepat rumus, dan paket kuis TKA.
              </p>
            </div>
            <Link
              to="/app/journey"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline"
            >
              Lihat Roadmap Lengkap <ArrowRight size={14} />
            </Link>
          </div>

          {/* District Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-400/20"
                      : "text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredDistricts.map((dist, idx) => {
              const districtModules = MODULES.filter((m) => m.districtId === dist.id);
              const isFirst = dist.id === 1;
              const isSecond = dist.id === 2;
              const isUnlocked = dist.id <= 3;

              return (
                <div
                  key={dist.id}
                  className="group relative flex flex-col justify-between rounded-[28px] border border-white/10 bg-[#161928]/70 p-5 sm:p-6 backdrop-blur-xl shadow-xl hover:border-white/25 hover:bg-[#1a1e30]/80 transition-all duration-300"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2.5">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        DISTRIK 0{dist.id}
                      </span>
                      {isFirst && (
                        <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-[9px] font-mono font-bold text-emerald-300">
                          SELESAI
                        </span>
                      )}
                      {isSecond && (
                        <span className="rounded-full bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 text-[9px] font-mono font-bold text-amber-300">
                          AKTIF
                        </span>
                      )}
                      {!isUnlocked && (
                        <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[9px] font-mono font-bold text-slate-400">
                          TERKUNCI
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {dist.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {dist.description}
                    </p>

                    <div className="mt-3.5 flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2 text-[11px] font-mono text-slate-300">
                      <Shield size={13} style={{ color: dist.accent }} />
                      <span>Guardian: <strong className="text-white">{dist.guardian}</strong></span>
                    </div>

                    {/* Sub-module list preview */}
                    <div className="mt-4 space-y-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Modul &amp; Bahasan:
                      </span>
                      {districtModules.length > 0 ? (
                        districtModules.slice(0, 2).map((mod) => (
                          <div
                            key={mod.id}
                            className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.02] border border-white/5 px-3 py-2 text-xs hover:border-white/15 transition-all"
                          >
                            <div className="truncate pr-2">
                              <span className="font-semibold text-white block truncate">
                                {mod.title.split(":")[0]}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {mod.subtitle}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-cyan-400 font-bold shrink-0">
                              {mod.xpReward} XP
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-500 italic py-1">
                          Modul sedang disiapkan dewan guru.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Target Skor: <strong className="text-white">75+</strong>
                    </span>

                    {districtModules.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedModule(districtModules[0])}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                          Detail
                        </button>
                        <Link
                          to={`/app/materi/${districtModules[0].id}`}
                          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-black text-slate-950 transition-all hover:scale-105 cursor-pointer shadow-md"
                          style={{
                            backgroundColor: dist.accent,
                          }}
                        >
                          Buka Materi <ChevronRight size={14} />
                        </Link>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">Segera Hadir</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. MODAL DETAIL POPUP                                             */}
        {/* ================================================================== */}
        {selectedModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#141726]/95 p-6 shadow-2xl backdrop-blur-2xl">
              <button
                type="button"
                onClick={() => setSelectedModule(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-cyan-400/15 border border-cyan-400/30 px-3 py-0.5 text-[11px] font-mono font-bold text-cyan-300">
                  MODUL TKA
                </span>
                <span className="font-mono text-xs text-slate-400">
                  +{selectedModule.xpReward} XP
                </span>
              </div>

              <h3 className="font-display text-xl font-black text-white mt-3">
                {selectedModule.title}
              </h3>
              <p className="text-xs text-cyan-300 font-mono mt-0.5">
                {selectedModule.subtitle}
              </p>

              <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
                {selectedModule.description}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 block">Estimasi Waktu</span>
                  <span className="font-bold text-white mt-0.5 block flex items-center gap-1">
                    <Clock size={12} className="text-cyan-400" /> {selectedModule.durationMinutes} Menit
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] font-mono text-slate-400 block">Target Kelulusan</span>
                  <span className="font-bold text-white mt-0.5 block flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-emerald-400" /> Skor 75+
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedModule(null)}
                  className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Tutup
                </button>
                <Link
                  to={`/app/materi/${selectedModule.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-black text-slate-950 shadow-lg hover:bg-slate-200 transition-all cursor-pointer"
                >
                  <Play size={14} fill="currentColor" /> Masuk Belajar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentSpatialLayout>
  );
}
