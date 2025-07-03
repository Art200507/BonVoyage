import { Card } from './ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';

export function PlanStatus({ isLoading, error }) {
    if (!isLoading && !error) return null;

    return (
        <Card className="p-6 max-w-2xl mx-auto">
            {isLoading && (
                <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <p>Generating your perfect day plan...</p>
                </div>
            )}

            {error && (
                <div className="flex items-center space-x-2 text-destructive">
                    <AlertCircle className="h-6 w-6" />
                    <p>{error}</p>
                </div>
            )}
        </Card>
    );
} 