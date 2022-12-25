import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Root from "./root";
import Devices from "./root/devices";
import Device, { loader as deviceLoader } from "./root/devices/device";
import ErrorPage from "./root/error-page";
import Login from "./root/login";
import Register from "./root/register";
import RegisterDevice from "./root/register-device";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./providers/authProvider";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Protected from "./components/Protected";

const routes = [
  {
    path: "/",
    component: Root,
  },
  {
    path: "login",
    component: Login,
    layoutProps: {
      showLogInButton: false,
    },
  },
  {
    path: "register",
    component: Register,
  },
  {
    path: "device",
    component: Devices,
    isSignedIn: true,
  },
  {
    path: "device/:deviceId",
    loader: deviceLoader,
    component: Device,
    isSignedIn: true,
  },
  {
    path: "/register-device",
    component: RegisterDevice,
    isSignedIn: true,
  },
];

const router = createBrowserRouter(
  routes.map((route) => {
    const Layout = route.layout || DefaultLayout;
    const props = route.layoutProps;
    const Component = route.component;
    return {
      path: route.path,
      element: route.isSignedIn ? (
        <Layout {...props}>
          <Protected>
            <Component />
          </Protected>
        </Layout>
      ) : (
        <Layout {...props}>
          <Component />
        </Layout>
      ),
      errorElement: (
        <DefaultLayout>
          <ErrorPage />
        </DefaultLayout>
      ),
      loader: route.loader,
    };
  })
);

function App() {
  return (
    <div className="app">
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer theme="colored" position="top-center" />
    </div>
  );
}

export default App;
