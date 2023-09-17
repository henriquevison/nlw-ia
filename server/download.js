import ytdl from "ytdl-core";
import fs from 'fs'
import { promises } from "dns";

export const download  = (videoId) => new Promise((resolve, reject) => {
const videoURL = "https://youtube.com/shorts/" + videoId
console.log("Realizando o download do vídeo:", videoId)

ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
.on("info", (info) => {
  const seconds = info.formats[0].approxDurationMs / 1000
  if(seconds > 70){
    throw new Error("Este vídeo tem uma duração superior à permitida.")
  }
})
.on("end", () => {
  console.log("Download do vídeo finalizado.")
  resolve()
})
.on("error", (error) => {
  console.log("O download do vídeo não pôde ser concluído. Detalhes do erro:", error)
  reject(error)
})
.pipe(fs.createWriteStream("./tmp/audio.mp4"))
})

