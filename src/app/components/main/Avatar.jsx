import Image from "next/image";
import React from "react";

export default function Avatar() {
  return (
    <div className="flex items-center gap-4">
      <div className="">
        <Image width={65} height={68} src="/images/avatar.png" />
      </div>
      <div className="flex-1">
        <span className="text-lg font-[700] leading-5">Basem</span>
        <p className="break-all text-lg font-[700] leading-6 text-zinc-500">
          engr.basemahmed@gmail.com
        </p>
      </div>
    </div>
  );
}
