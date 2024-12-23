// Fetch the questions container and other elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Questions data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Retrieve progress from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render the questions on the page
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing content

  questions.forEach((question, questionIndex) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    // Add question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    // Add choices
    question.choices.forEach((choice, choiceIndex) => {
      const choiceContainer = document.createElement("div");

      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${questionIndex}`;
      choiceInput.value = choice;
      choiceInput.id = `question-${questionIndex}-choice-${choiceIndex}`;

      // Preserve user's previous selection
      if (userAnswers[questionIndex] === choice) {
        choiceInput.checked = true;
      }

      const choiceLabel = document.createElement("label");
      choiceLabel.setAttribute("for", choiceInput.id);
      choiceLabel.textContent = choice;

      choiceContainer.appendChild(choiceInput);
      choiceContainer.appendChild(choiceLabel);
      questionDiv.appendChild(choiceContainer);

      // Save user's choice in session storage
      choiceInput.addEventListener("change", () => {
        userAnswers[questionIndex] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Calculate and display the score
function calculateScore() {
  let score = 0;
  questions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
      score++;
    }
  });
  return score;
}

// Handle quiz submission
submitButton.addEventListener("click", () => {
  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of 5.`;

  // Save score in local storage
  localStorage.setItem("score", score);

  // Clear session storage (optional: reset progress after submission)
  sessionStorage.removeItem("progress");
});

// Initial rendering of the questions
renderQuestions();
