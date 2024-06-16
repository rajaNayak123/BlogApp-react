import React from 'react'
import { Container, Logo, Logout, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name: "Home",
      slug: '/',
      Active: true,
    },
    {
      name: "Login",
      slug: '/login',
      Active: !authStatus
    },
    {
      name: "Signup",
      slug: '/signup',
      Active: !authStatus
    },
    {
      name: "All Posts",
      slug: '/all-posts',
      Active: authStatus
    },
    {
      name: "Add posts",
      slug: "/add-posts",
      Active: authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) =>
                item.Active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    >{item.name}</button>
                  </li>
                ) : null
              )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header