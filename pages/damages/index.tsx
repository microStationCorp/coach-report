import { supabase } from "@/utils/supabaseClient";
import { DamageCoachI } from "@/utils/types";
import Head from "next/head";
import Link from "next/link";

const data = [
  {
    id: "1",
    date: "27th jan, 2023",
    rake: "13152",
    coach_type: "lwaccn",
    coach_number: "212834",
    base: "er",
    damage_type: "advance",
    description: "blower 1.1 defective",
  },
  {
    id: "2",
    date: "28th jan, 2023",
    rake: "13160",
    coach_type: "lwaccn",
    coach_number: "212834",
    base: "er",
    damage_type: "advance",
    description: "blower 1.1 defective",
  },
];

export default function Damages({
  damage_data,
}: {
  damage_data: DamageCoachI[];
}) {
  return (
    <>
      <Head>
        <title>Damages Page</title>
      </Head>
      <div className="text-center">
        <Link href="/damages/new_damage">
          <button className="bg-slate-600 hover:bg-slate-700 text-slate-200 rounded-md shadow-md px-2 py-1">
            New Damage
          </button>
        </Link>
      </div>
      <div className="p-4 bg-slate-300 rounded-md mt-2">
        <div className="text-xl font-semibold underline">Damage list :</div>
        {damage_data.map((dd) => (
          <div key={dd.id}>
            <div className="p-2">
              <div>
                <span className="capitalize font-semibold">date:</span>
                <span>{new Date(dd.created_at!).toLocaleString("en-GB")}</span>
              </div>
              <div>
                <span className="capitalize font-semibold">rake:</span>
                <span>{dd.rake}</span>
              </div>
              <div>
                <span className="capitalize font-semibold">coach:</span>
                <span className="uppercase">{dd.coach.base}</span>-
                <span>{dd.coach.coach_number}</span>-
                <span className="uppercase">{dd.coach.coach_type}</span>-
                <span className="capitalize text-slate-500 text-xs font-semibold">
                  {dd.damage_type}
                </span>
              </div>
              <div>
                <span className="capitalize font-semibold">description:</span>
                <span className="capitalize">{dd.description}</span>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let { data: damage_data, error } = await supabase
    .from("damage_data")
    .select(
      `id , created_at , rake , description , damage_type, coach( coach_number , base, coach_type, id)`
    )
    .order("created_at", { ascending: false });

  return {
    props: { damage_data },
  };
}
