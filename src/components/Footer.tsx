import { profile } from "../data/resume";

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/90">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
        <p>
          {profile.displayName}, {profile.location}.
        </p>
        <p>3D desk assets by Poly Haven, CC0.</p>
      </div>
    </footer>
  );
}
