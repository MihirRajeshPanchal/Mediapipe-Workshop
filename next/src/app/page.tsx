"use client";

import dynamic from "next/dynamic";
import Head from 'next/head';

const FaceLandmarkCanvas = dynamic(
  () => {
    return import("../components/FaceLandmarkCanvas");
  },
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
        <FaceLandmarkCanvas />
    </div>
  );
}
