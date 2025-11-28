import React from 'react';
import { Rocket } from 'lucide-react';

const AnnouncementBanner = () => {
    return (
        <div className="bg-gradient-to-r from-coral-600 to-coral-500 text-white py-2 px-4 text-center text-sm font-medium">
            <div className="flex items-center justify-center space-x-2">
                <Rocket className="h-4 w-4 animate-bounce" />
                <span>
                    Platform launching soon! Join our pilot program today and be among the first to experience AI-powered salon transformation.
                </span>
            </div>
        </div>
    );
};

export default AnnouncementBanner;
