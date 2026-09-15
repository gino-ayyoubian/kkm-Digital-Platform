import * as React from 'react';
import InteractiveMap from './InteractiveMap';
import { MapMarker } from '../types';
import { useLanguage } from '../LanguageContext';

interface GlobalFootprintProps {
    projects: MapMarker[];
    activeProject: MapMarker | null;
    hoveredProjectName: string | null;
    mapHoveredProjectName: string | null;
    onMarkerSelect: (projectName: string) => void;
    onMarkerHover: (projectName: string | null) => void;
}

const GlobalFootprint: React.FC<GlobalFootprintProps> = ({
    projects,
    activeProject,
    hoveredProjectName,
    mapHoveredProjectName,
    onMarkerSelect,
    onMarkerHover
}) => {
    const { t } = useLanguage();

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-display font-bold text-primary-dark dark:text-secondary mb-4">{t('OurGlobalFootprint')}</h2>
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-200">
                <InteractiveMap 
                    projects={projects} 
                    activeProject={activeProject} 
                    onMarkerSelect={onMarkerSelect} 
                    hoveredProjectName={hoveredProjectName} 
                    mapHoveredProjectName={mapHoveredProjectName} 
                    onMarkerHover={onMarkerHover} 
                />
            </div>
        </div>
    );
};

export default GlobalFootprint;