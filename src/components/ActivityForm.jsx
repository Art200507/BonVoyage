import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

const activities = [
    { id: 'gym', label: 'Gym Workout', icon: '💪' },
    { id: 'swimming', label: 'Swimming', icon: '🏊' },
    { id: 'study', label: 'Study Session', icon: '📚' },
    { id: 'dinner', label: 'Dinner', icon: '🍽️' },
    { id: 'date', label: 'Date', icon: '❤️' },
    { id: 'other', label: 'Other', icon: '✨' }
];

export function ActivityForm({ onSubmit }) {
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [details, setDetails] = useState({});
    const [location, setLocation] = useState('');
    const [preferences, setPreferences] = useState('');

    const handleActivityToggle = (activityId) => {
        setSelectedActivities(prev =>
            prev.includes(activityId)
                ? prev.filter(id => id !== activityId)
                : [...prev, activityId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            activities: selectedActivities,
            details,
            location,
            preferences
        });
    };

    return (
        <Card className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Plan Your Day</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label className="text-lg mb-4 block">Select Activities</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {activities.map(activity => (
                            <Button
                                key={activity.id}
                                type="button"
                                variant={selectedActivities.includes(activity.id) ? "default" : "outline"}
                                className="h-24 flex flex-col items-center justify-center gap-2"
                                onClick={() => handleActivityToggle(activity.id)}
                            >
                                <span className="text-2xl">{activity.icon}</span>
                                <span>{activity.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {selectedActivities.map(activityId => (
                    <div key={activityId} className="space-y-2">
                        <Label>{activities.find(a => a.id === activityId).label} Details</Label>
                        <Textarea
                            placeholder={`Enter details for ${activities.find(a => a.id === activityId).label.toLowerCase()}...`}
                            value={details[activityId] || ''}
                            onChange={(e) => setDetails(prev => ({ ...prev, [activityId]: e.target.value }))}
                        />
                    </div>
                ))}

                <div className="space-y-2">
                    <Label>Location (Optional)</Label>
                    <Input
                        placeholder="Enter your location for better recommendations"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Additional Preferences</Label>
                    <Textarea
                        placeholder="Any specific preferences or requirements..."
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                    />
                </div>

                <Button type="submit" className="w-full" disabled={selectedActivities.length === 0}>
                    Generate Plan
                </Button>
            </form>
        </Card>
    );
} 