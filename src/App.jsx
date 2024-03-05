import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/HomePage";
import Body from "./components/body/body";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import { Provider } from "react-redux";
import store from "./utils/store";
import ViewOrders from "./components/veiw/viewOrders";
import ViewShare from "./components/veiw/viewShare";
import Category from "./components/category/category";
import Bookings from "./components/bookings/Bookings";
import Address from "./components/Address/Address";
import AvailableVendor from "./components/availableVendor/availableVendor";
import CheckBookingDate from "./components/checkBookingDate/checkBookingDate";
import Share from "./components/share/share";

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
          path: "/category",
          element: <Category />,
        },
        {
          path: "/category/:cd/:id",
          element: <Category />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/viewOrders",
          element: <ViewOrders />,
        },
        {
          path: "/viewShare",
          element: <ViewShare />,
        },
        {
          path: "/viewBookings",
          element: <Bookings />,
        },
        {
          path: "/bookNow",
          element: <Bookings />,
        },
        {
          path: "/address",
          element: <Address />,
        },
        {
          path: "/availableVendor",
          element: <AvailableVendor />,
        },
        {
          path: "/checkBookingDate",
          element: <CheckBookingDate />,
        },
        {
          path: "/share",
          element: <Share />,
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
