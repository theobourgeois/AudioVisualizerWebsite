import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Preset, PRESETS } from "audio-visualizer.js";
import { formatPresetName } from "./layer-controls/layer-controls";
import { Plus, X } from "lucide-react";

interface LayerManagerProps {
    layers: any[];
    selectedPresetId: number;
    setSelectedPresetId: (id: number) => void;
    removeLayer: (id: number) => void;
    handleAddLayer: (preset: Preset) => void;
}

export function LayerManager({
    layers,
    selectedPresetId,
    setSelectedPresetId,
    removeLayer,
    handleAddLayer,
}: LayerManagerProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-2">
                {layers.map((layer) => (
                    <Badge
                        key={layer.id}
                        className={cn(
                            "bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 cursor-pointer",
                            selectedPresetId === layer.id &&
                                "bg-indigo-500 text-white hover:bg-indigo-500/80"
                        )}
                        onClick={() => setSelectedPresetId(layer.id!)}
                    >
                        {formatPresetName(layer.preset)}
                        <X
                            className="ml-2 h-4 w-4"
                            onClick={(event) => {
                                event.stopPropagation();
                                removeLayer(layer.id!);
                                if (selectedPresetId === layer.id) {
                                    const index = layers.findIndex(
                                        (l) => l.id === layer.id
                                    );
                                    setSelectedPresetId(
                                        layers[index + 1]?.id ||
                                            layers[index - 1]?.id ||
                                            layers[0].id!
                                    );
                                }
                            }}
                        />
                    </Badge>
                ))}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                        <Plus className="mr-2 h-5 w-5" /> Add Layer
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    {PRESETS.map((preset) => (
                        <DropdownMenuItem
                            key={preset}
                            onClick={() => handleAddLayer(preset)}
                        >
                            {formatPresetName(preset)}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
