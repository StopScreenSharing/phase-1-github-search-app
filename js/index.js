document.addEventListener('DOMContentLoaded', () => {
    const form  = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const query = searchInput.value;
        searchGitHubUsers(query);
    });

    function searchGitHubUsers(query) {
        fetch(`https://api.github.com/search/users?q=${query}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => displayUsers(data.items))
        .catch(error => console.error('Error fetching users', error));
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        reposList.innerHTML = '';

        users.forEach(user => {
            const userItem = document.createElement('li');
            userItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="50">
            <a href="#" data-username="${user.login}">${user.login}>/a>
            `;

            userItem.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                fetchUsersRepos(this.dataset.username);
            });
            userList.appendChild(userItem);
        });
    }

    function fetchUsersRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => displayRepos(data))
        .catch(error => console.error('Error fetching repositories:', error));
    }

    function displayRepos(repos) {
        reposList.innerHTML = '';
        repos.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            reposList.appendChild(repoItem);
        });
    }

});
 