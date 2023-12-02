"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use("/", (_req, res) => {
    res.json({ ok: "ok" });
});
app.listen(80, () => {
    console.log(`Listening on http://localhost:80`);
});
//# sourceMappingURL=index.js.map