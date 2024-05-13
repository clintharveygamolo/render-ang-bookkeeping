import express from "express";
import sequelize from './util/database.js';
import User from './models/userModel.js';
import authRoutes from './routes/authRoute.js'
import createUserRoute from './routes/createUserRoute.js';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import getUserRoute from './routes/getUserRoute.js';
// import createCompanyRoute from './routes/createCompanyRoute.js';
import deleteUserRoute from './routes/deleteUserRoute.js';
import setAssociations from './util/dbAssociations.js';
import refreshTokenRoute from './routes/refreshTokenRoute.js';
import Deposit from "./models/depositsModel.js";

import depositsRoute from "./routes/depositsRoute.js";
import withdrawsRoute from "./routes/withdrawsRoute.js";

const app = express();
app.get("/", (req, res) => {
    res.send("Enter valid gateway");
});

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

setAssociations();

app.use('/api/auth', authRoutes);
app.use('/api/get', getUserRoute);
app.use('/api', createUserRoute);
app.use('/api/user', deleteUserRoute);

app.use('/api/auth/Deposits', depositsRoute);
app.use('/api/auth/Withdrawals', withdrawsRoute);

// Routes
const port = 9000;

try {
    await sequelize.sync({ force: true });

    // USERS
    const adminPass = await bcrypt.hash("adminpass", 12);
    await User.create({
        name: "Clint Harvey Gamolo",
        password: adminPass,
        role: "Admin"
    });
    const userPass = await bcrypt.hash("userpass", 12);
    await User.create({
        name: "Troy Red Demafeliz",
        password: userPass,
        role: "User"
    })


    const employeePass = await bcrypt.hash("employeepass", 12);
    await User.create({
        name: "Stephen Dave Ang",
        password: employeePass,
        role: "Employee"
    });

    const viewerPass = await bcrypt.hash("viewerpass", 12);
    await User.create({
        name: "Din Shane Magallanes",
        password: viewerPass,
        role: "Viewer"
    });

    const troyPass = await bcrypt.hash("troypass", 12);
    await User.create({
        name: "Adriane Troy Roa",
        password: troyPass,
        role: "Employee"
    });

    app.listen(port);
    console.log("Listening on port ", port);
} catch (error) {
    console.error(error);
}

export default app;