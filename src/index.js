let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Task 1
  const bigDiv = document.getElementById("toy-collection");

  let url = `http://localhost:3000/toys`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (const toy of data) {
        const div = document.createElement("div");

        div.classList.add("card");
        div.innerHTML = `
            <h2>${toy.name}</h2>
            <img src=${toy.image} class="toy-avatar" />
            <p>${toy.likes} likes</p>
            <button class="like-btn" id=${toy.id}>Like ❤</button>
          `;

        // Task 3
        const likeButton = div.querySelector(".like-btn");
        const likePara = div.querySelector("p");
        likeButton.addEventListener("click", (e) => {
          let imageId = parseInt(e.target["id"], 10);
          // let newLikes = toy.likes++;

          fetch(`http://localhost:3000/toys/${imageId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ likes: toy.likes++ }),
          });
          // .then((res) => res.json())
          // .then((data) => console.log(data));

          likePara.textContent = `${toy.likes} likes`;
        });

        bigDiv.appendChild(div);
      }
    });
});

// Task 2
const form = document.querySelector("form");
const inputsCaught = document.getElementsByClassName("input-text");
const enteredName = inputsCaught[0];
const enteredImage = inputsCaught[1];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: enteredName.value,
      image: enteredImage.value,
      likes: 0,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});
