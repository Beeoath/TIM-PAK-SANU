import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, ThumbsUp, Send, User, ShieldCheck } from "lucide-react";
import { INITIAL_DISCUSSIONS } from "../lib/sigmaData";
import { useAuth } from "../lib/auth";

export default function ThreadDetail() {
  const { id } = useParams();
  const { profile } = useAuth();

  const threads = (() => {
    try {
      const saved = localStorage.getItem("sigma_discussion_threads");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_DISCUSSIONS;
  })();

  const thread = threads.find((t: any) => t.id === id);

  const [replies, setReplies] = useState([
    {
      id: "rep-1",
      author: "Ust. Ahmad Fauzi, S.Pd.",
      role: "teacher",
      content: "Untuk mencari adjoin 3x3 secara cepat, ingat pola tanda kofaktor (+ - + / - + - / + - +) dan fokus langsung pada minor yang dibutuhkan untuk determinan utama.",
      createdAt: "2 jam lalu",
    },
  ]);
  const [newReply, setNewReply] = useState("");
  const [likes, setLikes] = useState(thread?.upvotes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  if (!thread) {
    return (
      <div className="space-y-6 max-w-xl mx-auto py-12 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/5 border border-white/10 mx-auto text-slate-400">
          <MessageSquare size={32} />
        </div>
        <h2 className="text-xl font-bold text-white">Topik Diskusi Tidak Ditemukan</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Topik diskusi ini mungkin telah dihapus, masih kosong, atau tautan yang Anda buka tidak valid.
        </p>
        <div>
          <Link
            to="/app/diskusi"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-400 text-slate-950 px-5 py-2.5 text-xs font-bold hover:bg-cyan-300 transition-all"
          >
            <ArrowLeft size={14} /> Kembali ke Forum Diskusi
          </Link>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((l) => l + 1);
      setHasLiked(true);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setReplies([
      ...replies,
      {
        id: `rep-${Date.now()}`,
        author: profile?.full_name || "Siswa MA Darunnajah 9",
        role: profile?.role || "student",
        content: newReply.trim(),
        createdAt: "Baru saja",
      },
    ]);
    setNewReply("");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link to="/app/diskusi" className="btn-ghost !px-0">
        <ArrowLeft size={16} /> Kembali ke Daftar Forum
      </Link>

      {/* Main Post Card */}
      <div className="rounded-3xl border border-white/15 bg-[#0d1430]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-cyan-500/20 px-2 py-0.5 font-mono text-[11px] font-bold text-cyan-300">
            {thread.category}
          </span>
          <span className="text-xs text-slate-400">• Ditulis oleh {thread.authorName} ({thread.authorClass})</span>
        </div>

        <h1 className="font-display text-xl sm:text-2xl font-black text-white">
          {thread.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed pt-1">
          {thread.content}
        </p>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
              hasLiked
                ? "border-cyan-400 bg-cyan-400/20 text-cyan-300"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
            }`}
          >
            <ThumbsUp size={14} /> {likes} Suka
          </button>
          <span className="text-xs text-slate-400 font-mono">{thread.createdAt}</span>
        </div>
      </div>

      {/* Responses List */}
      <div className="space-y-3">
        <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
          <MessageSquare size={16} className="text-cyan-400" /> Tanggapan ({replies.length})
        </h3>

        {replies.map((rep) => (
          <div
            key={rep.id}
            className={`rounded-2xl border p-4 space-y-2 ${
              rep.role === "teacher"
                ? "border-amber-400/30 bg-amber-400/[0.04]"
                : "border-white/10 bg-[#0a0f24]/70"
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{rep.author}</span>
                {rep.role === "teacher" && (
                  <span className="flex items-center gap-1 rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-[9px] font-bold text-amber-300">
                    <ShieldCheck size={10} /> Guru
                  </span>
                )}
              </div>
              <span className="text-slate-400 font-mono text-[11px]">{rep.createdAt}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {rep.content}
            </p>
          </div>
        ))}
      </div>

      {/* Reply input */}
      <form onSubmit={handleSendReply} className="space-y-3">
        <textarea
          required
          rows={3}
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
          placeholder="Tuliskan jawaban atau tanggapan Anda..."
          className="field"
        />
        <div className="flex justify-end">
          <button type="submit" className="btn-sigma">
            <Send size={15} /> Kirim Balasan
          </button>
        </div>
      </form>
    </div>
  );
}
