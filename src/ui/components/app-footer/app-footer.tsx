import { AppLogo } from "../shared/app-logo";

export function AppFooter() {
  return (
    <footer className="w-full border-t py-4">
      <div className="container flex justify-start items-center gap-x-3">
        <AppLogo simple iconClassName="text-slate-600" />
        <span className="text-slate-600">dev-space@mail.ru</span>
      </div>
    </footer>
  );
}
