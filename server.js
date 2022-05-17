require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/upload"));

app.use("/api/results", require("./routes/results"));
app.use("/api/agents", require("./routes/agents"));

app.use("/api/sendscan", require("./routes/sendscan"));
app.use("/api/fetchscan", require("./routes/fetchscan"));

app.use("/api/senddns", require("./routes/senddns"));
app.use("/api/fetchdns", require("./routes/fetchdns"));

app.use("/api/sendssl", require("./routes/sendssl"));
app.use("/api/fetchssl", require("./routes/fetchssl"));

app.use("/api/sendgen", require("./routes/sendgen"));
app.use("/api/fetchgen", require("./routes/fetchgen"));

app.use("/api/sendin", require("./routes/sendin"));
app.use("/api/fetchin", require("./routes/fetchin"));

app.use("/api/sendout", require("./routes/sendout"));
app.use("/api/fetchout", require("./routes/fetchout"));

app.use("/api/fetchallassessment", require("./routes/fetchallassessment"));

// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
