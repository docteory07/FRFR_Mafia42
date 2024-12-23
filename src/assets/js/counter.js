let cntInterval = null
let isCounting = false
let preTot = 0
let preWin = 0
let preLose = 0
let tmpCnt = 0

const _status = document.getElementById('status')
const _cntBtn = document.getElementById('cntButton')
const _clcButtns = document.getElementsByClassName('cntClcButton')

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
    const response = await fetch(`/api/get/${name}`)
    if (!response.ok) {
      throw new Error('유저 정보를 가져오는 데 실패했습니다.');
    }

    const userData = await response.json()
    receive(userData)
  } catch (error) {
    throw error
  }
}

const toggleCounting = async () => {
  const $name = document.getElementById('nameInput')
  if (!$name.value) {
    alert('닉네임을 입력해주세요.')
    return
  } else {
    if (!isCounting) {
      $name.readOnlwy = true
      
      try {
        await fetchUser()
      } catch (error) {
        $name.readOnly = false
        
        alert('최후의 반론에 댓글을 달아주세요.')
        return
      }
      
      _cntBtn.textContent = '중지하기'
      _cntBtn.classList.add('stop')
      
      _status.style.display = 'block'
      _clcButtns[0].style.display = 'inline-block'
      _clcButtns[1].style.display = 'inline-block'
      startCounting()
    } else {
      $name.readOnly = false
      stopCounting()
      _cntBtn.textContent = '시작하기'
      _cntBtn.classList.remove('stop')
      
      _status.style.display = 'none'
      _clcButtns[0].style.display = 'none'
      _clcButtns[1].style.display = 'none'
    }
    isCounting = !isCounting
  }
}

const startCounting = () => {
  cntInterval = setInterval(async () => {
    const NICKNAME = document.getElementById('NICKNAME').textContent.trim();
    if (NICKNAME) {
      const response = await fetch(`/api/get/${NICKNAME}`);
      if (!response.ok) {
        throw new Error('유저 정보를 가져오는 데 실패했습니다.');
      }
      const userData = await response.json();
      const { win_count, lose_count } = userData;
      const totalSum = win_count + lose_count + tmpCnt;
      calcCount(totalSum, win_count, lose_count);
    }
  }, 1000)
}

const stopCounting = () => {
  clearInterval(cntInterval)
  tmpCnt = 0
}

const cntClc = (val) => {
  tmpCnt += val
}

const calcCount = (curTot, curWin, curLose) => {
  const cntTot = curTot - preTot;
  document.getElementById('counting').textContent = cntTot + 1
  document.getElementById('winCnt').textContent = curWin - preWin
  document.getElementById('loseCnt').textContent = curLose - preLose

  if (+cntTot == 30) {
    document.getElementById('cntComplete').textContent = "획초 막판!"
  } else if (+cntTot == 31) {
    document.getElementById('cntComplete').textContent = "획초 끝!"
  }
}