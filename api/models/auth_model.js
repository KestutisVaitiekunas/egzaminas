module.exports = {
    register_user: async (db, data) => {
        const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const result = await db.query(q, [
            data.username,
            data.email,
            data.hashed_password,
        ]);
        if (result) return result;
        else return false;
    },
    get_all_tokens: async (db) => {
        const q = "SELECT * FROM tokens";
        return await db.query(q);
    },
    get_token: async (db, token) => {
        const q = "SELECT * FROM tokens WHERE token = ?";
        return await db.query(q, [token]);
    },
    get_token_by_user_id: async (db, id) => {
        const q = "SELECT * FROM tokens WHERE user_id = ?";
        return await db.query(q, [id]);
    },
    insert_token: async (db, data) => {
        const q = "INSERT INTO tokens (token, user_id) VALUES (?, ?)";
        const result = await db.query(q, [
            data.token,
            data.user_id
        ]);
        if (result) return result;
        else return false;
    },
    update_token: async (db, data) => {
        const q = "UPDATE tokens SET token = ? WHERE user_id = ?";
        return await db.query(q, [
            data.token,
            data.user_id
        ]);
    },
    delete_token: async (db, id) => {
        const q = "DELETE FROM tokens WHERE user_id = ?";
        return await db.query(q, [id]);
    },
}