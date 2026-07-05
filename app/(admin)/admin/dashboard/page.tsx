"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CardContents from "./components/Cardcontent";
import Chartsfirst from "./components/Charts";
import ChartsSeconds from "./components/ChartsSecond";
import LoadingSpinner from "./components/Loadingspinner";

const Admin = () => {
  const router = useRouter();
  const[loading,setLoading]=useState(true);
  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        credentials: "include",
      });

      const data = await res.json();
      //console.log(data);

  
      if (!data.success) {
        router.push("/");
        return;
      }


      if (data.user.role == "user") {
        router.replace("/");
        return;
      }
      
    setLoading(false);
    };
    checkUser();
  }, [router]);

       if (loading) {
         return <LoadingSpinner />;
       }

  return (
    <div>
      <CardContents />
      <Chartsfirst />
      <ChartsSeconds />
    </div>
  );
};
export default Admin;
