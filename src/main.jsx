import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Error from './components/Error.jsx'
import CountryDetail from './Pages/CountryDetail.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: ':countryName', element: <CountryDetail /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
