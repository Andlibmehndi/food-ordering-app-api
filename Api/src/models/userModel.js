import { Schema, model } from 'mongoose';
//import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: { type: Schema.Types.String, unique: true },
    password: Schema.Types.String,
});

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next()
//     }
//     else {
//         const hashedPassword = await bcrypt.hash(this.password, 10)
//         this.password = hashedPassword;
//         next();
//     }
// }, (error) => {
//     next(error)
// });

const UserModel = model('users', userSchema);

export default UserModel;