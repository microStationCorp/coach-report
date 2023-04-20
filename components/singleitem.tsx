"use client";

import { CoachListI } from "@/utils/types";

export const SingleItem = ({ d }: { d: CoachListI }) => {
  return (
    <div>
      <div>
        {d.base}-{d.coach_number}-{d.coach_type}
      </div>
    </div>
  );
};
