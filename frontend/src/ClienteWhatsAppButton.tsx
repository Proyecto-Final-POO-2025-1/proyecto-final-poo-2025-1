import React from 'react';

const WHATSAPP_NUMBER = '573001234567'; // Número de soporte de ejemplo
const WHATSAPP_MESSAGE = '¡Hola! Necesito ayuda con mi pedido.';

const ClienteWhatsAppButton: React.FC = () => {
  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition-all"
      title="Soporte por WhatsApp"
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
    >
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path fill="#fff" d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.09-1.33A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
        <path fill="#25D366" d="M12 4a8 8 0 018 8c0 1.7-.53 3.28-1.44 4.57l.94 3.45-3.56-.94A7.96 7.96 0 014 12a8 8 0 018-8z"/>
        <path fill="#fff" d="M17.47 15.37c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.79-.7-1.32-1.56-1.48-1.83-.16-.27-.02-.41.12-.55.13-.13.29-.34.43-.51.14-.18.18-.31.27-.52.09-.2.05-.39-.02-.55-.07-.16-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.47.07-.72.34-.25.27-.97.95-.97 2.32 0 1.37.99 2.7 1.13 2.89.14.18 1.95 2.98 4.74 3.87.66.19 1.18.3 1.58.38.66.13 1.26.11 1.73.07.53-.05 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"/>
      </svg>
      <span className="font-semibold">Soporte</span>
    </button>
  );
};

export default ClienteWhatsAppButton; 