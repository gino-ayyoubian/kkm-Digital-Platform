const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');

// Update Project interface
content = content.replace(/export interface Project \{[\s\S]*?timeline: \{/, `export interface Project {
    name: string;
    client?: string;
    location?: string;
    scope?: string;
    role?: string;
    technology?: string;
    stage?: string;
    deliverables?: string[];
    results?: string;
    nextPhase?: string;
    description: string;
    image: string;
    tags: string[];
    coordinates: { lat: number; lng: number };
    googleMapsLink?: string;
    gallery: string[];
    videoUrl?: string;
    detailedContent: string;
    metrics?: {
        budget: {
            total: number;
            currency: string;
            allocation: { name: string; value: number; fill: string; }[];
        };
        timeline: {`);

fs.writeFileSync('types.ts', content);
