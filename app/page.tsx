'use client'

import {useEffect} from "react";
import {redirect} from "next/navigation";

export default function Home() {

    useEffect(() => {
        redirect('/receiving/qrGenerator');
    }, []);

  return (
    <>
      <p>Home Page</p>
    </>
  );
}
