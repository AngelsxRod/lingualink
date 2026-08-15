import { Suspense } from "react";
import { Navbar, Spinner } from "../../components/ui";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4">
        <Suspense fallback={<Spinner />}>{children}</Suspense>
      </div>
    </div>
  );
}
