import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import https from "https";
import fs from "fs";


// Import Routes
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import feedbackRoute from "./routes/feedback.route";


dotenv.config();


const app = express();
const PORT = Number.parseInt(process.env.PORT || "8000", 10);
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_URLS = process.env.FRONTEND_URL?.split(",") || ["http://localhost:5173"];


//  Middleware Configuration
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());


//  CORS Configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || FRONTEND_URLS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked CORS request from origin: ${origin}`); //  Log blocked requests
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));


//  Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/feedback", feedbackRoute);


//  Debugging: Log All Incoming Requests
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  next();
});


//  Debugging: Log Registered Routes AFTER They're Loaded
setTimeout(() => {
  console.log("Registered Routes:");
  app._router?.stack.forEach((r: any) => {
    if (r.route && r.route.path) {
      console.log(`[ROUTE] ${r.route.path}`);
    }
  });
}, 500);


//  Global Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});


//  Log Received Cookies (For Debugging Auth Issues)
app.use((req, _res, next) => {
  console.log("Cookies received:", req.cookies);
  next();
});


// Server Configuration
const startServer = async () => {
  try {
    await connectDB();


    if (NODE_ENV === "development") {
      //  Start HTTP Server
      http.createServer(app).listen(PORT, () => {
        console.log(`HTTP Server running at http://localhost:${PORT}`);
      });


      //  Start HTTPS Server (If Certificates Exist)
      try {
        const httpsOptions = {
          key: fs.readFileSync("server.key"),
          cert: fs.readFileSync("server.cert"),
        };
        https.createServer(httpsOptions, app).listen(PORT + 1, () => {
          console.log(`HTTPS Server running at https://localhost:${PORT + 1}`);
        });
      } catch (error) {
        console.warn("⚠️ HTTPS certificates not found, running HTTP only.");
      }
    } else {
      //  Production Mode - HTTPS Only
      try {
        const httpsOptions = {
          key: fs.readFileSync("server.key"),
          cert: fs.readFileSync("server.cert"),
        };
        https.createServer(httpsOptions, app).listen(PORT, () => {
          console.log(` Server running securely at https://localhost:${PORT}`);
        });
      } catch (error) {
        console.error(" Production HTTPS setup failed: Certificates missing.");
        process.exit(1);
      }
    }
  } catch (error) {
    console.error(" Failed to connect to the database:", error);
    process.exit(1);
  }
};


startServer();
