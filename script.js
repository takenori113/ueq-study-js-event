



const handlePost = async (title, content) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json()
}

export const main = () => { document.querySelector("#submit").addEventListener("click", async (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const res = await handlePost(title, content);
  console.log(res);
  document.querySelector("#result-id").textContent = `created post ID is ${res.id}`
  document.querySelector("#result-title").textContent = `created post title is ${res.title}`
  document.querySelector("#result-content").textContent = `created post content is ${res.content}`
});};

window.addEventListener("load", main);
