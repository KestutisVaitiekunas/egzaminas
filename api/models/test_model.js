
module.exports = {
    get_assets: async (db) => {
        const q = "SELECT * FROM users";
        return await db.query(q);
    },
    get_asset_by_id: async (db, id) => {
        const q = "SELECT * FROM users WHERE id = ?";
        return await db.query(q, [id]);
    },
    add: async (db, name) => {
        const q = "INSERT INTO users (name) VALUES (?)";
        const result = await db.query(q, [name]);
        if (result) return result;
        else return false;
    },
    update: async (db, id, name) => {
        const q = "UPDATE users SET name = ? WHERE id = ?";
        const result = await db.query(q, [name, id]);
        if (result) return result;
        else return false;
    },
    delete: async (db, id) => {
        const q = "DELETE FROM users WHERE id = ?";
        const result = await db.query(q, [id]);
        if (result) return result;
        else return false;
    }
}