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
              <div className="flex items-center space-x-2">
                <div className="capitalize font-semibold">coach:</div>
                <div className="uppercase">{dd.coach.base}</div>
                <div>{dd.coach.coach_number}</div>
                <div className="uppercase">{dd.coach.coach_type}</div>
                <div className="capitalize bg-slate-500 text-slate-200 rounded-md px-1 text-xs font-semibold">
                  {dd.damage_type}
                </div>
                <div>
                  <Link href={`/coach/${dd.coach.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 hover:text-blue-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
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
