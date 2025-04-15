// filepath: c:\Users\kaled\Desktop\LinguaLink\lingualink-app\src\layouts\MainLayout.jsx
import { Navbar } from "../components/ui";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "../components/ui";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
     
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MainLayout;