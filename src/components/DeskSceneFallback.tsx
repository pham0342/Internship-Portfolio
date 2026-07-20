export function DeskSceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
        Loading scene
      </span>
    </div>
  );
}
