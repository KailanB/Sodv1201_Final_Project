const express = require('express');

const router = express.Router();
const fs = require('fs');
const path = require('path');

const PROPERTIES_PATH = path.join(__dirname, 'data', 'properties.json');

module.exports = router;