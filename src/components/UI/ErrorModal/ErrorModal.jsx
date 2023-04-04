import React from "react";

import Card from "../Card/Card";
import Button from '../Button/Button';
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
    return (
        <div>
            <div className={classes.backdrop} onClick={props.onConfirm}></div>
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={classes.actions}>
                    <Button onClick={props.onConfirm}>
                        <a href="http://localhost:8080/api/auth/verify?biz=true&verify_account_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwIiwiZXhwIjoxNjgwOTcxMTE5LCJpYXQiOjE2ODA1MzkxMTksImdyYW50X3R5cGUiOiJWRVJJRllfQUNDT1VOVF9UT0tFTiIsInBhc3N3b3JkIjoiJDJhJDEwJE9vODVKa3JUd1dVVFQzQkpHWjJJWWVtTVhETy9BbmVadEcwbTU4QlBTZXhMOHphck1KbGFtIiwibGFzdF9uYW1lIjoiVHJhbiIsImZpcnN0X25hbWUiOiJUaGFuZyIsImVtYWlsIjoidGhhbmd0cmFuMTc2MUBnbWFpbC5jb20ifQ.LTVEh5dB-oiT-A8rMdmW4vQU1-I-ylVyl13Jeu2Z7TM">
                            Okay
                        </a>
                    </Button>
                </footer>
            </Card>
        </div>
    );
};

export default ErrorModal;