



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

export const main = () => {

  const form = document.querySelector("form");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;

    const res = await handlePost(title, content);
    
    const result1 = document.querySelector("#result-id");
    result1.textContent = `created post ID is ${res.id}`;
    const result2 = document.querySelector("#result-title");
    result2.textContent = `created post title is ${res.title}`
    const result3 = document.querySelector("#result-content");
    result3.textContent = `created post content is ${res.content}`
  };

  form.addEventListener("submit", handleSubmit);
};

window.addEventListener("load", main);
