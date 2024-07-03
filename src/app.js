"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const init_1 = __importDefault(require("../routes/init"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express_1.default.static(path_1.default.join(__dirname, '../assets')));
app.use('/', init_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('잘못 짰다!');
});
app.listen(port, () => {
    console.log(`
  ########################################
  # 🛡️  Server listening on port: ${port} 🛡️  #
  ########################################
  `);
});
