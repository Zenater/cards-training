import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {changeCountOfRawsCardsAC, changeGradeTC, getCardsTC} from "../../../store/cardsReducer";
import {CardsType} from "../../api/cardsApi";
import Button from "@mui/material/Button";
import m from "../../Cards/ModalForNewCards.module.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

type QuestionPropsType = {
    packId: string
    cancelHandler: () => void
    cardsCount: number
}

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardsType[]): CardsType => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
}

export const Question: React.FC<QuestionPropsType> = props => {

    const {packId, cancelHandler} = props;

    const dispatch = useAppDispatch();
    const cards = useAppSelector(state => state.card.cards);

    const [isChecked, setIsChecked] = useState(false);
    const [random, setRandom] = useState<CardsType | null>(null);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (cards) {
            setRandom(getCard(cards))
        }
    }, [cards])

    useEffect(() => {
        dispatch(changeCountOfRawsCardsAC(Infinity))
        dispatch(getCardsTC(packId))
    }, [])

    const getAnswerNumber = (i: number) => {
        if (i === 0 && random) {
            dispatch(changeGradeTC(1, random._id))
        }
        if (i === 1 && random) {
            dispatch(changeGradeTC(2, random._id))
        }
        if (i === 2 && random) {
            dispatch(changeGradeTC(3, random._id))
        }
        if (i === 3 && random) {
            dispatch(changeGradeTC(4, random._id))
        }
        if (i === 4 && random) {
            dispatch(changeGradeTC(5, random._id))
        }
        setIsChecked(false)
    }
    const onNext = (i: string) => {
        setIsChecked(false);
        let index = 0;
        if (cards.length > 0) {
            setRandom(getCard(cards));
            grades.forEach((g, indexRoot) => {
                if (g.includes(i)) {
                    index = indexRoot
                }
            })
            getAnswerNumber(index)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <div>
            <div style={{fontWeight: "normal"}} className={m.title}>
                <span style={{fontWeight: "bold"}}>Question:</span>
                "{random && random.question}"
            </div>
            {isChecked && (
                <div>
                    <div style={{fontWeight: "normal"}} className={m.title}>
                        <span style={{fontWeight: "bold"}}>Answer: </span>
                        "{random && random.answer}"
                    </div>
                    <div style={{fontWeight: "bold"}}>Rate yourself:</div>
                    {grades.map((g, i) => (
                        <div key={'grade-' + i}>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value={g} control={<Radio/>} label={g}/>
                            </RadioGroup>
                        </div>
                    ))}
                    <Button onClick={() => onNext(value)}>Next</Button>
                </div>
            )}
            <div className={m.buttons}>
                <Button onClick={cancelHandler} style={{width: "124px"}}>Cancel</Button>
                <Button onClick={() => setIsChecked(true)} style={{width: "190px"}}>Show Answer</Button>
            </div>
        </div>
    );
};

