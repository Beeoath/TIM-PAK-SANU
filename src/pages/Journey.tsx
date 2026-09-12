import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  CheckCircle2,
  Lock,
  ArrowRight,
  Star,
  Shield,
  Sparkles,
  Trophy,
  Play,
  Clock,
  Target,
  ChevronRight,
  Flame,
  Award,
} from "lucide-react";
import { DISTRICTS, MODULES } from "../lib/sigmaData";
import { StudentSpatialLayout } from "../components/StudentSpatialLayout";
import { useAuth } from "../lib/auth";

export default function Journey() {
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("Semua Jalur");

  const filterTabs = [
    { key: "Semua Jalur", label: "Semua Jalur" },
    { key: "Sedang Berjalan", label: "Sedang Berjalan" },
    { key: "Selesai", label: "Selesai (Distrik 1)" },
    { key: "Terkunci", label: "Terkunci (Level 3+)" },
  ];

  const filteredDistricts = useMemo(() => {
    return DISTRICTS.filter((dist, idx) => {
      const isCompleted = idx === 0;
      const isActive = idx === 1;
      const isLocked = idx > 2;

      if (activeFilter === "Sedang Berjalan" && !isActive) return false;
      if (activeFilter === "Selesai" && !isCompleted) return false;
      if (activeFilter === "Terkunci" && !isLocked) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          dist.name.toLowerCase().includes(q) ||
          dist.guardian.toLowerCase().includes(q) ||
          dist.tagline.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  return (
    <StudentSpatialLayout
      activeDockItem="journey"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Cari tahapan roadmap, distrik, materi..."
      categoryTabs={filterTabs}
      activeCategory={activeFilter}
      onSelectCategory={setActiveFilter}
    >
      <div className="space-y-6 sm:space-y-7">
        {/* ================================================================== */}
        {/* 1. ROADMAP HEADER HERO                                             */}
        {/* ================================================================== */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[34px] border border-white/[0.14] bg-gradient-to-r from-[#0d162d]/95 via-[#101b38]/85 to-[#0b1024]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/15 px-3 py-1 font-mono text-[11px] font-black text-cyan-300 shadow-sm">
                  <Compass size={13} /> ROADMAP TKA KELAS 11
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] font-semibold text-slate-300">
                  Target Skor Kelulusan: 75+
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Peta Perjalanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300">Distrik Matematika</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Selesaikan tahapan 5 distrik matematika secara sistematis. Mulai dari Aljabar &amp; Matriks hingga Peluang &amp; Statistika untuk mengamankan nilai tinggi pada Tes Kemampuan Akademik (TKA) MA Darunnajah 9.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="w-full lg:w-72 rounded-2xl border border-white/15 bg-black/40 p-5 backdrop-blur-xl shadow-xl space-y-3.5 shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400 font-bold uppercase">
                  Status Roadmap
                </span>
                <span className="font-mono text-xs text-emerald-400 font-black">
                  40% Selesai
                </span>
              </div>

              {/* Multi-step progress line */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      step === 1
                        ? "bg-emerald-400 shadow-[0_0_8px_#10b981]"
                        : step === 2
                        ? "bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
                        : step === 3
                        ? "bg-white/30"
                        : "bg-white/10"
                    }`}
                  />
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">Total XP Siswa:</span>
                <span className="font-mono font-bold text-cyan-300">
                  {profile?.xp || 1250} XP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. INTERACTIVE VISUAL ROADMAP NODES                                */}
        {/* ================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-display text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <Target size={18} className="text-cyan-400" /> Tahapan Pembelajaran Progresif
            </h2>
            {/* Status Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveFilter(tab.key)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
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
          </div>

          <div className="space-y-4">
            {filteredDistricts.map((dist, idx) => {
              const districtModules = MODULES.filter((m) => m.districtId === dist.id);
              const isCompleted = dist.id === 1;
              const isActive = dist.id === 2;
              const isUnlocked = dist.id <= 3;

              return (
                <div
                  key={dist.id}
                  className={`relative rounded-[28px] border transition-all duration-300 p-5 sm:p-6 backdrop-blur-xl shadow-xl ${
                    isCompleted
                      ? "border-emerald-500/30 bg-[#121c22]/75 hover:border-emerald-500/50"
                      : isActive
                      ? "border-cyan-400/40 bg-[#141b30]/85 shadow-[0_15px_40px_rgba(0,240,255,0.08)] hover:border-cyan-400/60"
                      : isUnlocked
                      ? "border-white/15 bg-[#141624]/70 hover:border-white/25"
                      : "border-white/5 bg-[#0f111d]/50 opacity-60"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    {/* Content details shifted to the left */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300">
                            <CheckCircle2 size={12} className="text-emerald-400" /> SELESAI (SKOR 88)
                          </span>
                        )}
                        {isActive && (
                          <span className="rounded-full bg-cyan-400/20 border border-cyan-400/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 animate-pulse">
                            ● SEDANG BERJALAN
                          </span>
                        )}
                        {isUnlocked && !isCompleted && !isActive && (
                          <span className="rounded-full bg-blue-500/20 border border-blue-400/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-blue-300">
                            ○ TERBUKA
                          </span>
                        )}
                        {!isUnlocked && (
                          <span className="rounded-full bg-slate-800/80 border border-white/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1">
                            <Lock size={10} /> TERKUNCI (BUTUH LEVEL {dist.id})
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                        {dist.name}
                      </h3>

                      <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                        {dist.tagline} • Guardian: <strong className="text-cyan-300">{dist.guardian}</strong>
                      </p>

                      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
                        <span className="rounded-lg bg-white/5 px-2.5 py-1">
                          {dist.modulesCount} Modul Materi
                        </span>
                        <span className="rounded-lg bg-white/5 px-2.5 py-1">
                          Target Kuis: 75+
                        </span>
                        <span className="text-cyan-400 font-bold px-1">
                          +350 XP
                        </span>
                      </div>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                      {isUnlocked && districtModules.length > 0 ? (
                        <>
                          <Link
                            to={`/app/materi/${districtModules[0].id}`}
                            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                          >
                            Pelajari Materi
                          </Link>
                          <Link
                            to={`/app/kuis/${districtModules[0].id}`}
                            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black text-slate-950 transition-all hover:scale-105 cursor-pointer shadow-md"
                            style={{ backgroundColor: dist.accent }}
                          >
                            <Play size={13} fill="currentColor" /> Ikuti Kuis
                          </Link>
                        </>
                      ) : (
                        <button
                          disabled
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-500 cursor-not-allowed"
                        >
                          {isUnlocked ? "Dalam Penyusunan Guru" : "Terkunci"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. CAPSTONE / FINAL MILESTONE TKA SIMULATION CARD                  */}
        {/* ================================================================== */}
        <div className="rounded-[28px] border border-amber-400/30 bg-gradient-to-r from-amber-950/30 via-[#181308]/60 to-[#100c05]/80 p-6 sm:p-7 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-amber-300">
                CAPSTONE EVALUATION
              </span>
              <span className="text-xs font-mono text-slate-400">MAS Darunnajah 9</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-black text-white">
              Simulasi Akbar Tes Kemampuan Akademik (TKA) Komprehensif
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Uji ketangkasan mengerjakan 50 soal prediksi TKA dengan batas waktu 90 menit setelah menuntaskan seluruh modul di 5 distrik.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2.5 text-xs font-bold text-amber-300 opacity-70 cursor-not-allowed shrink-0"
          >
            Terbuka Setelah Distrik 5
          </button>
        </div>
      </div>
    </StudentSpatialLayout>
  );
}
