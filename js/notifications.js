// Get the input element
const inputElement = document.getElementById("webhook-url");

window.addEventListener("load", function () {
  const savedUrl = localStorage.getItem("webhookUrl");
  if (savedUrl) {
    inputElement.value = savedUrl;
  }
});

inputElement.addEventListener("input", function () {
  const url = inputElement.value;
  localStorage.setItem("webhookUrl", url);
});

chrome.runtime.sendMessage({ webhook: localStorage.getItem("webhookUrl") }, function(response) {
    console.log(response);
});