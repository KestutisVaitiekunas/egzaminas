
module.exports = {
    get_all: async (db) => {
        const q = "SELECT * FROM users ORDER BY username DESC";
        return await db.query(q);
    },
    get_by_id: async (db, id) => {
        const q = "SELECT * FROM users WHERE id = ?";
        return await db.query(q, [id]);
    },
    get_by_email: async (db, email) => {
        const q = "SELECT * FROM users WHERE email = ? LIMIT 1";
        return await db.query(q, [email]);
    },
    add: async (db, data) => {
        const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const result = await db.query(q, [
            data.username,
            data.email,
            data.hashed_password,
        ]);
        if (result) return result;
        else return false;
    },
    update_user: async (db, id, data) => {
        const q = "UPDATE users SET username = ?, email = ? WHERE id = ?";
        const result = await db.query(q, [
            data.username,
            data.email,
            id
        ]);
        if (result) return result;
        else return false;
    },
    update_password: async (db, id, password) => {
        const q = "UPDATE users SET password = ? WHERE id = ?";
        return await db.query(q, [password, id]);
    },
    delete: async (db, id) => {
        const q = "DELETE FROM users WHERE id = ?";
        return await db.query(q, [id]);
    },
}