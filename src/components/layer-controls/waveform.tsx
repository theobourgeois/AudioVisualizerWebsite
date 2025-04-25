import { WaveformBase } from "audio-visualizer.js";
import { Input } from "../ui/input";
import { usePlayground } from "@/store/playground";
import { Switch } from "../ui/switch";
import { PresetControls } from "./preset-controls";
import { TransformControls } from "./transform-controls";
import { Label } from "../ui/label";
import { SliderInput } from "../ui/slider-input";

function WaveformControls({
    settings,
    id,
}: {
    settings: Required<WaveformBase>;
    id: number;
}) {
    const { updateLayer } = usePlayground();
    const update = (
        field: keyof WaveformBase,
        value: WaveformBase[keyof WaveformBase]
    ) => {
        updateLayer<"waveform">(id, field, value);
    };

    return (
        <div className="space-y-2">
            <div>
                <Label>Color</Label>
                <Input
                    type="color"
                    value={settings.color}
                    onChange={(e) => update("color", e.target.value)}
                />
            </div>
            <div>
                <Label>Resolution</Label>
                <SliderInput
                    min={0}
                    max={1}
                    step={0.01}
                    value={settings.resolution}
                    onChange={(val) => update("resolution", val)}
                />
            </div>
            <div>
                <Label>Opacity</Label>
                <SliderInput
                    min={0}
                    max={1}
                    step={0.01}
                    value={settings.opacity}
                    onChange={(val) => update("opacity", val)}
                />
            </div>
            <div>
                <Label>Amplitude</Label>
                <SliderInput
                    min={0}
                    max={100}
                    step={1}
                    value={settings.amplitude}
                    onChange={(val) => update("amplitude", val)}
                />
            </div>

            <div className="flex items-center gap-1">
                <Label>Invert</Label>
                <Switch
                    checked={settings.invert}
                    onCheckedChange={(checked) => update("invert", checked)}
                    className="data-[state=unchecked]:bg-indigo-900 data-[state=checked]:bg-indigo-500"
                ></Switch>
            </div>
            <div className="flex items-center gap-1">
                <Label>Circle</Label>
                <Switch
                    checked={settings.circle}
                    onCheckedChange={(checked) => update("circle", checked)}
                    className="data-[state=unchecked]:bg-indigo-900 data-[state=checked]:bg-indigo-500"
                ></Switch>
            </div>
            {settings.circle && (
                <>
                    <div className="">
                        <Label>Radius</Label>
                        <SliderInput
                            min={0}
                            max={100}
                            step={0.5}
                            value={settings.radius}
                            onChange={(val) => update("radius", val)}
                        />
                    </div>
                    <div>
                        <Label>Circle Ratio</Label>
                        <SliderInput
                            min={0}
                            max={50}
                            step={0.1}
                            value={settings.circleRadiusRatio}
                            onChange={(val) => update("circleRadiusRatio", val)}
                        />
                    </div>
                </>
            )}

            <PresetControls settings={settings} onChange={update} />
            <TransformControls settings={settings} onChange={update} />
        </div>
    );
}

export default WaveformControls;
