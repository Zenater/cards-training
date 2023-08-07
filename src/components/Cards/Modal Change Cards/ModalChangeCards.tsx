import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useAppDispatch} from '../../../store/store';
import {useParams} from 'react-router-dom';
import {BasicModal} from '../../../common/Basic modal/BasicModal';
import {updateCardsTC} from '../../../store/reducers/cardsReducer';
import {ButtonGroup} from '../../../common/ButtonsGroup/ButtonGroup';
import {ModalChangeCardsPropsType} from '../../../types/ModalTypes';
import s from './ModalChangeCards.module.css';

export const ModalChangeCards = ({_id, answer, question}: ModalChangeCardsPropsType) => {
    const dispatch = useAppDispatch();
    const {id} = useParams();

    const [addValues, setAddValues] = useState({question, answer});
    const [error, setError] = useState<null | string>(null);
    const [open, setOpen] = useState(false);

    const changeCards = () => {
        if (_id && id) {
            if (addValues.question.trim() && addValues.answer.trim() !== '') {
                dispatch(updateCardsTC(_id, addValues.question, addValues.answer, id));
                setOpen(false);
            } else {
                setError('Enter text');
            }
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            changeCards();
        }
    };

    const cancelHandler = () => setOpen(false);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setError(null);
        setAddValues({...addValues, [e.currentTarget.name]: e.currentTarget.value});
    };

    return (
        <BasicModal button="changeNamePack" open={open} setOpen={setOpen}>
            <div className={s.container}>
                <div className={s.buttonDelete}>
                    <Button onClick={cancelHandler} variant="text">
                        X
                    </Button>
                </div>
                <div>
                    <p className={s.title}>Change name of your cards</p>
                    <div className={s.title}>
                        <TextField
                            id="standard-textarea"
                            label="Question"
                            placeholder="Change Question"
                            multiline
                            variant="standard"
                            name="question"
                            value={addValues.question}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className={s.title}>
                        {error && <div className={s.error}>{error}</div>}
                    </div>
                    <div className={s.title}>
                        <TextField
                            id="standard-textarea"
                            label="Answer"
                            placeholder="Change Answer"
                            multiline
                            variant="standard"
                            name="answer"
                            value={addValues.answer}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className={s.title}>
                        {error && <div className={s.error}>{error}</div>}
                    </div>
                    <ButtonGroup changeCards={changeCards} cancelHandler={cancelHandler}/>
                </div>
            </div>
        </BasicModal>
    );
};