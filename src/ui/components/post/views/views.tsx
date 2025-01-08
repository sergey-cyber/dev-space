"use client";

import { Eye } from "lucide-react";

interface Props {
  views?: number;
}

export function Views({ views }: Props) {
  if (!views) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Eye />
      <span>{views}</span>
    </div>
  );
}
