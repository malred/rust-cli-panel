import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import CreateFormPage from "./pages/CreateFormPage.tsx";
import ErrorPage from "./error-page.tsx";
import IndexPage from "./pages/IndexPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <IndexPage/>
            },
            {
                path: "create/:type",
                element: <CreateFormPage/>,
            },
        ]
    },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
