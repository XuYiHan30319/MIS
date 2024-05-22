import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useEffect } from "react";
import { initData } from "./utils/initData";

function App() {
  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
