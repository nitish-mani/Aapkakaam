import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/HomePage";
import Body from "./components/body/body";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import { Provider } from "react-redux";
import store from "./utils/store";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      children: [
        {
          path: "/",
          element: <Body />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}
