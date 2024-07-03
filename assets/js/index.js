/* ========= 테마 =========*/
let darkTheme = false;
let lightbulb = document.querySelector('#themeCh')
const html = document.documentElement

if (!window.matchMedia("(prefers-color-scheme: dark)").matches)
  html.classList.add('dark')

lightbulb.onclick = () => {
  html.classList.toggle('dark')
}


/* ========= 획초 ========= */
let cntInterval = null
let isCounting = false
let preTot = 0
let preWin = 0
let preLose = 0

const receive = (userData) => {
  const { NICKNAME, win_count, lose_count } = userData
  
  document.getElementById('NICKNAME').textContent = NICKNAME

  preWin = win_count
  preLose = lose_count
  preTot = win_count + lose_count
}

const fetchUser = async () => {
  const name = document.getElementById('nameInput').value.trim()

  try {
    const response = await fetch(`/get/${name}`)
    if (!response.ok) {
      throw new Error('유저 정보를 가져오는 데 실패했습니다.');
    }

    const userData = await response.json()
    receive(userData)
  } catch (error) {
    console.error('Error:', error.message)
    alert('최후의 반론에 댓글을 달아주세요.')
    throw error
  }
}

const toggleCounting = async () => {
  if (!isCounting) {
    document.getElementById('nameInput').readOnly = true

    try {
      await fetchUser()
    } catch (error) {
      document.getElementById('nameInput').readOnly = false
      return
    }
    
    document.getElementById('cntButton').textContent = '중지하기'
    document.getElementById('cntButton').classList.add('stop')
    
    document.getElementById('status').style.display = 'block'
    startCounting()
  } else {
    document.getElementById('nameInput').readOnly = false
    stopCounting()
    document.getElementById('cntButton').textContent = '획초 시작하기'
    document.getElementById('cntButton').classList.remove('stop')

    document.getElementById('status').style.display = 'none'
  }
  isCounting = !isCounting
}

const startCounting = () => {
  cntInterval = setInterval(async () => {
    const NICKNAME = document.getElementById('NICKNAME').textContent.trim();
    if (NICKNAME) {
      try {
        const response = await fetch(`/get/${NICKNAME}`);
        if (!response.ok) {
          throw new Error('유저 정보를 가져오는 데 실패했습니다.');
        }
        const userData = await response.json();
        const { win_count, lose_count } = userData;
        const totalSum = win_count + lose_count;
        calcCount(totalSum, win_count, lose_count);
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  }, 0)
}

const stopCounting = () => {
  clearInterval(cntInterval)
}

const calcCount = (curTot, curWin, curLose) => {
  const cntTot = curTot - preTot;
  document.getElementById('counting').textContent = cntTot
  document.getElementById('winCnt').textContent = curWin - preWin
  document.getElementById('loseCnt').textContent = curLose - preLose

  if (+cntTot == 31) {
    document.getElementById('cntComplete').textContent = "획초 끝!"
  }
}