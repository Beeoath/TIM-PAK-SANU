import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Award,
  Save,
  LogOut,
  Sparkles,
  CheckCircle2,
  Shield,
  Clock,
  BookOpen,
  TrendingUp,
  Mail,
  GraduationCap,
  Calendar,
  Lock,
} from "lucide-react";
import { useAuth } from "../lib/auth";
import { StudentSpatialLayout } from "../components/StudentSpatialLayout";

export default function Profile() {
  const { profile, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>("Biodata & Akun");
  const [fullName, setFullName] = useState(profile?.full_name || "Ahmad Rizky Pratama");
  const [className, setClassName] = useState(profile?.class_name || "Kelas 11 A");
  const [nisn, setNisn] = useState("0068192341");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const tabs = [
    { key: "Biodata & Akun", label: "Biodata & Akun" },
    { key: "Lencana Pahlawan", label: "Lencana Prestasi" },
    { key: "Statistik Belajar", label: "Statistik Performa TKA" },
  ];

  const badges = [
    {
      title: "Cyber Algebraist",
      desc: "Menyelesaikan modul Matriks & Determinan 3x3 dengan nilai sempurna di Distrik 1.",
      icon: "Σ",
      color: "#00f0ff",
      unlocked: true,
      date: "12 Mar 2026",
    },
    {
      title: "Vector Scout",
      desc: "Menyelesaikan eksplorasi koordinat 3D & perkalian silang vektor dengan akurasi 85%+.",
      icon: "Δ",
      color: "#10b981",
      unlocked: true,
      date: "14 Mar 2026",
    },
    {
      title: "Calculus Dynamo",
      desc: "Menuntaskan limit trigonometri dan turunan fungsi tingkat lanjut di Distrik 2.",
      icon: "∫",
      color: "#8b5cf6",
      unlocked: false,
      date: "Proses (65%)",
    },
    {
      title: "TKA Grandmaster",
      desc: "Lulus simulasi akbar komprehensif 50 soal dengan skor TKA melampaui 80.",
      icon: "Ω",
      color: "#f59e0b",
      unlocked: false,
      date: "Terkunci",
    },
    {
      title: "Probability Wizard",
      desc: "Menguasai kaidah pencacahan, permutasi, kombinasi, dan distribusi peluang di Distrik 5.",
      icon: "θ",
      color: "#ec4899",
      unlocked: false,
      date: "Terkunci",
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      full_name: fullName,
      class_name: className,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/masuk");
  };

  const displayName = profile?.full_name || fullName;
  const displayClass = profile?.class_name || className;
  const displayXp = profile?.xp ?? 0;
  const displayLevel = profile?.level || 1;

  return (
    <StudentSpatialLayout
      activeDockItem="profile"
      categoryTabs={tabs}
      activeCategory={activeTab}
      onSelectCategory={setActiveTab}
      searchPlaceholder="Cari riwayat kuis, pencapaian..."
    >
      <div className="space-y-6 sm:space-y-7">
        {/* ================================================================== */}
        {/* 1. STUDENT PROFILE HERO HEADER                                     */}
        {/* ================================================================== */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[34px] border border-white/[0.14] bg-gradient-to-r from-[#0d162d]/95 via-[#101b38]/85 to-[#0b1024]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5 text-center sm:text-left">
              {/* Profile Avatar */}
              <div className="relative">
                <div className="h-20 w-20 sm:h-22 sm:w-22 rounded-3xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 grid place-items-center text-slate-950 font-black text-3xl shadow-xl shadow-cyan-500/20 border-2 border-white/30">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md border-2 border-[#101b38]">
                  ✓
                </span>
              </div>

              {/* Identity details */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300">
                    <Sparkles size={11} /> LEVEL {displayLevel} GUARDIAN
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-mono text-slate-300">
                    NISN: {nisn}
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-black text-white">
                  {displayName}
                </h1>

                <p className="text-xs text-slate-300 font-mono">
                  {displayClass} • MAS Darunnajah 9 Pamulang
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-mono">
                  <span className="text-cyan-400 font-bold">{displayXp} XP Terkumpul</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-amber-300 font-bold">2 Lencana Terbuka</span>
                </div>
              </div>
            </div>

            {/* Logout Action */}
            <div className="flex sm:flex-col items-center gap-2 self-stretch sm:self-auto justify-end">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-all cursor-pointer"
              >
                <LogOut size={14} /> Keluar Akun
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. TAB CONTENT: BIODATA & AKUN                                     */}
        {/* ================================================================== */}
        {activeTab === "Biodata & Akun" && (
          <div className="rounded-[28px] border border-white/10 bg-[#161928]/70 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <User size={18} className="text-cyan-400" /> Pengaturan Identitas Siswa
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Informasi ini digunakan pada sertifikat capaian TKA dan laporan evaluasi belajar guru.
                </p>
              </div>

              {savedSuccess && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs font-bold text-emerald-300 animate-in fade-in">
                  <CheckCircle2 size={13} /> Data berhasil disimpan!
                </span>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                    Nama Lengkap Siswa
                  </label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama lengkap sesuai raport"
                    className="h-11 w-full rounded-xl border border-white/15 bg-black/40 px-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                    Rombel / Kelas Belajar
                  </label>
                  <select
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className="h-11 w-full rounded-xl border border-white/15 bg-black/40 px-3 text-xs text-white outline-none focus:border-cyan-400/50 cursor-pointer"
                  >
                    <option value="Kelas 11 A" className="bg-slate-900 text-white">Kelas 11 A (IPA)</option>
                    <option value="Kelas 11 B" className="bg-slate-900 text-white">Kelas 11 B (IPA)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                    Nomor Induk Siswa Nasional (NISN)
                  </label>
                  <input
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value)}
                    placeholder="NISN resmi Kemdikbud / Kemenag"
                    className="h-11 w-full rounded-xl border border-white/15 bg-black/40 px-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                    Email Akun Terdaftar
                  </label>
                  <input
                    disabled
                    value={profile?.email || "siswa@darunnajah9.sch.id"}
                    className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3.5 text-xs text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end pt-3 border-t border-white/10">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-black text-slate-950 shadow-lg shadow-white/20 hover:bg-slate-200 hover:scale-105 transition-all cursor-pointer"
                >
                  <Save size={14} /> Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================================================================== */}
        {/* 3. TAB CONTENT: LENCANA PRESTASI                                   */}
        {/* ================================================================== */}
        {activeTab === "Lencana Pahlawan" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Award size={18} className="text-amber-400" /> Lencana Pahlawan Matematika SIGMA
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Dapatkan lencana digital eksklusif dengan menyelesaikan tantangan distrik dan kuis berpredikat lulus.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-300">
                2 dari 5 Terbuka
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {badges.map((b, idx) => (
                <div
                  key={idx}
                  className={`rounded-[24px] border p-5 backdrop-blur-xl transition-all duration-300 flex items-start gap-4 ${
                    b.unlocked
                      ? "border-white/15 bg-[#161928]/80 shadow-xl hover:border-cyan-400/40"
                      : "border-white/5 bg-[#10121e]/50 opacity-55"
                  }`}
                >
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-mono text-xl font-black shadow-lg"
                    style={{
                      backgroundColor: b.unlocked ? `${b.color}25` : "rgba(255,255,255,0.04)",
                      color: b.unlocked ? b.color : "#64748b",
                      border: `1px solid ${b.unlocked ? `${b.color}50` : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    {b.unlocked ? b.icon : <Lock size={18} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-white truncate">{b.title}</h4>
                      <span className="font-mono text-[10px] text-slate-400 shrink-0">
                        {b.date}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {b.desc}
                    </p>

                    <div className="mt-2.5">
                      {b.unlocked ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400">
                          <CheckCircle2 size={12} /> Terverifikasi
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500">
                          Belum Memenuhi Syarat
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* 4. TAB CONTENT: STATISTIK PERFORMA TKA                             */}
        {/* ================================================================== */}
        {activeTab === "Statistik Belajar" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-white/10 bg-[#161928]/70 p-4.5 backdrop-blur-xl">
                <span className="text-[11px] font-mono text-slate-400 block">Rata-rata Skor TKA</span>
                <span className="font-display text-2xl font-black text-amber-300 mt-1 block">85.0</span>
                <span className="text-[10px] text-emerald-400 font-mono mt-1 block">✓ Di atas target (75+)</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#161928]/70 p-4.5 backdrop-blur-xl">
                <span className="text-[11px] font-mono text-slate-400 block">Akurasi Jawaban</span>
                <span className="font-display text-2xl font-black text-cyan-400 mt-1 block">88.4%</span>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">Dari 45 soal dikerjakan</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#161928]/70 p-4.5 backdrop-blur-xl">
                <span className="text-[11px] font-mono text-slate-400 block">Modul Tuntas</span>
                <span className="font-display text-2xl font-black text-white mt-1 block">6 / 15</span>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">40% silabus kurikulum</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#161928]/70 p-4.5 backdrop-blur-xl">
                <span className="text-[11px] font-mono text-slate-400 block">Waktu Belajar</span>
                <span className="font-display text-2xl font-black text-purple-300 mt-1 block">14.5 Jam</span>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">Minggu ini: +3.2 Jam</span>
              </div>
            </div>

            {/* Recent Quiz History */}
            <div className="rounded-[28px] border border-white/10 bg-[#161928]/70 p-6 backdrop-blur-xl shadow-xl space-y-4">
              <h4 className="font-display text-base font-bold text-white flex items-center gap-2">
                <TrendingUp size={16} className="text-cyan-400" /> Riwayat Kuis &amp; Simulasi Terakhir
              </h4>

              <div className="space-y-2.5">
                {[
                  {
                    title: "Kuis Distrik 1: Invers & Determinan Matriks 3x3",
                    date: "12 Mar 2026",
                    score: 90,
                    status: "LULUS",
                    badgeColor: "emerald",
                  },
                  {
                    title: "Kuis Distrik 2: Komposisi & Invers Fungsi",
                    date: "10 Mar 2026",
                    score: 80,
                    status: "LULUS",
                    badgeColor: "emerald",
                  },
                  {
                    title: "Simulasi Mini TKA Paket A (25 Soal)",
                    date: "05 Mar 2026",
                    score: 85,
                    status: "LULUS",
                    badgeColor: "emerald",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.03] border border-white/5 p-3.5 sm:p-4 text-xs"
                  >
                    <div>
                      <h5 className="font-bold text-white">{item.title}</h5>
                      <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                        Dikerjakan pada {item.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="font-display text-base font-black text-white block">
                          {item.score}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 block">SKOR</span>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-300">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentSpatialLayout>
  );
}
