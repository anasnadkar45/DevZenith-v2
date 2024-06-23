import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ResumeWorthProps {
    estimatedWorth: string;
    explanationItems: string[];
    improvementItems: string[];
    score: number;
}

const ResumeWorth: React.FC<ResumeWorthProps> = ({ estimatedWorth, explanationItems, improvementItems, score }) => {
    return (
        <div>
            <div>${estimatedWorth}</div>
            <p>Resume Worth</p>

            <p>Your Score: {score}%</p>

            <div>
                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Key Factors</CardTitle>
                            <CardDescription>What contributes to your worth</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {explanationItems.length > 0 ? (
                                <ul>
                                    {explanationItems.map((item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No explanation provided.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="mt-4">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Improvement Tips</CardTitle>
                            <CardDescription>How to increase your resume worth</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {improvementItems.length > 0 ? (
                                <ul>
                                    {improvementItems.map((item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No improvement tips provided.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ResumeWorth;
