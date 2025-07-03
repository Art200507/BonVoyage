import { Card } from './ui/card';
import { Button } from './ui/button';

export function DayPlan({ plan, onRegenerate }) {
    if (!plan) return null;

    return (
        <Card className="p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Day Plan</h2>
                <Button variant="outline" onClick={onRegenerate}>
                    Regenerate
                </Button>
            </div>

            <div className="space-y-6">
                {plan.schedule.map((item, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg">{item.time}</h3>
                                <p className="text-muted-foreground">{item.activity}</p>
                            </div>
                            <span className="text-2xl">{item.icon}</span>
                        </div>
                        <p className="mt-2 text-sm">{item.description}</p>
                        {item.recommendations && (
                            <div className="mt-2">
                                <p className="text-sm font-medium">Recommendations:</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                    {item.recommendations.map((rec, i) => (
                                        <li key={i}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {plan.summary && (
                <div className="mt-8 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Summary</h3>
                    <p className="text-sm">{plan.summary}</p>
                </div>
            )}
        </Card>
    );
} 