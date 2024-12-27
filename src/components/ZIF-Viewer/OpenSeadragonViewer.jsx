import { useRef, useEffect } from 'react';
import OpenSeadragon from 'openseadragon';

const OpenSeadragonViewer = () => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = OpenSeadragon({
      id: 'openseadragon-viewer',
      prefixUrl: 'https://openseadragon.github.io/openseadragon/images/', 
      tileSources: {
        Image: {
          xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
          Url: '/hubble_files/', 
          Format: 'jpeg',
          Overlap: 1, 
          TileSize: 254,
          Size: {
            Width: 6780,
            Height: 7071
          }
        }
      }
    });

    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, []);

  return (
    <div
      id="openseadragon-viewer"
      ref={viewerRef}
      style={{ width: '100%', height: '85vh' }}
    />
  );
};

export default OpenSeadragonViewer;
