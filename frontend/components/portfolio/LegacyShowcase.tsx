import CoreModulesTabs from "@/components/CoreModulesTabs";
import Hero from "@/components/Hero";
import HRCardDeck from "@/components/HRCardDeck";
import BentoGrid from "@/components/BentoGrid";
import RoiCalculator from "@/components/RoiCalculator";
import Metrics from "@/components/Metrics";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ThreeDSection from "@/components/motion/ThreeDSection";

// Preserve the existing demonstrations and their anchor URLs in a deeper inspection layer.
export default function LegacyShowcase() {
  return <><aside className="mx-5 my-5 p-4 border-l-2 border-indigo-400 text-sm leading-relaxed text-slate-600 dark:text-zinc-300"><strong>Demonstration context.</strong> Company names, candidate signals, business figures, and projections in this inspection layer are illustrative. The calculator models assumptions rather than customer revenue. Repository test counts and architectural explanations are separate implementation evidence.</aside><Hero includeProfile={false}/><ThreeDSection depthIntensity={.65}><CoreModulesTabs/></ThreeDSection><ThreeDSection depthIntensity={.6}><HRCardDeck/></ThreeDSection><ThreeDSection depthIntensity={.7}><BentoGrid/></ThreeDSection><ThreeDSection depthIntensity={.6}><RoiCalculator/></ThreeDSection><ThreeDSection depthIntensity={.75}><Metrics/></ThreeDSection><ThreeDSection depthIntensity={.7}><Testimonials/></ThreeDSection><ThreeDSection depthIntensity={.6}><Faq/></ThreeDSection></>;
}
