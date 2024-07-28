const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const FollowRequest = require('../models/FollowRequest');

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST /api/follow-request
router.post('/follow-request', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    console.log('Received data:', req.body);

    if (!isValidObjectId(senderId) || !isValidObjectId(receiverId)) {
      console.log('Invalid ObjectId:', { senderId, receiverId });
      return res.status(400).json({ message: 'Invalid ObjectId.' });
    }

    // The code here should execute if the above condition is not met
    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    const existingRequest = await FollowRequest.findOne({ sender: senderObjectId, receiver: receiverObjectId });

    if (existingRequest) {
      return res.status(400).json({ message: 'Follow request already exists.' });
    }

    const followRequest = new FollowRequest({ sender: senderObjectId, receiver: receiverObjectId });
    await followRequest.save();

    res.status(201).json({ message: 'Follow request sent.' });
  } catch (error) {
    console.error('Error sending follow request:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});



// GET /api/follow-requests
router.get('/follow-requests', async (req, res) => {
  try {
    const requests = await FollowRequest.find();
    res.status(200).json({ requests });
  } catch (error) {
    console.error('Error fetching follow requests:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/handle-request
router.post('/handle-request', async (req, res) => {
  try {
    const { requestId, status } = req.body;

    // Validate ObjectId
    if (!isValidObjectId(requestId)) {
      return res.status(400).json({ message: 'Invalid request ID.' });
    }

    // Validate status
    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    // Update follow request status
    const updatedRequest = await FollowRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Follow request not found.' });
    }

    res.status(200).json({ message: `Follow request ${status}.` });
  } catch (error) {
    console.error('Error handling follow request:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
