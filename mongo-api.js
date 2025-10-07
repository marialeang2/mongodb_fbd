// mongo-api.js
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

// Cliente Mongo con configuración recomendada para Render / Atlas
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let coleccion;

// Conexión inicial a MongoDB
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

// Ruta raíz (para probar que Render funciona)
app.get("/", (req, res) => {
  res.send("API Mongo desplegada correctamente en Render");
});

// Ruta para obtener documentos de la colección
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
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
