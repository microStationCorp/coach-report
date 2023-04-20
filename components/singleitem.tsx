"use client";

import { CoachDataI } from "@/utils/types";

export const SingleItem = ({ d }: { d: CoachDataI }) => {
  return (
    <div>
      <div>
        {d.base}-{d.coach_number}-{d.coach_type}
      </div>
    </div>
  );
};
