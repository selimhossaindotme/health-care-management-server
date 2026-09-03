import cors from "cors";
import express, { type Request, type Response } from "express";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import notFound from "./app/middleware/notFound.js";
import router from "./app/routes/index.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}));

// parser
app.use(express.json());

// routes
app.use("/api/v1", router );


app.get("/", (req: Request, res: Response) => {
    res.send({
        message: "Welcome to the HealthCare Management API"
    })
})

app.use(globalErrorHandler);
app.use(notFound);

export default app;