import request from 'request'

export const User = (userId: number) => {
  const options = {
    url: 'https://mafia42.com/api/user/user-info',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "id": userId
    })
  }

  return new Promise<string>((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        const data = JSON.parse(body)
        const userData = data.userData

        const userStats = {
          NICKNAME: userData.NICKNAME,
          win_count: userData.win_count,
          lose_count: userData.lose_count
        }

        resolve(JSON.stringify(userStats))
      }
    })
  })
}