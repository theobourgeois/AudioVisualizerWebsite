import {
    Config,
    defaultValues,
    LayerSettings,
    Preset,
} from "audio-visualizer.js";
import { create } from "zustand";

// Generator for unique IDs
function* idGenerator() {
    let id = 0;
    while (true) {
        yield ++id;
    }
}
const idGen = idGenerator();
const getNewId = () => idGen.next().value as number;

const defaultConfig: Config = [
    {
        id: getNewId(),
        preset: "shape",
        settings: defaultValues["shape"],
    },
    {
        id: getNewId(),
        preset: 'light',
        settings: defaultValues['light'],
    }
];

type PlaygroundStore = {
    layers: Config;
    addLayer: (preset: Preset) => number;
    removeLayer: (id: number) => void;
    updateLayer<T extends Preset>(
        id: number,
        field: keyof LayerSettings<T>,
        value: LayerSettings<T>[keyof LayerSettings<T>]
    ): void;
    resetLayerToDefault: (id: number) => void;
};

const usePlaygroundStore = create<PlaygroundStore>((set) => ({
    layers: defaultConfig,
    resetLayerToDefault: (id) =>
        set((state) => {
            const newLayers = state.layers.map((layer) => {
                if (layer.id === id) {
                    return {
                        ...layer,
                        settings: defaultValues[layer.preset],
                    };
                }
                return layer;
            }) as Config;
            return { layers: newLayers };
        }),
    addLayer: (preset) => {
        const id = getNewId();
        set((state) => {
            const newLayers = [
                ...state.layers,
                {
                    id,
                    preset: preset,
                    settings: defaultValues[preset],
                },
            ] as Config;

            return { layers: newLayers };
        })
        return id;
    },
    removeLayer: (id) =>
        set((state) => ({
            layers: state.layers.filter((layer) => layer.id !== id),
        })),
    updateLayer: (id, field, value) =>
        set((state) => {
            const newLayers = state.layers.map((layer) => {
                if (layer.id === id) {
                    return {
                        ...layer,
                        settings: {
                            ...layer.settings,
                            [field]: value,
                        },
                    };
                }
                return layer;
            }) as Config;
            return { ...state, layers: newLayers };
        }),
}));

export const usePlayground = () => usePlaygroundStore(state => state);
