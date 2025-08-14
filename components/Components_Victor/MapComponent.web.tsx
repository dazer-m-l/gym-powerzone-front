import React, { useEffect, useState } from 'react';

const MapComponent: React.FC = () => {
  const [maxWidth, setMaxWidth] = useState<number | string>(700);

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w <= 480) {
        setMaxWidth('95vw');
      } else if (w <= 768) {
        setMaxWidth('90vw');
      } else {
        setMaxWidth(700); 
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fixedEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.6539750350025!2d-98.65475672498468!3d20.642956400918187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1252ed444d9b5%3A0x134e4b8a910c54c4!2sC.%20de%20Olivo%2C%20Zacualtip%C3%A1n%2C%20Hgo.!5e0!3m2!1sen!2smx!4v1752596194886!5m2!1sen!2smx`;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: maxWidth,
        paddingBottom: '56.25%',
        height: 0,
        margin: '0 auto',
        overflow: 'hidden',
        border: '1px solid #ccc',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <iframe
        title="Ubicación en Google Maps"
        src={fixedEmbedUrl}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
          borderRadius: 8,
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapComponent;
