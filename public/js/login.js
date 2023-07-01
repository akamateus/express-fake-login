document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("loginForm");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = {
    email,
    password,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      if (data.success) {
        window.location.href = data.redirect;
      } else {
        window.location.href = "/error";
      }
    })

    .catch((error) => {
      console.error("error:", error);
      window.location.href = "/views/error";
    });
});
