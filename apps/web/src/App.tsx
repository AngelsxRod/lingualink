import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Spinner } from "./components/ui";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes />
      </Suspense>
      <Toaster
        position="bottom-center"
        toastOptions={{
          removeDelay: 1000,
        }}
      />
    </>
  );
};

export default App;
