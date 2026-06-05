"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    loadingScreenPlayed: boolean;
    setLoadingScreenPlayed: (played: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingScreenPlayed, setLoadingScreenPlayed] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading, loadingScreenPlayed, setLoadingScreenPlayed }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
