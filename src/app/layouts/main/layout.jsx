import SideBar from "../../components/main/SideBar";
import withAuth from "../../utils/withAuth";

const MainLayout = ({ children }) => {
  return (
    <main className="bg-main-light-primary dark:bg-main-dark-primary flex h-screen w-full gap-4 p-4">
      {/** Side Bar Component */}
      <div className="bg-main-light-secondary dark:bg-main-dark-secondary dark:border-main-dark-secondary dark:text-white w-[305px] rounded-xl border border-stone-200 shadow-xl md:block hidden">
        <SideBar />
      </div>
      {/** Page Component */}
      <div className="flex-1 overflow-y-scroll rounded-xl border-zinc-800 px-2">
        {children}
      </div>
    </main>
  );
}

export default withAuth(MainLayout);