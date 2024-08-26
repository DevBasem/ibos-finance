import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Avatar() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("token");

      try {
        const response = await fetch("https://ibos-deploy.vercel.app/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUserData(result.user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="">
        <Image
          width={65}
          height={68}
          src={`/images/avatar.png`} // Assuming the profile image path
          alt="avatar"
        />
      </div>
      <div className="flex-1">
        <span className="text-lg font-[700] leading-5">
          {userData.fullName}
        </span>
        <p className="break-all text-lg font-[700] leading-6 text-zinc-500">
          {userData.email}
        </p>
      </div>
    </div>
  );
}
