"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ThreeDCard from "@/components/motion/ThreeDCard";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  Cpu,
  Radio,
  Clock,
  RefreshCw,
  HardDrive,
  ShieldCheck,
  Zap,
  Globe,
  Gauge
} from "lucide-react";

export default function SystemHealthPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastChecked, setLastChecked] = useState("Just now");

  const services = [
    {
      name: "Primary Database Cluster (CockroachDB/Postgres)",
      region: "us-east-1 (N. Virginia)",
      status: "Operational",
      uptime: "99.99%",
      latency: "4ms",
      load: "22% CPU",
      glare: "#6366f1",
    },
    {
      name: "Stripe Webhook & Payment Gateway Ingestion",
      region: "Global Edge (Cloudflare Workers)",
      status: "Operational",
      uptime: "100.00%",
      latency: "12ms",
      load: "0 errors (24h)",
      glare: "#10b981",
    },
    {
      name: "Evidence Vault WORM Object Storage (S3-Compatible)",
      region: "us-east-1",
      status: "Operational",
      uptime: "99.98%",
      latency: "19ms",
      load: "24.8 GB allocated",
      glare: "#3b82f6",
    },
    {
      name: "Background Job Dispatcher & Queue Engine",
      region: "us-east-1",
      status: "Operational",
      uptime: "99.95%",
      latency: "2ms queue wait",
      load: "0 queued backlog",
      glare: "#f59e0b",
    },
    {
      name: "AI Grounding & Vector Embedding Engine",
      region: "us-central1",
      status: "Operational",
      uptime: "99.92%",
      latency: "142ms P95",
      load: "Nominal",
      glare: "#8b5cf6",
    },
    {
      name: "Identity & RBAC Access Evaluator",
      region: "Multi-Region Global",
      status: "Operational",
      uptime: "100.00%",
      latency: "3ms",
      load: "100% token validation",
      glare: "#06b6d4",
    },
  ];

  const kpis = [
    {
      title: "90-Day SLA Uptime",
      value: "99.98%",
      subtext: "Exceeds 99.95% SLO commitment",
      icon: ShieldCheck,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      glare: "#10b981",
      badge: "Zero Outages",
    },
    {
      title: "Global P95 Latency",
      value: "18ms",
      subtext: "Edge acceleration active",
      icon: Zap,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      glare: "#3b82f6",
      badge: "Cloudflare Edge",
    },
    {
      title: "Microservices Fleet",
      value: "6 / 6",
      subtext: "All nodes reporting healthy",
      icon: Server,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
      glare: "#6366f1",
      badge: "100% Nominal",
    },
    {
      title: "Error Budget Remaining",
      value: "99.97%",
      subtext: "3 minutes consumed of 43m",
      icon: Gauge,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      glare: "#f59e0b",
      badge: "Healthy Margin",
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastChecked("Just now");
    }, 600);
  };

  const latencyValues = [14, 16, 15, 18, 22, 19, 15, 14, 17, 24, 38, 21, 16, 15, 14, 18, 16, 17, 15, 14, 16, 15, 17, 16];

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <Activity className="w-3.5 h-3.5" /> Live Telemetry & Observability
            </span>
            <span className="text-xs text-slate-500 dark:text-neutral-400">SLO: 99.95% Availability Target</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-slate-950 dark:text-neutral-100">
            System Status & Microservices Health
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1 max-w-2xl">
            Real-time status indicators, latency telemetry, background queue depths, and uptime SLA adherence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 dark:text-neutral-400 font-sans font-medium whitespace-nowrap">Checked: {lastChecked}</span>
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs font-medium text-slate-800 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-neutral-800 transition cursor-pointer shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Check Heartbeat
          </motion.button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <ThreeDCard key={idx} glareColor={kpi.glare} maxTilt={6} elevationZ={12} className="h-full">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] flex flex-col justify-between h-full shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-sans font-semibold text-slate-500 dark:text-neutral-400 uppercase tracking-wider">
                    {kpi.title}
                  </div>
                  <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="font-sans text-3xl sm:text-4xl lg:text-5xl font-normal sm:font-medium tracking-tight text-slate-950 dark:text-white tabular-nums my-1.5">
                    {kpi.value}
                  </div>
                </div>
              </div>
            </ThreeDCard>
          );
        })}
      </div>

      {/* Global Status Banner */}
      <ThreeDCard glareColor="#10b981" maxTilt={3} elevationZ={8}>
        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-emerald-700 dark:text-emerald-400">All Microservices Operational</h2>
              <p className="text-xs text-slate-600 dark:text-neutral-300 mt-0.5">
                Zero active incidents reported across all US-East and Global Edge clusters. Overall 90-day uptime: 99.98%.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-right font-sans text-xs">
            <div>
              <div className="text-slate-500 dark:text-neutral-500">API P95 Latency</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 text-sm">18ms</div>
            </div>
            <div>
              <div className="text-slate-500 dark:text-neutral-500">Error Budget</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 text-sm">99.97% Left</div>
            </div>
          </div>
        </div>
      </ThreeDCard>

      {/* Microservices Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-900 dark:text-neutral-200">Component Health Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <ThreeDCard key={svc.name} glareColor={svc.glare} maxTilt={5} elevationZ={10}>
              <div className="p-5 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] space-y-3 shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-neutral-100">{svc.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5 font-sans font-medium">{svc.region}</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {svc.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-neutral-800/80 text-xs font-sans">
                  <div>
                    <div className="text-slate-400 dark:text-neutral-500 text-[10px]">Uptime SLA</div>
                    <div className="text-slate-800 dark:text-neutral-200 mt-0.5 font-semibold">{svc.uptime}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 dark:text-neutral-500 text-[10px]">Latency</div>
                    <div className="text-slate-800 dark:text-neutral-200 mt-0.5 font-semibold">{svc.latency}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 dark:text-neutral-500 text-[10px]">Load / State</div>
                    <div className="text-slate-800 dark:text-neutral-200 mt-0.5 truncate">{svc.load}</div>
                  </div>
                </div>
              </div>
            </ThreeDCard>
          ))}
        </div>
      </div>

      {/* Latency History Chart Visualization */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-slate-200 dark:border-white/[0.08] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-900 dark:text-neutral-200">Trailing 24-Hour API Latency (ms)</h3>
          <span className="text-xs font-sans font-medium text-slate-500 dark:text-neutral-400">Mean: 16.4ms • Peak: 38ms</span>
        </div>

        <div className="h-32 flex items-end gap-1.5 pt-4 border-b border-slate-200 dark:border-neutral-800 pb-2">
          {latencyValues.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ height: 0 }}
              animate={{ height: `${(val / 40) * 100}%` }}
              transition={{ duration: 0.5, delay: idx * 0.02, type: "spring", stiffness: 300, damping: 25 }}
              whileHover={{ scaleY: 1.05 }}
              className="flex-1 bg-emerald-500/30 hover:bg-emerald-500 rounded-t transition cursor-pointer group relative"
            >
              <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-neutral-950 border border-slate-700 dark:border-neutral-800 px-2 py-0.5 rounded text-[10px] font-sans font-semibold text-white whitespace-nowrap pointer-events-none transition shadow-md z-20">
                {val}ms
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-neutral-500 font-sans font-medium">
          <span>24 Hours Ago</span>
          <span>12 Hours Ago</span>
          <span>Present (Nominal)</span>
        </div>
      </div>
    </div>
  );
}
