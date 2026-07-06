export default function ChatUserSkeleton() {
  return (
    <div className="flex items-center gap-3 px-3 py-3 border-border border-b animate-pulse">
      <div className="bg-foreground rounded-full w-11 h-11" />

      <div className="flex-1">
        <div className="bg-foreground mb-2 rounded w-24 h-4" />
        <div className="bg-foreground rounded w-40 h-3" />
      </div>
    </div>
  );
}
