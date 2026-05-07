import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [secret, setSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [updatingBookingId, setUpdatingBookingId] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Test the secret by fetching bookings
      const res = await fetch('http://localhost:8000/bookings', {
        headers: { 'secret': secret }
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        fetchData(secret);
      } else {
        setError('Invalid Admin Password');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (validSecret) => {
    try {
      const [bookingsRes, queriesRes] = await Promise.all([
        fetch('http://localhost:8000/bookings', { headers: { 'secret': validSecret } }),
        fetch('http://localhost:8000/queries', { headers: { 'secret': validSecret } })
      ]);

      if (bookingsRes.ok && queriesRes.ok) {
        const bookingsData = await bookingsRes.json();
        const queriesData = await queriesRes.json();
        setBookings(bookingsData);
        setQueries(queriesData);
      }
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const handleBookingStatus = async (bookingId, nextStatus) => {
    setUpdatingBookingId(bookingId);
    setError('');

    try {
      const res = await fetch(`http://localhost:8000/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'secret': secret
        },
        body: JSON.stringify({ status: nextStatus })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to update booking');
      }

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: nextStatus } : booking
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to update booking');
    } finally {
      setUpdatingBookingId(null);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSecret('');
    setBookings([]);
    setQueries([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div className="admin-login-wrapper">
          <div className="admin-login-card">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                className="admin-input" 
                placeholder="Enter Admin Password" 
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
              />
              <button type="submit" className="admin-btn" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Access Dashboard'}
              </button>
              {error && <div className="admin-error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="admin-section">
          <h2>Recent Bookings</h2>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Tour ID</th>
                  <th>People</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr><td colSpan="8" style={{textAlign: 'center', padding: '30px'}}>No bookings found</td></tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b._id}>
                      <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td>{b.fname} {b.lname}</td>
                      <td>{b.email}</td>
                      <td>{b.phone}</td>
                      <td>{b.tourId}</td>
                      <td>{b.numberOfPeople}</td>
                      <td><span className={`status-badge ${(b.status || '').toLowerCase()}`}>{b.status}</span></td>
                      <td>
                        <div className="booking-actions">
                          <button
                            type="button"
                            className="booking-action-btn accept"
                            onClick={() => handleBookingStatus(b._id, 'Accepted')}
                            disabled={updatingBookingId === b._id || b.status === 'Accepted'}
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            className="booking-action-btn reject"
                            onClick={() => handleBookingStatus(b._id, 'Rejected')}
                            disabled={updatingBookingId === b._id || b.status === 'Rejected'}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-section">
          <h2>Customer Queries</h2>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {queries.length === 0 ? (
                  <tr><td colSpan="4" style={{textAlign: 'center', padding: '30px'}}>No queries found</td></tr>
                ) : (
                  queries.map((q) => (
                    <tr key={q._id}>
                      <td>{q.fname} {q.lname}</td>
                      <td>{q.email}</td>
                      <td>{q.phone}</td>
                      <td>{q.query}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;
