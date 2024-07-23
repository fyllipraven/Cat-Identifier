import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});