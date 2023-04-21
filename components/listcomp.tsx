"use client";

import { CoachListI } from "@/utils/types";
import { SingleItem } from "./singleitem";

export const ListComp = ({ coaches }: { coaches: CoachListI[] }) => {
  return (
    <>
      {coaches == null || coaches.length == 0 ? (
        <div>nothing to show</div>
      ) : (
        <div>
          {coaches.map((d: CoachListI) => (
            <SingleItem d={d} key={d.id} />
          ))}
        </div>
      )}
    </>
  );
};
