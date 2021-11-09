const editPostFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector("#edit-post-title").value.trim();
  const postBody = document.querySelector("#edit-post-body").value.trim();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      postTitle,
      postBody,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    alert("post has been updated successfully");
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editPostFormHandler);
