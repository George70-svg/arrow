import styles from './App.module.scss'
import { routes } from './routing/routes.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'

export const App = () => {
  const router = createBrowserRouter(routes)
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  )
}
