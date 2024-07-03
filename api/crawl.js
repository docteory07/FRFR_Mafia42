"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crawl = void 0;
const request_1 = __importDefault(require("request"));
const Crawl = (nickname) => {
    const options = {
        url: 'https://mafia42.com/comment/show-lastDiscussion',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: {
                article_id: '1014118',
                value: 0
            }
        })
    };
    return new Promise((resolve, reject) => {
        (0, request_1.default)(options, (err, res, body) => {
            if (err) {
                reject(err);
            }
            else {
                const data = JSON.parse(body);
                if (nickname) {
                    const user = data.commentData.find((comment) => comment.nickname === nickname);
                    if (user) {
                        resolve(JSON.stringify(user));
                    }
                    else {
                        reject(new Error(`해당 닉네임의 사용자를 찾을 수 없습니다.`));
                    }
                }
                else {
                    resolve(body);
                }
            }
        });
    });
};
exports.Crawl = Crawl;
