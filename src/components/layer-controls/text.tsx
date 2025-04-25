import { FONTS, Text } from "audio-visualizer.js";
import { TransformControls } from "./transform-controls";
import { usePlayground } from "@/store/playground";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SliderInput } from "../ui/slider-input";
import { RotationAmplitudeControls } from "./rotation-amplitude-controls";
import { PresetControls } from "./preset-controls";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

function TextControls({
    settings,
    id,
}: {
    settings: Required<Text>;
    id: number;
}) {
    const { updateLayer } = usePlayground();

    const update = (field: keyof Text, value: Text[keyof Text]) => {
        updateLayer<"text">(id, field, value);
    };

    return (
        <div className="space-y-2">
            <div>
                <Label>Text</Label>
                <Textarea
                    value={settings.text}
                    onChange={(e) => update("text", e.target.value)}
                />
            </div>
            <div>
                <Label>Color</Label>
                <Input
                    type="color"
                    value={settings.color}
                    onChange={(e) => update("color", e.target.value)}
                />
            </div>
            <div>
                <Label>Font</Label>
                <Select onValueChange={(val) => update("font", val)}>
                    <SelectTrigger>{settings.font}</SelectTrigger>
                    <SelectContent>
                        {FONTS.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Size</Label>
                <SliderInput
                    min={0}
                    max={10}
                    step={0.2}
                    value={settings.size}
                    onChange={(val) => update("size", val)}
                />
            </div>
            <div>
                <Label>Depth</Label>
                <SliderInput
                    min={0}
                    max={5}
                    step={0.05}
                    value={settings.depth}
                    onChange={(val) => update("depth", val)}
                />
            </div>
            <div>
                <Label>Amplitude</Label>
                <SliderInput
                    min={0}
                    max={50}
                    step={0.1}
                    value={settings.amplitude}
                    onChange={(val) => update("amplitude", val)}
                />
            </div>
            <PresetControls settings={settings} onChange={update} />
            <TransformControls settings={settings} onChange={update} />

            <RotationAmplitudeControls settings={settings} onChange={update} />
        </div>
    );
}

export default TextControls;
