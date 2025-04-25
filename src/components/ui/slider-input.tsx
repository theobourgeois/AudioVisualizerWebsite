import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";
import { Slider } from "./slider";

type SliderInputProps = {
    value?: number;
    min: number;
    max: number;
    step: number;
    label?: string;
    onChange: (value: number) => void;
    className?: string;
};

export function SliderInput(props: SliderInputProps) {
    if (props.value === undefined) {
        return null;
    }
    return (
        <div className={cn("flex gap-2 items-center", props.className)}>
            {props.label && <Label>{props.label}</Label>}
            <div>
                <Input
                    className="w-20"
                    type="number"
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    value={props.value}
                    onChange={(e) =>
                        props.onChange(e.target.value as unknown as number)
                    }
                />
            </div>
            <Slider
                value={[props.value]}
                min={props.min}
                max={props.max}
                step={props.step}
                onValueChange={(val) => props.onChange(val[0])}
            />
        </div>
    );
}
