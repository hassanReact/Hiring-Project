import React from 'react'

interface InputFieldProps {
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, required, placeholder }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={label.toLowerCase().replace(' ', '-')} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={label.toLowerCase().replace(' ', '-')}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
      />
    </div>
  )
}

export default InputField
