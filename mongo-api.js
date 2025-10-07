// mongo-api.js
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.use(express.json());

let coleccion;

async function conectarMongo() {
  try {
    await client.connect();
    const db = client.db("sample_supplies");
    coleccion = db.collection("sales");
    console.log("Conectado a MongoDB correctamente");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
}

conectarMongo();

app.get("/api/sales", async (req, res) => {
  try {
    const resultados = await coleccion.find({}).limit(10).toArray();
    res.json(resultados);
  } catch (error) {
    console.error("Error al consultar la colección:", error);
    res.status(500).json({ error: "Error al consultar la colección" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 API Mongo corriendo en http://localhost:${PORT}/api/sales`);
});