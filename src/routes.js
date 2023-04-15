import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const UsersList = React.lazy(() => import('./views/Users/list'))
const UsersView = React.lazy(() => import('./views/Users/view'))

const CategoryList = React.lazy(() => import('./views/Category/list'))
const CategoryView = React.lazy(() => import('./views/Category/view'))
const CategoryEdit = React.lazy(() => import('./views/Category/edit'))
const CategoryCreate = React.lazy(() => import('./views/Category/create'))


const routes = [
  // { path: '*', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/user', exact: true, name: 'Users', element: UsersList },
  { path: '/user/view', name: 'Users view', element: UsersView },

  { path: '/category', exact: true, name: 'Category', element: CategoryList },
  { path: '/category/view', name: 'Category view', element: CategoryView },
  { path: '/category/edit', name: 'Category edit', element: CategoryEdit },
  { path: '/category/create', name: 'Category create', element: CategoryCreate },

]

export default routes
