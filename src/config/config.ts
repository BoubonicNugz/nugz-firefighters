interface LocationObject {
    name: string,
    duty: { x: number, y: number, z: number, r: number },
    garage: { x: number, y: number, z: number, h: number, r: number },
    stash: { x: number, y: number, z: number, r: number },
    boss: { x: number, y: number, z: number, r: number }
}

interface ItemObject {
    name: string,
    price: number,
    amount: number,
    info: any,
    type: string,
    slot: number,
}

interface VehicleObject {
    name: string,
    model: string,
}

interface ConfigObject {
    Locations: { [key: number]: LocationObject },
    Items: {
        name: string,
        slots: number,
        items: { [key: number]: ItemObject },
    }
    Vehicles: { [key: number]: VehicleObject }
}

export const Config: ConfigObject = {
    Locations: [
        {
            name: "paletobay",
            duty: { x: -379.93, y: 6118.80, z: 31.85, r: 10 },
            garage: { x: -376.36, y: 6134.02, z: 31.4, h: 37.32, r: 10 },
            stash: { x: -370.568, y: 6121.216, z: 31.44, r: 10 },
            boss: { x: -367.15, y: 6131.125, z: 31.44, r: 10 },
        },
        {
            name: "citystation1",
            duty: { x: 0, y: 0, z: 0, r: 10 },
            garage: { x: 0, y: 0, z: 0, h: 42.33, r: 10 },
            stash: { x: 0, y: 0, z: 0, r: 10 },
            boss: { x: 0, y: 0, z: 0, r: 10 },
        },
        {
            name: "citystation2",
            duty: { x: 0, y: 0, z: 0, r: 10 },
            garage: { x: 0, y: 0, z: 0, h: 42.33, r: 10 },
            stash: { x: 0, y: 0, z: 0, r: 10 },
            boss: { x: 0, y: 0, z: 0, r: 10 },
        },        
    ],
    Items: {
        name: "Firehouse Armory",
        slots: 30,
        items: [
            {
                name: "radio",
                price: 0,
                amount: 1,
                info: {},
                type: "item",
                slot: 1,
            },
            {
                name: "bandage",
                price: 0,
                amount: 50,
                info: {},
                type: "item",
                slot: 2,
            },
            {
                name: "painkillers",
                price: 0,
                amount: 50,
                info: {},
                type: "item",
                slot: 3,
            },
            {
                name: "weapon_flashlight",
                price: 0,
                amount: 1,
                info: {},
                type: "item",
                slot: 4,
            },
            {
                name: "weapon_fireextinguisher",
                price: 0,
                amount: 2,
                info: {},
                type: "item",
                slot: 5,
            },
            {
                name: "weapon_stungun",
                price: 0,
                amount: 1,
                info: {
                    serie: "",            
                },
                type: "weapon",
                slot: 6,
            },
            {
                name: "diving_gear",
                price: 0,
                amount: 1,
                info: {},
                type: "item",
                slot: 7,
            },
            {
                name: "diving_gear",
                price: 0,
                amount: 1,
                info: {},
                type: "item",
                slot: 7,
            },
        ],
    },
    Vehicles: [
        { name: "Firetruck", model: "firetruk" },
    ],
}

export const Delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms))