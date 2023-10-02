'use client';

import { FC, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

interface InputProps {
    value: string,
    busy?: boolean,
    disabled?: boolean,
    placeholder: string,
    delay?: number,
    setValue: (text: string) => void
}

/**
 * 
 * @param value current value or default value to set on the input
 * @param busy  when `true` renders a loading spinner, when `false` renders a clear button if value is empty or null
 * @param placeholder text displayed when input is empty
 * @param disabled sets the displayed attribute on the input
 * @param delay number of `milliseconds` to wait before calling `setValue`
 * @param setValue function called to set entered text
 */
const SearchInput : FC<InputProps> = ({
    value,
    busy = false,
    placeholder,
    setValue,
    delay,
    disabled
}) => {
    const [text, setText] = useState(value)

    const delaySetValue = useRef(
        debounce((text: string) => {
            console.log('text value', text)
            setValue(text);
        }, delay)
    ).current;

    useEffect(() => {
        return () => {
            delaySetValue.cancel();
        };
    }, [delaySetValue]);

    const handleInput = (event: any) => {
        const targetValue = event.target.value;
        setText(targetValue);
        if (delay) {
            delaySetValue(targetValue);
        } else {
            setValue(targetValue);
        }
    };

    const clearInput = (event: any) => {
        setText('');
        setValue('');
    }

    return (
        <div className="flex items-center h-[48px] border-gray-light border-[1px] bg-[#333333] rounded py-1 px-2">
            <SearchIcon/>
            <input 
                style={{outline: 'none'}} 
                className=" 
                    border-none
                    bg-[#333333]
                    disabled:cursor-not-allowed
                    indent-2.5 w-full"
                type="text" 
                value={text}
                disabled={disabled}
                onChange={handleInput}
                placeholder={placeholder}/>
            {
                (value && !busy) &&
                <div  className=" cursor-pointer" onClick={clearInput}>
                    <ClearIcon/>
                </div>                
            }
            {
                (value && busy) &&
                <BusyIcon/>
            }
        </div>
    )
}

function SearchIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-slate">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
    )
}

function ClearIcon() {
    return ( 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="w-6 h-6 fill-gray-light">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg> 
    )
}

function BusyIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="animate-spin h-6 w-6 text-white" >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}

export default SearchInput;