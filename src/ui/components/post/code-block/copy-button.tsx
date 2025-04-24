"use-client";

import { ClipboardIcon } from "./clipboard-icon";

interface Props {
  className?: string;
  onClick: () => void;
  isCopied: boolean;
  visible?: boolean;
}

export function CopyButton({
  onClick,
  isCopied,
  className,
  visible = true,
}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <button className={className} onClick={onClick}>
      <ClipboardIcon isCopied={isCopied} className="w-5 h-5" />
    </button>
  );
}
