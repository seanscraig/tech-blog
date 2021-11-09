const createNewPost = async (event) => {
  event.preventDefault();

  const postBody = document.querySelector("#post-body").value;
  const postTitle = document.querySelector("#post-title").value;

  if (postTitle && postBody){
    const response = await fetch(`/api/posts`, { 
      method: "POST",
      body: JSON.stringify({ postTitle, postBody}),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("new post has been added");
      document.location.replace("/dashboard");
    }
    else {
      alert(response.statusText);
    }
  }

}

document
  .querySelector("#new-post-form")
  .addEventListener("submit", createNewPost);