"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
// Import Routes
const user_route_1 = __importDefault(require("./routes/user.route"));
const restaurant_route_1 = __importDefault(require("./routes/restaurant.route"));
const menu_route_1 = __importDefault(require("./routes/menu.route"));
const feedback_route_1 = __importDefault(require("./routes/feedback.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number.parseInt(process.env.PORT || "8000", 10);
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_URLS = ((_a = process.env.FRONTEND_URL) === null || _a === void 0 ? void 0 : _a.split(",")) || ["http://localhost:5173"];
//  Middleware Configuration
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//  CORS Configuration
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || FRONTEND_URLS.includes(origin)) {
            callback(null, true);
        }
        else {
            console.warn(`Blocked CORS request from origin: ${origin}`); //  Log blocked requests
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
};
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
//  Routes
app.use("/api/v1/user", user_route_1.default);
app.use("/api/v1/restaurant", restaurant_route_1.default);
app.use("/api/v1/menu", menu_route_1.default);
app.use("/api/v1/feedback", feedback_route_1.default);
//  Debugging: Log All Incoming Requests
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next();
});
//  Debugging: Log Registered Routes AFTER They're Loaded
setTimeout(() => {
    var _a;
    console.log("Registered Routes:");
    (_a = app._router) === null || _a === void 0 ? void 0 : _a.stack.forEach((r) => {
        if (r.route && r.route.path) {
            console.log(`[ROUTE] ${r.route.path}`);
        }
    });
}, 500);
//  Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({ message: err.message || "Internal Server Error" });
});
//  Log Received Cookies (For Debugging Auth Issues)
app.use((req, _res, next) => {
    console.log("Cookies received:", req.cookies);
    next();
});
// Server Configuration
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectDB_1.default)();
        if (NODE_ENV === "development") {
            //  Start HTTP Server
            http_1.default.createServer(app).listen(PORT, () => {
                console.log(`HTTP Server running at http://localhost:${PORT}`);
            });
            //  Start HTTPS Server (If Certificates Exist)
            try {
                const httpsOptions = {
                    key: fs_1.default.readFileSync("server.key"),
                    cert: fs_1.default.readFileSync("server.cert"),
                };
                https_1.default.createServer(httpsOptions, app).listen(PORT + 1, () => {
                    console.log(`HTTPS Server running at https://localhost:${PORT + 1}`);
                });
            }
            catch (error) {
                console.warn("⚠️ HTTPS certificates not found, running HTTP only.");
            }
        }
        else {
            //  Production Mode - HTTPS Only
            try {
                const httpsOptions = {
                    key: fs_1.default.readFileSync("server.key"),
                    cert: fs_1.default.readFileSync("server.cert"),
                };
                https_1.default.createServer(httpsOptions, app).listen(PORT, () => {
                    console.log(` Server running securely at https://localhost:${PORT}`);
                });
            }
            catch (error) {
                console.error(" Production HTTPS setup failed: Certificates missing.");
                process.exit(1);
            }
        }
    }
    catch (error) {
        console.error(" Failed to connect to the database:", error);
        process.exit(1);
    }
});
startServer();
