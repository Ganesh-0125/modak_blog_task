// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = mongoose.Schema({
//     username: {
//         type: String,
//         required: [true, "Username is required"],
//         unique: true
//     },
//     email: {
//         type: String,
//         required: [true, "Email is required"],
//         unique: true
//     },
//     password: {
//         type: String,
//         required: [true, "Password is required"]
//     },
//     role: {
//         type: String,
//         enum: ['user', 'manager', 'admin'],
//         default: 'user'
//     }
// }, { timestamps: true });

// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

// userSchema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);