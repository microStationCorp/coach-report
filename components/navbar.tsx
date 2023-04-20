import Link from "next/link";

export const Navbar = () => {
  return (
    <div
      className={
        "p-4 bg-gradient-to-l from-slate-400 to-slate-200 flex justify-between items-center"
      }
    >
      <div className="text-2xl">
        <Link href={"/"} className="hover:font-semibold">
          Coach-report
        </Link>
      </div>
      <div className="text-slate-100 flex space-x-2">
        <div className="capitalize">
          <Link href="/add_coach" passHref className="hover:font-semibold">
            add coach
          </Link>
        </div>
        <div className="capitalize">
          <Link href="/coach_list" passHref className="hover:font-semibold">
            coach list
          </Link>
        </div>
      </div>
    </div>
  );
};
