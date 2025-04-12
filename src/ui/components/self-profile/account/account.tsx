"use client";

import { deleteSelf } from "@/server-actions/user/actions";
import { useToast } from "@/ui/lib/hooks/use-toast";
import { Button } from "@/ui/shadcn/ui/button";
import { Separator } from "@/ui/shadcn/ui/separator";
import { useState } from "react";
import { Confirm } from "../../shared/confirm";

export function SelfAccount() {
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteAccountPending, setDeleteAccountPending] = useState(false);

  async function onDeleteSelfAccount() {
    try {
      const { error } = await deleteSelf();
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
        });
        return;
      }
      toast({
        title: "Пост создан успешно.",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteAccountPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Confirm
        title="Удаление аккаунта"
        description="Аккаунт будет удален без возможности на восстановление. Продолжить?"
        confirmPaending={deleteAccountPending}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onDeleteSelfAccount}
        open={confirmOpen}
      />
      <p className="font-semibold text-destructive">Удаление аккаунта</p>
      <Separator />
      <p>
        Внимание! После удаления аккаунта, восстановить его будет невозможно.
      </p>
      <span>
        <Button
          variant={"destructive"}
          disabled={deleteAccountPending}
          onClick={() => setConfirmOpen(true)}
        >
          Удалить аккаунт
        </Button>
      </span>
    </div>
  );
}
