import { ListComp } from "@/components/listcomp";
import { supabase } from "@/utils/supabaseClient";
import { CoachDataI } from "@/utils/types";
import Head from "next/head";
import { useState } from "react";

export default function CoachListPage({ data }: { data: CoachDataI[] }) {
  const [coaches, setCoaches] = useState(data);

  return (
    <>
      <Head>
        <title>coach list</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-b from-slate-400 to-slate-300 rounded-md p-2 w-5/6 sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto">
        <div className="text-xl text-center capitalize text-slate-700 underline underline-offset-4">
          coach list
        </div>
        {coaches.length == 0 ? (
          <div className="text-center text-red-600 font-semibold">Nothing to show</div>
        ) : (
          <ListComp coaches={coaches} setCoaches={setCoaches} />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("coach_list")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    props: { data },
  };
}
