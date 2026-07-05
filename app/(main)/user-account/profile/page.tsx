"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

import { useAuth } from "../../context/authContext";
import { toast } from "sonner";

type User = {
  id: number;
  name: string;
  email: string;
};

export const Profile=()=> {
  const { user, setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router=useRouter();


 useEffect(() => {
  if (user) {
    setName(user.name);
    setEmail(user.email);
  }
}, [user]);

//handlesave. changing the value.
const handleSave = async () => {
  const res = await fetch("http://localhost:5000/api/auth/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      email,
    }),
  });

  const data = await res.json();
  console.log(data);

  if (data.success) {
    setUser(data.user); // update UI instantly
    toast.success(data.message);
  }
};
 // if (!user) return <p>Loading...</p>;

  return (
   <div>
  {/* Form Section */}
  <form
    onSubmit={handleSave}
    className="w-full max-w-lg mx-auto shadow p-6 rounded-lg space-y-4 border"
  >
    <h1 className="text-2xl font-semibold">Edit Your Profile</h1>

    <div className="flex flex-col gap-2">
      <Label>Full Name</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
    </div>

    <div className="flex flex-col gap-2">
      <Label>Email</Label>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>

    <div className="flex flex-col gap-2">
      <Label>Password Changes</Label>
      <Input type="password" placeholder="Current Password" />
      <Input type="password" placeholder="New Password" />
      <Input type="password" placeholder="Confirm New Password" />
    </div>

    <Button variant="mycolor" className="w-full md:w-auto">
      Save changes
    </Button>
  </form>

</div>
  );
}
export default Profile;