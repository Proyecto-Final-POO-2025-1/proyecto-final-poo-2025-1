import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ReportarNovedad() {
  const [mensaje, setMensaje] = useState("");

  const enviar = async () => {
    if (!mensaje) return;
    await addDoc(collection(db, "novedades"), {
      mensaje,
      fecha: new Date()
    });
    alert("Novedad reportada");
    setMensaje("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Reportar Novedad</h1>
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe la novedad..."
        className="border p-2 rounded w-full h-32 mb-4"
      />
      <button
        onClick={enviar}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Enviar
      </button>
    </div>
  );
}