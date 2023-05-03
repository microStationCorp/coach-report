import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import Head from "next/head";
import { supabase } from "@/utils/supabaseClient";

export default function NewDamage({
  coaches,
}: {
  coaches: { id: string; coach_number: string }[];
}) {
  return (
    <>
      <Head>
        <title>New Damage</title>
      </Head>
      <div className="bg-gradient-to-r from-slate-300 to-slate-200 w-5/6 sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto p-2 rounded shadow">
        <div className="text-xl capitalize text-center">add new damage</div>
        <Formik
          initialValues={{
            rake: "",
            coach: "",
            description: "",
            damage_type: "PIT",
          }}
          validationSchema={yup.object().shape({
            rake: yup.number().required(),
            coach: yup.string().required(),
            description: yup.string().required(),
          })}
          onSubmit={async (values, { resetForm }) => {
            const res = await fetch("/api/new_damage", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ values }),
            });
            const d = await res.json();

            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center mt-2">
              <div className="flex flex-col mb-4">
                <Field
                  type="text"
                  name="rake"
                  placeholder="rake"
                  className="mb-2 p-1 rounded bg-slate-100"
                />
                <Field
                  as="select"
                  name="coach"
                  className="mb-2 p-1 rounded bg-slate-100"
                >
                  <option value="">Select coach</option>
                  {coaches.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.coach_number}
                    </option>
                  ))}
                </Field>
                <Field
                  as="select"
                  name="damage_type"
                  className="mb-2 p-1 rounded bg-slate-100"
                >
                  <option value="PIT">PIT</option>
                  <option value="ADVANCE">ADVANCE</option>
                </Field>
                <Field
                  component="textarea"
                  rows="4"
                  name="description"
                  className="mb-2 p-1 rounded bg-slate-100"
                />
                <button
                  className={`border capitalize border-slate-700 px-2 rounded shadow ${
                    isSubmitting
                      ? "bg-slate-700 text-slate-500"
                      : "bg-slate-500 hover:bg-slate-700 text-slate-100"
                  } `}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "wait..." : "submit"}
                </button>
              </div>
              <div>
                <ErrorMsgComp name="rake" />
                <ErrorMsgComp name="coach" />
                <ErrorMsgComp name="description" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

const ErrorMsgComp = ({ name }: { name: string }) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => <div className="text-sm text-red-600">*{msg}</div>}
    </ErrorMessage>
  );
};

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("coach_list")
    .select("id,coach_number");
  return {
    props: { coaches: data },
  };
}
