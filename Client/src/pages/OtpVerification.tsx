import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { verifyOtp, requestOtp } from '../api/authApi'
import LoadingSpinner from '../components/LoadingSpinner'

const VerifyOtpPage = () => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const navigate = useNavigate()
  const location = useLocation()
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email)
    }
  }, [location.state])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpString = otp.join('')
    if (otpString.length !== 6) return

    setIsLoading(true)
    try {
      const user = await verifyOtp(email, otpString)
      if (!user.role) {
        navigate('/select-role')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      alert('OTP verification failed')
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    try {
      await requestOtp(email)
      setTimeLeft(300)
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } catch {
      alert('Failed to resend OTP')
    } finally {
      setIsResending(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to <span className="font-medium">{email}</span>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl border-0 overflow-hidden">
          <div className="px-6 py-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-center text-gray-900">Enter Verification Code</h2>
            <p className="text-center text-gray-600 mt-1">Code expires in {formatTime(timeLeft)}</p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Verification Code</label>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || otp.join('').length !== 6}
                >
                  {isLoading ? <LoadingSpinner /> : 'Verify Code'}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending || timeLeft > 0}
                    className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                  >
                    {isResending ? (
                      <>
                        <svg className="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Resend Code'
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => navigate('/')}
                className="w-full text-gray-600 hover:text-gray-700 font-medium flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtpPage
