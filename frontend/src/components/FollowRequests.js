import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FollowRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/follow-requests');
        setRequests(response.data.requests);
      } catch (error) {
        setError('Failed to fetch requests. Please try again later.');
        console.error(error);
      }
    };

    fetchRequests();
  }, []);

  const handleRequest = async (requestId, status) => {
    try {
      const response = await axios.post('http://localhost:5000/api/handle-request', { requestId, status });
      alert(response.data.message);
      setRequests(requests.filter(req => req._id !== requestId));
    } catch (error) {
      setError('Failed to handle request. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {requests.length === 0 ? (
        <p>No follow requests available.</p>
      ) : (
        requests.map(request => (
          <div key={request._id}>
            <p>{request.sender.username} wants to follow you.</p>
            <button onClick={() => handleRequest(request._id, 'accepted')}>Accept</button>
            <button onClick={() => handleRequest(request._id, 'declined')}>Decline</button>
          </div>
        ))
      )}
    </div>
  );
};

export default FollowRequests;
