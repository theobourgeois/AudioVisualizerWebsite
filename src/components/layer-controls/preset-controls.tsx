import { PresetBase } from "audio-visualizer.js";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { AudioWaveform, Clock } from "lucide-react";
import { Label } from "../ui/label";

type PresetControlsProps = {
    settings: PresetBase;
    onChange: (
        field: keyof PresetBase,
        value: PresetBase[keyof PresetBase]
    ) => void;
};

export function PresetControls({ settings, onChange }: PresetControlsProps) {
    return (
        <div>
            <div>
                <Label>Domain Type</Label>
                <ToggleGroup
                    className="justify-start"
                    onValueChange={(val) =>
                        onChange("domainType", val as PresetBase["domainType"])
                    }
                    value={settings.domainType}
                    type="single"
                >
                    <ToggleGroupItem
                        value="frequency"
                        aria-label="Toggle frequency"
                    >
                        <AudioWaveform className="h-4 w-4" />
                        Frequency
                    </ToggleGroupItem>
                    <ToggleGroupItem value="time" aria-label="Toggle time">
                        <Clock className="h-4 w-4" />
                        Time
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </div>
    );
}
