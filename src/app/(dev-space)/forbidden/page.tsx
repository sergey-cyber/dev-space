import { Ban } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/ui/shadcn/ui/card";

export default function ForbiddenPage() {
  return (
    <section className="container">
      <Card>
        <CardHeader className="gap-y-6">
          <div className="flex justify-center">
            <Ban className="size-16 text-destructive" />
          </div>
          <p className="text-gray-500 text-xl text-center">Доступ запрещен</p>
        </CardHeader>
        <CardContent className="text-center">
          У вас недостаточно прав для просмотра данной страницы
        </CardContent>
      </Card>
    </section>
  );
}
