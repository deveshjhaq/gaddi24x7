import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card } from '../../components/ui/card';
import { Wallet, Plus, ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { toast } from '../../hooks/use-toast';

const CustomerWallet = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const transactions = [
    { id: 1, type: 'debit', amount: 450, description: 'Ride to Airport', date: '2025-01-15', status: 'completed' },
    { id: 2, type: 'credit', amount: 500, description: 'Wallet Recharge', date: '2025-01-14', status: 'completed' },
    { id: 3, type: 'debit', amount: 92, description: 'Ride to Metro Station', date: '2025-01-14', status: 'completed' },
    { id: 4, type: 'credit', amount: 200, description: 'Referral Bonus', date: '2025-01-13', status: 'completed' }
  ];

  const handleAddMoney = () => {
    const amt = parseInt(amount);
    if (!amt || amt < 50) {
      toast({ title: 'Error', description: 'Minimum amount is ₹50', variant: 'destructive' });
      return;
    }

    // Mock payment processing
    setTimeout(() => {
      updateUser({ wallet: (user?.wallet || 0) + amt });
      toast({ title: 'Success', description: `₹${amt} added to wallet successfully!` });
      setShowAddMoney(false);
      setAmount('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/customer/home')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <span className="text-xl font-bold">My Wallet</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Wallet Balance Card */}
        <Card className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">Available Balance</div>
                <div className="text-4xl font-bold">₹{user?.wallet || 0}</div>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddMoney(true)}
            className="w-full bg-white text-blue-600 hover:bg-gray-100"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Money
          </Button>
        </Card>

        {/* Quick Add Amounts */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Quick Add</h3>
          <div className="grid grid-cols-4 gap-3">
            {[100, 200, 500, 1000].map((amt) => (
              <Button
                key={amt}
                variant="outline"
                onClick={() => {
                  setAmount(amt.toString());
                  setShowAddMoney(true);
                }}
                className="h-16"
              >
                <span className="text-lg font-bold">₹{amt}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h3 className="font-semibold mb-3">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((txn) => (
              <Card key={txn.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      txn.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {txn.type === 'credit' ? '+' : '-'}
                    </div>
                    <div>
                      <div className="font-semibold">{txn.description}</div>
                      <div className="text-sm text-gray-600">{txn.date}</div>
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${
                    txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {txn.type === 'credit' ? '+' : '-'}₹{txn.amount}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Add Money Dialog */}
      <Dialog open={showAddMoney} onOpenChange={setShowAddMoney}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Money to Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enter Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 text-lg">₹</span>
                <Input
                  type="number"
                  placeholder="100"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 text-lg h-12"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum amount: ₹50</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Payment Method</label>
              <div className="space-y-2">
                <Button
                  variant={selectedMethod === 'upi' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setSelectedMethod('upi')}
                >
                  <Smartphone className="w-4 h-4 mr-2" /> UPI (Mocked)
                </Button>
                <Button
                  variant={selectedMethod === 'card' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setSelectedMethod('card')}
                >
                  <CreditCard className="w-4 h-4 mr-2" /> Card (Mocked)
                </Button>
              </div>
            </div>

            <Button 
              onClick={handleAddMoney}
              disabled={!amount || parseInt(amount) < 50}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Add ₹{amount || 0}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerWallet;
