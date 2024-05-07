
module.exports = {
    get_events: async (db) => {
        const q = "SELECT * FROM events";
        return await db.query(q);
    },
    get_event_by_id: async (db, id) => {
        const q = "SELECT * FROM events WHERE id = ? LIMIT 1";
        return await db.query(q, [id]);
    },
    add: async (db, data) => {
        const q = "INSERT INTO events (title, location, description, image, categories_id, users_id) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await db.query(q, [
            data.title,
            data.location,
            data.description,
            data.image,
            data.categories_id,
            data.users_id,
        ]);
        if (result) return result;
        else return false;
    },
    update: async (db, id, name) => {
        const q = "UPDATE events SET title = ? WHERE id = ?";
        const result = await db.query(q, [name, id]);
        if (result) return result;
        else return false;
    },
    update_image: async (db, id, path) =>{
        const q = "UPDATE events SET image = ? WHERE id = ?";
        return await db.query(q, [path, id]);
      },
    
    delete: async (db, id) => {
        const q = "DELETE FROM events WHERE id = ?";
        const result = await db.query(q, [id]);
        if (result) return result;
        else return false;
    },
    get_categories: async (db) => {
        const q = "SELECT * FROM categories";
        return await db.query(q);
    }
}