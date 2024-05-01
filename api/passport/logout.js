const AuthModel = require('../models/auth_model');


const logout_user = () => async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    await AuthModel.delete_token(req.db, token);
    res.status(200).json({message: 'User logged out successfully'})
}

module.exports = logout_user