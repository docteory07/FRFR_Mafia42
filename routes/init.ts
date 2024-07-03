import { Router, Request, Response } from 'express'
import { Crawl } from '../api/counter/crawl'
import { User } from '../api/counter/user'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  res.render("index")
})

router.get('/api', (_: Request, res: Response) => {
  res.send('명룹풀강 마피아42 획초 카운터 API')
})

router.get('/get/:nickname', (req: Request, res: Response) => {
  const nickname = req.params.nickname

  // 닉네임으로 유저 정보 가져오기
  Crawl(nickname)
    .then((result: any) => {
      const userData = JSON.parse(result)
      const userId = userData.user_id

      // 유저의 승리 횟수와 패배 횟수 가져오기
      return User(userId)
    })
    .then((userStats: any) => {
      // JSON 형태로 응답
      res.status(200).json(JSON.parse(userStats))
    })
    .catch((error: Error) => {
      // 오류 발생 시 404 상태 코드와 메시지 응답
      res.status(404).send(error.message)
    })
})

export default router