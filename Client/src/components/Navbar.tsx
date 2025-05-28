import React from 'react'
import { logout } from '../api/authApi'

interface NavbarProps {
  name: string
}

const Navbar: React.FC<NavbarProps> = ({ name }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const SignOut = async () => {
    try {
      await logout()
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'

    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                {getInitials(name || 'U')}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Welcome back,</p>
                <p className="text-sm text-gray-600">{name || 'User'}</p>
              </div>
            </div>

            <button
              onClick={SignOut}
              className="text-gray-600 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
