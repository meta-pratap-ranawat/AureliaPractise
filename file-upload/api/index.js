const express = require('express');
const multer = require('multer');
const cors = require('cors');

const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());

app.post('/attachments', upload.array('images'), (req, res, next) => {
    if (req.files) {
        return res.json({ message: `${req.files.length} Files uploaded successfully` });
    }
    return res.json({ message: 'Missing files' });
});

app.listen(3000, () => console.log('Server listening at: localhost:3000'));