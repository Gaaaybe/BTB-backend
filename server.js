import "dotenv/config";
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando no link http://localhost:${PORT}/`);
});