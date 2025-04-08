import React, { useState, useEffect, useRef } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  TextField, 
  Button,
  Box,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { InsertDriveFile } from '@mui/icons-material';
import mermaid from 'mermaid';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          Something went wrong: {this.state.error.toString()}
        </Alert>
      );
    }
    return this.props.children;
  }
}

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

const App = () => {
  const [inputText, setInputText] = useState('');
  const [schema, setSchema] = useState('');
  const [schemaConfirmed, setSchemaConfirmed] = useState(false);
  const [isGeneratingSchema, setIsGeneratingSchema] = useState(false);
  const [isGeneratingData, setIsGeneratingData] = useState(false);
  const [dataGenerated, setDataGenerated] = useState(false);
  const [appError, setAppError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Define Requirements', 'Confirm Schema', 'Generate Data'];

  const handleGenerateSchema = async () => {
    if (!inputText.trim()) {
      setAppError("Please enter your requirements before generating schema");
      return;
    }
    
    try {
      setIsGeneratingSchema(true);
      setAppError(null);
      setSchemaConfirmed(false);
      setDataGenerated(false);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Convert the input to a mermaid diagram
      // In a real app, you'd have logic to parse the SQL and generate this
      // For now, we'll just use a fixed example diagram
      const generatedSchema = `erDiagram
        CUSTOMER ||--o{ ORDER : places
        CUSTOMER {
          int id PK
          string name
          string email
          string address
        }
        ORDER {
          int id PK
          date orderDate
          string status
          int customerId FK
        }`;

      setSchema(generatedSchema);
      setActiveStep(1);
    } catch (error) {
      console.error('Schema generation error:', error);
      setAppError(error.message || 'Failed to generate schema');
    } finally {
      setIsGeneratingSchema(false);
    }
  };

  const handleConfirmSchema = () => {
    setSchemaConfirmed(true);
    setActiveStep(2);
  };

  const handleGenerateData = async () => {
    try {
      setIsGeneratingData(true);
      setAppError(null);

      // Simulate data generation delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setDataGenerated(true);
    } catch (error) {
      console.error('Data generation error:', error);
      setAppError(error.message || 'Failed to generate data');
    } finally {
      setIsGeneratingData(false);
    }
  };

  const handleReset = () => {
    setSchema('');
    setSchemaConfirmed(false);
    setDataGenerated(false);
    setActiveStep(0);
  };

  return (
    <ErrorBoundary>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AI Powered Data Generator
            </Typography>
          </Toolbar>
        </AppBar>
        
        {/* Increased the maxWidth from lg to xl for more width */}
        <Container maxWidth={false} sx={{ mt: 4, mb: 4, flexGrow: 1, px: { xs: 2, sm: 3, md: 5, lg: 8 } }}>
          {appError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {appError}
            </Alert>
          )}
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Grid container spacing={4}> {/* Increased spacing between panels */}
            {/* Left side - Input */}
            <Grid item xs={12} md={6}>
              <Paper 
                sx={{ 
                  p: 3, // Increased padding
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: 3 // Slightly stronger shadow
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {activeStep === 0 ? 'Input Requirements' : 
                   activeStep === 1 ? 'Review Schema' : 'Data Generation'}
                </Typography>
                
                {activeStep === 0 && (
                  <>
                    <TextField
                      multiline
                      rows={20}
                      fullWidth
                      variant="outlined"
                      sx={{
                        '& .MuiInputBase-root': {
                          height: '450px',
                          fontSize: '16px',
                          fontFamily: 'monospace',
                          width: '100%', // Ensure full width
                          '& textarea': {
                            height: '100% !important'
                          }
                        },
                        width: '100%' // Ensure the TextField itself takes full width
                      }}
                      placeholder={`Enter your DDL statements or describe your requirements.\nExample:\n"CREATE TABLE Customer (\n  customer_id INT PRIMARY KEY,\n  name VARCHAR(100),\n  email VARCHAR(100)\n);"`}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                    
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large" // Larger button
                      sx={{ mt: 2 }}
                      onClick={handleGenerateSchema}
                      disabled={isGeneratingSchema || !inputText.trim()}
                    >
                      {isGeneratingSchema ? 'Generating...' : 'Generate Schema'}
                    </Button>
                  </>
                )}
                
                {activeStep === 1 && (
                  <>
                    <Typography variant="body1" gutterBottom>
                      Please review the generated schema and confirm if it looks correct.
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={handleReset}
                      >
                        Back to Requirements
                      </Button>
                      
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleConfirmSchema}
                      >
                        Confirm Schema
                      </Button>
                    </Box>
                  </>
                )}
                
                {activeStep === 2 && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <InsertDriveFile fontSize="small" sx={{ mr: 1 }} />
                      <Typography>Output Format: Excel File</Typography>
                    </Box>
                      
                    {!dataGenerated ? (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        sx={{ mt: 2 }}
                        onClick={handleGenerateData}
                        disabled={isGeneratingData}
                      >
                        {isGeneratingData ? 'Generating Data...' : 'Generate Data'}
                      </Button>
                    ) : (
                      <>
                        <Alert severity="success" sx={{ mb: 2 }}>
                          Data generation complete!
                        </Alert>
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          size="large"
                          sx={{ mt: 2 }}
                        >
                          Download Excel File
                        </Button>
                        <Button
                          variant="outlined"
                          fullWidth
                          size="large"
                          sx={{ mt: 2 }}
                          onClick={handleReset}
                        >
                          Start New Project
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Paper>
            </Grid>
            
            {/* Right side - Output */}
            <Grid item xs={12} md={6}>
              <Paper 
                sx={{ 
                  p: 3, // Increased padding
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: 3 // Slightly stronger shadow
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Schema Visualization
                </Typography>
                
                <Box sx={{ 
                  minHeight: '450px',
                  border: '1px solid #eee', 
                  borderRadius: '4px', 
                  padding: '16px',
                  overflow: 'auto',
                  width: '100%' // Ensure full width
                }}>
                  <ErrorBoundary>
                    <MermaidDiagram definition={schema} />
                  </ErrorBoundary>
                </Box>
                
                {dataGenerated && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Data Preview
                    </Typography>
                    <Typography variant="body2">
                      Generated 100 sample rows based on the schema
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ErrorBoundary>
  );
};

export default App;