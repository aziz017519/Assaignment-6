import { Suspense } from "react";
import Hero from "@/components/Hero";
import Library from "@/components/Library";
import Loader from "@/components/Loader";

// প্রতিবার রিকোয়েস্টে স্ট্রিম হবে, তাই ডাটা আসা পর্যন্ত Loader দেখা যাবে
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-24">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">The Library</h2>
        <p className="mt-2 mb-8 text-sm text-muted">Twelve lifts covering every major muscle group.</p>

        {/* ডাটা আসা পর্যন্ত লোডিং অ্যানিমেশন দেখাবে */}
        <Suspense fallback={<Loader />}>
          <Library />
        </Suspense>
      </section>
    </>
  );
}
