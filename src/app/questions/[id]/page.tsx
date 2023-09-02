"use client";

import React, { useState } from "react";

import { notFound } from "next/navigation";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Question, getQuestions } from "@/app/page";
import { diffVariants } from "@/lib/utils";

import Tag from "@/components/Tag";

export default function QuestionPage({ params }: { params: { id: string } }) {
  const [answer, setAnswer] = useState("");
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState("");

  function handleAnswerChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target ? e.target.value : "");
  }
  function handleSetStep(s: number) {
    setStep(s);
  }

  async function getFeedback(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!q) {
      throw new Error(`Prompt is undefined`);
    }
    let prompt = `Please give feedback on the following interview question: "${q.prompt}" given the following transcript: "${answer}"`;

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setFeedback(data.res.content);
    } catch (error) {
      console.error(error);
    }
  }

  const { questions, error, isLoading } = getQuestions();

  const q = questions
    ? questions.find((q: Question) => q._id === params.id)
    : null;

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  if (!q) {
    return notFound();
  }

  return (
    <>
      <div className="">
        <Link
          href="/"
          className={`block m-auto text-slate-500 hover:text-slate-800 ${
            step == 1 ? "w-6/12" : "w-full"
          }`}
        >
          ← Back to Question List
        </Link>
        <div className="flex justify-center mt-4 gap-x-5">
          <div className="w-6/12">
            <Card>
              <CardHeader>
                <div className="flex space-x-6">
                  <p className="text-slate-500">#{String(q.number)}</p>
                  <p
                    className={`${
                      diffVariants[q.difficulty as keyof typeof diffVariants]
                    }`}
                  >
                    {q.difficulty}
                  </p>
                  <p className="text-slate-500">{q.type}</p>
                  <div className="">
                    {q.field.map((f) => {
                      return <Tag text={String(f)} />;
                    })}
                  </div>
                </div>
                <CardTitle className="mt-4">{q.prompt}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {step == 1 && (
                  <form className="flex flex-col items-center w-full">
                    <Textarea
                      name="answer"
                      id="answer"
                      value={answer}
                      onChange={handleAnswerChange}
                      placeholder="Type your response here."
                      rows={10}
                    />
                    <Button
                      type="submit"
                      onClick={(e) => {
                        handleSetStep(2);
                        getFeedback(e);
                      }}
                      size="lg"
                      className="mt-6"
                    >
                      Submit
                    </Button>
                  </form>
                )}
                {step == 2 && (
                  <Button onClick={() => handleSetStep(1)} size="lg">
                    Answer Again
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {step === 2 && (
            <div className="w-6/12">
              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-medium">Your Response</h3>
                  <p>{answer}</p>
                  <h3 className="text-2xl font-medium">Feedback</h3>
                  {feedback ? (
                    <p>{feedback}</p>
                  ) : (
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-5 w-9/12" />
                    </div>
                  )}
                </CardHeader>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
