const apiUrl = "http://localhost:3000/api";
const a = document.querySelector("a");

let response;
async function start() {
  await fetch(apiUrl).then((e) => {
    response = e;
  });
  await response.blob().then((e) => {
    response = e;
  });

  let url = URL.createObjectURL(response);
  a.href = url;
  a.download = "";
  a.click();
}

// start();
