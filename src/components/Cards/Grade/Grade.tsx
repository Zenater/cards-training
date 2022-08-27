import React, {FC} from 'react';
import s from './Grade.module.css'

type GradeTypeProps = {
    value: RatingValueType
}

export const Grade: FC<GradeTypeProps> = ({value}) => {


    return (
        <div className={s.box}>
            <Star selected={value > 0} value={1}/>
            <Star selected={value > 1} value={2}/>
            <Star selected={value > 2} value={3}/>
            <Star selected={value > 3} value={4}/>
            <Star selected={value > 4} value={5}/>
        </div>
    )
}


export type RatingValueType = 0 | 1 | 2 | 3 | 4 | 5 | number


type StarPropsType = {
    selected: boolean
    value: RatingValueType
}

const Star: FC<StarPropsType> = ({selected, value}) => {
    return <div className={`${selected ? s.starFull : ''} ${s.star}`}>&#9733;</div>
}
