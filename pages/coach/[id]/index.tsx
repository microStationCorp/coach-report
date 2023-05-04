import { supabase } from "@/utils/supabaseClient";
import { CoachDataI, DamageCoachI, LHBTable, SGTable } from "@/utils/types";
import Head from "next/head";
import { CustomItem } from "@/components/customItem";

export default function CoachPage({
  data,
  equipment_table,
  damage_list,
}: {
  data: CoachDataI;
  equipment_table: SGTable | LHBTable;
  damage_list: DamageCoachI[];
}) {
  return (
    <>
      <Head>
        <title>Coach</title>
      </Head>
      <div className="bg-slate-300 rounded-md p-2">
        <div className="sm:pl-4 pb-4">
          <div className="text-2xl underline">Coach Details :</div>
          <div className="pl-2 space-y-1">
            {Object.entries(data)
              .filter(([k, v]) => k != "id" && k != "created_at")
              .map(([k, v], i) => (
                <div key={i}>
                  <CustomItem id={data.id} label={k} data={v} code={k} />
                </div>
              ))}
          </div>
        </div>
        {/* coach equipment */}
        <div className="sm:pl-4 pb-4">
          <div className="text-2xl underline">Coach Equipments :</div>
          <div className="pl-2 space-y-1">
            {Object.entries(equipment_table)
              .filter(
                ([k, v]) => k != "id" && k != "created_at" && k != "coach"
              )
              .map(([k, v], i) => (
                <div key={i}>
                  <CustomItem
                    id={equipment_table.id}
                    label={k}
                    data={v}
                    code={k}
                    rake_code={data.rake_type!}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="sm:pl-4 pb-4">
          <div className="text-2xl underline">Damages :</div>
          <div className=" text-cyan-800">Total no. of damages : {damage_list.length}</div>
          {damage_list.map((dl) => (
            <div key={dl.id}>
              <div className="p-2">
                <div>
                  <span className="capitalize font-semibold">date :</span>
                  <span>
                    {new Date(dl.created_at!).toLocaleString("en-GB")}
                  </span>
                </div>
                <div>
                  <span className="capitalize font-semibold">rake:</span>
                  <span>{dl.rake}</span>
                </div>
                <div>
                  <span className="capitalize font-semibold">
                    damage type :
                  </span>
                  <span className="capitalize text-slate-500 font-semibold">
                    {dl.damage_type}
                  </span>
                </div>
                <div>
                  <span className="capitalize font-semibold">description:</span>
                  <span className="capitalize">{dl.description}</span>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const { data, error } = await supabase
    .from("coach_list")
    .select("*")
    .eq("id", params.id);

  if (data) {
    const { data: damage_list, error } = await supabase
      .from("damage_data")
      .select("id , created_at, rake , description, damage_type")
      .eq("coach", params.id)
      .order("created_at", { ascending: false });

    if (data[0].rake_type?.toUpperCase() === "SG") {
      const { data: eq_table, error } = await supabase
        .from("sg_coach_table")
        .select("*")
        .eq("coach", params.id);
      return {
        props: { data: data[0], equipment_table: eq_table![0], damage_list },
      };
    } else {
      const { data: eq_table, error } = await supabase
        .from("lhb_coach_table")
        .select("*")
        .eq("coach", params.id);
      return {
        props: { data: data[0], equipment_table: eq_table![0], damage_list },
      };
    }
  } else {
    return {
      data: {},
    };
  }
}
