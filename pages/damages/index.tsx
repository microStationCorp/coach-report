import Head from "next/head";

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

export default function Damages() {
  return (
    <>
      <Head>
        <title>Damages Page</title>
      </Head>
      <div className="p-4 bg-slate-300 rounded-md">
        {data.map((d) => (
          <div key={d.id}>
            <div className="p-2">
              <div>
                <span className="capitalize font-semibold">date:</span>
                <span>{d.date}</span>
              </div>
              <div>
                <span className="capitalize font-semibold">rake:</span>
                <span>{d.rake}</span>
              </div>
              <div>
                <span className="capitalize font-semibold">coach:</span>
                <span className="uppercase">{d.base}</span>-
                <span>{d.coach_number}</span>-
                <span className="uppercase">{d.coach_type}</span>-
                <span className="capitalize text-slate-500 text-xs font-semibold">
                  {d.damage_type}
                </span>
              </div>
              <div>
                <span className="capitalize font-semibold">description:</span>
                <span className="capitalize">{d.description}</span>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
