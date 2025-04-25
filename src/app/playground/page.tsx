import { Playground } from "@/components/playground";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Audio Visualizer Playground - Create and Customize Visualizations",
    description:
        "Experiment with audio-visualizer.js in our interactive playground. Upload audio, add layers, and customize your visualizations in real-time.",
    openGraph: {
        title: "Audio Visualizer Playground",
        description:
            "Create and customize audio visualizations with our interactive playground.",
        images: [
            {
                url: "/og-playground.png",
                width: 1200,
                height: 630,
                alt: "Audio Visualizer Playground",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Audio Visualizer Playground",
        description:
            "Create and customize audio visualizations with our interactive playground.",
        images: ["/og-playground.png"],
    },
};

export default function PlaygroundPage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                Audio Visualizer Playground
            </h1>
            <Playground />
        </main>
    );
}
