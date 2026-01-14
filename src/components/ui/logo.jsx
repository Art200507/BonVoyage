import React from 'react';

export function Logo({ className }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <span className="text-3xl">✈️</span>
            <div className="flex flex-col">
                <h1 className="font-serif text-2xl font-bold text-primary">Bon Voyage</h1>
                <p className="text-xs text-muted-foreground italic">Your AI Travel Companion</p>
            </div>
        </div>
    );
} 