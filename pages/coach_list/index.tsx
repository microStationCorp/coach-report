import { ListComp } from "@/components/listcomp";
import { supabase } from "@/utils/supabaseClient";
import { CoachDataI } from "@/utils/types";

export default function CoachListPage({ data }: { data: CoachDataI[] }) {
  return (
    <div className="bg-gradient-to-b from-slate-400 to-slate-300 rounded-md p-2 w-5/6 sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto">
      <div className="text-xl text-center capitalize text-slate-700 underline underline-offset-4">
        coach list
      </div>
      <ListComp coaches={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("coach_list").select("*");

  return {
    props: { data },
  };
}
