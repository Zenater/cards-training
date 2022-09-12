import React, {useEffect, useState} from 'react';
import s from "./SliderForPacks.module.css";
import {Slider} from "@mui/material";
import {getPacksTC, setMinMaxAmountOfCardsAC} from "../../../../store/reducers/packsReducer";
import {useAppDispatch, useAppSelector} from "../../../../store/store";

const useDebounce = (value1: number = 0, value2: number = 0, delay: number): number[] => {
    let [state, setState] = useState<number[]>([value1, value2])

    useEffect(() => {
        const timeId = setTimeout(() => {
            if (state[0] === value1 && state[1] === value2) return
            setState([value1, value2])
        }, delay)
        return () => {
            clearTimeout(timeId)
        }
    }, [delay, value1, value2])
    return state
}
export const SliderForPacks = () => {

    const dispatch = useAppDispatch();
    const minAmount = useAppSelector(state => state.packs.filterForPacks.minCardsCount);
    const maxAmount = useAppSelector(state => state.packs.filterForPacks.maxCardsCount);
    const minMAxAmount = [minAmount || 0, maxAmount || 100]
    let debouncedValue = useDebounce(minAmount, maxAmount, 1000);

    useEffect(() => {
        if (debouncedValue) {
            dispatch(getPacksTC())
        }
    }, [debouncedValue])

    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(setMinMaxAmountOfCardsAC(newValue as number[]));
    };
    return (
        <div className={s.slider}>
            <p className={s.nameOfDescription}>Number of cards</p>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={minMAxAmount}
                defaultValue={[0, 100]}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </div>
    );
};

