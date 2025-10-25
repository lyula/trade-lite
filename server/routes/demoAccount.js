const express = require('express');
const router = express.Router();
const { createDemoAccount, getDemoAccountsByUser, deleteDemoAccount, getAllDemoAccounts } = require('../controllers/demoAccountController');
// GET /api/demo-accounts/all?page=1&limit=20&sort=createdAt
router.get('/all', getAllDemoAccounts);

// GET /api/demo-accounts (by userId)
router.get('/', getDemoAccountsByUser);

// POST /api/demo-accounts
router.post('/', createDemoAccount);

module.exports = router;

// DELETE /api/demo-accounts/:id
router.delete('/:id', deleteDemoAccount);
