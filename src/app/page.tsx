"use client";

import React from "react";
import useSWR from "swr";

import { columns } from "../components/Columns";
import { QuestionTable } from "../components/QuestionTable";

import { fetcher } from "@/lib/utils";

export type Question = {
  _id: String;
  number: Number;
  title: String;
  difficulty: String;
  type: String;
  field: [String];
  prompt: String;
};

export function getQuestions() {
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_API_URL + "/questions",
    fetcher
  );
  return {
    questions: data,
    error: error,
    isLoading,
  };
}

export default function Home() {
  const { questions, error, isLoading } = getQuestions();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <main className="w-[1300px] mx-auto my-20">
      <div className="my-32">
        <h1 className="text-8xl font-bold text-center">
          Ace your tech interviews.
        </h1>
        <p className="text-3xl text-center text-slate-500 mt-6 mx-auto w-6/12">
          Practice common questions and be ready for your next big opportunity.
        </p>
      </div>
      <div className="flex items-end">
        <h1 className="font-bold text-2xl mr-4 leading-none">Question List</h1>
        <p className="text-xs text-slate-500">
          <span className="font-bold text-sm">12</span> of 300 completed
        </p>
      </div>
      <QuestionTable columns={columns} data={questions ? questions : []} />
    </main>
  );
}
