import React, { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Loading from "./components/Loading";
import UserContext from "./utils/UserContext";
import Cart from "./components/Cart";
import appStore from "./utils/appStore";

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
  const [userName, setUserName] = useState("Default");

  useEffect(() => {
    //authentication and api calls......
    //we recieve data
    const data = {
      name: "Nancy Bansal",
    };
    setUserName(data.name);
  }, []);
  return (
    <Provider store={appStore}>
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Loading />}>
            {" "}
            <Grocery />{" "}
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
