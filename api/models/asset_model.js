
module.exports = {
    get_assets: async (db) => {
        const q = "SELECT * FROM assets";
        return await db.query(q);
    },
    get_asset_by_id: async (db, id) => {
        const q = "SELECT * FROM assets WHERE id = ? LIMIT 1";
        return await db.query(q, [id]);
    },
    add: async (db, data) => {
        const q = "INSERT INTO assets (title, user_id) VALUES (?, ?)";
        const result = await db.query(q, [data.title, data.id]);
        if (result) return result;
        else return false;
    },
    update: async (db, id, name) => {
        const q = "UPDATE assets SET title = ? WHERE id = ?";
        const result = await db.query(q, [name, id]);
        if (result) return result;
        else return false;
    },
    update_image: async (db, id, path) =>{
        const q = "UPDATE assets SET image = ? WHERE id = ?";
        return await db.query(q, [path, id]);
      },
    
    delete: async (db, id) => {
        const q = "DELETE FROM assets WHERE id = ?";
        const result = await db.query(q, [id]);
        if (result) return result;
        else return false;
    }
}