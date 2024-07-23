import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './pages/Index'
import StudentLogin from './pages/StudentLogin'
import Student from './pages/Student'
import Teacher from './pages/Teacher'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Index />,
    },
    {
      path: '/studentLogin',
      element: <StudentLogin />,
    },
    {
      path: '/student',
      element: <Student />,
    },
    {
      path: '/teacher',
      element: <Teacher />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
