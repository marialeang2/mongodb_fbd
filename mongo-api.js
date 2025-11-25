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
    const db = client.db("Parranderos");
    commentsCollection = db.collection("comentarios");
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

app.get("/api/comentarios/:bar_id", async (req, res) => {
  try {
    const barId = parseInt(req.params.bar_id);
    const comentarios = await coleccionComentarios.find({ bar_id: barId }).toArray();
    res.json(comentarios);
  } catch (error) {
    console.error("Error consultando comentarios:", error);
    res.status(500).json({ error: "Error consultando comentarios" });
  }
});


app.post("/api/comentarios", async (req, res) => {
  try {
    const nuevo = req.body;
    nuevo.date = new Date();

    await commentsCollection.insertOne(nuevo);
    res.json({ mensaje: "Comentario insertado" });
  } catch (error) {
    res.status(500).json({ error: "Error insertando comentario" });
  }
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
