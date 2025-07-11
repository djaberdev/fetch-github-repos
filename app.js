/*
    - Work With Guithub API - Fetch Repositories

    - API Link To Use: https://api.github.com/users/${userName}/repos
*/

const userInput = document.querySelector(".search-box input");
const fetchBtn = document.querySelector(".search-box button");
const result = document.getElementById("reposContainer");

fetchBtn.onclick = () => {
    fetchRepos();
}

function fetchRepos() {

    let userName = userInput.value;
    
    if (userName == '') { // If Username Is Empty
        result.innerHTML = `
            <h3 class="alert-text">Please Enter Github Username.</h3>
        `;
    } else { // IF Its Not Empty

        result.innerHTML = '';
        fetch(`https://api.github.com/users/${userName}/repos`)
            .then((response) => response.json())
            .then((repos) => {

                // Loop On The Data
                repos.forEach(repo => {
                    
                    // Create The Repo Card
                    result.innerHTML += `
                        <div class="repo-card">
                            <img src="${repo.owner['avatar_url']}" alt="Avatar..." class="avatar">
                            <div class="details">
                                <h2 class="repo-name">${repo.name}</h2>

                                <div class="stats">
                                    <div class="stat-box">
                                        <i class="fa-solid fa-code-fork"></i>
                                        <span>${repo.forks}</span>
                                    </div>
                                    <div class="stat-box">
                                        <i class="fa-regular fa-eye"></i>
                                        <span>${repo.watchers} </span>
                                    </div>
                                    <div class="stat-box">
                                        <i class="fa-regular fa-star"></i>
                                        <span>${repo.stargazers_count}</span>
                                    </div>
                                </div>

                                <a href="${repo['html_url']}" class="visit-button">
                                    <span>Visit Repo</span>
                                </a>
                            </div>
                        </div>
                    `;

                });

            }).catch(function () {
                result.innerHTML = `
                    <h3 class="alert-text">Cannot Fetch Data!</h3>
                `;
            });

    }

}