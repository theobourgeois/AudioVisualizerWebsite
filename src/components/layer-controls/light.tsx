import { Light, LIGHT_TYPES } from "audio-visualizer.js";
import { TransformControls } from "./transform-controls";
import { usePlayground } from "@/store/playground";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function LightControls({
    settings,
    id,
}: {
    settings: Required<Light>;
    id: number;
}) {
    const { updateLayer } = usePlayground();

    const update = (field: keyof Light, value: Light[keyof Light]) => {
        updateLayer<"light">(id, field, value);
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
                <Label>Light Type</Label>
                <Select onValueChange={(val) => update("type", val)}>
                    <SelectTrigger>{settings.type}</SelectTrigger>
                    <SelectContent>
                        {LIGHT_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <TransformControls settings={settings} onChange={update} />
        </div>
    );
}

export default LightControls;
