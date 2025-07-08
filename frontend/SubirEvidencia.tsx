import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function SubirEvidencia({ pedidoId }: { pedidoId: string }) {
  const [archivo, setArchivo] = useState<File | null>(null);

  const subir = async () => {
    if (!archivo) return;
    const storage = getStorage();
    const archivoRef = ref(storage, \`evidencias/\${pedidoId}/\${archivo.name}\`);
    await uploadBytes(archivoRef, archivo);
    const url = await getDownloadURL(archivoRef);
    alert("Evidencia subida: " + url);
  };

  return (
    <div className="p-4 border rounded">
      <input
        type="file"
        onChange={(e) => setArchivo(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <button
        onClick={subir}
        className="bg-purple-600 text-white px-3 py-1 rounded"
      >
        Subir evidencia
      </button>
    </div>
  );
}