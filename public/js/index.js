const questionEl = document.querySelector("#question");
const textArea = document.querySelector("#user-answer");
const submitBtn = document.querySelector("#submit");  
const abandonBtn = document.querySelector("#abandon");
let randomQuestionId = null;

// Check if the element exists before accessing its attribute
if (questionEl) {
  randomQuestionId = questionEl.getAttribute("data-question-id");
}

console.log(randomQuestionId);

const handleAnswerSubmit = async (event) => {
  event.preventDefault();
  const answerText = textArea.value.trim();
  if (answerText) {
    console.log("Answer submitted:", answerText);
    try {
      const response = await fetch(`/api/answer/${randomQuestionId}`, {
        method: "POST",
        body: JSON.stringify({ answer: answerText }),
        headers: { "Content-Type": "application/json" },
      });

      // Log response directly to see the status and data
      console.log(response);

      if (response.ok) {
        // Clear the answer form
        textArea.value = "";
        console.log("Answer posted successfully");
        window.location.href = `/api/question/${randomQuestionId}`;
      } else {
        console.error("Failed to post answer");
        s;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

// Add event listener to the answer form submit button
if (window.location.pathname === "/") {
  submitBtn.addEventListener("click", handleAnswerSubmit);

  abandonBtn.addEventListener("click", () => {
    textArea.value = "";
  });
}
