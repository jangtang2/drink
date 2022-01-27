const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [];

function calResult() {
  var keyArray = [
    { name: 'intj', key: 0 },
    { name: 'intp', key: 1 },
    { name: 'infj', key: 2 },
    { name: 'infp', key: 3 },
    { name: 'istj', key: 4 },
    { name: 'istp', key: 5 },
    { name: 'isfj', key: 6 },
    { name: 'isfp', key: 7 },
    { name: 'entj', key: 8 },
    { name: 'entp', key: 9 },
    { name: 'enfj', key: 10 },
    { name: 'enfp', key: 11 },
    { name: 'estj', key: 12 },
    { name: 'estp', key: 13 },
    { name: 'esfj', key: 14 },
    { name: 'esfp', key: 15 },
  ]
  var pointArray = [
    {
      name: 'i',
      value: 0,
    },
    {
      name: 'e',
      value: 0,
    },
    {
      name: 'n',
      value: 0,
    },
    {
      name: 's',
      value: 0,
    },
    {
      name: 't',
      value: 0,
    },
    {
      name: 'f',
      value: 0,
    },
    {
      name: 'j',
      value: 0,
    },
    {
      name: 'p',
      value: 0,
    }
  ]
  /*
  for(let i = 0; i < endPoint; i++){
    var target = qnaList[i].a[select[i]];
    for(let j = 0; j < target.type.length; j++){
      for(let k = 0; k < pointArray.length; k++){
        if(target.type[j] === pointArray[k].name){
          pointArray[k].value += 1;
        }
      }
    }
  }
  */
  for (let i = 0; i < endPoint; i++) {
    var target = qnaList[i].a[select[i]];
    for (let k = 0; k < pointArray.length; k++) {
      if (target.type === pointArray[k].name) {
        pointArray[k].value += 1;
      }
    }
  }
  console.log(pointArray);
  /*
    var resultArray = pointArray.sort(function (a, b){
      if(a.value > b.value){
        return -1;
      }
      if(a.value > b.value){
        return 1;
      }
      return 0;
    });
    */
  var resultArray = [0, 0, 0, 0];
  for(let j = 0; j < 4; j++) {
    if (pointArray[j*2].value > 1) {
      resultArray[j] = pointArray[j*2].name;
    }
    else{
      resultArray[j] = pointArray[(j*2)+1].name;
    }
  }

  console.log(resultArray);
  let resultword = resultArray.join('');
  for(let s = 0; s < 16; s++) {
    if (resultword === keyArray[s].name) {
      console.log(s);
      return s;
    }
  }
}

function setResult(){
  let point = calResult();

  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 0.5s";
  qna.style.animation = "fadeOut 0.5s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 0.5s";
    result.style.animation = "fadeIn 0.5s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 200);
  });
  console.log(select);
  setResult();
}

function addAnswer(answerText, qIdx, idx) {
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('mx-auto');
  answer.classList.add('my-3');
  answer.classList.add('py-5');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function() {
    var children = document.querySelectorAll('.answerList');
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      select[qIdx] = idx;
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 400)
  }, false);
}

function goNext(qIdx) {
  if (qIdx === endPoint) {
    goResult();
    return;
  }
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100 / endPoint) * (qIdx + 1) + '%';
}

function begin() {
  main.style.WebkitAnimation = "fadeOut 0.5s";
  main.style.animation = "fadeOut 0.5s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 0.5s";
    qna.style.animation = "fadeIn 0.5s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 200);
    let qIdx = 0;
    goNext(qIdx);
  }, 200);
}
