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
});



document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((data) => data.forEach(renderToys))
    function renderToys(toy) {
    let card = document.createElement("div");
    card.classList.add("card");
    let toyCollection = document.getElementById("toy-collection");
    toyCollection.appendChild(card);

    let h2 = document.createElement("h2");
    h2.textContent = `${toy.name}`;
    card.appendChild(h2);

    let toyImg = document.createElement("img");
    toyImg.src = `${toy.image}`;
    card.appendChild(toyImg);
    toyImg.classList.add("toy-avatar");

    let p = document.createElement("p");
    p.textContent = `${toy.likes} likes`;
    card.appendChild(p);

    let likeButton = document.createElement("button");
    likeButton.addEventListener("click", (e) => {
      renderLikes(e);
    })
    likeButton.classList.add("like-btn");
    likeButton.setAttribute("id", `${toy.id}`);
    likeButton.textContent = "Like ❤️"
    card.appendChild(likeButton);
  }

const toyForm = document.querySelector(".add-toy-form");

toyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const toyObj = {
    "name": event.target.name.value,
      "image": event.target.image.value,
      "likes": 0
  }
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toyObj)
  })
  .then(response => response.json())
  .then(data => renderToys(data))
});

const likeBtn = document.querySelectorAll("like-btn");


function renderLikes(event) {
  let currentNumberOfLikes = parseInt(event.target.previousSibling.textContent);
  let newNumberOfLikes = currentNumberOfLikes + 1;
  console.log(newNumberOfLikes);
  console.log(currentNumberOfLikes);

    fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
    })
    .then(response => response.json())
    .then(data => {
      event.target.previousSibling.textContent = newNumberOfLikes + " likes";
    })

}


})