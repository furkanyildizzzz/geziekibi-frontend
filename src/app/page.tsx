"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { tr } from "date-fns/locale/tr";

export default function Home() {
  setDefaultLocale("tr");
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/default");
  }, [router]);

  return <></>;
}
