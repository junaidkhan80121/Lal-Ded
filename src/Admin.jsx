import React, { useEffect, useState } from 'react';
import './Admin.css';

const emptyPackageForm = {
  title: '',
  description: '',
  price: '',
  duration: '',
  category: 'leisure',
  imageUrl: '/assets/gulmarg.png',
  rating: '4.8',
  popular: false,
  highlights: '',
};

const Admin = () => {
  const [secret, setSecret] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [queries, setQueries] = useState([]);
  const [packages, setPackages] = useState([]);
  const [packageForm, setPackageForm] = useState(emptyPackageForm);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [error, setError] = useState('');
  const [packageMessage, setPackageMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingPackage, setIsSavingPackage] = useState(false);
  const [updatingBookingId, setUpdatingBookingId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) fetchData(secret);
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:8000/bookings', {
        headers: { secret }
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
      const [packagesRes, bookingsRes, queriesRes] = await Promise.all([
        fetch('http://localhost:8000/tours', { headers: { secret: validSecret } }),
        fetch('http://localhost:8000/bookings', { headers: { secret: validSecret } }),
        fetch('http://localhost:8000/queries', { headers: { secret: validSecret } })
      ]);

      if (packagesRes.ok) setPackages(await packagesRes.json());
      if (bookingsRes.ok) setBookings(await bookingsRes.json());
      if (queriesRes.ok) setQueries(await queriesRes.json());
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  const resetPackageForm = () => {
    setPackageForm(emptyPackageForm);
    setEditingPackageId(null);
    setPackageMessage('');
  };

  const handlePackageInput = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const packagePayload = () => ({
    ...packageForm,
    price: packageForm.price.trim(),
    rating: Number(packageForm.rating) || 4.8,
    highlights: packageForm.highlights
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean),
  });

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    setIsSavingPackage(true);
    setError('');
    setPackageMessage('');

    try {
      const isEditing = Boolean(editingPackageId);
      const res = await fetch(`http://localhost:8000/tours${isEditing ? `/${editingPackageId}` : ''}`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          secret,
        },
        body: JSON.stringify(packagePayload()),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to save package');
      }

      await fetchData(secret);
      resetPackageForm();
      setPackageMessage(isEditing ? 'Package updated successfully' : 'Package added successfully');
    } catch (err) {
      setError(err.message || 'Failed to save package');
    } finally {
      setIsSavingPackage(false);
    }
  };

  const handleEditPackage = (pkg) => {
    setEditingPackageId(pkg._id);
    setPackageMessage('');
    setPackageForm({
      title: pkg.title || pkg.name || '',
      description: pkg.description || '',
      price: String(pkg.price || ''),
      duration: pkg.duration || '',
      category: pkg.category || 'leisure',
      imageUrl: pkg.imageUrl || pkg.image || '/assets/gulmarg.png',
      rating: String(pkg.rating || '4.8'),
      popular: Boolean(pkg.popular),
      highlights: Array.isArray(pkg.highlights) ? pkg.highlights.join('\n') : '',
    });
  };

  const handleDeletePackage = async (packageId) => {
    const shouldDelete = window.confirm('Delete this package? This cannot be undone.');
    if (!shouldDelete) return;

    setError('');
    setPackageMessage('');

    try {
      const res = await fetch(`http://localhost:8000/tours/${packageId}`, {
        method: 'DELETE',
        headers: { secret },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to delete package');
      }

      setPackages((current) => current.filter((pkg) => pkg._id !== packageId));
      if (editingPackageId === packageId) resetPackageForm();
      setPackageMessage('Package deleted successfully');
    } catch (err) {
      setError(err.message || 'Failed to delete package');
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
          secret
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
    setPackages([]);
    resetPackageForm();
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

        {error && <div className="admin-error admin-page-error">{error}</div>}

        <div className="admin-section">
          <div className="admin-section-header">
            <div>
              <h2>Package Management</h2>
              <p>Add, edit, remove, and price tour packages shown on the Packages page.</p>
            </div>
          </div>

          <form className="package-form" onSubmit={handlePackageSubmit}>
            <div className="package-form-grid">
              <label>
                Package Name
                <input name="title" value={packageForm.title} onChange={handlePackageInput} required />
              </label>
              <label>
                Price
                <input name="price" value={packageForm.price} onChange={handlePackageInput} placeholder="₹12,999" required />
              </label>
              <label>
                Duration
                <input name="duration" value={packageForm.duration} onChange={handlePackageInput} placeholder="3 Days / 2 Nights" />
              </label>
              <label>
                Category
                <select name="category" value={packageForm.category} onChange={handlePackageInput}>
                  <option value="adventure">Adventure</option>
                  <option value="leisure">Leisure</option>
                  <option value="premium">Premium</option>
                  <option value="pilgrimage">Pilgrimage</option>
                </select>
              </label>
              <label>
                Image URL
                <input name="imageUrl" value={packageForm.imageUrl} onChange={handlePackageInput} placeholder="/assets/gulmarg.png" />
              </label>
              <label>
                Rating
                <input name="rating" type="number" min="1" max="5" step="0.1" value={packageForm.rating} onChange={handlePackageInput} />
              </label>
            </div>

            <label className="package-form-wide">
              Description
              <textarea name="description" value={packageForm.description} onChange={handlePackageInput} rows="3" />
            </label>

            <label className="package-form-wide">
              Highlights (one per line)
              <textarea name="highlights" value={packageForm.highlights} onChange={handlePackageInput} rows="4" />
            </label>

            <label className="package-checkbox">
              <input name="popular" type="checkbox" checked={packageForm.popular} onChange={handlePackageInput} />
              Mark as popular
            </label>

            <div className="package-form-actions">
              <button type="submit" className="admin-btn package-save-btn" disabled={isSavingPackage}>
                {isSavingPackage ? 'Saving...' : editingPackageId ? 'Update Package' : 'Add Package'}
              </button>
              {editingPackageId && (
                <button type="button" className="admin-secondary-btn" onClick={resetPackageForm}>Cancel Edit</button>
              )}
            </div>
            {packageMessage && <div className="admin-success">{packageMessage}</div>}
          </form>

          <div className="table-responsive package-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Package</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>No packages found</td></tr>
                ) : (
                  packages.map((pkg) => (
                    <tr key={pkg._id}>
                      <td>
                        <div className="package-cell">
                          <img src={pkg.imageUrl || pkg.image || '/assets/gulmarg.png'} alt="" />
                          <div>
                            <strong>{pkg.title || pkg.name}</strong>
                            {pkg.popular && <span className="popular-chip">Popular</span>}
                          </div>
                        </div>
                      </td>
                      <td>{pkg.category || 'leisure'}</td>
                      <td>{pkg.duration || '-'}</td>
                      <td>{pkg.price || '-'}</td>
                      <td>{pkg.rating || '-'}</td>
                      <td>
                        <div className="booking-actions">
                          <button type="button" className="booking-action-btn edit" onClick={() => handleEditPackage(pkg)}>Edit</button>
                          <button type="button" className="booking-action-btn reject" onClick={() => handleDeletePackage(pkg._id)}>Delete</button>
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
