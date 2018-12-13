interface AppLitterals {
    name: string;
    required: string;
    beatCount: string;
}

export const AppLitteralsConfig: AppLitterals = {
    name: 'Accepts only Alphabets and Spaces',
    required: 'This field is required',
    beatCount: 'Accepts only 0 or 5 after decimal point'
};