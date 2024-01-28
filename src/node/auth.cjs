// auth.cjs
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

function comparePasswords(inputPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(inputPassword, hashedPassword, (err, match) => {
            if (err) {
                reject(err);
            } else {
                resolve(match);
            }
        });
    });
}

function generateToken(username) {
    return jwt.sign({ username }, secretKey, { expiresIn: '1h' });
}

module.exports = { hashPassword, comparePasswords, generateToken };
