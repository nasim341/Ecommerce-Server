const { readdirSync } = require("fs");
const path = require("path")
const app = express("express");
const helmet = require('helmet');
const mongoose = require("mongoose");
require("dontenv").confi();
const morgan = require("morgan");
const cors = require('cors');

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet())

//routes
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))

//server
const port = process.env.PORT || 5000;

//Connect to DB and start server
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        app.listen(port, () => {
            console.log(`Servre Running o Port ${port}`);
        });
    })
    .catch((err) => console.log(err));