let row = document.querySelector("#row");
let mealSelect = document.querySelector("#mealSelect");
let searchInput = document.querySelector("#searchInput");

async function callApi(meal) {
    try {
        row.innerHTML = `<p class="text-white">Loading...</p>`;

        let result = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
        let data = await result.json();
        let meals = data.recipes;

        let cartona = "";

        for (let i = 0; i < meals.length; i++) {

            
    cartona += `
  <div class="col-md-6 col-lg-4 col-sm-6 mb-3">
    <div class="card recipe-card h-100">
      <img src="${meals[i].image_url}" class="card-img-top" alt="${meals[i].title}">
      <div class="card-body">
        <p class="recipe-text"><span>Title:</span> ${meals[i].title}</p>
        <p class="recipe-text"><span>Recipe Id:</span> ${meals[i].recipe_id}</p>
        <p class="recipe-text"><span>Publisher:</span> ${meals[i].publisher}</p>
        <p class="recipe-text"><span>Social Rank:</span> ${Math.round(meals[i].social_rank)}</p>
      </div>
    </div>
  </div>
`;
        }

        row.innerHTML = cartona;
    } catch (error) {
        row.innerHTML = `<p class="text-danger text-center">Something went wrong</p>`;
        console.log(error);
    }
}

callApi("croissant");

mealSelect.addEventListener("change", function () {
    callApi(this.value);
});

searchInput.addEventListener("keyup", function () {
    let searchValue = this.value.trim();
    if (searchValue !== "") {
        callApi(searchValue);
    }
});