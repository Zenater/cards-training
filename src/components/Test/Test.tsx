import React from 'react';
import {SuperButton} from "./universalComponents/superButton/SuperButton";
import {SuperInput} from "./universalComponents/SuperInput/SuperInput";
import {SuperCheckBox} from "./universalComponents/SuperCheckBox/SuperCheckBox";

export const Test = () => {
    return (
        <div>
            <div>
                <SuperButton/>
            </div>
            <div>
                <SuperInput/>
            </div>
            <div>
                <SuperCheckBox/>
            </div>
        </div>
    );
};

