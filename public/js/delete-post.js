const deletePostFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split('/')[window.location.toString().split("/").length - 1];

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id
    }),
    headers: { "Content-Type": "application/json" }
  });

  if (response.ok) {
    alert("The post was deleted successfully");
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.
  querySelector("#delete-post-btn")
  addEventListener("click", deletePostFormHandler);