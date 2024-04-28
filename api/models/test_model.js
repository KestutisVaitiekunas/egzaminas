

module.exports = {
    get_assets: async (db) => {
            const q = "SELECT * FROM users";
            return await db.query(q);
    },
    add: async (db, name) => {
        const q = "INSERT INTO users (name) VALUES (?)";
        const result = await db.query(q, [name]);
        if (result) return result;
        else return false;
    }
}