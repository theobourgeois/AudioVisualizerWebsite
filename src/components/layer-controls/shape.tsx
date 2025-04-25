import { usePlayground } from "@/store/playground";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { Shape, SHAPES } from "audio-visualizer.js";
import { Label } from "../ui/label";
import { RotationAmplitudeControls } from "./rotation-amplitude-controls";
import { Input } from "../ui/input";
import { SliderInput } from "../ui/slider-input";
import { Switch } from "../ui/switch";

function ShapeControls({
    settings,
    id,
}: {
    settings: Required<Shape>;
    id: number;
}) {
    const { updateLayer } = usePlayground();

    const update = (field: keyof Shape, value: Shape[keyof Shape]) => {
        updateLayer<"shape">(id, field, value);
    };

    return (
        <div className="space-y-2">
            <div>
                <Label>Shape</Label>
                <div>
                    <Label>Color</Label>
                    <Input
                        type="color"
                        value={settings.color}
                        onChange={(e) => update("color", e.target.value)}
                    />
                </div>
            </div>

            <div>
                <Label>Size</Label>
                <SliderInput
                    min={0}
                    max={100}
                    step={0.5}
                    value={settings.size}
                    onChange={(val) => update("size", val)}
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
                <Label>Cast Shadows</Label>
                <Switch
                    checked={settings.castShadow}
                    onCheckedChange={(checked) => update("castShadow", checked)}
                    className="data-[state=unchecked]:bg-indigo-900 data-[state=checked]:bg-indigo-500"
                ></Switch>
            </div>

            <div className="flex items-center gap-1">
                <Label>Receive Shadows</Label>
                <Switch
                    checked={settings.receiveShadow}
                    onCheckedChange={(checked) =>
                        update("receiveShadow", checked)
                    }
                    className="data-[state=unchecked]:bg-indigo-900 data-[state=checked]:bg-indigo-500"
                ></Switch>
            </div>

            <Select onValueChange={(val) => update("shape", val)}>
                <SelectTrigger>{settings.shape}</SelectTrigger>
                <SelectContent>
                    {SHAPES.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </SelectContent>
                <RotationAmplitudeControls
                    settings={settings}
                    onChange={update}
                />
            </Select>
        </div>
    );
}

export default ShapeControls;
