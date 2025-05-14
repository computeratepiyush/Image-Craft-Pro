const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// We'll add compression endpoint later

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
