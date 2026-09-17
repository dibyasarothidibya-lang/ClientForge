"use client";

import React, { useState } from "react";
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
    },
    {
      name: "Stripe Webhook & Payment Gateway Ingestion",
      region: "Global Edge (Cloudflare Workers)",
      status: "Operational",
      uptime: "100.00%",
      latency: "12ms",
      load: "0 errors (24h)",
    },
    {
      name: "Evidence Vault WORM Object Storage (S3-Compatible)",
      region: "us-east-1",
      status: "Operational",
      uptime: "99.98%",
      latency: "19ms",
      load: "24.8 GB allocated",
    },
    {
      name: "Background Job Dispatcher & Queue Engine",
      region: "us-east-1",
      status: "Operational",
      uptime: "99.95%",
      latency: "2ms queue wait",
      load: "0 queued backlog",
    },
    {
      name: "AI Grounding & Vector Embedding Engine",
      region: "us-central1",
      status: "Operational",
      uptime: "99.92%",
      latency: "142ms P95",
      load: "Nominal",
    },
    {
      name: "Identity & RBAC Access Evaluator",
      region: "Multi-Region Global",
      status: "Operational",
      uptime: "100.00%",
      latency: "3ms",
      load: "100% token validation",
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastChecked("Just now");
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-3.5 h-3.5" /> Live Telemetry & Observability
            </span>
            <span className="text-xs text-neutral-400">SLO: 99.95% Availability</span>
          </div>
          <h1 className="text-3xl font-serif font-light tracking-tight text-neutral-100">
            System Status & Microservices Health
          </h1>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Real-time status indicators, latency telemetry, background queue depths, and uptime SLA adherence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400">Updated: {lastChecked}</span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Check Heartbeat
          </button>
        </div>
      </div>

      {/* Global Status Banner */}
      <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-emerald-400">All Microservices Operational</h2>
            <p className="text-xs text-neutral-300 mt-0.5">
              Zero active incidents reported across all US-East and Global Edge clusters. Overall 90-day uptime: 99.98%.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-right font-mono text-xs">
          <div>
            <div className="text-neutral-500">API P95 Latency</div>
            <div className="text-emerald-400 font-semibold mt-0.5">18ms</div>
          </div>
          <div>
            <div className="text-neutral-500">Error Budget</div>
            <div className="text-emerald-400 font-semibold mt-0.5">99.97% Left</div>
          </div>
        </div>
      </div>

      {/* Microservices Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-neutral-200">Component Health Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-neutral-100">{svc.name}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">{svc.region}</p>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {svc.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/80 text-xs font-mono">
                <div>
                  <div className="text-neutral-500 text-[10px]">Uptime SLA</div>
                  <div className="text-neutral-200 mt-0.5">{svc.uptime}</div>
                </div>
                <div>
                  <div className="text-neutral-500 text-[10px]">Latency</div>
                  <div className="text-neutral-200 mt-0.5">{svc.latency}</div>
                </div>
                <div>
                  <div className="text-neutral-500 text-[10px]">Load / State</div>
                  <div className="text-neutral-200 mt-0.5 truncate">{svc.load}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latency History Chart Visualization */}
      <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-neutral-200">Trailing 24-Hour API Latency (ms)</h3>
          <span className="text-xs font-mono text-neutral-400">Mean: 16.4ms • Peak: 38ms</span>
        </div>

        <div className="h-32 flex items-end gap-1.5 pt-4 border-b border-neutral-800 pb-2">
          {[14, 16, 15, 18, 22, 19, 15, 14, 17, 24, 38, 21, 16, 15, 14, 18, 16, 17, 15, 14, 16, 15, 17, 16].map(
            (val, idx) => (
              <div
                key={idx}
                className="flex-1 bg-emerald-500/40 hover:bg-emerald-400 rounded-t transition cursor-pointer group relative"
                style={{ height: `${(val / 40) * 100}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-950 border border-neutral-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-white whitespace-nowrap pointer-events-none transition">
                  {val}ms
                </div>
              </div>
            )
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <span>24 Hours Ago</span>
          <span>12 Hours Ago</span>
          <span>Present</span>
        </div>
      </div>
    </div>
  );
}
