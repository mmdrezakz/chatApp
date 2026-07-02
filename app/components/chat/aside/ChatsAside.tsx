export default function ChatsAside() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="hover:bg-card p-4 border-border border-b cursor-pointer">
        <p className="font-semibold">علی</p>
        <p className="text-gray-500 text-sm">سلام خوبی؟</p>
      </div>

      <div className="hover:bg-card p-4 border-border border-b cursor-pointer">
        <p className="font-semibold">محمد</p>
        <p className="text-gray-500 text-sm">پروژه چت رو ساختی؟</p>
      </div>
    </div>
  );
}
