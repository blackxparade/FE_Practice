/*  Create types for the following objects */

let asset: {
    name: string,
    unid: string,
    icon: string,
    status: 'Impacted' | 'Operational',
    archived: boolean,
    resourceCategory: 'asset' | 'stock',
    type: string
};

const car: typeof(asset) = {
    name: 'Racing car',
    unid: '21',
    icon: 'car-32',
    status: 'Impacted',
    archived: false,
    resourceCategory: 'asset',
    type: 'car',
};

const archivedBoiler = {
    name: 'boiler',
    unid: '20',
    icon: 'boiler-32',
    status: 'Operational',
    archived: true,
    resourceCategory: 'asset',
    type: 'boiler',
};

const car2 = {
    name: 'Headset',
    unid: '2',
    icon: 'Headset-32',
    status: 'Operational',
    archived: false,
    resourceCategory: 'stock',
    type: 'headset',
};