'use client';

import React, { useState } from 'react';
import axios from 'axios';

// Types matching your DTOs
interface BillRequestDTO {
  name: string;
  amount: number;
  dueDate: string;
  type: 'ELECTRICITY' | 'COLD_WATER' | 'HOT_WATER' | 'GAS' | 'INTERNET' | 'HOUSE_SERVICE';
  userId: number;
  companyId: number;
}

const CompanyBillsPage: React.FC = () => {
  const [form, setForm] = useState<BillRequestDTO>({
    name: '',
    amount: 0,
    dueDate: '',
    type: 'ELECTRICITY',
    userId: 0,
    companyId: 0
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const billTypes = [
    { value: 'ELECTRICITY', label: 'Electricity' },
    { value: 'COLD_WATER', label: 'Cold Water' },
    { value: 'HOT_WATER', label: 'Hot Water' },
    { value: 'GAS', label: 'Gas' },
    { value: 'INTERNET', label: 'Internet' },
    { value: 'HOUSE_SERVICE', label: 'House Service' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'userId' || name === 'companyId' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem('access_token');

      const response = await axios.post('/api/bills', form, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setMessage(`Bill created successfully! Bill ID: ${response.data.id}`);
      // Reset form
      setForm({
        name: '',
        amount: 0,
        dueDate: '',
        type: 'ELECTRICITY',
        userId: 0,
        companyId: 0
      });
    } catch (err: any) {
      console.error('Error creating bill:', err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to create bill. Please check all fields and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Bill</h1>

          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bill Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., January Electricity Bill"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount ($)
              </label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bill Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {billTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User ID
              </label>
              <input
                type="number"
                name="userId"
                value={form.userId}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter user ID who will receive this bill"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company ID
              </label>
              <input
                type="number"
                name="companyId"
                value={form.companyId}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your company ID"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Bill...' : 'Create Bill'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyBillsPage;