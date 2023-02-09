document.querySelector("#new-post-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const postObj = {
    title: document.querySelector("#title-input").value,
    post: document.querySelector("#post-input").value,
  };
  console.log(postObj);
  fetch("/api/post", {
    method: "POST",
    body: JSON.stringify(postObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      console.log("post failed");
      res.json().then((data) => {
        console.log(data);
        alert(data.msg);
      });
    }
  });
});
