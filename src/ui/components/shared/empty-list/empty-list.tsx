import { PackageOpen } from "lucide-react";

interface Props {
  message?: string;
  size?: number;
}

export function EmptyList({ message = "Пока ничего нет", size = 12 }: Props) {
  return (
    <div
      className="w-full flex justify-center flex-col items-center gap-y-4"
      data-test="empty-list"
    >
      <PackageOpen className={`size-${size}`} />
      <div>{message}</div>
    </div>
  );
}
