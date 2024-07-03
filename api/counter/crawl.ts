import request from 'request'

export const Crawl = (nickname?: string) => {
  const options = {
    url: 'https://mafia42.com/comment/show-lastDiscussion',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: {
        article_id: '1014182',
        value: 0
      }
    })
  }

  return new Promise<string>((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        const data = JSON.parse(body)

        if (nickname) {
          const user = data.commentData.find((comment: any) => comment.nickname === nickname)
          if (user) {
            resolve(JSON.stringify(user))
          } else {
            reject(new Error(`해당 닉네임의 사용자를 찾을 수 없습니다.`))
          }
        } else {
          resolve(body)
        }
      }
    })
  })
}