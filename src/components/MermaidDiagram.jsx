import React, { useState, useEffect, useRef } from 'react';
import { Typography, Alert } from '@mui/material';
import mermaid from 'mermaid';

const MermaidDiagram = ({ definition }) => {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const diagramRef = useRef(null);
  const diagramId = useRef(`mermaid-${Math.random().toString(36).substring(2, 11)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        if (!definition || !diagramRef.current) {
          setSvg('');
          setError('');
          return;
        }

        // Initialize mermaid
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          er: { useMaxWidth: false }
        });

        // Clear previous content
        diagramRef.current.innerHTML = '';
        
        // Create a new div for mermaid to render into
        const tempDiv = document.createElement('div');
        tempDiv.id = diagramId.current;
        diagramRef.current.appendChild(tempDiv);
        
        try {
          // Parse to validate syntax
          mermaid.parse(definition);
          
          // Render using the newer API approach
          const { svg: renderedSvg } = await mermaid.render(diagramId.current, definition);
          setSvg(renderedSvg);
          setError('');
        } catch (err) {
          console.error('Mermaid parsing/rendering error:', err);
          setError(err.message || 'Failed to render diagram');
        }
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError(err.message || 'Unknown diagram error');
        setSvg('');
      }
    };

    renderDiagram();
  }, [definition]);

  if (error) {
    return (
      <Alert severity="error">
        Diagram Error: {error}
        <pre style={{ whiteSpace: 'pre-wrap' }}>{definition}</pre>
      </Alert>
    );
  }

  return (
    <>
      {/* Hidden container for mermaid to render into */}
      <div ref={diagramRef} style={{ display: 'none' }}></div>
      
      {/* Visible SVG output */}
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <Typography color="textSecondary">
          {definition ? 'Rendering diagram...' : 'Enter schema requirements and click "Generate Schema"'}
        </Typography>
      )}
    </>
  );
};

export default MermaidDiagram;