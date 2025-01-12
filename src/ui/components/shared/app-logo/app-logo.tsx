import { cn } from "@/ui/lib/utils";
import { Orbit } from "lucide-react";

interface Props {
  className?: string;
  iconClassName?: string;
  simple?: boolean; //  Dysplay only icon
}

export function AppLogo({ className, iconClassName, simple }: Props) {
  const icon = <Orbit className={iconClassName} />;

  return (
    <div className={cn("flex gap-x-2", className)}>
      {simple ? (
        <span>{icon}</span>
      ) : (
        <>
          <span>DEV</span>
          <span>{icon}</span>
          <span>SPACE</span>
        </>
      )}
    </div>
  );
}
