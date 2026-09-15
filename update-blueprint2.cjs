const fs = require('fs');
const blueprint = JSON.parse(fs.readFileSync('firebase-blueprint.json', 'utf8'));

blueprint.entities.SystemMetric = {
  title: "System Metric",
  description: "Live performance metrics for Digital Twins.",
  type: "object",
  properties: {
    history: { 
      type: "array",
      items: {
        type: "object",
        properties: {
          time: { type: "string" },
          gmelCO2: { type: "number" },
          reeCO2: { type: "number" }
        }
      }
    },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["history", "updatedAt"]
};

blueprint.firestore["/systemMetrics/{metricId}"] = {
  schema: "SystemMetric",
  description: "Stores live metrics history."
};

fs.writeFileSync('firebase-blueprint.json', JSON.stringify(blueprint, null, 2));
