import { supabase } from "@/utils/supabaseClient";
import { CoachDataI } from "@/utils/types";
import Head from "next/head";

export default function CoachPage({ data }: { data: CoachDataI }) {
  return (
    <>
      <Head>
        <title>
          Coach - {data.coach_number} ({data.coach_type})
        </title>
      </Head>
      <div className="bg-slate-300 rounded-md">
        <div className="p-4">
          <div>
            <CustomItem label="base" data={data.base} />
          </div>
          <div>
            <CustomItem label="rake type" data={data.rake_type} />
          </div>
          <div>
            <CustomItem label="coach number" data={data.coach_number} />
          </div>
          <div>
            <CustomItem label="coach type" data={data.coach_type} />
          </div>
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
    return {
      props: { data: data[0] },
    };
  } else {
    return {
      data: {},
    };
  }
}

const CustomItem = ({
  label,
  data,
}: {
  label: string;
  data: string | null;
}) => {
  return (
    <>
      <span>{label}</span>:{" "}
      {data ? (
        <span>{data}</span>
      ) : (
        <span className="text-red-500 font-semibold">Not provided</span>
      )}
    </>
  );
};
