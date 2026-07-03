export default function Message() {
  return (
    <>
      <section className="flex flex-col flex-1 gap-3 bg-card/80 p-4 overflow-y-auto">
        {/* پیام خودمان */}
        <div className="relative self-start bg-background shadow-md px-4 py-2 rounded-2xl max-w-xs">
          <div
            className="top-1/2 -right-2 absolute bg-background w-3 h-3 -translate-y-1/2"
            style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
          />
          <p>سلام! چطور هستی؟</p>
          <div className="flex justify-end items-center gap-1 mt-1">
            <span className="text-xs">۱۰:۳۱</span>
            <span className="text-blue-800 text-xs">✓✓</span>
          </div>
        </div>

        {/* پیام دیگران */}
        <div className="relative self-end bg-message shadow-md px-4 py-2 rounded-2xl max-w-xs">
          <div
            className="top-1/2 -left-2 absolute bg-message w-3 h-3 rotate-180 -translate-y-1/2"
            style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
          />
          <p>سلام خوبم! تو چطوری؟</p>
          <div className="flex justify-end items-center gap-1 mt-1">
            <span className="text-xs">۱۰:۳۱</span>
          </div>
        </div>
      </section>
    </>
  );
}
