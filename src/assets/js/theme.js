let darkTheme = false;
let lightbulb = document.querySelector('#themeCh')
const html = document.documentElement

const storedTheme = localStorage.getItem("darkTheme");
 
if (storedTheme !== null) {
    if (storedTheme === "true") {
        document.documentElement.classList.add("dark");
    }
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
}

lightbulb.onclick = () => {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark")
    localStorage.setItem("darkTheme", "false")
  } else {
    html.classList.add("dark")
    localStorage.setItem("darkTheme", "true")
  }
}