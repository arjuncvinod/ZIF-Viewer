import { useRef, useEffect } from 'react';
import OpenSeadragon from 'openseadragon';

import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import {
  ZoomIn,
  ZoomOut,
  Home,
  Fullscreen,
  RotateLeft,
  RotateRight,
  RestartAlt,
  Map,
  Flip,
  FlipToBack,
} from '@mui/icons-material';

const OpenSeadragonViewer = () => {
  const viewerRef = useRef(null);
  const viewerInstance = useRef(null);

  useEffect(() => {
    viewerInstance.current = OpenSeadragon({
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
            Height: 7071,
          },
        },
      },
      showNavigator: true,
      navigatorPosition: 'BOTTOM_RIGHT',
      showNavigationControl: false, // Disable OpenSeadragon's default toolbar
    });

    const handleFullscreenChange = () => {
      setTimeout(() => {
        viewerInstance.current.viewport.goHome();
        viewerInstance.current.container.style.width = '100%';
        viewerInstance.current.container.style.height = '100%';
        viewerInstance.current.viewport.applyConstraints();
      }, 300);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.destroy();
      }
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // 🛠️ Toolbar Button Handlers
  const handleZoomIn = () => viewerInstance.current.viewport.zoomBy(1.2).applyConstraints();
  const handleZoomOut = () => viewerInstance.current.viewport.zoomBy(0.8).applyConstraints();
  const handleHome = () => viewerInstance.current.viewport.goHome();
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  const handleRotateLeft = () => {
    const currentRotation = viewerInstance.current.viewport.getRotation();
    viewerInstance.current.viewport.setRotation(currentRotation - 90);
  };
  const handleRotateRight = () => {
    const currentRotation = viewerInstance.current.viewport.getRotation();
    viewerInstance.current.viewport.setRotation(currentRotation + 90);
  };
  const handleResetRotation = () => viewerInstance.current.viewport.setRotation(0);
  const handleToggleNavigator = () => {
    const nav = viewerInstance.current.navigator.element;
    nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
  };
  const handleFlipHorizontal = () => {
    const canvas = viewerInstance.current.drawer.canvas;
    canvas.style.transform = canvas.style.transform.includes('scaleX(-1)') ? '' : 'scaleX(-1)';
  };
  const handleFlipVertical = () => {
    const canvas = viewerInstance.current.drawer.canvas;
    canvas.style.transform = canvas.style.transform.includes('scaleY(-1)') ? '' : 'scaleY(-1)';
  };

  // 🆕 Zoom Level Handlers
  const handleZoomTo = (zoomLevel) => {
    const viewport = viewerInstance.current.viewport;
    const zoom = viewport.getHomeZoom() * zoomLevel;
    viewport.zoomTo(zoom).applyConstraints();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
      {/* Toolbar at the Top */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: '#f5f5f5',
          borderBottom: '0px solid #ccc',
          padding: '8px',
          zIndex: 1000,
        }}
      >
        <Tooltip title="Zoom In">
          <IconButton onClick={handleZoomIn}>
            <ZoomIn />
          </IconButton>
        </Tooltip>

        <Tooltip title="Zoom Out">
          <IconButton onClick={handleZoomOut}>
            <ZoomOut />
          </IconButton>
        </Tooltip>

        <Tooltip title="Home">
          <IconButton onClick={handleHome}>
            <Home />
          </IconButton>
        </Tooltip>

        <Tooltip title="Full Screen">
          <IconButton onClick={handleFullScreen}>
            <Fullscreen />
          </IconButton>
        </Tooltip>

        <Tooltip title="Rotate Left">
          <IconButton onClick={handleRotateLeft}>
            <RotateLeft />
          </IconButton>
        </Tooltip>

        <Tooltip title="Rotate Right">
          <IconButton onClick={handleRotateRight}>
            <RotateRight />
          </IconButton>
        </Tooltip>

        <Tooltip title="Reset Rotation">
          <IconButton onClick={handleResetRotation}>
            <RestartAlt />
          </IconButton>
        </Tooltip>

        <Tooltip title="Toggle Navigator">
          <IconButton onClick={handleToggleNavigator}>
            <Map />
          </IconButton>
        </Tooltip>

        <Tooltip title="Flip Horizontal">
          <IconButton onClick={handleFlipHorizontal}>
            <Flip />
          </IconButton>
        </Tooltip>

        <Tooltip title="Flip Vertical">
          <IconButton onClick={handleFlipVertical}>
            <FlipToBack />
          </IconButton>
        </Tooltip>

        {/* 🆕 Zoom Levels */}
        <Tooltip title="10x Zoom">
          <IconButton onClick={() => handleZoomTo(10)}>
            <Typography variant="button">10x</Typography>
          </IconButton>
        </Tooltip>

        <Tooltip title="20x Zoom">
          <IconButton onClick={() => handleZoomTo(20)}>
            <Typography variant="button">20x</Typography>
          </IconButton>
        </Tooltip>

        <Tooltip title="50x Zoom">
          <IconButton onClick={() => handleZoomTo(50)}>
            <Typography variant="button">50x</Typography>
          </IconButton>
        </Tooltip>

        <Tooltip title="100x Zoom">
          <IconButton onClick={() => handleZoomTo(100)}>
            <Typography variant="button">100x</Typography>
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Viewer */}
      <Box
        id="openseadragon-viewer"
        ref={viewerRef}
        sx={{
          flex: 1,
          border: '0px solid #ccc',
          overflow: 'hidden',
          padding: '2px',
        }}
      />
    </Box>
  );
};

export default OpenSeadragonViewer;
