import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

type Pedido = {
  id: string;
  direccion: string;
  estado: string;
  fechaEntrega: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
};

export default function DashboardConductor() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPedidos() {
      if (!user) return;
      const pedidosRef = collection(db, "pedidos");
      const q = query(pedidosRef, where("asignadoA", "==", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Pedido[];
      setPedidos(data);
      setLoading(false);
    }

    fetchPedidos();
  }, [user]);

  const abrirEnGoogleMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, "_blank");
  };

  if (loading) return <p className="p-4">Cargando pedidos...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos asignados</h1>
      {pedidos.length === 0 ? (
        <p>No tienes pedidos asignados hoy.</p>
      ) : (
        <ul className="space-y-4">
          {pedidos.map((pedido) => (
            <li
              key={pedido.id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <p><strong>Dirección:</strong> {pedido.direccion}</p>
              <p><strong>Estado:</strong> {pedido.estado}</p>
              <p><strong>Fecha entrega:</strong> {pedido.fechaEntrega}</p>
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => navigate(`/pedido/${pedido.id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Ver más
                </button>
                <button
                  onClick={() =>
                    abrirEnGoogleMaps(
                      pedido.coordenadas.lat,
                      pedido.coordenadas.lng
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Abrir en Google Maps
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}