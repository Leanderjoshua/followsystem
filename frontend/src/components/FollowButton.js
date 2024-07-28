import React from 'react';
import axios from 'axios';

const FollowButton = ({ senderId, receiverId }) => {
  const handleFollow = async () => {
    try {
      console.log('Sending follow request:', { senderId, receiverId });
      const response = await axios.post('http://localhost:5000/api/follow-request', { senderId, receiverId });
      alert(response.data.message);
    } catch (error) {
      console.error('Error in handleFollow:', error);
      alert('An error occurred.');
    }
  };

  return (
    <button onClick={handleFollow}>Follow</button>
  );
};

export default FollowButton;
