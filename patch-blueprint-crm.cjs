const fs = require('fs');
let blueprint = JSON.parse(fs.readFileSync('firebase-blueprint.json', 'utf8'));

// Update MeetingBooking -> Lead to encompass all CRM leads
blueprint.entities["Lead"] = {
    "title": "CRM Lead",
    "description": "Unified CRM lead capture and tracking.",
    "type": "object",
    "properties": {
        "name": { "type": "string", "maxLength": 100 },
        "organization": { "type": "string", "maxLength": 150 },
        "country": { "type": "string", "maxLength": 100 },
        "category": { 
            "type": "string", 
            "enum": ["Government", "Investor", "Industrial Partner", "Village / Municipality", "Research", "Customer", "Media"]
        },
        "status": {
            "type": "string",
            "enum": ["New", "Qualified", "Meeting", "Feasibility", "Pilot", "Project", "Contract"]
        },
        "source": { "type": "string", "maxLength": 50 },
        "message": { "type": "string", "maxLength": 1000 },
        "utmData": { "type": "object" },
        "createdAt": { "type": "string", "format": "date-time" },
        "updatedAt": { "type": "string", "format": "date-time" }
    },
    "required": ["name", "organization", "category", "status", "createdAt"]
};

blueprint.firestore["/leads/{leadId}"] = {
    "schema": "Lead",
    "description": "Stores unified leads for the CRM system."
};

// Content Governance
blueprint.entities["ContentArticle"] = {
    "title": "Governed Content",
    "description": "Content tracking for website publishing pipeline.",
    "type": "object",
    "properties": {
        "title": { "type": "string", "maxLength": 200 },
        "contentBody": { "type": "string" },
        "ownerId": { "type": "string" },
        "status": {
            "type": "string",
            "enum": ["Draft", "Technical Review", "IP/Legal Review", "CEO Approval", "Publish"]
        },
        "createdAt": { "type": "string", "format": "date-time" },
        "updatedAt": { "type": "string", "format": "date-time" }
    },
    "required": ["title", "ownerId", "status", "createdAt"]
};

blueprint.firestore["/contentArticles/{articleId}"] = {
    "schema": "ContentArticle",
    "description": "Stores content going through governance workflow."
};

fs.writeFileSync('firebase-blueprint.json', JSON.stringify(blueprint, null, 2));
