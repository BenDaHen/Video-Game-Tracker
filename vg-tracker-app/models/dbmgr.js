//Database
const sqlite = require('better-sqlite3')
const db = new sqlite("../tracker.db")
exports.db = db