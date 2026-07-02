"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  // pre-defined component using nextjs, like page.js but for errors

  useEffect(() => {
    console.error(error); // printing the error that occured
  }, [error]);

  return (
    <div>
      <h2>Something went wrong loading the blog posts.</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
