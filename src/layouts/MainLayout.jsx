import { Navbar } from "../components/ui";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "../components/ui";
const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="max-h-full-screen h-full p-4">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
