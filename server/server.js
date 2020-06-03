const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '..', 'build');
app.use(express.static(publicPath));



app.use(compression());

app.get('/*', function(req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});



