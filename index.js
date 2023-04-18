require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const v1Route = require("./v1/route");
var html_to_pdf = require("html-pdf-node");

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

//connection to mongoDB
const mongodb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        useUnifiedTopology: true,
        dbName: "bhairavnath_mandir_db",
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((err) => {
        console.log(err);
        console.log("MongoDB Not Connected");
      });
  } catch (error) {
    console.error(error);
  }
};

//Middlewares
app.use(cors());
app.use(logger("dev"));
app.use("/api/v1", v1Route);
app.get("/", async (req, res) => {
  let options = { format: "A4" };
  // Example of options with args //
  // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

  let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
  // or //
  // let file = { url: "https://example.com" };

  const data = await html_to_pdf
    .generatePdf(file, options)
    .then((pdfBuffer) => {
      console.log("PDF Buffer:-", pdfBuffer);
      return pdfBuffer;
    });

  res.setHeader("Content-Type", "application/pdf");
  return res.end(data);
  // res.send("Hello Team");
  // res.err;
});

app.listen(process.env.PORT || 3001, async () => {
  console.log(`Running on:`, process.env.PORT);
  await mongodb();
  //await connection.connection.mongodb()
});
