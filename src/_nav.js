import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBook,
  cilImage,
  cilUser
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Lists',
  },
  {
    component: CNavItem,
    name: 'Users',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Category',
    to: '/category',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Posts',
    to: '/post',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Unconfirmed',
  //   to: '/unconfirmed',
  //   icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Reklama',
    to: '/reklama',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Payhasly sozler',
    to: '/greatwords',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Comments',
    to: '/comments',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  }
]

export default _nav
