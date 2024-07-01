const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./model/url");
const path = require("path");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/tiny-url").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json()); // for the json data
app.use(express.urlencoded({ extended: false })) // for the form data


app.use("/url", urlRoute)
app.use("/", staticRoute)
app.use("/", userRoute)

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry?.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
