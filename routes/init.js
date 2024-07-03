"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crawl_1 = require("../api/counter/crawl");
const user_1 = require("../api/counter/user");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.render("index");
});
router.get('/api', (_, res) => {
    res.send('명룹풀강 마피아42 획초 카운터 API');
});
router.get('/get/:nickname', (req, res) => {
    const nickname = req.params.nickname;
    // 닉네임으로 유저 정보 가져오기
    (0, crawl_1.Crawl)(nickname)
        .then((result) => {
        const userData = JSON.parse(result);
        const userId = userData.user_id;
        // 유저의 승리 횟수와 패배 횟수 가져오기
        return (0, user_1.User)(userId);
    })
        .then((userStats) => {
        // JSON 형태로 응답
        res.status(200).json(JSON.parse(userStats));
    })
        .catch((error) => {
        // 오류 발생 시 404 상태 코드와 메시지 응답
        res.status(404).send(error.message);
    });
});
exports.default = router;
