const Connect = require("./src/db");

require("dotenv").config();

app.listen(process.env.PORT || 5000, async () => {
  try {
    await Connect();
    console.log("connected");
  } catch (error) {
    console.log("error");
  }
  console.log("listening on port 5000");
});
