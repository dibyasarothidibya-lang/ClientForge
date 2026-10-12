"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [["Services", "/#services"], ["Selected Work", "/#selected-work"], ["About", "/#about"], ["Contact", "/#contact"]];
export default function PortfolioNav() {
  const [open,setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  return <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-black focus:p-3">Skip to content</a>
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-xl border-b border-slate-200/70 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[72px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Dibya Sarothi Simanta, home"><Image src="/logo.jpg" alt="" width={34} height={34} className="rounded-lg"/><div><span className="font-victorian text-xl sm:text-2xl">Client Forge</span><span className="block text-[9px] tracking-[.12em] uppercase text-slate-500 dark:text-zinc-400">Dibya · Independent engineering</span></div></Link>
        <nav aria-label="Portfolio navigation" className="hidden lg:flex gap-6 text-xs font-medium">{links.map(([name,href])=><Link key={name} href={href} className="hover:text-indigo-500">{name}</Link>)}<Link href="/workspace" className="text-slate-500 dark:text-zinc-400">Product demo ↗</Link></nav>
        <div className="flex items-center gap-3"><ThemeToggle compact/><a href="mailto:dibyasarothidibya@gmail.com" className="hidden sm:inline-flex items-center gap-2 text-xs rounded-full py-2.5 px-4 bg-slate-900 text-white dark:bg-white dark:text-zinc-900">Discuss a Project<ArrowUpRight size={13}/></a><button ref={toggleRef} aria-expanded={open} aria-controls="portfolio-mobile-menu" aria-label={open?"Close navigation":"Open navigation"} onClick={()=>setOpen(!open)} className="lg:hidden p-2">{open?<X size={20}/>:<Menu size={20}/>}</button></div>
      </div>
      {open&&<nav id="portfolio-mobile-menu" aria-label="Mobile portfolio navigation" className="lg:hidden p-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-5 text-sm" onKeyDown={e=>{if(e.key==="Escape"){setOpen(false);toggleRef.current?.focus();}}}>{[...links,["Product demo","/workspace"]].map(([name,href])=><Link key={name} href={href} onClick={()=>setOpen(false)}>{name}</Link>)}<a href="mailto:dibyasarothidibya@gmail.com">Discuss a Project ↗</a></nav>}
    </header>
  </>;
}
