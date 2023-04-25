import Head from "next/head";

export default function CoachPage({ id }: { id: string }) {
  return (
    <>
      <Head>
        <title>Cach</title>
      </Head>
      <div>coach page {id}</div>
    </>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  return {
    props: { id: params.id },
  };
}
