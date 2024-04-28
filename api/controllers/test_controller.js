
const { get } = require('mongoose');
const TestModel = require('../models/test_model');

module.exports = {
    get: async (req, res) => {
        try {
            const assets = await TestModel.get_assets(req.db);
            res.json(assets); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
        
    add: async (req, res) => {
        //reikia validuoti duomenis
        const validated_data = "test Name";
        try{ 
            const new_user = await TestModel.add(req.db, validated_data);
            res.json(new_user);
        }catch (err) {
            res.send(err);
        }
    },
    addUser: async (req, res) => {
        try {
          // Extract name from request body or query parameters
          const { name } = req.body; // Assuming name is sent in the request body
          
          // Call the model function to add the user
          const result = await TestModel.add(req.db, name);
          
          // Check if the user was successfully added
          if (result) {
            // If successful, send a success response
            res.status(200).json({ message: 'User added successfully' });
          } else {
            // If not successful, send an error response
            res.status(500).json({ error: 'Failed to add user' });
          }
        } catch (error) {
          // If an error occurs, log the error and send an error response
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}