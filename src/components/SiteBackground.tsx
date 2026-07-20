import { Suspense, lazy } from "react";
import { ParticleFieldFallback } from "./ParticleFieldFallback";

const ParticleField = lazy(() =>
  import("./ParticleField").then((m) => ({ default: m.ParticleField }))
);

export function SiteBackground() {
  return (
    <div className="fixed inset-0 bg-zinc-950" aria-hidden>
      <Suspense fallback={<ParticleFieldFallback />}>
        <ParticleField />
      </Suspense>
    </div>
  );
}
