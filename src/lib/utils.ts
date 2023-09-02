import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TupleType } from "typescript";
import { Question } from "@/app/page";

export const diffVariants = {
  Easy: "text-green-600",
  Medium: "text-yellow-600",
  Hard: "text-red-700",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fetcher(
  ...args: Parameters<typeof fetch>
): Promise<Question[]> {
  console.log("Fetch", args[0]);
  return fetch(...args).then((res) => res.json());
}
