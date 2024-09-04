import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loader } from "../components/Loader/Loader";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import UnAuthtorize from "../pages/UnAuthtorize";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Uploads from "../pages/private/uploads/Uploads";
import AuthRoutes from "./AuthRoutes";

//
const AdminRoutes = lazy(() => import("./AdminRoutes"));
const Overview = lazy(() => import("../pages/private/Overview"));

// Users
const EditUser = lazy(() => import("../pages/private/users/EditUser"));
const CreateUser = lazy(() => import("../pages/private/users/CreateUser"));
const Users = lazy(() => import("../pages/private/users/Users"));

// Profile
const Profile = lazy(() => import("../pages/private/profile/Profile"));

// Files
const Imagenes = lazy(() => import("../pages/private/uploads/Imagenes"));
const Pdf = lazy(() => import("../pages/private/uploads/Pdf"));
const Comprimidos = lazy(() => import("../pages/private/uploads/Comprimidos"));

// Roles
const EditRole = lazy(() => import("../pages/private/roles/EditRole"));
const CreateRole = lazy(() => import("../pages/private/roles/CreateRole"));
const Roles = lazy(() => import("../pages/private/roles/Roles"));

// Messages
const Message = lazy(() => import("../pages/private/message/Message"));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Home />,
    children: [],
  },
  {
    path: "/",
    errorElement: <NotFound />,
    element: (
      <Suspense>
        <AdminRoutes />
      </Suspense>
    ),
    children: [
      {
        path: "overview",
        element: (
          <Suspense fallback={<Loader css={""} />}>
            <Overview />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loader css={""} />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<Loader css={""} />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "create-user",
        element: (
          <Suspense fallback={<Loader css={""} />}>
            <CreateUser />
          </Suspense>
        ),
      },
      {
        path: "edit-user/:id",
        element: (
          <Suspense fallback={<Loader css={""} />}>
            <EditUser />
          </Suspense>
        ),
      },
      {
        path: "uploads/",
        element: <Uploads />,
        children: [
          {
            path: "imagenes",
            element: (
              <Suspense fallback={<Loader css={""} />}>
                <Imagenes />
              </Suspense>
            ),
          },
          {
            path: "pdf",
            element: (
              <Suspense fallback={<Loader css={""} />}>
                <Pdf />
              </Suspense>
            ),
          },
          {
            path: "comprimidos",
            element: (
              <Suspense fallback={<Loader css={""} />}>
                <Comprimidos />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "roles",
        element: (
          <Suspense fallback={<Loader css={""} />}>
            <Roles />
          </Suspense>
        ),
      },
      {
        path: "create-role",
        element: (
          <Suspense fallback={<Loader css={""} />}>
            <CreateRole />
          </Suspense>
        ),
      },
      {
        path: "edit-role/:id",
        element: (
          <Suspense fallback={<Loader css={""} />}>
            <EditRole />
          </Suspense>
        ),
      },
      {
        path: "messages",
        element: (
          <Suspense fallback={<Loader css={""} />}>
            <Message />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthRoutes />,
    errorElement: <NotFound />,
    children: [
      {
        path: "login",
        errorElement: <NotFound />,
        element: <Login />,
      },
      {
        path: "signup",
        errorElement: <NotFound />,
        element: <Signup />,
      },
      {
        path: "logut",
        errorElement: <NotFound />,
        element: <></>,
      },
    ],
  },
  {
    path: "/403",
    element: <UnAuthtorize />,
  },
]);

export default router;
