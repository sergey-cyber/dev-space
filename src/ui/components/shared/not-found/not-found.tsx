import { Frown } from "lucide-react";

interface Props {
  message: string;
}

export function NotFound({ message }: Props) {
  return (
    <div
      className="w-full flex justify-center flex-col items-center gap-y-4"
      data-test="not-found"
    >
      <Frown />
      <div>{message}</div>
    </div>
  );
}
