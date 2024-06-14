const commentForm = document.querySelectorAll('form');

const addComment = async (e) => {
    e.preventDefault();

    if (e.target.matches('button')) {
        const answerId = e.target.id;
        
        const commentInput = document.querySelector(`#commentInput${answerId}`);

        const trimmedComment = commentInput.value.trim();
        
        if (trimmedComment) {
            console.log(trimmedComment);
            const response = await fetch(`/api/comment/${answerId}`, {
                method: 'POST',
                body: JSON.stringify({
                    answer_comment: trimmedComment
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok){
                const successAlert = document.querySelector('#commentSuccess');
                const selectedCommentForm = document.querySelector(`#commentFormCollapse${answerId}`);
                selectedCommentForm.setAttribute('class', 'collapse');
                commentInput.value = '';
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(successAlert);
                toastBootstrap.show();
                setTimeout(() => {
                    document.location.reload();
                }, 1400);
            }
            else {
                alert('error posting comment');
            };
        }
        else {
            alert('please fill out comment before posting!');
        };
    };
};

commentForm.forEach(form => {
    // Add a click event listener to each form
    form.addEventListener('click', addComment);
});