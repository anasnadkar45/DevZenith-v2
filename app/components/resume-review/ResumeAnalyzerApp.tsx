"use client"
import React, { useEffect, useState } from "react";
import { useCompletion } from 'ai/react';
import { FaSpinner } from "react-icons/fa";
import ResumeUploader from "./ResumeUploader";
import ResumeWorth from "./ResumeWorth";

const ResumeAnalyzerApp = () => {
    const [showWorth, setShowWorth] = useState(false);
    const [isLoadingResume, setIsLoadingResume] = useState(false);
    const [resumeText, setResumeText] = useState<string>('');
    const [estimatedWorth, setEstimatedWorth] = useState<string>('N/A');
    const [explanationItems, setExplanationItems] = useState<string[]>([]);
    const [improvementItems, setImprovementItems] = useState<string[]>([]);
    const { completion, isLoading, complete, error } = useCompletion({
        api: 'api/resume',
    });

    useEffect(() => {
        const getResumeAnalysis = async (text: string) => {
            const messageToSend = `RESUME: ${text}\n\n`;
            setIsLoadingResume(true); // Set loading state
            await complete(messageToSend);
            setShowWorth(true);
            setIsLoadingResume(false);
        };

        if (resumeText !== '') {
            getResumeAnalysis(resumeText).catch(err => {
                console.error('Error analyzing resume:', err);
                setIsLoadingResume(false);
            });
        }
    }, [resumeText]);

    useEffect(() => {
        if (completion) {
            const estimatedWorthMatch = completion.match(/<Estimated Worth>\$(.+)<\/Estimated Worth>/);
            const explanationMatch = completion.match(/<Explanation>([\s\S]*?)<\/Explanation>/);
            const improvementsMatch = completion.match(/<Improvements>([\s\S]*?)<\/Improvements>/);

            const estimatedWorth = estimatedWorthMatch ? estimatedWorthMatch[1] : 'N/A';
            const explanation = explanationMatch ? explanationMatch[1] : "";
            const improvements = improvementsMatch ? improvementsMatch[1] : "";

            const explanationItems = explanation.match(/<li>(.*?)<\/li>/g)?.map(item => item.replace(/<\/?li>/g, '').trim()) || [];
            const improvementItems = improvements.match(/<li>(.*?)<\/li>/g)?.map(item => item.replace(/<\/?li>/g, '').trim()) || [];

            setEstimatedWorth(estimatedWorth);
            setExplanationItems(explanationItems);
            setImprovementItems(improvementItems);
        }
    }, [completion]);

    const calculateScore = () => {
        // Example: Calculate score based on some criteria from analysis
        // For simplicity, let's assume a random score between 50 and 100
        return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    };

    const score = calculateScore();

    return (
        <div>
            {!showWorth ? (
                <div>
                    <p>Upload Your Resume to know your worth</p>
                    <ResumeUploader setIsLoading={setIsLoadingResume} setResumeText={setResumeText} />
                    {(isLoadingResume || isLoading) && (
                        <div className="flex items-center justify-center mt-4">
                            <FaSpinner className="animate-spin text-primary text-4xl" />
                            <span className="ml-2">Analyzing...</span>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <ResumeWorth
                        estimatedWorth={estimatedWorth}
                        explanationItems={explanationItems}
                        improvementItems={improvementItems}
                        score={score}
                    />
                    <p>Your Score: {score}%</p>
                </div>
            )}
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default ResumeAnalyzerApp;
