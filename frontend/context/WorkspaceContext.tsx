"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  primaryOrg,
  alternateOrg,
  Organization,
  UserRole,
  Member,
  demoMembers,
  Project,
  demoProjects,
  Task,
  demoTasks,
  Audit,
  demoAudits,
  AuditFinding,
  demoFindings,
  Campaign,
  demoCampaigns,
  Transaction,
  demoTransactions,
  DocumentItem,
  demoDocuments,
  ApprovalRequest,
  demoApprovals,
  ActivityEvent,
  demoActivities,
} from "@/lib/demoData";

interface WorkspaceContextType {
  activeOrg: Organization;
  setActiveOrg: (org: Organization) => void;
  allOrgs: Organization[];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: Member;
  
  // Data State
  members: Member[];
  projects: Project[];
  tasks: Task[];
  audits: Audit[];
  findings: AuditFinding[];
  campaigns: Campaign[];
  transactions: Transaction[];
  documents: DocumentItem[];
  approvals: ApprovalRequest[];
  activities: ActivityEvent[];
  
  // State Mutators (Mock pure frontend actions)
  addTask: (task: Omit<Task, "id" | "commentsCount">) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  addFinding: (finding: Omit<AuditFinding, "id">) => void;
  updateFindingStatus: (id: string, status: AuditFinding["status"]) => void;
  approveRequest: (id: string, reason?: string) => void;
  rejectRequest: (id: string, reason: string) => void;
  addTransaction: (tx: Omit<Transaction, "id" | "date">) => void;
  addDocument: (doc: Omit<DocumentItem, "id" | "updatedAt">) => void;
  
  // Shell States
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  unreadNotificationCount: number;
  markNotificationsRead: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeOrg, setActiveOrg] = useState<Organization>(primaryOrg);
  const allOrgs = [primaryOrg, alternateOrg];
  const [currentRole, setCurrentRole] = useState<UserRole>("Owner");
  
  const [members, setMembers] = useState<Member[]>(demoMembers);
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [tasks, setTasks] = useState<Task[]>(demoTasks);
  const [audits, setAudits] = useState<Audit[]>(demoAudits);
  const [findings, setFindings] = useState<AuditFinding[]>(demoFindings);
  const [campaigns, setCampaigns] = useState<Campaign[]>(demoCampaigns);
  const [transactions, setTransactions] = useState<Transaction[]>(demoTransactions);
  const [documents, setDocuments] = useState<DocumentItem[]>(demoDocuments);
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(demoApprovals);
  const [activities, setActivities] = useState<ActivityEvent[]>(demoActivities);

  // Shell controls
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);

  // Keyboard shortcut for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute active user persona based on current role
  const currentUser = members.find((m) => m.role === currentRole) || members[0];

  const addTask = (taskData: Omit<Task, "id" | "commentsCount">) => {
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}`,
      commentsCount: 0,
    };
    setTasks((prev) => [newTask, ...prev]);
    
    // Add activity log
    setActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        actor: currentUser.name,
        actorAvatar: currentUser.avatar,
        action: "created task",
        target: newTask.title,
        resourceType: "Project",
        timestamp: "Just now",
        metadata: `Priority: ${newTask.priority} | Assignee: ${newTask.assignee.name}`,
      },
      ...prev,
    ]);
  };

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  const addFinding = (findingData: Omit<AuditFinding, "id">) => {
    const newFinding: AuditFinding = {
      ...findingData,
      id: `fnd_${Date.now()}`,
    };
    setFindings((prev) => [newFinding, ...prev]);
  };

  const updateFindingStatus = (id: string, status: AuditFinding["status"]) => {
    setFindings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    );
  };

  const approveRequest = (id: string, reason?: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Approved" } : a))
    );
    setActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        actor: currentUser.name,
        actorAvatar: currentUser.avatar,
        action: "approved",
        target: `Request #${id}`,
        resourceType: "Approval",
        timestamp: "Just now",
        metadata: reason ? `Note: ${reason}` : "Approved without notes",
      },
      ...prev,
    ]);
  };

  const rejectRequest = (id: string, reason: string) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Rejected" } : a))
    );
    setActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        actor: currentUser.name,
        actorAvatar: currentUser.avatar,
        action: "rejected",
        target: `Request #${id}`,
        resourceType: "Approval",
        timestamp: "Just now",
        metadata: `Reason: ${reason}`,
      },
      ...prev,
    ]);
  };

  const addTransaction = (txData: Omit<Transaction, "id" | "date">) => {
    const newTx: Transaction = {
      ...txData,
      id: `tx_${Date.now()}`,
      date: "Just now",
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const addDocument = (docData: Omit<DocumentItem, "id" | "updatedAt">) => {
    const newDoc: DocumentItem = {
      ...docData,
      id: `doc_${Date.now()}`,
      updatedAt: "Today",
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const markNotificationsRead = () => {
    setUnreadNotificationCount(0);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        activeOrg,
        setActiveOrg,
        allOrgs,
        currentRole,
        setCurrentRole,
        currentUser,
        members,
        projects,
        tasks,
        audits,
        findings,
        campaigns,
        transactions,
        documents,
        approvals,
        activities,
        addTask,
        updateTaskStatus,
        addFinding,
        updateFindingStatus,
        approveRequest,
        rejectRequest,
        addTransaction,
        addDocument,
        isSidebarOpen,
        setIsSidebarOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        unreadNotificationCount,
        markNotificationsRead,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
