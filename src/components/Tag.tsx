import React from "react";

interface TagProps {
  text: string;
}

export default function Tag({ text }: TagProps) {
  const colorVariants = {
    General: "bg-slate-100 text-slate-800",
    SWE: "bg-violet-100 text-violet-900",
    UX: "bg-cyan-100 text-cyan-900",
  };
  return (
    <div
      key={text}
      className={`${
        colorVariants[text as keyof typeof colorVariants]
      } inline-block rounded-full py-1 px-3 mr-2`}
    >
      <p
        className={`${
          colorVariants[text as keyof typeof colorVariants]
        } text-xs`}
      >
        {text}
      </p>
    </div>
  );
}
