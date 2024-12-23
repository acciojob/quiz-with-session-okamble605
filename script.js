// Fetch the questions container and other elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve progress from session storage
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render the questions on the page
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear existing content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");

    // Add question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    // Add choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const choiceContainer = document.createElement("div");
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.id = `question-${i}-choice-${j}`;

      // Check if this option was previously selected
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      const choiceLabel = document.createElement("label");
      choiceLabel.setAttribute("for", `question-${i}-choice-${j}`);
      choiceLabel.textContent = choice;

      choiceContainer.appendChild(choiceElement);
      choiceContainer.appendChild(choiceLabel);
      questionElement.appendChild(choiceContainer);

      // Save selected answer in session storage
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });
    }

    questionsElement.appendChild(questionElement);
  }
}

// Calculate and display the score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
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
