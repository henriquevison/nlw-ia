const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

import { server } from "./server.js"
form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent =
      "Este vídeo não se enquadra na categoria shorts.")
  }
  const [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo o texto do audio..."
  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
