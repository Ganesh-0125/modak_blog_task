// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const config = require('../config');

// exports.protect = async (req, res, next) => {
//     try {
//         let token;
//         if (req.headers.authorization?.startsWith('Bearer')) {
//             token = req.headers.authorization.split(' ')[1];
//         }

//         if (!token) {
//             return res.status(401).json({ message: 'Not authorized' });
//         }

//         const decoded = jwt.verify(token, config.JWT_SECRET);
//         req.user = await User.findById(decoded.id).select('-password');
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Not authorized' });
//     }
// };

// exports.restrictTo = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ 
//                 message: 'You do not have permission to perform this action' 
//             });
//         }
//         next();
//     };
// };