import React from 'react';

type PropsButtonType = {
    title: string,
    onClick: () => void,

}

export const Button = ({title, onClick} : PropsButtonType) => {

    const onClickHandler = () => {
        onClick()
    }

    return (
        <button onClick={onClickHandler}>{title}</button>
    );
};
