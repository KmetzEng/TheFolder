const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const secrets = require('./Secrets');

/* MIDDLEWARE */
app.use(express.json());
app.use(cors());

/* ROUTES */
app.use('/recipes', require('./routes/recipes'))

/* MONGODB SETUP */
mongoose.connect(`mongodb+srv://${secrets.DB_USERNAME}:${secrets.DB_PASSWORD}@thebinder.bzlyz.mongodb.net/recipeList?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

/* START SERVER */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.....`);
});