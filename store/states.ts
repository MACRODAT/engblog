//  @ts-nocheck
import React from "react";

export function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        if (!value.firstValue)
        {
            window.localStorage.setItem(key, JSON.stringify(value));
        }else{
            setValue({...value, firstValue : false})
        } 
    }, [key, value]);

    React.useEffect(() => {
        const stickyValue = window.localStorage.getItem(key);
    
        if (stickyValue !== null) {
            let t = JSON.parse(stickyValue)
            setValue(t);
        }
    }, [key]);
  
    
  
    return [value, setValue];
}


export const theming = {
    firstValue : true,
    theme : 'light',
    current : {
        foreground : '#FFF',
        background : '#000',
    }
}

export const themes = {
    light : {
        '--color-bg-s' : '#EEEEED',
        '--color-bg-ss' : '#FEFEFD',
        '--color-bg-sl' : '#5555198a',
        '--color-bg-p' : '#FFFFFC',
        '--color-fg-p' : '#001011',
        '--color-fg-s' : '#001011',
        '--color-fg-sl' : '#d3d3c18a',
        '--color-fg-e' : '#98CE00',
        '--color-fg-a' : '#3b738a',
        '--color-shadow' : '#757780',
        '--color-code-bg' : '#EEEEED'
    },
    dark : {
        '--color-bg-s' : '#25283D',
        '--color-bg-ss' : '#13141F',
        '--color-bg-sl' : '#92949E',
        '--color-bg-p' : '#0A0A10',
        '--color-fg-p' : '#FFFFFC',
        '--color-fg-s' : '#0F0F0C',
        '--color-fg-sl' : '#dfdabbe1',
        '--color-fg-e' : '#EEEEED',
        '--color-fg-a' : '#6CCFF6',
        '--color-shadow' : '#2c2d30',
        '--color-code-bg' : '#070808'
    }
}

// export const theming = {
//     firstValue : true,
//     theme : 'light',
//     current : {
//         foreground : '#FFF',
//         background : '#000',
//     }
// }

// export const themes = {
//     light : {
//         '--color-bg-s' : '#EEEEED',
//         '--color-bg-ss' : '#FEFEFD',
//         '--color-bg-sl' : '#5555198a',
//         '--color-bg-p' : '#FFFFFC',
//         '--color-fg-p' : '#001011',
//         '--color-fg-s' : '#001011',
//         '--color-fg-sl' : '#d3d3c18a',
//         '--color-fg-e' : '#98CE00',
//         '--color-fg-a' : '#3b738a',
//         '--color-shadow' : '#757780',
//         '--color-code-bg' : '#EEEEED'
//     },
//     dark : {
//         '--color-bg-s' : '#F8FEE0',
//         '--color-bg-ss' : '#1c4075',
//         '--color-bg-sl' : '#2f2904a2',
//         '--color-bg-p' : '#001011',
//         '--color-fg-p' : '#FFFFFC',
//         '--color-fg-s' : '#0F0F0C',
//         '--color-fg-sl' : '#dfdabbe1',
//         '--color-fg-e' : '#EEEEED',
//         '--color-fg-a' : '#6CCFF6',
//         '--color-shadow' : '#2c2d30',
//         '--color-code-bg' : '#070808'
//     }
// }
