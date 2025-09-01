import formidable from "formidable";
import fs from "fs";
import pdf from "pdf-parse";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método não permitido" });

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Falha no upload" });

    try {
      let text = "";
      const file = files.file;
      const buffer = fs.readFileSync(file.filepath);

      if (file.mimetype === "application/pdf") {
        const data = await pdf(buffer);
        text = data.text;
      } else {
        text = buffer.toString("utf8");
      }

      res.json({ text: text.slice(0, 5000) }); // corta para não ficar gigante
    } catch (e) {
      res.status(500).json({ error: "Erro ao processar arquivo: " + e.message });
    }
  });
}
