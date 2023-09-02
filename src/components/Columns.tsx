"use client";

import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import { Question } from "../app/page";
import Tag from "@/components/Tag";
import CircleCheck from "@/../public/circle_check.svg";

import { diffVariants } from "@/lib/utils";

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "completed",
    header: "",
    cell: () => <img src={CircleCheck.src} />,
  },
  {
    accessorKey: "number",
    header: "#",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title: String = row.getValue("title");
      return <Link href={"/questions/" + row.original._id}>{title}</Link>;
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ cell }) => {
      const diff = cell.getValue() as string;
      return (
        <p className={`${diffVariants[diff as keyof typeof diffVariants]}`}>
          {diff}
        </p>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "field",
    header: "Field",
    cell: ({ cell }) => {
      const fields = cell.getValue() as string[];
      return fields.map((f) => {
        return <Tag key={f} text={f} />;
      });
    },
  },
];
