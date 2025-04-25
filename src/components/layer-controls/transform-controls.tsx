import { Transform } from "audio-visualizer.js";
import { Label } from "../ui/label";
import { SliderInput } from "../ui/slider-input";

export type TransformControlsProps = {
    settings: Required<Transform>;
    onChange: (
        field: keyof Transform,
        value: Required<Transform>[keyof Required<Transform>]
    ) => void;
};

export function TransformControls({
    settings,
    onChange,
}: TransformControlsProps) {
    return (
        <div className="space-y-2">
            <Label>Transform</Label>
            <div className="space-y-2 mb-2">
                <SliderInput
                    value={settings.x}
                    min={-50}
                    max={50}
                    step={0.1}
                    label="x"
                    onChange={(val) => onChange("x", val)}
                />
                <SliderInput
                    value={settings.y}
                    min={-50}
                    max={50}
                    step={0.1}
                    label="y"
                    onChange={(val) => onChange("y", val)}
                />
                <SliderInput
                    value={settings.z}
                    min={-50}
                    max={50}
                    step={0.1}
                    label="z"
                    onChange={(val) => onChange("z", val)}
                />
            </div>
            <Label>Rotation</Label>
            <div className="space-y-2">
                <SliderInput
                    value={settings.rotationX}
                    min={0}
                    max={settings.maxRotationX}
                    step={0.1}
                    label="x"
                    onChange={(val) => onChange("rotationX", val)}
                />
                <SliderInput
                    value={settings.rotationY}
                    min={0}
                    max={settings.maxRotationY}
                    step={0.1}
                    label="y"
                    onChange={(val) => onChange("rotationY", val)}
                />
                <SliderInput
                    value={settings.rotationZ}
                    min={0}
                    max={settings.maxRotationZ}
                    step={0.1}
                    label="z"
                    onChange={(val) => onChange("rotationZ", val)}
                />
            </div>
            <Label>Max Rotation</Label>
            <div className="space-y-2">
                <SliderInput
                    value={settings.maxRotationX}
                    min={settings.rotationX}
                    max={50}
                    step={0.1}
                    label="x"
                    onChange={(val) => onChange("maxRotationX", val)}
                />
                <SliderInput
                    value={settings.maxRotationY}
                    min={settings.rotationY}
                    max={50}
                    step={0.1}
                    label="y"
                    onChange={(val) => onChange("maxRotationY", val)}
                />
                <SliderInput
                    value={settings.maxRotationZ}
                    min={settings.rotationZ}
                    max={50}
                    step={0.1}
                    label="z"
                    onChange={(val) => onChange("maxRotationZ", val)}
                />
            </div>
        </div>
    );
}
