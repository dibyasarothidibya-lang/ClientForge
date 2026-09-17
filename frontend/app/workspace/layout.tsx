"use client";

import React from "react";
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import Sidebar from "@/components/workspace/Sidebar";
import Header from "@/components/workspace/Header";
import CommandPalette from "@/components/workspace/CommandPalette";

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
        <main className="transition-all duration-300 lg:ml-64 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Cmd/Ctrl + K Global Command Palette */}
        <CommandPalette />
      </div>
    </WorkspaceProvider>
  );
}
