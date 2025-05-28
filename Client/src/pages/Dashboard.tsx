import { useEffect, useState } from 'react'
import { getUserProfile, logout, updateUserProfile } from '../api/authApi'
import Navbar from '../components/Navbar'
import LoadingSpinner from '../components/LoadingSpinner'

const DashboardPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

    console.log("===================>" ,document.cookie)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUserProfile()
        setName(user.name || '')
        setEmail(user.email)
        setRole(user.role)
        setTempName(user.name || '')
      } catch (err) {
        alert('Session expired. Please log in again.')
        logout()
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const SignOut = async () => {
    try {
      await logout()
      window.location.href = '/'
    } catch (err) {
      alert('Failed to log out. Please try again.')
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const updatedUser = await updateUserProfile(tempName)
      setName(updatedUser.name)
      setIsEditing(false)
    } catch (err) {
      alert('Failed to update name')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setTempName(name)
    setIsEditing(false)
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Builder':
        return 'bg-blue-100 text-blue-800'
      case 'Broker':
        return 'bg-green-100 text-green-800'
      case 'Property Owner':
        return 'bg-purple-100 text-purple-800'
      case 'Property Seeker':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar name={name || 'User'} />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to your Dashboard</h1>
          <p className="text-gray-600">Manage your profile and account settings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg border-0 overflow-hidden">
            <div className="px-6 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                    <p className="text-gray-600">Update your personal details</p>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                )}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name
                </label>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <input
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Enter your full name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isSaving ? <LoadingSpinner /> : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{name || 'Not provided'}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Role
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(role)}`}>
                    {role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Stats Card */}
          <div className="bg-white rounded-xl shadow-lg border-0 overflow-hidden">
            <div className="px-6 py-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Account Overview</h2>
              <p className="text-gray-600 mt-1">Your account status and activity</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">✓</div>
                  <p className="text-sm font-medium text-green-800">Verified</p>
                  <p className="text-xs text-green-600">Email confirmed</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <p className="text-sm font-medium text-blue-800">Active Session</p>
                  <p className="text-xs text-blue-600">Current device</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={SignOut}
                  className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
