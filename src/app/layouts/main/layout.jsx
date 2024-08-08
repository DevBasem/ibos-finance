import SideBar from "../../components/main/SideBar";

export default function MainLayout({ children }) {
  return (
    <main className="bg-main-light-primary flex h-screen w-full gap-4 p-4">
      {/** Side Bar Component */}
      <div className="bg-main-light-secondary w-[305px] rounded-xl border border-stone-200 shadow-xl">
        <SideBar />
      </div>
      {/** Page Component */}
      <div className="flex-1 overflow-y-scroll rounded-xl border-zinc-800 px-2">
        {children}
      </div>
    </main>
  );
}
