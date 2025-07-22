'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Types matching your BillResponseDTO
interface BillResponseDTO {
  id: number;
  name: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'PAID' | 'OVERDUE' | 'FAILED';
  type: 'ELECTRICITY' | 'COLD_WATER' | 'HOT_WATER' | 'GAS' | 'INTERNET' | 'HOUSE_SERVICE';
  amount: number;
  dueDate: string;
  issueDate: string;
  companyName: string;
  userName: string;
  totalPaid: number;
  remainingAmount: number;
}

const UserBillsPage: React.FC = () => {
  const [bills, setBills] = useState<BillResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentAmount, setPaymentAmount] = useState<{[key: number]: number}>({});
  const [paymentLoading, setPaymentLoading] = useState<{[key: number]: boolean}>({});
  const [userId, setUserId] = useState(1); // You might get this from JWT/context
  const [totalUnpaid, setTotalUnpaid] = useState<number>(0);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800';
      case 'OPEN':
        return 'bg-blue-100 text-blue-800';
      case 'FAILED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Fetch bills by user ID
  const fetchBills = async () => {
    try {
      const token = localStorage.getItem('access_token');

      const response = await axios.get(`/api/bills/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setBills(response.data);
      fetchTotalUnpaidAmount();
    } catch (err: any) {
      console.error('Error fetching bills:', err);
      setError(err.response?.data?.message || 'Failed to fetch bills');
    } finally {
      setLoading(false);
    }
  };

  // Fetch total unpaid amount
  const fetchTotalUnpaidAmount = async () => {
    try {
      const token = localStorage.getItem('access_token');

      const response = await axios.get(`/api/bills/user/${userId}/unpaid-amount`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setTotalUnpaid(response.data);
    } catch (err: any) {
      console.error('Error fetching total unpaid amount:', err);
    }
  };

  // Handle payment - matches your controller endpoint
  const handlePayment = async (billId: number) => {
    const amount = paymentAmount[billId];
    if (!amount || amount <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }

    // Find the bill to check remaining amount
    const bill = bills.find(b => b.id === billId);
    if (!bill) return;

    if (amount > bill.remainingAmount) {
      alert(`Payment amount cannot exceed remaining amount ($${bill.remainingAmount.toFixed(2)})`);
      return;
    }

    setPaymentLoading(prev => ({
      ...prev,
      [billId]: true
    }));

    try {
      const token = localStorage.getItem('access_token');

      // Using your exact endpoint: POST /api/bills/{billId}/pay?userId={userId}&amount={amount}
      const response = await axios.post(
        `/api/bills/${billId}/pay?userId=${userId}&amount=${amount}`,
        {}, // Empty body as per your controller
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Refresh bills after successful payment
      fetchBills();

      // Clear payment amount
      setPaymentAmount(prev => ({
        ...prev,
        [billId]: 0
      }));

      alert(`Payment of $${amount} processed successfully!`);
    } catch (err: any) {
      console.error('Error processing payment:', err);
      alert(err.response?.data?.message || err.response?.data || 'Payment failed');
    } finally {
      setPaymentLoading(prev => ({
        ...prev,
        [billId]: false
      }));
    }
  };

  useEffect(() => {
    fetchBills();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading bills...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Bills</h1>
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Unpaid Amount</div>
              <div className="text-xl font-bold text-red-600">${totalUnpaid.toFixed(2)}</div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
              <button
                onClick={() => {setError(''); fetchBills();}}
                className="ml-2 underline"
              >
                Retry
              </button>
            </div>
          )}

          {bills.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No bills found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bill Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bills.map((bill) => (
                    <tr key={bill.id} className={bill.status === 'OVERDUE' ? 'bg-red-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{bill.name}</div>
                          <div className="text-sm text-gray-500">{bill.companyName}</div>
                          <div className="text-xs text-gray-400">{bill.type.replace('_', ' ')}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Total: ${bill.amount.toFixed(2)}</div>
                        <div className="text-xs text-green-600">
                          Paid: ${bill.totalPaid.toFixed(2)}
                        </div>
                        <div className="text-xs text-red-600">
                          Remaining: ${bill.remainingAmount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Due: {formatDate(bill.dueDate)}</div>
                        <div className="text-xs text-gray-500">Issued: {formatDate(bill.issueDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bill.status)}`}>
                          {bill.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(bill.priority)}`}>
                          {bill.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {bill.status !== 'PAID' && bill.remainingAmount > 0 && (
                          <div className="flex flex-col space-y-2">
                            <input
                              type="number"
                              value={paymentAmount[bill.id] || ''}
                              onChange={(e) => setPaymentAmount(prev => ({
                                ...prev,
                                [bill.id]: Number(e.target.value)
                              }))}
                              placeholder="Amount"
                              min="0.01"
                              max={bill.remainingAmount}
                              step="0.01"
                              className="px-2 py-1 border border-gray-300 rounded text-xs w-24"
                            />
                            <button
                              onClick={() => handlePayment(bill.id)}
                              disabled={paymentLoading[bill.id]}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 disabled:opacity-50"
                            >
                              {paymentLoading[bill.id] ? 'Processing...' : 'Pay'}
                            </button>
                          </div>
                        )}
                        {bill.status === 'PAID' && (
                          <span className="text-green-600 text-xs font-medium">Fully Paid</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBillsPage;