import { Label } from "../ui/label";
import { SliderInput } from "../ui/slider-input";

type RotationAmplitude = {
    rotationXAmplitude: number;
    rotationYAmplitude: number;
    rotationZAmplitude: number;
};

type TransformControlsProps = {
    settings: RotationAmplitude;
    onChange: (
        field: keyof RotationAmplitude,
        value: RotationAmplitude[keyof RotationAmplitude]
    ) => void;
};

export function RotationAmplitudeControls({
    settings,
    onChange,
}: TransformControlsProps) {
    return (
        <div className="space-y-2">
            <Label>Rotation Amplitude</Label>
            <div className="space-y-2 mb-2">
                <SliderInput
                    value={settings.rotationXAmplitude}
                    min={0}
                    max={30}
                    step={0.1}
                    label="x"
                    onChange={(val) => onChange("rotationXAmplitude", val)}
                />
                <SliderInput
                    value={settings.rotationYAmplitude}
                    min={0}
                    max={30}
                    step={0.1}
                    label="y"
                    onChange={(val) => onChange("rotationYAmplitude", val)}
                />
                <SliderInput
                    value={settings.rotationZAmplitude}
                    min={0}
                    max={30}
                    step={0.1}
                    label="z"
                    onChange={(val) => onChange("rotationZAmplitude", val)}
                />
            </div>
        </div>
    );
}
