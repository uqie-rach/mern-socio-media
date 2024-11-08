"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = require("body-parser");
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var multer_1 = require("multer");
var helmet_1 = require("helmet");
var morgan_1 = require("morgan");
var path_1 = require("path");
var url_1 = require("url");
/** Configurations */
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("tiny"));
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)());
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "public/assets")));
/** FILE STORAGE */
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
/** MONGOOSE SETUP */
var PORT = process.env.PORT || 3001;
app.get("/api", function (req, res) {
    res.status(200).json("Hello World!");
});
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
