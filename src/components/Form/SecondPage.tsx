import React, { useState } from 'react';
import { PrimeReactProvider } from 'primereact/api'; // Importa o provedor do PrimeReact
import { MultiSelect } from 'primereact/multiselect'; // Importa o componente MultiSelect

const MyComponent = () => {
    const [selectedCities, setSelectedCities] = useState(null);

    // Exemplo de opções agrupadas
    const groupedCities = [
        {
            label: 'Group 1',
            items: [
                { label: 'New York', value: 'NY' },
                { label: 'Los Angeles', value: 'LA' },
            ],
        },
        {
            label: 'Group 2',
            items: [
                { label: 'Chicago', value: 'CHI' },
                { label: 'Houston', value: 'HOU' },
            ],
        },
    ];

    const groupedItemTemplate = (option) => {
        return <div>{option.label}</div>; // Customize conforme necessário
    };

    return (
        <PrimeReactProvider>
            <div className="p-4">
                <MultiSelect
                    pt={{ 
                      wrapper: 'mt-80 bg-black text-white text-center' }} // Utilizando Tailwind para margem superior
                    value={selectedCities}
                    options={groupedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    optionLabel="label"
                    optionGroupLabel="label"
                    optionGroupChildren="items"
                    optionGroupTemplate={groupedItemTemplate}
                    placeholder="Select Cities"
                    display="chip"
                    className="w-full bg-black text-white md:w-20rem"
                />
            </div>
        </PrimeReactProvider>
    );
};

export default MyComponent;
