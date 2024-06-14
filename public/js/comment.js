const commentForm = document.querySelectorAll('form');

const addComment = async (e) => {
    e.preventDefault();

    if (e.target.matches('button')) {
        const answerId = e.target.id;
        
        const commentInput = document.querySelector(`#commentInput${answerId}`).value.trim();
        
        if (commentInput) {
            console.log(commentInput);
            const response = await fetch(`/api/comment/${answerId}`, {
                method: 'POST',
                body: JSON.stringify({
                    answer_comment: commentInput
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            const x = await response.json();
            console.log(x);
        }
    }
}

commentForm.forEach(form => {
    // Add a click event listener to each button
    form.addEventListener('click', addComment);
});