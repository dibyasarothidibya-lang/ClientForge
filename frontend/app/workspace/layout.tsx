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
      className={`transition-all duration-200 ${
        isSidebarOpen ? "lg:ml-64" : "lg:ml-[68px]"
      } p-4 sm:p-6 lg:p-7 min-h-[calc(100vh-3.5rem)]`}
    >
      <div className="max-w-[1440px] mx-auto space-y-6">
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
      <div className="workspace-shell min-h-screen bg-[#f8fafc] dark:bg-[#09090b] text-slate-900 dark:text-[#f4f4f6] font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 antialiased">
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
