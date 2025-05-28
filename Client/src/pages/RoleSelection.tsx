import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUserRole } from '../api/authApi'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

const roles = [
  {
    value: 'Builder',
    label: 'Builder',
    description: 'Construct and develop properties',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
  },
  {
    value: 'Broker',
    label: 'Broker',
    description: 'Facilitate property transactions',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
  },
  {
    value: 'Property Owner',
    label: 'Property Owner',
    description: 'Own and manage properties',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
  },
  {
    value: 'Property Seeker',
    label: 'Property Seeker',
    description: 'Looking for properties to buy or rent',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
  },
]

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const handleSubmit = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    try {
      await setUserRole(selectedRole)
      setUser({ ...user!, role: selectedRole })
      navigate('/dashboard')
    } catch {
      alert('Failed to save role')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Role</h1>
          <p className="text-gray-600">Select the option that best describes your involvement in real estate</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl border-0 overflow-hidden">
          <div className="px-6 py-6 border-b border-gray-100 text-center">
            <h2 className="text-xl font-semibold text-gray-900">What brings you here?</h2>
            <p className="text-gray-600 mt-1">This helps us customize your experience</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid gap-3">
              {roles.map((role) => (
                <div
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`
                    relative cursor-pointer rounded-lg border-2 p-4 transition-all
                    ${selectedRole === role.value ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : role.color}
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`
                      flex h-12 w-12 items-center justify-center rounded-lg
                      ${selectedRole === role.value ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}
                    `}
                    >
                      {role.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{role.label}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                    <div
                      className={`
                      h-5 w-5 rounded-full border-2 transition-colors
                      ${selectedRole === role.value ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
                    `}
                    >
                      {selectedRole === role.value && (
                        <div className="h-full w-full rounded-full bg-white scale-50" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={!selectedRole || isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    Continue to Dashboard
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
