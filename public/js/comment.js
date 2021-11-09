const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentBody = document.querySelector(".form-input").value;

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (commentBody) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id, 
        commentBody
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("Comment posted successfully");
      document.location.reload();
    }
    else {
      alert(response.statusText);
    }
  }
}


document
  .querySelector("#new-comment-form")
  .addEventListener("submit", commentFormHandler);