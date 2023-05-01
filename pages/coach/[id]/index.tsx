import { supabase } from "@/utils/supabaseClient";
import { CoachDataI } from "@/utils/types";
import Head from "next/head";
import { useState } from "react";
import { Pen } from "@/components/pen";
import Router from "next/router";

export default function CoachPage({ data }: { data: CoachDataI }) {
  return (
    <>
      <Head>
        <title>Coach</title>
      </Head>
      <div className="bg-slate-300 rounded-md">
        <div className="p-4 space-y-1">
          {Object.entries(data)
            .filter(([k, v]) => k != "id" && k !== "created_at")
            .map(([k, v], i) => (
              <div key={i}>
                <CustomItem id={data.id} label={k} data={v} code={k} />
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
  code,
  id,
}: {
  id: string;
  label: string;
  data: string | null;
  code: string;
}) => {
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [val, setValue] = useState(data);
  const [error, setError] = useState(false);

  const UpdateHandler = async (
    data: string | null,
    id: string,
    code: string
  ) => {
    if (code == "rake_type" && data !== "sg" && data !== "lhb") {
      setError(true);
      alert("wrong values");
    } else {
      setIsLoading(true);
      fetch("/api/update_coach_data", {
        method: "POST",
        body: JSON.stringify({ data, id, code }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Router.reload();
        });
    }
  };

  return (
    <div className="flex items-center text-lg capitalize space-x-2">
      <span className="text-sm sm:text-base">{label} :</span>
      {clicked ? (
        <>
          <div>
            <div className="flex sm:space-x-2 flex-col sm:flex-row">
              <div>
                <input
                  type="text"
                  placeholder={`Enter ${label}`}
                  value={val || ""}
                  className={`rounded-md px-2 text-base sm:text-lg ${
                    error && "border border-red-500"
                  }`}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  className={`capitalize text-sm sm:text-base bg-slate-800 ${
                    isLoading ? "text-slate-400" : "text-slate-200"
                  } px-3 rounded-md py-1`}
                  disabled={isLoading}
                  onClick={() => {
                    UpdateHandler(val, id, code);
                  }}
                >
                  {isLoading ? "wait..." : "submit"}
                </button>
                {!isLoading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:cursor-pointer inline"
                    onClick={() => setClicked(false)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {data ? (
            <span className="font-semibold uppercase text-sm sm:text-base">
              {data}
            </span>
          ) : (
            <span className="text-red-500 font-semibold text-sm sm:text-base">
              Not provided
            </span>
          )}
          <Pen setClicked={setClicked} />
        </>
      )}
    </div>
  );
};
