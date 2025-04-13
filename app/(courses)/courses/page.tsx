"use client";

import { useEffect, useState } from "react";
import { safeAuthRequest } from "@/app/lib/axiosInstance";

export default function Courses() {
  const [res, setRes] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await safeAuthRequest({ url: "/users/me" });
        setRes(res);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchData();
  }, []);

  return <div>{JSON.stringify(res)}</div>;
}
