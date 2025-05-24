const express = require("express");
const multer = require("multer");
const cors = require("cors");
const docxToPDF = require("docx-pdf");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// ✅ Ensure 'uploads' and 'files' folders exist (important for Render)
const uploadsDir = path.join(__dirname, "uploads");
const filesDir = path.join(__dirname, "files");

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
}

// ✅ Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// ✅ File conversion route
app.post("/convertFile", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const inputPath = req.file.path;
    const outputPath = path.join(filesDir, `${req.file.originalname}.pdf`);

    docxToPDF(inputPath, outputPath, (err, result) => {
        if (err) {
            console.error("Conversion error:", err);
            return res.status(500).json({ message: "Error converting docx to pdf" });
        }

        res.download(outputPath, () => {
            console.log("✅ PDF sent successfully.");
        });
    });
});

// ✅ Test route
app.get("/", (req, res) => {
    res.send("✅ Backend is running.");
});

// ✅ Start server
app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
});
