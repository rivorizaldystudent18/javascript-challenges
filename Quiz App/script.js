let questions = [
  {
    question: "Siapa Presiden RI tahun 2019 ?",
    a: "Jokowi",
    b: "Megawati",
    c: "Soekarno",
    d: "SBY",
    e: "Habibie",
    answer: "Jokowi",
  },
  {
    question: "Siapa Nama pembuat facebook ?",
    a: "Mark Zuckerberg",
    b: "Wes bos",
    c: "Elon Musk",
    d: "Maximilian",
    e: "Habibie",
    answer: "Mark Zuckerberg",
  },
  {
    question: "Siapa Pendiri Tesla ?",
    a: "Mark",
    b: "Ken",
    c: "Barbie",
    d: "Elon Musk",
    e: "Habibie",
    answer: "Elon Musk",
  },
  {
    question: "Siapa Orang tertampan 2020 ?",
    a: "Markiplier",
    b: "Jackseptieye",
    c: "Pewdiepie",
    d: "Felix Kjellberg",
    e: "William",
    answer: "Felix Kjellberg",
  },
];

let initialQuestion = 0;
let initialScore = 0;

let loadQuestion = () => {
  if (initialQuestion < questions.length) {
    let question = questions[initialQuestion];

    let questionContainer = document.getElementById("question");
    let a = document.getElementById("a");
    let b = document.getElementById("b");
    let c = document.getElementById("c");
    let d = document.getElementById("d");
    let e = document.getElementById("e");

    questionContainer.innerHTML = question.question;
    a.innerHTML = question.a;
    b.innerHTML = question.b;
    c.innerHTML = question.c;
    d.innerHTML = question.d;
    e.innerHTML = question.e;
  } else if (initialQuestion === questions.length) {
    let ul = document.querySelector("ul");
    ul.style.display = "none";

    let questionContainer = document.getElementById("question");
    questionContainer.innerHTML = "Your Score is : " + initialScore;
  }
};

let evaluateAnswer = () => {
  let question = questions[initialQuestion];
  let radio = document.getElementsByName("answer");

  for (let index = 0; index < radio.length; index++) {
    if (radio[index].checked) {
      let selector = `label[for=${radio[index].id}]`;
      let label = document.querySelector(selector);

      if (label.textContent === question.answer) {
        initialScore++;
      }
    }
  }
};

loadQuestion();

let button = document.getElementById("submit");

button.addEventListener("click", () => {
  if (initialQuestion < questions.length) {
    evaluateAnswer();
    initialQuestion++;
    loadQuestion();
  }
});

let buttons = document.querySelectorAll("button");

buttons.forEach((el) => {
  el.addEventListener("click", (event) => {
    console.log(event.target.textContent);
  });
});

console.log(initialQuestion);
