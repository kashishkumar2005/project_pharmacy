import React, { useState } from 'react';
import { 
  AlertCircle, Package, ShoppingCart, TrendingUp, 
  Plus, Edit2, Trash2, Search, LogOut, User,
  Calendar, DollarSign, TrendingDown, Activity,
  X, Check
} from 'lucide-react';

// ==================== STYLES ====================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f9fafb;
  }

  .app-container {
    min-height: 100vh;
    background-color: #f9fafb;
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    font-size: 0.875rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn-primary {
    background-color: #4f46e5;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #4338ca;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
  }

  .btn-secondary {
    background-color: #e5e7eb;
    color: #1f2937;
  }

  .btn-secondary:hover {
    background-color: #d1d5db;
  }

  .btn-danger {
    background-color: #ef4444;
    color: white;
  }

  .btn-danger:hover {
    background-color: #dc2626;
  }

  .card {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    transition: box-shadow 0.2s ease;
  }

  .input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .input:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  .input:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  select.input {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  .table th,
  .table td {
    padding: 0.875rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  .table th {
    font-weight: 600;
    color: #374151;
    background-color: #f9fafb;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  .table tbody tr {
    transition: background-color 0.15s ease;
  }

  .table tbody tr:hover {
    background-color: #f9fafb;
  }

  .badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    display: inline-block;
  }

  .badge-success {
    background-color: #d1fae5;
    color: #065f46;
  }

  .badge-danger {
    background-color: #fee2e2;
    color: #991b1b;
  }

  .badge-warning {
    background-color: #fef3c7;
    color: #92400e;
  }

  .badge-info {
    background-color: #dbeafe;
    color: #1e40af;
  }

  .alert {
    padding: 0.875rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }

  .alert-error {
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 50;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .modal-content {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .stat-card {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease;
  }

  .stat-card:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .action-btn {
    padding: 0.375rem;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .action-btn:hover {
    background-color: #f3f4f6;
  }

  .action-btn-edit {
    color: #3b82f6;
  }

  .action-btn-edit:hover {
    background-color: #dbeafe;
  }

  .action-btn-delete {
    color: #ef4444;
  }

  .action-btn-delete:hover {
    background-color: #fee2e2;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: #6b7280;
  }

  .nav {
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 40;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .grid {
    display: grid;
    gap: 1.5rem;
  }

  .grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1200px) {
    .grid-cols-4 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .grid-cols-4,
    .grid-cols-3,
    .grid-cols-2 {
      grid-template-columns: 1fr;
    }
    
    .container {
      padding: 0 1rem;
    }

    .table {
      font-size: 0.75rem;
    }

    .table th,
    .table td {
      padding: 0.5rem;
    }
  }

  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// ==================== LOGIN COMPONENT ====================
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (username && password) {
        const validUsers = {
          'admin': { password: 'admin123', role: 'admin', name: 'Administrator' },
          'pharmacist1': { password: 'pharma123', role: 'pharmacist', name: 'Dr. Sarah Johnson' },
          'cashier1': { password: 'cashier123', role: 'cashier', name: 'John Smith' }
        };

        const user = validUsers[username];
        if (user && user.password === password) {
          onLogin({ username, ...user });
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('Please enter both username and password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '420px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            marginBottom: '1rem',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
          }}>
            <Package size={40} color="white" />
          </div>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: 'bold', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            PharmaCare
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
            Inventory Management System
          </p>
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '0.5rem' 
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={20} style={{ 
                position: 'absolute', 
                left: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#9ca3af' 
              }} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
                placeholder="Enter your username"
                style={{ paddingLeft: '2.75rem' }}
                disabled={loading}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '0.5rem' 
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ 
              width: '100%', 
              padding: '0.875rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          background: '#f9fafb', 
          borderRadius: '0.75rem', 
          border: '1px solid #e5e7eb'
        }}>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '600' }}>
            Demo Credentials:
          </p>
          <div style={{ fontSize: '0.7rem', color: '#9ca3af', lineHeight: '1.6' }}>
            <p><strong>Admin:</strong> admin / admin123</p>
            <p><strong>Pharmacist:</strong> pharmacist1 / pharma123</p>
            <p><strong>Cashier:</strong> cashier1 / cashier123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== DASHBOARD COMPONENT ====================
const Dashboard = ({ medicines, sales, purchases }) => {
  const totalMedicines = medicines.length;
  const lowStock = medicines.filter(m => m.quantity < m.reorderLevel).length;
  const totalSales = sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
  const totalPurchases = purchases.reduce((sum, p) => sum + (p.totalAmount || 0), 0);
  const totalValue = medicines.reduce((sum, m) => sum + (m.quantity * m.price), 0);

  const stats = [
    { 
      label: 'Total Medicines', 
      value: totalMedicines, 
      icon: Package, 
      color: '#3b82f6',
      bgColor: '#dbeafe',
      change: '+12%',
      changeType: 'positive'
    },
    { 
      label: 'Low Stock Items', 
      value: lowStock, 
      icon: AlertCircle, 
      color: '#ef4444',
      bgColor: '#fee2e2',
      change: '-5%',
      changeType: 'negative'
    },
    { 
      label: 'Total Sales', 
      value: `₹${totalSales.toFixed(0)}`, 
      icon: ShoppingCart, 
      color: '#10b981',
      bgColor: '#d1fae5',
      change: '+18%',
      changeType: 'positive'
    },
    { 
      label: 'Inventory Value', 
      value: `₹${totalValue.toFixed(0)}`, 
      icon: DollarSign, 
      color: '#f59e0b',
      bgColor: '#fef3c7',
      change: '+8%',
      changeType: 'positive'
    }
  ];

  const recentActivity = [
    { type: 'sale', medicine: 'Paracetamol 500mg', qty: 10, time: '2 hours ago' },
    { type: 'purchase', medicine: 'Amoxicillin 250mg', qty: 50, time: '5 hours ago' },
    { type: 'alert', medicine: 'Ibuprofen 400mg', qty: 15, time: '1 day ago' },
    { type: 'sale', medicine: 'Cetirizine 10mg', qty: 8, time: '1 day ago' }
  ];

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
          Dashboard Overview
        </h2>
        <p style={{ color: '#6b7280' }}>Welcome back! Here's what's happening with your pharmacy today.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div style={{ flex: 1 }}>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: '500' }}>
                {stat.label}
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
                {stat.value}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {stat.changeType === 'positive' ? (
                  <TrendingUp size={14} style={{ color: '#10b981' }} />
                ) : (
                  <TrendingDown size={14} style={{ color: '#ef4444' }} />
                )}
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: stat.changeType === 'positive' ? '#10b981' : '#ef4444',
                  fontWeight: '600'
                }}>
                  {stat.change}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>vs last month</span>
              </div>
            </div>
            <div style={{ 
              background: stat.bgColor, 
              padding: '0.875rem', 
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <stat.icon size={28} color={stat.color} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3">
        {/* Low Stock Alerts */}
        <div style={{ gridColumn: 'span 2' }}>
          {lowStock > 0 ? (
            <div className="card" style={{ border: '2px solid #fee2e2' }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '600', 
                color: '#991b1b', 
                marginBottom: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem' 
              }}>
                <AlertCircle size={22} />
                Low Stock Alerts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {medicines.filter(m => m.quantity < m.reorderLevel).slice(0, 5).map(med => (
                  <div key={med.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#fef2f2',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #fecaca'
                  }}>
                    <div>
                      <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                        {med.name}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        Category: {med.category}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: '#dc2626', fontSize: '0.875rem', fontWeight: '600' }}>
                        Stock: {med.quantity}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                        Min: {med.reorderLevel}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="empty-state">
                <Package size={64} style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: '#111827', fontWeight: '600' }}>
                  All Stock Levels Good
                </h3>
                <p style={{ fontSize: '0.875rem' }}>No medicines are below reorder level</p>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            color: '#111827', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Activity size={20} />
            Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentActivity.map((activity, idx) => (
              <div key={idx} style={{
                padding: '0.75rem',
                background: '#f9fafb',
                borderRadius: '0.5rem',
                borderLeft: `3px solid ${
                  activity.type === 'sale' ? '#10b981' : 
                  activity.type === 'purchase' ? '#3b82f6' : '#ef4444'
                }`
              }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                  {activity.medicine}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {activity.type === 'sale' ? 'Sold' : activity.type === 'purchase' ? 'Purchased' : 'Alert'} • {activity.qty} units • {activity.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MEDICINES LIST COMPONENT ====================
const MedicinesList = ({ medicines, onEdit, onDelete, onAdd }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(search.toLowerCase()) ||
                          (med.category && med.category.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'all' || 
                          (filter === 'low' && med.quantity < med.reorderLevel) ||
                          (filter === 'expired' && new Date(med.expiryDate) < new Date());
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'quantity') return a.quantity - b.quantity;
    if (sortBy === 'price') return a.price - b.price;
    return 0;
  });

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
            Medicines Inventory
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Manage your pharmacy inventory • Total: {medicines.length} items
          </p>
        </div>
        <button onClick={onAdd} className="btn btn-primary">
          <Plus size={20} />
          Add Medicine
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
            <Search size={20} style={{ 
              position: 'absolute', 
              left: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#9ca3af' 
            }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or category..."
              className="input"
              style={{ paddingLeft: '2.75rem' }}
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input"
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="all">All Medicines</option>
            <option value="low">Low Stock</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input"
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value="name">Sort by Name</option>
            <option value="quantity">Sort by Quantity</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Reorder Level</th>
                <th>Expiry Date</th>
                <th>Supplier</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map(med => (
<tr key={med.id}>
  <td style={{ fontWeight: '600', color: '#111827' }}>{med.name}</td>
  <td>
    <span className="badge badge-info">{med.category}</span>
  </td>
  <td>
    <span className={`badge ${
      med.quantity < med.reorderLevel ? 'badge-danger' : 
      med.quantity < med.reorderLevel * 1.5 ? 'badge-warning' : 
      'badge-success'
    }`}>
      {med.quantity}
    </span>
  </td>
  <td style={{ fontWeight: '600', color: '#111827' }}>₹{med.price.toFixed(2)}</td>
  <td style={{ color: '#6b7280' }}>{med.reorderLevel}</td>
  <td>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Calendar size={14} color="#9ca3af" />
      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
        {new Date(med.expiryDate).toLocaleDateString('en-GB')}
      </span>
    </div>
  </td>
  <td style={{ color: '#6b7280', fontSize: '0.875rem' }}>{med.supplier}</td>
  <td>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        onClick={() => onEdit(med)}
        className="action-btn action-btn-edit"
        title="Edit"
      >
        <Edit2 size={16} />
      </button>
      <button
        onClick={() => onDelete(med.id)}
        className="action-btn action-btn-delete"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </td>
</tr>
))
) : (
<tr>
<td colSpan="8">
<div className="empty-state">
<Search size={64} style={{ margin: '0 auto 1rem', color: '#d1d5db' }} />
<h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: '#111827', fontWeight: '600' }}>
No Medicines Found
</h3>
<p style={{ fontSize: '0.875rem' }}>Try adjusting your search or filter criteria</p>
</div>
</td>
</tr>
)}
</tbody>
</table>
</div>
    {filteredMedicines.length > 0 && (
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem',
        background: '#f9fafb',
        borderRadius: '0.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.875rem',
        color: '#6b7280'
      }}>
        <span>Showing {filteredMedicines.length} of {medicines.length} medicines</span>
        <span>Total Value: ₹{filteredMedicines.reduce((sum, m) => sum + (m.quantity * m.price), 0).toFixed(2)}</span>
      </div>
    )}
  </div>
</div>
);
};
// ==================== MEDICINE FORM MODAL ====================
const MedicineForm = ({ medicine, onSave, onCancel }) => {
const [formData, setFormData] = useState(medicine || {
name: '',
category: '',
quantity: 0,
price: 0,
reorderLevel: 10,
expiryDate: '',
supplier: ''
});
const [errors, setErrors] = useState({});
const validateForm = () => {
const newErrors = {};
if (!formData.name.trim()) newErrors.name = 'Medicine name is required';
if (!formData.category.trim()) newErrors.category = 'Category is required';
if (formData.quantity < 0) newErrors.quantity = 'Quantity cannot be negative';
if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
if (formData.reorderLevel < 0) newErrors.reorderLevel = 'Reorder level cannot be negative';
if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};
const handleSubmit = (e) => {
e.preventDefault();
if (validateForm()) {
onSave(formData);
}
};
return (
<div className="modal-overlay" onClick={onCancel}>
<div className="modal-content" style={{ maxWidth: '700px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
<h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
{medicine ? 'Edit Medicine' : 'Add New Medicine'}
</h3>
<button onClick={onCancel} className="action-btn" style={{ padding: '0.5rem' }}>
<X size={24} color="#6b7280" />
</button>
</div>
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Medicine Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="input"
            placeholder="e.g., Paracetamol 500mg"
          />
          {errors.name && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Category <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="input"
            placeholder="e.g., Analgesic"
          />
          {errors.category && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.category}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Quantity <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })}
            className="input"
            min="0"
          />
          {errors.quantity && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.quantity}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Price (₹) <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            className="input"
            min="0"
          />
          {errors.price && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.price}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Reorder Level <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="number"
            value={formData.reorderLevel}
            onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) || 0 })}
            className="input"
            min="0"
          />
          {errors.reorderLevel && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.reorderLevel}</p>}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Expiry Date <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            className="input"
          />
          {errors.expiryDate && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.expiryDate}</p>}
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Supplier
          </label>
          <input
            type="text"
            value={formData.supplier}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            className="input"
            placeholder="e.g., MedSupply Co"
          />
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        paddingTop: '1rem', 
        borderTop: '1px solid #e5e7eb' 
      }}>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ flex: 1, padding: '0.75rem' }}
        >
          <Check size={20} />
          {medicine ? 'Update Medicine' : 'Add Medicine'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
          style={{ flex: 1, padding: '0.75rem' }}
        >
          <X size={20} />
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>
);
};
// ==================== SALES COMPONENT ====================
const Sales = () => {
return (
<div style={{ padding: '2rem 0' }}>
<div className="card">
<div className="empty-state" style={{ padding: '4rem 2rem' }}>
<ShoppingCart size={80} style={{ margin: '0 auto 1.5rem', color: '#d1d5db' }} />
<h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#111827', fontWeight: 'bold' }}>
Sales Module
</h3>
<p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1.5rem' }}>
Record and track sales transactions for your pharmacy
</p>
<div style={{
padding: '1.5rem',
background: '#f9fafb',
borderRadius: '0.75rem',
maxWidth: '500px',
margin: '0 auto',
textAlign: 'left'
}}>
<p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
Coming Soon Features:
</p>
<ul style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
<li>Record new sales transactions</li>
<li>Automatic inventory updates</li>
<li>Customer information management</li>
<li>Sales history and reports</li>
<li>Invoice generation</li>
</ul>
</div>
</div>
</div>
</div>
);
};
// ==================== PURCHASES COMPONENT ====================
const Purchases = () => {
return (
<div style={{ padding: '2rem 0' }}>
<div className="card">
<div className="empty-state" style={{ padding: '4rem 2rem' }}>
<TrendingUp size={80} style={{ margin: '0 auto 1.5rem', color: '#d1d5db' }} />
<h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: '#111827', fontWeight: 'bold' }}>
Purchases Module
</h3>
<p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1.5rem' }}>
Manage purchase orders and supplier transactions
</p>
<div style={{
padding: '1.5rem',
background: '#f9fafb',
borderRadius: '0.75rem',
maxWidth: '500px',
margin: '0 auto',
textAlign: 'left'
}}>
<p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
Coming Soon Features:
</p>
<ul style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
<li>Record new purchase orders</li>
<li>Automatic stock updates</li>
<li>Supplier management</li>
<li>Purchase history tracking</li>
<li>Cost analysis and reports</li>
</ul>
</div>
</div>
</div>
</div>
);
};
// ==================== MAIN APP COMPONENT ====================
function App() {
const [user, setUser] = useState(null);
const [currentPage, setCurrentPage] = useState('dashboard');
const [medicines, setMedicines] = useState([
{ id: 1, name: 'Paracetamol 500mg', category: 'Analgesic', quantity: 150, price: 5.50, reorderLevel: 50, expiryDate: '2025-12-31', supplier: 'MedSupply Co' },
{ id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', quantity: 30, price: 25.00, reorderLevel: 40, expiryDate: '2025-09-30', supplier: 'PharmaCorp' },
{ id: 3, name: 'Ibuprofen 400mg', category: 'Anti-inflammatory', quantity: 80, price: 8.75, reorderLevel: 30, expiryDate: '2026-03-15', supplier: 'HealthMeds Ltd' },
{ id: 4, name: 'Cetirizine 10mg', category: 'Antihistamine', quantity: 120, price: 6.00, reorderLevel: 50, expiryDate: '2026-01-20', supplier: 'MedSupply Co' },
{ id: 5, name: 'Metformin 500mg', category: 'Antidiabetic', quantity: 45, price: 12.50, reorderLevel: 40, expiryDate: '2025-11-15', supplier: 'DiabetesCare Inc' },
{ id: 6, name: 'Omeprazole 20mg', category: 'Proton Pump Inhibitor', quantity: 90, price: 15.00, reorderLevel: 35, expiryDate: '2026-02-28', supplier: 'GastroPharma' },
{ id: 7, name: 'Aspirin 75mg', category: 'Antiplatelet', quantity: 200, price: 3.50, reorderLevel: 60, expiryDate: '2026-06-30', supplier: 'CardioMeds' },
{ id: 8, name: 'Ciprofloxacin 500mg', category: 'Antibiotic', quantity: 25, price: 30.00, reorderLevel: 30, expiryDate: '2025-10-15', supplier: 'PharmaCorp' }
]);
const [sales] = useState([
{ id: 1, medicineId: 1, quantity: 10, totalAmount: 55, date: '2025-10-20', customer: 'John Doe' },
{ id: 2, medicineId: 3, quantity: 5, totalAmount: 43.75, date: '2025-10-21', customer: 'Jane Smith' },
{ id: 3, medicineId: 4, quantity: 8, totalAmount: 48, date: '2025-10-22', customer: 'Robert Brown' }
]);
const [purchases] = useState([
{ id: 1, medicineId: 2, quantity: 50, totalAmount: 1250, date: '2025-10-15', supplier: 'PharmaCorp' },
{ id: 2, medicineId: 5, quantity: 100, totalAmount: 1250, date: '2025-10-16', supplier: 'DiabetesCare Inc' }
]);
const [showMedicineForm, setShowMedicineForm] = useState(false);
const [editingMedicine, setEditingMedicine] = useState(null);
const handleSaveMedicine = (medicineData) => {
if (editingMedicine) {
setMedicines(medicines.map(m =>
m.id === editingMedicine.id ? { ...medicineData, id: m.id } : m
));
} else {
const newMedicine = {
...medicineData,
id: Math.max(...medicines.map(m => m.id), 0) + 1
};
setMedicines([...medicines, newMedicine]);
}
setShowMedicineForm(false);
setEditingMedicine(null);
};
const handleDeleteMedicine = (id) => {
if (window.confirm('Are you sure you want to delete this medicine? This action cannot be undone.')) {
setMedicines(medicines.filter(m => m.id !== id));
}
};
const handleEditMedicine = (medicine) => {
setEditingMedicine(medicine);
setShowMedicineForm(true);
};
const handleAddMedicine = () => {
setEditingMedicine(null);
setShowMedicineForm(true);
};
if (!user) {
return <Login onLogin={setUser} />;
}
return (
<div className="app-container">
{/* Navigation */}
<nav className="nav">
<div className="container">
<div style={{
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
height: '64px'
}}>
<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
<Package size={32} color="#4f46e5" />
<div>
<span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
PharmaCare
</span>
<p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
{user.name} • {user.role}
</p>
</div>
</div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {['dashboard', 'medicines', 'sales', 'purchases'].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '0.625rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: currentPage === page ? '#4f46e5' : 'transparent',
                color: currentPage === page ? 'white' : '#6b7280',
                cursor: 'pointer',
                textTransform: 'capitalize',
                fontWeight: '500',
                fontSize: '0.875rem',
                transition: 'all 0.2s'
              }}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setUser(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1rem',
            border: 'none',
            background: 'transparent',
            color: '#6b7280',
            cursor: 'pointer',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  </nav>

  {/* Main Content */}
  <main className="container">
    {currentPage === 'dashboard' && (
      <Dashboard medicines={medicines} sales={sales} purchases={purchases} />
    )}
    {currentPage === 'medicines' && (
      <MedicinesList
        medicines={medicines}
        onEdit={handleEditMedicine}
        onDelete={handleDeleteMedicine}
        onAdd={handleAddMedicine}
      />
    )}
    {currentPage === 'sales' && <Sales />}
    {currentPage === 'purchases' && <Purchases />}
  </main>

  {/* Medicine Form Modal */}
  {showMedicineForm && (
    <MedicineForm
      medicine={editingMedicine}
      onSave={handleSaveMedicine}
      onCancel={() => {
        setShowMedicineForm(false);
        setEditingMedicine(null);
      }}
    />
  )}
</div>
);
}
export default App;
