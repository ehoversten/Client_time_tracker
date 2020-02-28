const express = require('express');
const PORT = process.env.PORT || 3000;

// Initialize an express instance
const app = express();

// middleware to serve up our static files
app.use(express.static("public"));

// -- ROUTES -- //
app.get('/', (req, res) => {
    res.send("Hi There");
})



app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
})