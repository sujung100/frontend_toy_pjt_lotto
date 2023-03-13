const currentYear = 2023;
let birthYear = prompt(
  "복권 및 복권기금법 제5조제3항에 의거하여 만 19세 미만의 미성년자에게 복권을 판매할 수 없습니다.성인인증을 위해 태어난 연도를 입력해주시기 바랍니다.",
  "예: 1999"
);
let age = currentYear - birthYear + 1;

if (age > 19) {
  alert("성인 확인되었습니다.");
} else {
  alert("죄송합니다. 성인 인증에 실패하여 페이지 접속이 불가합니다.");
}
// 이수현씨: 
// 1. 랜덤 번호 생성 메소드를 활용해 1~45 사이 숫자를 생성하고, 이를 0.5초 간격으로 생성시켜 일렬로 배열한다.
// 2. bonus 구는 맨 마지막에 한 단계 아래에 배치한다.
// 3. 각 숫자/구를 생성하는 for문(반복문)에 색을 입히는 알고리즘을 추가한다.
// 3-2. 색을 입히는 알고리즘에 넣을 value는, function()으로 따로 빼서 나온 랜덤 숫자값에 따른 색 값(if_else if 조건문)을 통해 도출해낸다.
// 4. input 창을 만든 뒤, 7개 숫자를 입력시킨 뒤 '확인' 버튼을 누르면 일치 결과 확인 => 확인을 누를 때까지 로또 번호구가 나오지 않도록 조치(break문 활용).
// 5. '확인' 버튼을 누른 뒤, 정확히 4000ms 뒤에 당첨 여부 (1~4등)을 textContent 수정으로 표시한다.

// DOM 요소 식별자(변수) 정의. Kkm: 이하 numList까진 이벤트 활용의 4-5-4 예시를 복붙함.

const closeBtn = modal.querySelector(".close-area");
closeBtn.addEventListener("click", (e) => {
  modal.style.display = "none";
});

let inputNums = document.querySelector("#userNums");
const btnConfirm = document.querySelector("#userBtn");
let numsWinorNot = document.querySelector("#WinorNot");
let interSect = [];
let ballData = [];

const candidate = Array(45)
  .fill()
  .map((v, i) => i + 1); // 1부터 45까지의 숫자를 각각 값으로 뽑아 만든 배열.

const shuffle = [];
let random = 0;
while (candidate.length > 0) {
  random = Math.floor(Math.random() * candidate.length); // 무작위 인덱스 뽑기
  const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어 있음
  const value = spliceArray[0]; // 배열에 들어 있는 값을 꺼내어 (왜냐면 한번 뽑힌 숫자는 다시 안뽑히니까!)
  shuffle.push(value); // shuffle 배열에 넣기
}
console.log(shuffle);
let winBalls = shuffle.slice(0, 6).sort((a, b) => a - b); // 오름차순, shuffle의 0번째부터 6번째 요소까지의 배열만 잘라서 대입시킴.
let bonus = shuffle[6]; // 7번째 숫자
console.log(winBalls, bonus);

// 입력한 숫자 배열로 만들기
btnConfirm.addEventListener("click", () => {
  console.log(inputNums.value);
  let numList = inputNums.value;
  numList = numList.split(",");
  console.log(numList);

  // 배열 요소가 문자형 숫자를 숫자형 숫자로 변환
  numList = numList.map((str_num) => {
    console.log(str_num);
    console.log(Number(str_num));
    return Number(str_num);

    // Kkm: 배열 numList(사용자 입력 값)와 배열 winBalls(랜덤 생성 값)의 교집합의 갯수에 따라 1,2,3,4, 꽝이 결정된다.
    // 1등은 전부, 2등은 6개, 3등은 5개, 4등은 4개, 꽝은 그 미만이다.
    // 현재 shuffle에서 잘려나온 7개 값들은 winBalls(6개)와 bonus(1개)로 나뉘어져있다. 변수를 하나 둬 합쳐둔 배열을 만들자.
    // 참고로 bonus는 array가 아니라 number이다. const bonus = shuffle[6]; 에서 개별 숫자값으로 정의되었다는 의미.
  });
  const newArr = [...winBalls, bonus]; // 배열과 number를 하나의 배열로 합친다.
  let intersection = numList.filter((x) => newArr.includes(x)); // numList와 newArr의 교집합 값 갯수.
  console.log(intersection);
  interSect = intersection;
  ballData = newArr;
  console.log(ballData)
  dataScale(ballData);
  // 공이 나타나는 시간대 조정
  // 버튼을 누른 뒤 drawBall이 실행되도록, setTimeout 함수들을 전부 btnConfirm.addEventListener 안에 기입한다.
  for (let i = 0; i < winBalls.length; i++) {
    setTimeout(() => {
      drawBall(winBalls[i], i);
    }, (i + 1) * 500);
  }

  // 보너스 공이 나타나는 시간대 지정
  // const $bonus = document.querySelector("#bonus");
  setTimeout(() => {
    drawBall2(bonus);
  }, 3500);

  // 이제 교집합 값을 담은 배열 intersection을 전역변수인 numWinorNot에 적용시키자(덤으로 4800ms 뒤 결과가 표시되도록):

  setTimeout(() => {
    switch (interSect.length) {
      case 7:
        numsWinorNot.textContent =
          "1등입니다! 로또 당첨을 축하드립니다! 당신은 행운의 주인공입니다.";
        break;
      case 6:
        numsWinorNot.textContent = "2등입니다! 로또 당첨을 축하드립니다!";
        break;
      case 5:
        numsWinorNot.textContent = "3등입니다! 로또 당첨을 축하드립니다!";
        break;
      case 4:
        numsWinorNot.textContent = "4등입니다! 로또 당첨을 축하드립니다!";
        break;
      default:
        numsWinorNot.textContent = "아쉽게도 꽝입니다. 다음 기회를 노려주세요.";
        break;
    }
    
  }, 4000);
});

// 더 이상 div를 추가하는 방식으로 하지 않으므로 아래 코드는 제외시킬 수 있다.
// let $result = document.querySelector("#result");

let drawBall = (number, index) => {
  let IdName = `get${index + 1}`;
  console.log(IdName);
  let element = document.getElementById(`get${index + 1}`);
  console.log(element);
  element.classList.add("coin");
  element.addEventListener("click", function () {
    element.classList.remove("coin");
    element.classList.add("ball");
    
    element.textContent = number;
    element.style.backgroundColor = ColorScale(number); 
    // Kkm: number값에 따른 색상을 도출하는 함수.
    
  })
};

// bonus 구를 위한 별개 선언.
let drawBall2 = (number, index) => {
  let element2 = document.getElementById("get7");
  console.log(element2);
  element2.classList.add("coin");
  element2.addEventListener("click", function () {
    element2.classList.remove("coin");
    element2.classList.add("ball");
    
    element2.textContent = number;
    element2.style.backgroundColor = ColorScale(number); 
    // Kkm: number값에 따른 색상을 도출하는 함수.
  })
  
};

/* 
Kkm: 넣고자 하는 색상값을 출력하는 함수. 안의 colors 배열엔 미리 기입해둔 색상값들이 들어있다.
위의 drawBall() 함수 안의 number 변수에 대응하는 ColorScale()의 num. 
고로 차출된 구의 숫자값에 따라 다른 색깔이 배정되게 된다. 10단위는 임의로 나눈 값 */
let ColorScale = (num) => {
  const colors = ["#F5EAEA", "#FFB84C", "#F16767", "#A459D1", "#4524ff"];
  if (num <= 10) {
    return colors[0];
  } else if (num <= 20 && num > 10) {
    return colors[1];
  } else if (num <= 30 && num > 20) {
    return colors[2];
  } else if (num <= 40 && num > 30) {
    return colors[3];
  } else if (num <= 45 && num > 40) {
    return colors[4];
  }
};

// 입구 페이지가 별개로 필요하고, 그 입구 페이지에서 로또 페이지로 들어가는 기능을 추가해야 함.
// 초기화 버튼 제공<- input창에 입력한 값 고정. input창 내용을 임의로 설정 가능할 경우 초기화의 의미 퇴색.
// 초기화 기능:
// 초기화 3회째에 if_else 조건문으로 alert 경고문과 함께 페이지에서 틩겨나감 + 입구 페이지로 입장. or 초기화 버튼을 눌러도 alert창만 뜰 뿐 초기화 불가.

let count = 0;
btnRefresh = document.querySelector("#refresh");
btnRefresh.addEventListener("click", () => {
  for (i = 1; i <= 7; i++) {
    elementDelete = document.getElementById(`get${i}`);
    elementDelete.classList.remove("ball");
    elementDelete.textContent = "";
  }
  inputNums.value = [];
  numsWinorNot.textContent = "";
  intersection2 = [];

  // 초기화 횟수 계산:
  count++;
  console.log(count);
  let counting = document.querySelector("#refreshNum")
  counting.textContent = `초기화 횟수 : ${count}`

  if (count == 5) {
    alert("초기화를 5회째 하셨습니다. 잠시 쉬시는 것을 권장드립니다.");
  } else if (count == 10) {
    alert("10회 이상 초기화를 진행하셨습니다. 설문조사를 진행해주세요.");
    showPopUp();
  }
});
console.log(ballData);
// 황동석 : chart.js를 활용해 최근 집계된 랜덤 번호의 등장 횟수를 10단위별로 분류해 도식화했습니다.
// 1. 표 label에 달 기준들을 설정한 뒤
// 2. data_set에 로또 랜덤 번호값들을 집계할 변수들을 등록합니다.
// 3. 정해진 색감에 맞춰 color를 맞춥니다.

const ctx = document.getElementById("myChart");

//차트 데이터
const labels = ["1~10", "11~20", "21~30", "31~40", "41~45"];
let data_set = [10, 10, 10, 10, 10];
const data = {
  labels: labels,
  datasets: [
    {
      label: "로또 당첨 번호 통계",
      data: data_set,
      backgroundColor: [
        `rgb(245, 234, 234)`,
        `rgb(255, 184, 76)`,
        `rgb(241, 103, 103)`,
        `rgb(164, 89, 209)`,
        `rgb(255, 172, 172)`,
      ],
      borderColor: ["rgb(250,250,250)"],
      hoveroffset: 4,
    },
  ],
};

// 차트 옵션
const options = {
  responsiv: false,
  maintainAspectRatio: false,
};

// 차트 설정
const config = {
  type: "doughnut",
  data: data,
  options: options,
};
let myChart = new Chart(ctx, config);

// 차트 수정
let ballarray1 = 0, ballarray2 = 0, ballarray3 = 0, ballarray4 = 0, ballarray5 = 0;
function dataScale(ballData) {
  for (i=0; i<7; i++){

    if (ballData[i] <= 10) {
      ballarray1 += 1;
      
    } else if (ballData[i] <= 20 && ballData[i] > 10) {
      ballarray2 += 1;
      
    } else if (ballData[i] <= 30 && ballData[i] > 20) {
      ballarray3 += 1;
      
    } else if (ballData[i] <= 40 && ballData[i] > 30) {
      ballarray4 += 1;
      
    } else if (ballData[i] <= 45 && ballData[i] > 40) {
      ballarray5 += 1;
    }
  }
  
};

document.getElementById('reData').onclick = function(){
  myChart.data.datasets[0].data[0] = ballarray1;
  myChart.data.datasets[0].data[1] = ballarray2;
  myChart.data.datasets[0].data[2] = ballarray3;
  myChart.data.datasets[0].data[3] = ballarray4;
  myChart.data.datasets[0].data[4] = ballarray5;
 
  myChart.update();

}


console.log(ballarray1, ballarray2, ballarray3, ballarray4, ballarray5)


/* 
// 백수정: 설문조사 팝업창
 //1. 변수선언
 2. radio buttons 개별 value값 가져오기
 3. 총점 계산하기
 4. 버튼 클릭시 메세지띄우기 
 5. 초기화 횟수에 영향을 주지 않도록 팝업창으로 처리하기.*/
function showPopUp() {
  //창 크기 지정
  const width = 500;
  const height = 500;

  //pc화면기준 가운데 정렬
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 4;

  //윈도우 속성 지정
  var windowStatus =
    "width=" +
    width +
    ", height=" +
    height +
    ", left=" +
    left +
    ", top=" +
    top +
    ", scrollbars=yes, status=yes, resizable=yes, titlebar=yes";

  //연결하고싶은url
  const url = "./baeksujung-lotto.html";

  //등록된 url 및 window 속성 기준으로 팝업창을 연다.
  window.open(url, "hello popup", windowStatus);
}
