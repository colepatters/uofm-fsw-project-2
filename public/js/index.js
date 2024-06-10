let randomQuestionId;

const textArea = document.querySelector("#user-answer");
const submitBtn = document.querySelector("#submit");
const abandonBtn = document.querySelector("#abandon");
const questionEl = document.querySelector("#question");

const getRandomQuestion = async () => {
  try {
    const response = await fetch("/api/questions/");
    if (response.ok) {
      const questions = await response.json();
      if (questions.length) {
        const randomQuestion =
          questions[Math.floor(Math.random() * questions.length)];
        console.log("Random question selected:", randomQuestion);

        randomQuestionId = randomQuestion.id;
        // Call function to render the random question
        renderQuestion(randomQuestion);
        // Fetch and render all answers for the random question
        fetchAndRenderAnswers(randomQuestionId);
      } else {
        console.error("No questions found!");
      }
    } else {
      console.error("Failed to get questions");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const renderQuestion = (question) => {
  questionEl.textContent = question.question;
};

const fetchAndRenderAnswers = async (questionId) => {
  try {
    const response = await fetch(`/api/answers/${questionId}`);
    if (response.ok) {
      const answers = await response.json();
      // Render the answers on the page
      answers.forEach((answer) => {
        const answerDiv = document.createElement("div");
        answerDiv.classList.add("answer");
        answerDiv.innerHTML = `
              <div class="answer-text">
              ${answer.answer}
              </div>
          `;
        document.querySelector("#answers").append(answerDiv);
      });
    } else {
      console.error("Failed to fetch answers");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const handleAnswerSubmit = async (event) => {
  event.preventDefault();
  const answerText = textArea.value.trim();
  if (answerText) {
    try {
      const response = await fetch(`/api/answers/${randomQuestionId}`, {
        method: "POST",
        body: JSON.stringify({ answer: answerText }),
        headers: { "Content-Type": "application/json" },
      });

      console.log(response.body);

      if (response.ok) {
        // Clear the answer form
        document.querySelector("#answer-text").value = "";
        // Fetch and render all answers for the random question after posting the answer
        fetchAndRenderAnswers(randomQuestionId);
      } else {
        console.error("Failed to post answer");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

// Add event listener to the answer form submit button
submitBtn.addEventListener("click", handleAnswerSubmit);

// Call the function to fetch a random question when the page loads
getRandomQuestion();
