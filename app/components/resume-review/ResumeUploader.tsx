// /app/components/ResumeUploader.tsx
"use client"
import React, { useState } from 'react';
import { MdCloudUpload } from "react-icons/md";

type Props = {
    setResumeText: React.Dispatch<React.SetStateAction<string>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResumeUploader: React.FC<Props> = ({ setResumeText, setIsLoading }) => {
    const [error, setError] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    const mergeTextContent = (textContent: any) => {
        return textContent.items
            .map((item: any) => item.str)
            .join(" ");
    };

    const readResume = async (pdfFile: File | undefined) => {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

        if (!pdfFile) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
            const arrayBuffer = event.target?.result;
            if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
                const loadingTask = pdfjs.getDocument(new Uint8Array(arrayBuffer));
                loadingTask.promise.then(
                    (pdfDoc) => {
                        pdfDoc.getPage(1).then((page) => {
                            page.getTextContent().then((textContent) => {
                                const extractedText = mergeTextContent(textContent);
                                setResumeText(extractedText);
                            });
                        });
                    },
                    (reason) => {
                        console.error(`Error during PDF Loading: ${reason}`);
                    }
                );
            }
        };
        reader.readAsArrayBuffer(pdfFile);
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setResumeText('');
        setError('');
        setIsLoading(true);

        try {
            const items = event.dataTransfer.items;

            if (!items || items.length !== 1) {
                throw new Error('Please drop a single file.');
            }
            const item = items[0];

            if (item.kind !== 'file' || item.type !== 'application/pdf') {
                throw new Error('Please drop a single PDF file.');
            }
            const file = item.getAsFile();

            if (!file) {
                throw new Error('The PDF was not uploaded correctly.');
            }
            await readResume(file);
        } catch (error: any) {
            setError('There was an error reading the resume. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    const handleButtonUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setResumeText('');
        setError('');
        setIsLoading(true);

        try {
            const files = event.target.files;

            if (!files || files.length !== 1) {
                throw new Error('Please upload a single file.');
            }

            const file = files[0];

            if (file.type !== 'application/pdf') {
                throw new Error('Please upload a PDF file.');
            }

            await readResume(file);
        } catch (error: any) {
            setError('There was an error reading the resume. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => handleDragOver(e)}
                onDragEnter={(e) => handleDragEnter(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                className={`border-dashed border-2 p-6 rounded-md ${isDragOver ? 'border-primary' : 'border-gray-300'}`}
            >
                <input
                    type="file"
                    id="file-upload"
                    onChange={handleButtonUpload}
                    accept="application/pdf"
                    hidden
                />
                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center cursor-pointer text-center text-primary p-4"
                >
                    <MdCloudUpload className="text-4xl mb-2" />
                    <span>Drag and drop a PDF file or click to upload</span>
                </label>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default ResumeUploader;
