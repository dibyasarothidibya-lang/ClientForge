"use client";

import React from "react";
import { WorkspaceProvider, useWorkspace } from "@/context/WorkspaceContext";
import Sidebar from "@/components/workspace/Sidebar";
import Header from "@/components/workspace/Header";
import CommandPalette from "@/components/workspace/CommandPalette";

function WorkspaceMain({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useWorkspace();
  return (
    <main
      className={`transition-all duration-300 ${
        isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
      } p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {children}
      </div>
    </main>
  );
}

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WorkspaceProvider>
      <div className="workspace-shell min-h-screen bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-[#f5f5f3] font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Top Header */}
        <Header />

        {/* Main Content Area */}
        <WorkspaceMain>
          {children}
        </WorkspaceMain>

        {/* Cmd/Ctrl + K Global Command Palette */}
        <CommandPalette />
      </div>
    </WorkspaceProvider>
  );
}
