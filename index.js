import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const upload = multer();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use("/",express.static("./node_modules/bootstrap/dist/"));

// const loadImageBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });
// }

// const image = await loadImageBase64(fileData);

// axios({
//     method: "POST",
//     url: "https://detect.roboflow.com/cat-breeds-2n7zk/2",
//     params: {
//         api_key: process.env.API_KEY,
//     },
//     data: image,
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//     }
// })
// .then(function(response) {
//     console.log(response.data);
// })
// .catch(function(error) {
//     console.log(error.message);
// });

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post("/upload", (req, res) => {
    res.render("upload.ejs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});