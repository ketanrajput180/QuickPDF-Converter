const express = require("express");
const multer = require("multer");
const cors = require("cors");
const docxToPDF = require("docx-pdf");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000; // ✅ Render-friendly port

app.use(cors());

// Root route for testing
app.get("/", (req, res) => {
  res.send("QuickPDF Backend is running!");
});

// Ensure /tmp/uploads exists
const uploadDir = "/tmp/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // ✅ store uploads in /tmp
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint to convert DOCX to PDF
app.post("/convertFile", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Output path in /tmp
    const outputPath = path.join("/tmp", `${req.file.originalname}.pdf`);

    docxToPDF(req.file.path, outputPath, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error converting docx to pdf" });
      }

      // Send the PDF file as download
      res.download(outputPath, () => {
        console.log("File downloaded successfully");
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
