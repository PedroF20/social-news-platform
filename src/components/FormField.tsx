import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  value: string | boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  type?: 'text' | 'textarea' | 'checkbox' | 'select';
  options?: { value: string; label: string }[]; // For select dropdowns
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  options = [],
}) => {
  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            value={value as string} // Always cast to string for text input
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        );
      case 'checkbox':
        return (
          <input
            id={id}
            type="checkbox"
            checked={value as boolean} // Always cast to boolean for checkbox
            onChange={onChange}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
          />
        );
      case 'select':
        return (
          <select
            id={id}
            value={value as string} // Always cast to string for text input
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'text':
      default:
        return (
          <input
            id={id}
            type="text"
            value={value as string} // Always cast to string for text input
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {renderField()}
    </div>
  );
};

export default FormField;
