import express, { Application, Request, Response, NextFunction } from 'express'
import path from 'path'
import router from '../routes/init'
import cors from 'cors'

const app: Application = express()
const port = process.env.PORT || 5000

// CORS 미들웨어 추가
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/assets')))

app.use('/api', router)
app.get('/', (req: Request, res: Response) => {
  res.render('index')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('잘못 짰다!')
})

// 서버 시작
app.listen(port, () => {
  console.log(`
  ########################################
  # 🛡️  Server listening on port: ${port}🛡️   #
  ########################################`)
})
