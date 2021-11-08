

const createNewPost = async (event) => {
  event.preventDefault();

  const postBody = document.querySelector("#post-body");
  const postTitle = document.querySelector("#post-title");

  if (postTitle && postBody){
    const response = await fetch(`/api/posts`, { 
      method: "POST",
      body: JSON.stringify({ postTitle, postBody}),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    }
    else {
      alert(response.statusText);
    }
  }

}

document
  .querySelector(".btn")
  .addEventListener("submit", createNewPost);