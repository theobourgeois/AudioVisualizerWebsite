import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisualizerExamples } from "@/components/visualizer-examples";
import { CopyButton } from "@/components/copy-button";

export default function AudioVisualizerLandingPage() {
    return (
        <main className="container mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 animate-gradient">
                    Visualize Your Audio
                </h1>
                <p className="text-2xl text-indigo-200 mb-8">
                    Create stunning audio visualizations with ease using
                    audio-visualizer.js
                </p>
                <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>

            {/* Install Command */}
            <div className="bg-black/50 backdrop-blur-md border border-indigo-500/50 rounded-lg p-6 mb-16 text-center shadow-2xl">
                <h2 className="text-2xl mb-4 text-indigo-300 font-semibold">
                    Quick Install
                </h2>
                <div className="bg-black/50 inline-flex items-center px-6 py-3 rounded-md">
                    <code className="text-indigo-300 text-lg mr-4">
                        npm install audio-visualizer.js
                    </code>
                    <CopyButton text="npm install audio-visualizer.js" />
                </div>
            </div>

            {/* Examples Section */}
            <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                Example Visualizations
            </h2>
            <VisualizerExamples />
        </main>
    );
}
