import * as React from 'react';
import "./generalComponents.scss"
import LanguageHelper from "../languageHelper";

export interface InputProps {
    label: string,
    type: 'text' | 'password' | 'number',
    value: string | number,
    onChange: any,
    validityInfo?: any
}

export const Input = (props: InputProps) => {
    return (
        <div className="inputWrapper">
            <div className="label">
                {props.label}
            </div>
            <div className="innerWrapper">
                <input placeholder={LanguageHelper.getString('input_placeholder')} type={props.type} value={props.value} onChange={(e) => props.onChange(e.target.value)}/>
            </div>

        </div>
    )
}