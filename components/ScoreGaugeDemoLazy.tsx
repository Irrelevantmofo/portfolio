"use client";

import dynamic from "next/dynamic";

// Motion lives only in this demo; load it after hydration, off the critical path.
const ScoreGaugeDemo = dynamic(() => import("./ScoreGaugeDemo"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[19rem] place-items-center rounded-2xl border border-line bg-surface font-mono text-xs text-subtle sm:h-[17rem]">
      loading demo…
    </div>
  ),
});

export default ScoreGaugeDemo;
