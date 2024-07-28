import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FollowButton from './components/FollowButton';
import FollowRequests from './components/FollowRequests';

function App() {
  const senderId = 'yourSenderId'; // Replace with actual sender ID
  const receiverId = 'yourReceiverId'; // Replace with actual receiver ID

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/follow" element={<FollowButton senderId={senderId} receiverId={receiverId} />} />
        <Route path="/requests" element={<FollowRequests />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
