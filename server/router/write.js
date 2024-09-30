const express = require('express');
const pool = require('../db');
const path=require('path');
const multer=require('multer');
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');  // Directory for storing uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);  // Unique file name
    }
  });
  
  // Define multer middleware with storage and additional options
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1 *1024* 1024 },  // Limit file size to 50 KB
    fileFilter: function (req, file, cb) {
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(new Error('Only images are allowed!'));
      }
    }
  });
  
  // Route for handling blog submission
  router.post('/submit-blog', (req, res) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        // Handle file upload errors
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).send('File size is too large. Max limit is 50KB.');
          }
          // Handle other multer errors
          return res.status(400).send(`Multer error: ${err.message}`);
        } else if (err) {
          // Handle invalid file type errors or other custom errors
          return res.status(400).send(`Error: ${err.message}`);
        }
      }
  
      try {
        const { title, content } = req.body;
        const userId = req.user.id;  // user ID is stored in session
  
        // Get image filename from multer
        const imageFileName = req.file ? req.file.filename : null;
  
        // Insert the blog data into the database
        const query = `
          INSERT INTO blogs (title, content, image, user_id)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `;
        const values = [title, content, imageFileName, userId];
  
        const result = await pool.query(query, values);
        res.redirect('/blogs');  // Redirect to the blog list or a success page
      } catch (error) {
        console.error('Error uploading blog:', error);
        res.status(500).send('Error uploading blog');
      }
    });
  });
  module.exports = router;