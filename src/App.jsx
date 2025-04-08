import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Grid, 
  Alert
} from '@mui/material';

// Import services
import { getTemplates, getTemplateById } from './templateService';

// Import components
import ErrorBoundary from './components/ErrorBoundry';
import StepperNavigation from './components/StepperNavigation';
import RequirementsInput from './components/RequirementsInput';
import SchemaReview from './components/SchemaReview';
import DataGeneration from './components/DataGeneration';
import SchemaVisualizer from './components/SchemaVisualizer';



const App = () => {
  const [inputText, setInputText] = useState('');
  const [schema, setSchema] = useState('');
  const [schemaConfirmed, setSchemaConfirmed] = useState(false);
  const [isGeneratingSchema, setIsGeneratingSchema] = useState(false);
  const [isGeneratingData, setIsGeneratingData] = useState(false);
  const [dataGenerated, setDataGenerated] = useState(false);
  const [appError, setAppError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  
  // Template related state
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  // Load templates when component mounts
  useEffect(() => {
    const availableTemplates = getTemplates();
    setTemplates(availableTemplates);
  }, []);

  const steps = ['Define Requirements', 'Confirm Schema', 'Generate Data'];

  const handleSelectTemplate = (templateId) => {
    const template = getTemplateById(templateId);
    if (template) {
      setSelectedTemplateId(templateId);
      setInputText(template.template);
      // When selecting a template, we can pre-generate the mermaid diagram
      // but still require the user to click "Generate Schema" to proceed
      // This makes the flow more consistent, but could be changed to auto-proceed
      setSchema(''); // Reset schema to not show the diagram yet
    }
  };

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

      // Check if we have a selected template, and use its mermaid diagram if available
      let generatedSchema;
      if (selectedTemplateId) {
        const template = getTemplateById(selectedTemplateId);
        if (template?.mermaidDiagram) {
          generatedSchema = template.mermaidDiagram;
        }
      }
      
      // If no template diagram available, generate a default one
      if (!generatedSchema) {
        generatedSchema = `erDiagram
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
      }

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
        
        <Container maxWidth={false} sx={{ mt: 4, mb: 4, flexGrow: 1, px: { xs: 2, sm: 3, md: 5, lg: 8 } }}>
          {appError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {appError}
            </Alert>
          )}
          
          <StepperNavigation activeStep={activeStep} steps={steps} />
          
          <Grid container spacing={4}>
            {/* Left side - Input */}
            <Grid item xs={12} md={6}>
              {activeStep === 0 && (
                <RequirementsInput 
                  inputText={inputText}
                  setInputText={setInputText}
                  handleGenerateSchema={handleGenerateSchema}
                  isGeneratingSchema={isGeneratingSchema}
                  templates={templates}
                  selectedTemplateId={selectedTemplateId}
                  handleSelectTemplate={handleSelectTemplate}
                />
              )}
              
              {activeStep === 1 && (
                <SchemaReview 
                  handleReset={handleReset}
                  handleConfirmSchema={handleConfirmSchema}
                />
              )}
              
              {activeStep === 2 && (
                <DataGeneration 
                  handleGenerateData={handleGenerateData}
                  isGeneratingData={isGeneratingData}
                  dataGenerated={dataGenerated}
                  handleReset={handleReset}
                />
              )}
            </Grid>
            
            {/* Right side - Output */}
            <Grid item xs={12} md={6}>
              <SchemaVisualizer 
                schema={schema}
                dataGenerated={dataGenerated}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </ErrorBoundary>
  );
};

export default App;