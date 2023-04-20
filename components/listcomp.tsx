import { CoachDataI } from "@/utils/types";
import { SingleItem } from "./singleitem";

export const ListComp = ({ coaches }: { coaches: CoachDataI[] }) => {
  return (
    <>
      {coaches == null || coaches.length == 0 ? (
        <div>nothing to show</div>
      ) : (
        <div>
          {coaches.map((d: CoachDataI) => (
            <SingleItem d={d} key={d.id} />
          ))}
        </div>
      )}
    </>
  );
};
