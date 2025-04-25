import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, Upload } from "lucide-react";

interface AudioControlsProps {
    isPlaying: boolean;
    togglePlay: () => void;
    handleChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AudioControls({
    isPlaying,
    togglePlay,
    handleChangeFile,
}: AudioControlsProps) {
    return (
        <div className="flex items-center gap-2">
            <Button
                onClick={togglePlay}
                size="default"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
                {isPlaying ? (
                    <>
                        <Pause className="mr-2 h-5 w-5" /> Pause
                    </>
                ) : (
                    <>
                        <Play className="mr-2 h-5 w-5" /> Play
                    </>
                )}
            </Button>
            <div className="relative">
                <Input
                    type="file"
                    accept="audio/*"
                    onChange={handleChangeFile}
                    className="hidden"
                    id="audio-upload"
                />
                <label
                    htmlFor="audio-upload"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center"
                >
                    <Upload className="mr-2 h-5 w-5" /> Upload Audio
                </label>
            </div>
        </div>
    );
}
