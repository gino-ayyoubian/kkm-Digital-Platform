const fs = require('fs');
let content = fs.readFileSync('constants.ts', 'utf8');

const sarakhsData = `
        client: 'Ministry of Energy, Iran',
        location: 'Sarakhs, Razavi Khorasan Province',
        scope: 'Exploration, drilling, and construction of a 50MW closed-loop geothermal facility utilizing depleted gas wells.',
        role: 'Lead EPC Contractor & Technology Provider',
        technology: 'GMEL-CLG (Closed-Loop Geothermal), Smart-Casing',
        stage: 'Phase 2 (Drilling & Subsurface Heat Exchanger Installation)',
        deliverables: ['Resource Assessment', 'Deep Drilling (4,500m)', 'ORC Turbine Integration', 'Grid Connection'],
        results: 'Validated thermal gradient of 45°C/km. Prototype phase demonstrated stable fluid circulation with 0% leak rate.',
        nextPhase: 'Phase 3 (Turbine Commissioning & Grid Synchronization)',
`;

content = content.replace(/name: "Project_Sarakhs_Name",/, `name: "Project_Sarakhs_Name",
${sarakhsData}`);

const qeshmData = `
        client: 'Qeshm Free Zone Organization',
        location: 'Qeshm Island, Iran',
        scope: 'Integrated offshore/onshore infrastructure and pipeline development.',
        role: 'General Contractor (EPC)',
        technology: 'Advanced Marine Engineering, HDPE pipelines',
        stage: 'Completed',
        deliverables: ['Pipeline Deployment', 'Offshore Terminal', 'Control Center'],
        results: 'Increased throughput by 120%.',
        nextPhase: 'Expansion Phase Planning',
`;
content = content.replace(/name: "Project_Qeshm_Name",/, `name: "Project_Qeshm_Name",
${qeshmData}`);

const chabaharData = `
        client: 'Ports and Maritime Organization',
        location: 'Chabahar Port, Iran',
        scope: 'Construction of deep-water berths and smart logistics tech.',
        role: 'Subcontractor / Technology Integrator',
        technology: 'Smart Port Logistics, Geotech Engineering',
        stage: 'Phase 1 Completed',
        deliverables: ['Berth Construction', 'Logistics AI Model', 'Safety Systems'],
        results: 'Handled 5M tons of cargo in first year.',
        nextPhase: 'Phase 2 (Automated Cranes)',
`;
content = content.replace(/name: "Project_Chabahar_Name",/, `name: "Project_Chabahar_Name",
${chabaharData}`);

const tabrizData = `
        client: 'Tabriz Water Authority',
        location: 'Tabriz, Iran',
        scope: 'Municipal water distribution network modernization.',
        role: 'EPC Contractor',
        technology: 'Smart Metering, Leak Detection Algorithms',
        stage: 'Operations & Maintenance',
        deliverables: ['Network Overhaul', 'Smart Meters', 'Control Room'],
        results: 'Reduced non-revenue water by 40%.',
        nextPhase: 'City-wide Rollout',
`;
content = content.replace(/name: "Project_Tabriz_Name",/, `name: "Project_Tabriz_Name",
${tabrizData}`);

fs.writeFileSync('constants.ts', content);
