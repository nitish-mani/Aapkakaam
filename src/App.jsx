import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/HomePage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}
