const app = require('./app');
require("dotenv").config();
const PORT = process.env.PORT || 3232;

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});