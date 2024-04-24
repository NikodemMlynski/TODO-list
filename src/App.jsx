import RootLayout from './Layouts/RootLayout'
import AddTaskForm from './components/Add task/AddTaskForm'
import Tasks from './components/Tasks/Tasks'
import './index.css'

import {RouterProvider, createBrowserRouter} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <AddTaskForm/>
      },
      {
        path: ':taskType',
        element: <Tasks/>
      },
    ]
  }
])
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
