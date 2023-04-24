import { CoachDataI } from "@/utils/types";
import { SingleItem } from "./singleitem";
import { Dispatch, SetStateAction } from "react";

export const ListComp = ({
  coaches,
  setCoaches,
}: {
  coaches: CoachDataI[];
  setCoaches: Dispatch<SetStateAction<CoachDataI[]>>;
}) => {
  return (
    <>
      {coaches == null || coaches.length == 0 ? (
        <div>nothing to show</div>
      ) : (
        <div>
          {coaches.map((d: CoachDataI) => (
            <SingleItem d={d} key={d.id} setCoaches={setCoaches} />
          ))}
        </div>
      )}
    </>
  );
};
