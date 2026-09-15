const fs = require('fs');
const blueprint = JSON.parse(fs.readFileSync('firebase-blueprint.json', 'utf8'));

blueprint.entities.SustainabilityAlert = {
  title: "Sustainability Alert",
  description: "Live sustainability efficiency alerts.",
  type: "object",
  properties: {
    message: { type: "string", maxLength: 500 },
    severity: { type: "string", enum: ["info", "warning", "critical"] },
    source: { type: "string", maxLength: 50 },
    createdAt: { type: "string", format: "date-time" }
  },
  required: ["message", "severity", "source", "createdAt"]
};

blueprint.entities.UserPreference = {
  title: "User Preference",
  description: "User dashboard preferences for DigitalTwinHub.",
  type: "object",
  properties: {
    theme: { type: "string", enum: ["light", "dark", "system"] },
    defaultTwin: { type: "string", enum: ["gmel", "ree", "none"] },
    updatedAt: { type: "string", format: "date-time" }
  },
  required: ["theme", "updatedAt"]
};

blueprint.firestore["/sustainabilityAlerts/{alertId}"] = {
  schema: "SustainabilityAlert",
  description: "Live sustainability efficiency alerts."
};

blueprint.firestore["/userPreferences/{userId}"] = {
  schema: "UserPreference",
  description: "Stores user preferences for the Digital Twin Hub."
};

fs.writeFileSync('firebase-blueprint.json', JSON.stringify(blueprint, null, 2));
