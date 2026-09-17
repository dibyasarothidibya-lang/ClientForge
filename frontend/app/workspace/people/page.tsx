"use client";

import { useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { Member } from "@/lib/demoData";
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Upload,
  UserPlus,
  Eye,
  Check,
  Building2,
  X,
  Mail,
  Calendar,
  Briefcase
} from "lucide-react";

export default function PeoplePage() {
  const { members, currentRole } = useWorkspace();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [activeTab, setActiveTab] = useState<"directory" | "teams">("directory");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Saved views
  const [savedView, setSavedView] = useState("All Members");

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "All" || m.department === selectedDept;
    const matchesType = selectedType === "All" || m.type === selectedType;
    return matchesSearch && matchesDept && matchesType;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 block mb-1">
            Workforce & Volunteers
          </span>
          <h1 className="text-3xl font-serif text-[#f5f5f3] font-normal">People & Teams Directory</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("CSV exported successfully for all visible records.")}
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-xs font-mono text-neutral-300 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => alert("Simulate invite modal: Sent invitations to selected emails.")}
            className="px-4 py-2 rounded-xl bg-[#f5f5f3] hover:bg-white text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Invite Member</span>
          </button>
        </div>
      </div>

      {/* Saved Views Bar */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 text-xs font-mono">
        <span className="text-neutral-500 mr-2">Saved Views:</span>
        {["All Members", "Active Volunteers", "Leadership & Exec", "Compliance & Audit"].map((view) => (
          <button
            key={view}
            onClick={() => {
              setSavedView(view);
              if (view === "Active Volunteers") setSelectedType("Volunteer");
              else if (view === "Compliance & Audit") setSelectedDept("Finance & Compliance");
              else {
                setSelectedDept("All");
                setSelectedType("All");
              }
            }}
            className={`px-3 py-1 rounded-lg transition-colors ${
              savedView === view
                ? "bg-indigo-600/30 border border-indigo-500/40 text-white font-medium"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Advanced Data-Grid Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, email, role, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#0e0e12] border border-white/[0.08] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-400 font-sans"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-3 py-2.5 bg-[#0e0e12] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none font-mono"
        >
          <option value="All">All Departments</option>
          <option value="Executive & Governance">Executive & Governance</option>
          <option value="Operations & Field Services">Operations & Field Services</option>
          <option value="Finance & Compliance">Finance & Compliance</option>
          <option value="Programs & Outreach">Programs & Outreach</option>
          <option value="Technology & Systems">Technology & Systems</option>
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2.5 bg-[#0e0e12] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none font-mono"
        >
          <option value="All">All Classifications</option>
          <option value="Full-time">Full-time Staff</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Contractor">Contractor</option>
        </select>
      </div>

      {/* ADVANCED DATA-GRID TABLE */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/[0.08] bg-white/[0.02] text-neutral-400 font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Member</th>
                <th className="py-3.5 px-4">Role & Access</th>
                <th className="py-3.5 px-4">Department / Team</th>
                <th className="py-3.5 px-4">Classification</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-neutral-300">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-9 h-9 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <div className="font-medium text-white">{member.name}</div>
                        <div className="text-[11px] text-neutral-500 font-mono">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px]">
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-white">{member.department}</div>
                    <div className="text-[11px] text-neutral-500">{member.team}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <span className={`px-2 py-0.5 rounded ${
                      member.type === "Volunteer" ? "bg-amber-500/10 text-amber-300" : "text-neutral-400"
                    }`}>
                      {member.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MEMBER PROFILE DRAWER MODAL */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#101014] border-l border-white/[0.1] h-full p-6 sm:p-8 overflow-y-auto space-y-6 text-xs font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <span className="font-mono text-xs text-neutral-400 uppercase">Profile Dossier</span>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/40"
              />
              <div>
                <h3 className="text-xl font-serif text-white font-medium">{selectedMember.name}</h3>
                <div className="text-indigo-400 font-mono">{selectedMember.role} • {selectedMember.type}</div>
                <div className="text-neutral-500 text-[11px] font-mono mt-0.5">{selectedMember.email}</div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">Department & Team</div>
                <div className="text-sm text-white font-medium mt-0.5">{selectedMember.department}</div>
                <div className="text-xs text-neutral-400">{selectedMember.team}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="text-[10px] font-mono text-neutral-500 uppercase mb-2">Verified Skills & Certifications</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-neutral-300 text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="text-[10px] font-mono text-neutral-500 uppercase">Tenure & Project Load</div>
                <div className="text-xs text-neutral-300 mt-1">Joined: {selectedMember.joinDate}</div>
                <div className="text-xs text-emerald-400 mt-0.5">{selectedMember.assignedProjects} active project commitments</div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex gap-3">
              <button
                onClick={() => alert(`Assigned new project to ${selectedMember.name}`)}
                className="flex-1 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs text-center"
              >
                Assign Initiative
              </button>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
