let profileData = null;

async function fetchProfile() {
    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a GitHub username.");
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("User not found.");
        profileData = await response.json();

        document.getElementById("avatar").src = profileData.avatar_url;
        document.getElementById("name").innerText = profileData.name || "N/A";
        document.getElementById("login").innerText = profileData.login;
        document.getElementById("bio").innerText = profileData.bio || "N/A";
        document.getElementById("location").innerText = profileData.location || "N/A";
        document.getElementById("followers").innerText = profileData.followers;
        document.getElementById("following").innerText = profileData.following;
        document.getElementById("public_repos").innerText = profileData.public_repos;
        document.getElementById("profile_link").href = profileData.html_url;

        document.getElementById("profile-container").style.display = "block";
        document.getElementById("repo-container").style.display = "block";
        document.getElementById("ai-section").style.display = "block";

        fetchRepositories(username);
    } catch (error) {
        alert("Error fetching GitHub profile: " + error.message);
    }
}

async function fetchRepositories(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) throw new Error("Error fetching repositories.");
        const repos = await response.json();

        const repoContainer = document.getElementById("repo-container");
        repoContainer.innerHTML = "";
        repos.forEach(repo => {
            const repoDiv = document.createElement("div");
            repoDiv.classList.add("repo");
            repoDiv.innerHTML = `
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <p>${repo.description || "No description available."}</p>
            `;
            repoContainer.appendChild(repoDiv);
        });
    } catch (error) {
        console.error("Error fetching repositories:", error);
    }
}

async function askAI() {
    if (!profileData) {
        alert("Please fetch a GitHub profile first.");
        return;
    }

    const query = document.getElementById("ai-query").value;
    if (!query) {
        alert("Please enter a question.");
        return;
    }

    document.getElementById("ai-response").style.display = "block";
    document.getElementById("ai-response").innerHTML = `<p><strong>AI is thinking...</strong></p>`;

    setTimeout(() => {
        document.getElementById("ai-response").innerHTML = `<p><strong>AI Response:</strong> This is a sample response for the profile query.</p>`;
    }, 1500);
}
