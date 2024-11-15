import HomePage from './routes/homePage/homePage'
import { Layout, RequireAuth } from './routes/layout/layout.jsx'
import ListPage from './routes/listPage/listPage.jsx'
import ProfilePage from './routes/profilePage/profilePage.jsx'
import SinglePage from './routes/singlePage/singlePage.jsx'
import Login from './routes/login/login.jsx'
import Register from './routes/register/register.jsx'

import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom"
import ProfileUpdatePage from './routes/profileUpdatePage/profileUpdatePage.jsx'
import NewPostPage from './routes/newPostPage/newPostPage.jsx'
import { listPageLoader, profilePageLoader, singlePageLoader } from './lib/loaders.js'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        }
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />
        },
        {
          path: "/add",
          element: <NewPostPage />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App