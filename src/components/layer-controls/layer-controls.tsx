import { Layer, LayerSettings, Preset } from "audio-visualizer.js";
import TextControls from "./text";
import ShapeControls from "./shape";
import WaveformControls from "./waveform";
import LightControls from "./light";
import { Card, CardContent, CardHeader } from "../ui/card";
import { usePlayground } from "@/store/playground";
import { Button } from "../ui/button";

export function formatPresetName(preset: string) {
    return preset
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

function getLayerComponent<T extends Preset>(
    preset: T
): React.FC<{
    id: number;
    settings: LayerSettings<T>;
}> | null {
    const map = {
        shape: ShapeControls,
        text: TextControls,
        waveform: WaveformControls,
        light: LightControls,
        "line-waveform": WaveformControls,
    };
    return (map[preset] || null) as React.FC<{
        id: number;
        settings: LayerSettings<T>;
    }> | null;
}

export function LayerControls<T extends Preset>({
    layer,
}: {
    layer: Layer<T>;
}) {
    const { resetLayerToDefault } = usePlayground();
    const LayerComponent = getLayerComponent<T>(layer.preset);

    if (!LayerComponent) {
        return null;
    }

    return (
        <Card className="bg-indigo-950/50 text-white my-2 border-indigo-500/20 h-[550px] overflow-auto">
            <CardHeader className="justify-between w-full flex-row items-center">
                <p className="text-xl font-semibold w-min">
                    {formatPresetName(layer.preset)}{" "}
                </p>
                <Button
                    className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300"
                    onClick={() => resetLayerToDefault(layer.id!)}
                >
                    Reset to Default
                </Button>
            </CardHeader>
            <CardContent>
                <LayerComponent
                    id={layer.id as number}
                    settings={layer.settings}
                />
            </CardContent>
        </Card>
    );
}
