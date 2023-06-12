import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const UsersList = React.lazy(() => import('./views/Users/list'))
const UsersView = React.lazy(() => import('./views/Users/view'))

const CategoryList = React.lazy(() => import('./views/Category/list'))
const CategoryView = React.lazy(() => import('./views/Category/view'))
const CategoryEdit = React.lazy(() => import('./views/Category/edit'))
const CategoryCreate = React.lazy(() => import('./views/Category/create'))

const PostsList = React.lazy(() => import('./views/Posts/list'))
const PostsView = React.lazy(() => import('./views/Posts/view'))
const PostsEdit = React.lazy(() => import('./views/Posts/edit'))
const PostsCreate = React.lazy(() => import('./views/Posts/create'))

const UnconfirmedList = React.lazy(() => import('./views/Unconfirmed/list'))
const UnconfirmedView = React.lazy(() => import('./views/Unconfirmed/view'))

const ReklamaCreate = React.lazy(() => import('./views/Reklama/create'))
const ReklamaEdit = React.lazy(() => import('./views/Reklama/edit'))
const ReklamaView = React.lazy(() => import('./views/Reklama/view'))
const ReklamaList = React.lazy(() => import('./views/Reklama/list'))

const GreatWordsCreate = React.lazy(() => import('./views/GreatWords/create'))
const GreatWordsEdit = React.lazy(() => import('./views/GreatWords/edit'))
const GreatWordsView = React.lazy(() => import('./views/GreatWords/view'))
const GreatWordsList = React.lazy(() => import('./views/GreatWords/list'))

const CommentsList = React.lazy(() => import('./views/Comments/list'))
const CommentsEdit = React.lazy(() => import('./views/Comments/edit'))
const CommentsView = React.lazy(() => import('./views/Comments/view'))

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

  { path: '/post', exact: true, name: 'Post', element: PostsList },
  { path: '/post/view', name: 'Post view', element: PostsView },
  { path: '/post/edit', name: 'Post edit', element: PostsEdit },
  { path: '/post/create', name: 'Post create', element: PostsCreate },

  { path: '/unconfirmed', exact: true, name: 'Unconfirmed', element: UnconfirmedList },
  { path: '/unconfirmed/view', name: 'Unconfirmed view', element: UnconfirmedView },

  { path: '/reklama', exact: true, name: 'Reklama', element: ReklamaList },
  { path: '/reklama/view', name: 'Reklama view', element: ReklamaView },
  { path: '/reklama/edit', name: 'Reklama edit', element: ReklamaEdit },
  { path: '/reklama/create', name: 'Reklama create', element: ReklamaCreate },

  { path: '/greatwords', exact: true, name: 'Payhasly sozler', element: GreatWordsList },
  { path: '/greatwords/view', name: 'Payhasly sozler view', element: GreatWordsView },
  { path: '/greatwords/edit', name: 'Payhasly sozler edit', element: GreatWordsEdit },
  { path: '/greatwords/create', name: 'Payhasly sozler create', element: GreatWordsCreate },

  { path: '/comments', name: 'Comment duzet', element: CommentsList },
  { path: '/comments/view', name: 'Payhasly sozler view', element: CommentsView },
  { path: '/comments/edit', name: 'Payhasly sozler edit', element: CommentsEdit },
]

export default routes
