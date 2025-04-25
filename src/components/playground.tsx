"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AudioVisualizer, Preset, PRESETS } from "audio-visualizer.js";
import { Plus, Play, Pause, Upload, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
    formatPresetName,
    LayerControls,
} from "./layer-controls/layer-controls";
import { usePlayground } from "@/store/playground";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";

export function Playground() {
    const [src, setSrc] = useState<string>("/audio.mp3");
    const [isPlaying, setIsPlaying] = useState(false);
    const { layers, addLayer, removeLayer } = usePlayground();
    const [selectedPresetId, setSelectedPresetId] = useState<number>(
        layers[0]?.id || -1
    );
    const selectedLayer = useMemo(
        () => layers.find((layer) => layer.id === selectedPresetId),
        [layers, selectedPresetId]
    );
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            const handleEnded = () => setIsPlaying(false);
            audioElement.addEventListener("ended", handleEnded);
            return () => audioElement.removeEventListener("ended", handleEnded);
        }
    }, []);

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setSrc(url);
            setIsPlaying(false);
            audioRef?.current?.pause();
        }
    };

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

    const handleAddLayer = (preset: Preset) => {
        const id = addLayer(preset);
        setSelectedPresetId(id);
    };

    return (
        <div className="flex w-full flex-col gap-2 h-[80vh] ">
            <div className="flex items-center gap-2">
                <Button
                    onClick={togglePlay}
                    size="default"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    {isPlaying ? (
                        <>
                            <Pause className="mr-2 h-5 w-5" /> Pause
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-5 w-5" /> Play
                        </>
                    )}
                </Button>
                <div className="relative">
                    <Input
                        type="file"
                        accept="audio/*"
                        onChange={handleChangeFile}
                        className="hidden"
                        id="audio-upload"
                    />
                    <label
                        htmlFor="audio-upload"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center"
                    >
                        <Upload className="mr-2 h-5 w-5" /> Upload Audio
                    </label>
                </div>
            </div>
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full rounded-lg border h-full"
            >
                <ResizablePanel defaultSize={60}>
                    <div className="bg-gradient-to-br from-indigo-950/90 to-indigo-900 p-4 backdrop-blur-md border border-indigo-500/50 rounded-lg h-full">
                        <audio ref={audioRef} src={src} autoPlay={false} />
                        {selectedLayer && (
                            <AudioVisualizer
                                audioRef={audioRef}
                                config={layers}
                                backgroundColor="black"
                                className="w-full h-full rounded-lg"
                            />
                        )}
                    </div>
                </ResizablePanel>
                <ResizableHandle className="" withHandle />
                <ResizablePanel minSize={25} defaultSize={40}>
                    <div className="overflow-y-auto flex flex-col justify-between h-full bg-gradient-to-br from-indigo-950/90 to-indigo-900 backdrop-blur-md border border-indigo-500/50 rounded-lg p-6">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">
                                Layers
                            </h2>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {layers.map((layer) => (
                                    <Badge
                                        key={layer.id}
                                        className={cn(
                                            "bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 cursor-pointer",
                                            selectedPresetId === layer.id &&
                                                "bg-indigo-500 text-white hover:bg-indigo-500/80"
                                        )}
                                        onClick={() =>
                                            setSelectedPresetId(layer.id!)
                                        }
                                    >
                                        {formatPresetName(layer.preset)}
                                        <X
                                            className="ml-2 h-4 w-4"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                removeLayer(layer.id!);
                                                if (
                                                    selectedPresetId ===
                                                    layer.id
                                                ) {
                                                    const index =
                                                        layers.findIndex(
                                                            (l) =>
                                                                l.id ===
                                                                layer.id
                                                        );
                                                    setSelectedPresetId(
                                                        layers[index + 1]?.id ||
                                                            layers[index - 1]
                                                                ?.id ||
                                                            layers[0].id!
                                                    );
                                                }
                                            }}
                                        />
                                    </Badge>
                                ))}
                            </div>
                            {selectedLayer && (
                                <LayerControls layer={selectedLayer} />
                            )}
                        </div>

                        <div className="space-y-4">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="w-full">
                                    <div className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex justify-center items-center px-4 py-2 cursor-pointer">
                                        <Plus className="mr-2 h-5 w-5" /> Add
                                        Layer
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    {PRESETS.map((preset) => (
                                        <DropdownMenuItem
                                            className="w-full"
                                            key={preset}
                                            onClick={() =>
                                                handleAddLayer(preset)
                                            }
                                        >
                                            {formatPresetName(preset)}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
