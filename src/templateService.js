// Collection of predefined schema templates

const templates = [
    {
      id: 'single-table',
      name: 'Single Table',
      description: 'Basic single table schema template',
      template: `CREATE TABLE SingleTable (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
  );`,
      mermaidDiagram: `erDiagram
        SINGLETABLE {
          int id PK
          string name
          string description
          timestamp created_at
          timestamp updated_at
        }`
    }
  ];
  
  export const getTemplates = () => {
    return templates;
  };
  
  export const getTemplateById = (id) => {
    return templates.find(template => template.id === id) || null;
  };
  
  export default {
    getTemplates,
    getTemplateById
  };