
const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const errorHandler = require('./src/errorHandler/globalErrorHandler.js');
const mainRouter = require('./src/routes/main.routes.js');

dotenv.config();

const app = express();
const port = 8092;
const DATABASE_URL = process.env.DATABASE_URL;


const allowedOrigins = [
    "http://localhost:5173",  // ✅ Local Development
    "http://localhost:5174",  // ✅ Local Development
    "http://localhost:8092", // ✅ local development

];


const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(origin)
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-refresh-token', 'x-user-role', 'x-verify-token'],
    optionsSuccessStatus: 204,
    preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(req.path)
    next()
})

// Logging middleware (after CORS)
app.use((req, res, next) => {
    console.log('Request received on server');
    next();
});

app.use('/', mainRouter);

app.get("/test", (req, res) => {
    res.json({ success: true, message: "checking wheather branching is working or not" })
})

app.use(errorHandler);

app.listen(port, () => {


    console.log(`Server listening on port ${port}`);
});
