"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
const publicDemoPaths = ["/peoplecore", "/product", "/features", "/integrations", "/talent-intelligence", "/people-operations", "/global-mobility", "/pricing"];
export default function DemoNotice(){
  const path = usePathname();
  const campaignDemo = path.startsWith("/campaigns/") || path === "/support-peoplecore";
  if(!publicDemoPaths.includes(path) && !campaignDemo) return null;
  return <aside aria-label="Product demonstration context" className="relative z-20 mt-[72px] px-5 py-3 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#14141a] text-slate-700 dark:text-zinc-300 text-xs leading-relaxed text-center">
    <strong>ClientForge product demonstration.</strong> {campaignDemo ? "Campaigns, contributions, receipts, and charitable/tax status are example scenarios. No verified charitable registration or tax deduction is established by this demonstration." : "Example organisations, metrics, plan prices, integration previews, and operational scenarios illustrate the application. They are not customer results, certifications, or freelance service quotes."} <Link href="/case-studies/clientforge" className="underline underline-offset-4">Read the engineering case study</Link> · <Link href="/contact" className="underline underline-offset-4">Discuss custom engineering</Link>
  </aside>;
}
