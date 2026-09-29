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
import {
  Candidate,
  JobPosting,
  AttendanceRecord,
  LeaveRequest,
  PayrollRecord,
  ExpenseRecord,
  PerformanceGoal,
  PerformanceReviewCycle,
  HRDocument,
  AutomationWorkflow,
  SupportTicket,
  NotificationItem,
  demoCandidates,
  demoJobs,
  demoAttendanceRecords,
  demoLeaveRequests,
  demoPayrolls,
  demoExpenses,
  demoGoals,
  demoReviewCycles,
  demoHRDocuments,
  demoWorkflows,
  demoSupportTickets,
  demoNotifications,
} from "@/lib/peopleCoreData";
import { ApiClient } from "@/lib/api";

interface WorkspaceContextType {
  activeOrg: Organization;
  setActiveOrg: (org: Organization) => void;
  allOrgs: Organization[];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: Member;
  backendConnected: boolean;
  
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

  // PeopleCore Enterprise HR State
  candidates: Candidate[];
  jobs: JobPosting[];
  attendanceRecords: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  payrolls: PayrollRecord[];
  expenses: ExpenseRecord[];
  goals: PerformanceGoal[];
  reviewCycles: PerformanceReviewCycle[];
  hrDocuments: HRDocument[];
  workflows: AutomationWorkflow[];
  supportTickets: SupportTicket[];
  notifications: NotificationItem[];
  
  // State Mutators
  addTask: (task: Omit<Task, "id" | "commentsCount">) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  addFinding: (finding: Omit<AuditFinding, "id">) => void;
  updateFindingStatus: (id: string, status: AuditFinding["status"]) => void;
  approveRequest: (id: string, reason?: string) => void;
  rejectRequest: (id: string, reason: string) => void;
  addTransaction: (tx: Omit<Transaction, "id" | "date">) => void;
  addDocument: (doc: Omit<DocumentItem, "id" | "updatedAt">) => void;

  // PeopleCore Mutators
  addCandidate: (cand: Omit<Candidate, "id" | "appliedDate">) => void;
  updateCandidateStage: (candidateId: string, stage: Candidate["stage"]) => void;
  addJob: (job: Omit<JobPosting, "id" | "postedDate" | "applicantsCount">) => void;
  addLeaveRequest: (req: Omit<LeaveRequest, "id" | "appliedDate" | "status" | "workflowStage">) => void;
  approveLeaveRequest: (id: string) => void;
  rejectLeaveRequest: (id: string) => void;
  addExpense: (exp: Omit<ExpenseRecord, "id" | "date" | "status">) => void;
  approveExpense: (id: string) => void;
  rejectExpense: (id: string) => void;
  addGoal: (goal: Omit<PerformanceGoal, "id">) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  addHRDocument: (doc: Omit<HRDocument, "id" | "uploadDate" | "downloadCount">) => void;
  toggleWorkflowStatus: (id: string) => void;
  addSupportTicket: (ticket: Omit<SupportTicket, "id" | "ticketNumber" | "createdDate" | "lastUpdated" | "status">) => void;
  markNotificationAsRead: (id: string) => void;
  
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
  const allOrgs = [primaryOrg];
  const [currentRole, setCurrentRole] = useState<UserRole>("Owner");
  const [backendConnected, setBackendConnected] = useState(false);
  
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

  // PeopleCore State
  const [candidates, setCandidates] = useState<Candidate[]>(demoCandidates);
  const [jobs, setJobs] = useState<JobPosting[]>(demoJobs);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(demoAttendanceRecords);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(demoLeaveRequests);
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>(demoPayrolls);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(demoExpenses);
  const [goals, setGoals] = useState<PerformanceGoal[]>(demoGoals);
  const [reviewCycles, setReviewCycles] = useState<PerformanceReviewCycle[]>(demoReviewCycles);
  const [hrDocuments, setHrDocuments] = useState<HRDocument[]>(demoHRDocuments);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(demoWorkflows);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(demoSupportTickets);
  const [notifications, setNotifications] = useState<NotificationItem[]>(demoNotifications);

  // Shell controls
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);

  // Hydrate from real backend API on mount
  useEffect(() => {
    async function hydrateFromBackend() {
      try {
        const res = await ApiClient.get("/operations/bootstrap/");
        if (res.success) {
          setBackendConnected(true);
          if (res.activeOrg) {
            setActiveOrg({
              id: res.activeOrg.id,
              name: res.activeOrg.name,
              slug: res.activeOrg.slug,
              type: res.activeOrg.org_type || "Enterprise",
              logo: res.activeOrg.logo_url || "/logo.jpg",
              plan: res.activeOrg.plan || "Enterprise",
              memberCount: res.activeOrg.member_count || res.members?.length || 248,
              currency: res.activeOrg.currency || "USD ($)",
              timezone: res.activeOrg.timezone || "UTC",
            });
          }
          if (res.members?.length) setMembers(res.members);
          if (res.attendanceRecords?.length) setAttendanceRecords(res.attendanceRecords);
          if (res.leaveRequests?.length) setLeaveRequests(res.leaveRequests);
          if (res.payrolls?.length) setPayrolls(res.payrolls);
          if (res.expenses?.length) setExpenses(res.expenses);
          if (res.hrDocuments?.length) setHrDocuments(res.hrDocuments);
          if (res.workflows?.length) setWorkflows(res.workflows);
          if (res.candidates?.length) setCandidates(res.candidates);
          if (res.jobs?.length) setJobs(res.jobs);
          if (res.goals?.length) setGoals(res.goals);
          if (res.tasks?.length) setTasks(res.tasks);
          if (res.findings?.length) setFindings(res.findings);
          if (res.supportTickets?.length) setSupportTickets(res.supportTickets);
          if (res.transactions?.length) setTransactions(res.transactions);
          if (res.notifications?.length) setNotifications(res.notifications);
          if (res.activities?.length) setActivities(res.activities);
        }
      } catch (err) {
        console.info("ClientForge running with seeded dataset:", err);
      }
    }

    hydrateFromBackend();
  }, []);

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
        metadata: `Priority: ${newTask.priority} | Assignee: ${newTask.assignee?.name || 'Unassigned'}`,
      },
      ...prev,
    ]);

    ApiClient.post("/operations/tasks/", {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      priority: taskData.priority,
      assigneeId: taskData.assignee?.id,
      dueDate: taskData.dueDate,
      labels: taskData.labels,
    });
  };

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
    ApiClient.patch(`/operations/tasks/${taskId}/status/`, { status });
  };

  const addFinding = (findingData: Omit<AuditFinding, "id">) => {
    const newFinding: AuditFinding = {
      ...findingData,
      id: `fnd_${Date.now()}`,
    };
    setFindings((prev) => [newFinding, ...prev]);

    ApiClient.post("/operations/findings/", findingData);
  };

  const updateFindingStatus = (id: string, status: AuditFinding["status"]) => {
    setFindings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    );
    ApiClient.patch(`/operations/findings/${id}/status/`, { status });
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
    ApiClient.post("/operations/transactions/", txData);
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
    ApiClient.post("/notifications/mark-all-read/");
  };

  // PeopleCore Mutators
  const addCandidate = (candData: Omit<Candidate, "id" | "appliedDate">) => {
    const newCand: Candidate = {
      ...candData,
      id: `cand_${Date.now()}`,
      appliedDate: new Date().toISOString().split("T")[0],
    };
    setCandidates((prev) => [newCand, ...prev]);
    ApiClient.post("/operations/candidates/", candData);
  };

  const updateCandidateStage = (candidateId: string, stage: Candidate["stage"]) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage } : c))
    );
    ApiClient.patch(`/operations/candidates/${candidateId}/stage/`, { stage });
  };

  const addJob = (jobData: Omit<JobPosting, "id" | "postedDate" | "applicantsCount">) => {
    const newJob: JobPosting = {
      ...jobData,
      id: `job_${Date.now()}`,
      postedDate: new Date().toISOString().split("T")[0],
      applicantsCount: 0,
    };
    setJobs((prev) => [newJob, ...prev]);
    ApiClient.post("/operations/jobs/", jobData);
  };

  const addLeaveRequest = (reqData: Omit<LeaveRequest, "id" | "appliedDate" | "status" | "workflowStage">) => {
    const newLeave: LeaveRequest = {
      ...reqData,
      id: `lve_${Date.now()}`,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      workflowStage: "Manager",
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);

    ApiClient.post("/leave/", {
      leave_type: reqData.leaveType,
      start_date: reqData.startDate,
      end_date: reqData.endDate,
      reason: reqData.reason,
    });
  };

  const approveLeaveRequest = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "Approved", workflowStage: "Completed" } : l))
    );
    setActivities((prev) => [
      {
        id: `act_${Date.now()}`,
        actor: currentUser.name,
        actorAvatar: currentUser.avatar,
        action: "approved leave request",
        target: `Leave Request #${id}`,
        resourceType: "Approval",
        timestamp: "Just now",
        metadata: "Status: Approved",
      },
      ...prev,
    ]);

    ApiClient.post(`/leave/${id}/approve/`, { reason: "Approved via Workspace" });
  };

  const rejectLeaveRequest = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "Rejected", workflowStage: "Completed" } : l))
    );
    ApiClient.post(`/leave/${id}/reject/`, { reason: "Rejected via Workspace" });
  };

  const addExpense = (expData: Omit<ExpenseRecord, "id" | "date" | "status">) => {
    const newExp: ExpenseRecord = {
      ...expData,
      id: `exp_${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    };
    setExpenses((prev) => [newExp, ...prev]);

    ApiClient.post("/payroll/expenses/", {
      category: expData.category,
      amount: expData.amount,
      currency: expData.currency,
      date: new Date().toISOString().split("T")[0],
      merchant: expData.merchant,
      description: expData.description,
      receipt_url: expData.receiptUrl,
    });
  };

  const approveExpense = (id: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "Approved" } : e))
    );
    ApiClient.post(`/payroll/expenses/${id}/approve/`);
  };

  const rejectExpense = (id: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "Rejected" } : e))
    );
    ApiClient.post(`/payroll/expenses/${id}/reject/`);
  };

  const addGoal = (goalData: Omit<PerformanceGoal, "id">) => {
    const newGoal: PerformanceGoal = {
      ...goalData,
      id: `goal_${Date.now()}`,
    };
    setGoals((prev) => [newGoal, ...prev]);
    ApiClient.post("/operations/goals/", goalData);
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, progress, status: progress >= 100 ? "Completed" : g.status } : g))
    );
    ApiClient.patch(`/operations/goals/${id}/progress/`, { progress });
  };

  const addHRDocument = (docData: Omit<HRDocument, "id" | "uploadDate" | "downloadCount">) => {
    const newDoc: HRDocument = {
      ...docData,
      id: `doc_${Date.now()}`,
      uploadDate: new Date().toISOString().split("T")[0],
      downloadCount: 0,
    };
    setHrDocuments((prev) => [newDoc, ...prev]);
    ApiClient.post("/documents/", docData);
  };

  const toggleWorkflowStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: w.status === "Active" ? "Paused" : "Active" } : w))
    );
    ApiClient.post(`/workflows/${id}/toggle/`);
  };

  const addSupportTicket = (ticketData: Omit<SupportTicket, "id" | "ticketNumber" | "createdDate" | "lastUpdated" | "status">) => {
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `tkt_${Date.now()}`,
      ticketNumber: `PC-${Math.floor(1000 + Math.random() * 9000)}`,
      createdDate: new Date().toISOString().split("T")[0],
      lastUpdated: "Just now",
      status: "Open",
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    ApiClient.post("/operations/tickets/", ticketData);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    ApiClient.post(`/notifications/${id}/read/`);
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
        backendConnected,
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
        candidates,
        jobs,
        attendanceRecords,
        leaveRequests,
        payrolls,
        expenses,
        goals,
        reviewCycles,
        hrDocuments,
        workflows,
        supportTickets,
        notifications,
        addTask,
        updateTaskStatus,
        addFinding,
        updateFindingStatus,
        approveRequest,
        rejectRequest,
        addTransaction,
        addDocument,
        addCandidate,
        updateCandidateStage,
        addJob,
        addLeaveRequest,
        approveLeaveRequest,
        rejectLeaveRequest,
        addExpense,
        approveExpense,
        rejectExpense,
        addGoal,
        updateGoalProgress,
        addHRDocument,
        toggleWorkflowStatus,
        addSupportTicket,
        markNotificationAsRead,
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
