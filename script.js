const handlePost = (title, content) =>
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

export const main = () => {};

window.addEventListener("load", main);
