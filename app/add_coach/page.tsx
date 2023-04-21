"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { checkEnvironment } from "@/utils/checkBaseURL";
import { useState } from "react";

export default function AddCoach() {
  const [data, setData] = useState<{
    success: boolean;
    data: { base: string; coach_number: string; coach_type: string }[];
  }>();
  const [error, setError] = useState<{
    errorStat: boolean;
    errorMsg: string;
  }>();
  return (
    <div className="bg-gradient-to-r from-slate-300 to-slate-200 w-5/6 sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto p-2 rounded shadow">
      <div className="text-xl capitalize text-center">add coach</div>
      <Formik
        initialValues={{ coach_number: "", coach_type: "", base: "" }}
        validationSchema={yup.object().shape({
          coach_number: yup.number().required(),
          coach_type: yup.string().required(),
          base: yup.string().required(),
        })}
        onSubmit={async (values, { resetForm }) => {
          setData({ success: false, data: [] });
          setError({ errorStat: false, errorMsg: "" });
          const res = await fetch(checkEnvironment().concat("/api/add_coach"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ values }),
          });
          const d = await res.json();
          if (d.success) {
            setData(d);
            resetForm();
          }
          if (d.errorStat) {
            setError(d);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center mt-2">
            <div className="flex flex-col mb-4">
              <Field
                type="text"
                name="base"
                placeholder="base"
                className="mb-2 p-1 rounded bg-slate-100"
              />
              <Field
                type="text"
                name="coach_number"
                placeholder="coach number"
                className="mb-2 p-1 rounded bg-slate-100"
              />
              <Field
                type="text"
                name="coach_type"
                placeholder="coach type"
                className="mb-2 p-1 rounded bg-slate-100"
              />
              <button
                className="border border-slate-700 px-2 hover:bg-slate-700 rounded shadow hover:text-slate-100"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
            {data?.success ? (
              <div className="uppercase bg-green-300 text-green-800 p-1 rounded-md">
                submittted {data.data[0].base}-{data.data[0].coach_number}-
                {data.data[0].coach_type}
              </div>
            ) : null}
            {error?.errorStat ? (
              <div className="uppercase bg-red-300 text-red-800 p-1 rounded-md">
                {error.errorMsg}
              </div>
            ) : null}
            <div>
              <ErrorMsgComp name="base" />
              <ErrorMsgComp name="coach_number" />
              <ErrorMsgComp name="coach_type" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const ErrorMsgComp = ({ name }: { name: string }) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => <div className="text-sm text-red-600">*{msg}</div>}
    </ErrorMessage>
  );
};
