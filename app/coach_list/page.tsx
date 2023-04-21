import { ListComp } from "@/components/listcomp";
import { supabase } from "@/utils/supabaseClient";

const getCoachList = async () => {
  const { data, error } = await supabase.from("coach_list").select("*");
  if (!error) {
    return { success: true, msg: data };
  } else {
    return { success: false };
  }
};

export default async function CoachListPage() {
  const { success, msg } = await getCoachList();

  return (
    <div className="bg-gradient-to-b from-slate-400 to-slate-300 rounded-md p-2 w-5/6 sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto">
      <div className="text-xl text-center capitalize text-slate-700 underline underline-offset-4">
        coach list
      </div>
      {success ? <ListComp coaches={msg} /> : <div>Error occured</div>}
    </div>
  );
}

// const SingleItem = ({
//   d,
//   setCoaches,
// }: {
//   d: CoachListI;
//   setCoaches: Dispatch<SetStateAction<CoachListI[]>>;
// }) => {
//   const [isDeleting, setDeleting] = useState(false);

//   return (
//     <div
//       className="uppercase text-slate-700 flex justify-between items-center mx-2"
//       key={d.id}
//     >
//       <div className=" hover:bg-gradient-to-b from-slate-300 to-slate-400 hover:cursor-pointer hover:rounded-md hover:shadow-md p-2">
//         {d.base}-{d.coach_number}-{d.coach_type}
//       </div>
//       {isDeleting ? (
//         <div>
//           <svg
//             aria-hidden="true"
//             className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
//             viewBox="0 0 100 101"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//               fill="currentColor"
//             />
//             <path
//               d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//               fill="currentFill"
//             />
//           </svg>
//         </div>
//       ) : (
//         <div>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6 hover:text-blue-600 hover:cursor-pointer"
//             onClick={() => {
//               setDeleting(true);
//               delete_coach(d.id, setCoaches, setDeleting);
//             }}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//             />
//           </svg>
//         </div>
//       )}
//     </div>
//   );
// };

// const ListComp = ({
//   coaches,
//   setCoaches,
// }: {
//   coaches: CoachListI[];
//   setCoaches: Dispatch<SetStateAction<CoachListI[]>>;
// }) => {
//   return (
//     <>
//       {coaches == null || coaches.length == 0 ? (
//         <div>nothing to show</div>
//       ) : (
//         <div>
//           {coaches.map((d: CoachListI) => (
//             <SingleItem d={d} setCoaches={setCoaches} key={d.id} />
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// const delete_coach = (
//   coachId: string,
//   setCoaches: Dispatch<SetStateAction<CoachListI[]>>,
//   setDeleting: Dispatch<SetStateAction<boolean>>
// ) => {
//   fetch(checkEnvironment().concat(`/api/delete_coach/${coachId}`), {
//     method: "DELETE",
//   })
//     .then((res) => res.json())
//     .then(({ data }) => {
//       setDeleting(false);
//       mutate(`/api/delete_coach/${coachId}`, () =>
//         setCoaches((prev: CoachListI[]) =>
//           prev.filter((d) => d.id != data[0].id)
//         )
//       );
//     });
// };