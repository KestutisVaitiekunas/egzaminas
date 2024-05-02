const AuthModel = require('../models/auth_model');


const logout_user = () => async (req, res) => {
    try {
        const token = req.body.token.split(" ")[1];
        await AuthModel.delete_token(req.db, token);
        res.status(200).json({ login_status: false, data: { message: 'User logged out successfully' } })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = logout_user