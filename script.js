

const title = document.querySelector("#submit").addEventListener("click", async (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;
  const res = await handlePost(title, content);
  console.log(res);
  document.querySelector("#result-id").textContent = `created POST ID is ${res.id}`
  document.querySelector("#result-title").textContent = `created POST title is ${res.title}`
  document.querySelector("#result-content").textContent = `created POST content is ${res.content}`
});

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

export const main = () => { };

window.addEventListener("load", main);
