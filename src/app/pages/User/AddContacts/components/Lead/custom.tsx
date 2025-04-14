import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Custom Autocomplete component
function CustomAutocomplete({ apiKey, onPlaceSelected }) {
    const [dropdownContainer] = useState(() => document.createElement('div'));
    const userFun = () => {

    }
    useEffect(() => {
        document.body.appendChild(dropdownContainer);
        return () => {
            document.body.removeChild(dropdownContainer);
        };
    }, [dropdownContainer]);

    return (
        <>
            <Autocomplete
                apiKey={apiKey}
                onPlaceSelected={onPlaceSelected}
                className="z-1000000"
                renderSuggestionsContainer={(active, children) =>
                    createPortal(
                        <div className="autocomplete-dropdown-container">
                            {children}
                        </div>,
                        dropdownContainer
                    )
                }
            />
        </>
    );
}
