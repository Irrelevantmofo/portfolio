import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { SITE_URL } from "@/data/site";

// /projects/ is linked from OnlineJobs.ph and elsewhere: static redirect to /work/.
export const metadata: Metadata = {
  title: "Moved to /work",
  alternates: { canonical: `${SITE_URL}/work/` },
  robots: { index: false, follow: true },
};

export default function ProjectsRedirect() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      {/* React 19 hoists <meta> into <head>; works with no JS on a static host. */}
      <meta httpEquiv="refresh" content={`0; url=${asset("/work/")}`} />
      <h1 className="text-2xl font-semibold text-fg">Projects have moved.</h1>
      <p className="mt-3 text-muted">
        Redirecting to{" "}
        <Link href="/work/" className="text-accent underline underline-offset-4">
          all work
        </Link>
        …
      </p>
    </div>
  );
}
