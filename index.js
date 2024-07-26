import express from "express";
import axios from "axios";
import fs from "fs";
import fileUpload from "express-fileupload"
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use("/",express.static("./node_modules/bootstrap/dist/"));
app.use(fileUpload());

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.post("/upload", async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.render("error.ejs", { message: "No files were uploaded.", errCode: 400 });
    }

    const image = req.files.file;
    const imagePath = __dirname + "/public/images/" + image.name
    image.mv(imagePath);
    const imageBase64 = image.data.toString("base64");
    try {
        const response = await axios({
            method: "POST",
            url: "https://detect.roboflow.com/cat-breeds-2n7zk/2",
            params: {
                api_key: process.env.API_KEY,
            },
            data: imageBase64,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        const breed = (response.data.predictions[0].class).replace(/_/g," ");
        res.render("upload.ejs", {breed: breed, image: `/images/${image.name}`});
        setTimeout(() => {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log("Failed to delete uploaded file:", err);
                }
            });
        }, 30000);
    } catch(error) {
        console.log(error);
        res.render("error.ejs", { message: "Unable to identify cat breed", errCode: 500 });
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.log("Failed to delete uploaded file:", err);
            }
        });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});