"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const request_1 = __importDefault(require("request"));
const User = (userId) => {
    const options = {
        url: 'https://mafia42.com/api/user/user-info',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": userId
        })
    };
    return new Promise((resolve, reject) => {
        (0, request_1.default)(options, (err, res, body) => {
            if (err) {
                reject(err);
            }
            else {
                const data = JSON.parse(body);
                const userData = data.userData;
                const userStats = {
                    NICKNAME: userData.NICKNAME,
                    win_count: userData.win_count,
                    lose_count: userData.lose_count
                };
                resolve(JSON.stringify(userStats));
            }
        });
    });
};
exports.User = User;
