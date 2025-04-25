"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AudioVisualizerProps, AudioVisualizer } from "audio-visualizer.js";
import { Fullscreen, Pause, Play } from "lucide-react";
import { Card } from "./ui/card";

type Meta = {
    title: string;
    description: string;
};

const examples: (AudioVisualizerProps & Meta)[] = [
    {
        title: "Waveform",
        description: "A waveform audio visualization with blue color.",
        backgroundColor: "black",
        src: "/audio.mp3",
        config: [
            {
                preset: "waveform",
                settings: {
                    color: "rgb(79,70,229)",
                    amplitude: 10,
                    y: -3.8,
                    domainType: "frequency",
                },
            },
            {
                preset: "waveform",
                settings: {
                    color: "rgb(79,70,229)",
                    amplitude: 10,
                    y: 3.8,
                    domainType: "frequency",
                    invert: true,
                },
            },
            {
                preset: "waveform",
                settings: {
                    color: "rgb(79,70,229)",
                    amplitude: 100,
                    domainType: "time",
                    circle: true,
                },
            },
            {
                preset: "text",
                settings: {
                    text: "audio-visualizer.js",
                    color: "rgb(79,70,229)",
                    font: "helvetiker",
                    rotationYAmplitude: 10,
                    rotationXAmplitude: 1,
                    amplitude: 0.1,
                    size: 1,
                    domainType: "frequency",
                },
            },
            {
                preset: "light",
                settings: {
                    color: "#4C51BF",
                    intensity: 0.5,
                },
            },
        ],
    },
];

export function VisualizerExamples() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((item, index) => (
                <VisualizerCard key={index} {...item} />
            ))}
        </div>
    );
}

function VisualizerCard({
    title,
    description,
    src,
    ...props
}: AudioVisualizerProps & Meta) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        const audioElement = audioRef.current;
        if (audioElement) {
            if (isPlaying) {
                audioElement.pause();
            } else {
                audioElement.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            const handleEnded = () => setIsPlaying(false);
            audioElement.addEventListener("ended", handleEnded);
            return () => audioElement.removeEventListener("ended", handleEnded);
        }
    }, []);

    const handleToggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <Card className="bg-black/70 backdrop-blur-md border border-indigo-500/50 rounded-lg overflow-visible hover:border-indigo-500/80 transition-all duration-300 shadow-lg hover:shadow-xl">
            <audio ref={audioRef} src={src} />
            <div className="p-6 h-64 flex items-center justify-center">
                <div className="group w-full h-full rounded-lg flex items-center justify-center overflow-visible">
                    <AudioVisualizer
                        audioRef={audioRef}
                        className="w-full h-full"
                        {...props}
                    />
                </div>
            </div>
            <div className="bg-indigo-900/50 p-4 flex gap-2 justify-between items-center">
                <div className="gap-2">
                    <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                        {title}
                    </h3>
                    <p className="text-indigo-200 text-sm">{description}</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        size="icon"
                        onClick={togglePlay}
                        className="bg-indigo-500/50 hover:bg-indigo-500/70 rounded-full"
                    >
                        {isPlaying ? <Pause /> : <Play />}
                    </Button>

                    <Button
                        onClick={handleToggleFullscreen}
                        className="bg-indigo-500/50 hover:bg-indigo-500/70"
                    >
                        <Fullscreen />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
