//Dependencies
import express from "express";
import path from "path";
import bodyParser from "body-parser";

//Setting the Port
const PORT = process.env.PORT || 3000;
const app = express();

//Middleware Setup
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  const dirName = path.dirname(new URL(import.meta.url).pathname);
  res.sendFile(path.join(dirName, "/views/index.html"));
});

app.get("/echo/:message", (req, res) => {
  const message = req.params.message;
  if (message === "secret") {
    res.send("the secret is... 42!");
  } else {
    res.send(message);
  }
});

app.get("/login", (req, res) => {
  const dirName = path.dirname(new URL(import.meta.url).pathname);
  res.sendFile(path.join(dirName, "/views/login.html"));
});

app.post("/login", express.json(), (req, res) => {
  const dirName = path.dirname(new URL(import.meta.url).pathname);
  const { email, password } = req.body;
  console.log(email, password);
  if (email !== "user@email.com" || password !== "very-secret") {
    res.sendFile(path.join(dirName, "/views/error.html"));
    // res.json({ success: false });
  } else {
    // res.json({ success: true, redirect: "/my-account" });
    res.sendFile(path.join(dirName, "/views/my-account.html"));
  }
});

app.get("my-account", (req, res) => {
  const dirName = path.dirname(new URL(import.meta.url).pathname);
  res.sendFile(path.join(dirName, "/views/my-account.html"));
});

app.get("/error", (req, res) => {
  const dirName = path.dirname(new URL(import.meta.url).pathname);
  res.sendFile(path.join(dirName, "/views/error.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
