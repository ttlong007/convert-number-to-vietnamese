import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const arrNum = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

Currency.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    moneyNum: {
        height: "30px",
        border: "1px solid lightblue",
        borderRadius: "5px",
        paddingLeft: "10px",
    },
    moneyStr: {
        fontSize: "18px",
        fontStyle: "italic",
        fontWeight: "400",
        color: "#6d6868",
        marginTop: "5px"
    }
}));

const readMillions = (number, isFull) => {
    let result = "";
    let billion = Math.floor(number / 1000000000);
    number = number % 1000000000;
    if (billion > 0) {
        result += readHundred(billion, isFull) + " tỷ ";
        isFull = true;
    }
    let million = Math.floor(number / 1000000);
    number = number % 1000000;
    if (million > 0) {
        result += readHundred(million, isFull) + " triệu ";
        isFull = true;
    }
    let thousand = Math.floor(number / 1000);
    number = number % 1000;
    if (thousand > 0) {
        result += readHundred(thousand, isFull) + " ngàn ";
        isFull = true
    }
    if (number > 0) {
        result += readHundred(number, isFull);
    }
    return result;
}

const readHundred = (number, isFull) => {
    let result = "";
    let hundred = Math.floor(number / 100);
    number = number % 100;
    if (isFull || hundred > 0) {
        result += arrNum[hundred] + " trăm ";
        result += readTen(number, true);
    } else {
        result += readTen(number, false);
    }
    return result;
}

const readTen = (number, isFull) => {
    let result = "";
    let ten = Math.floor(number / 10);
    let unit = number % 10;
    if (ten > 1) {
        result = " " + arrNum[ten] + " mươi ";
        if (unit === 1) {
            result += " mốt";
        }
    } else if (ten === 1) {
        result = " mười ";
        if (unit === 1) {
            result += " một";
        }
    } else if (isFull && unit > 0) {
        result = " lẻ ";
    }
    if (unit === 5 && ten >= 1) {
        result += " lăm ";
    } else if (unit > 1 || (ten === 0 && unit === 1)) {
        result += " " + arrNum[unit];
    }
    return result;
}


function App(props) {
    const [money, setMoney] = useState(0);
    const [moneyStr, setMoneyStr] = useState("");

    const handleSetMoney = (e) => {
        e.preventDefault();
        let value = e.target.value;
        value = parseInt(value);
        setMoney(value);
    };

    useEffect(() => {
        let result = readMillions(money, false);
        setMoneyStr(result);
    }, [money]);

    const classes = useStyles();
    return (
        <div>
            <h1>Demo convert currency</h1>
            <input pattern="[0-9]*" value={money} onChange={handleSetMoney} className={classes.moneyNum} placeholder="Nhập số tiền" maxLength={12} />
            {moneyStr && <div className={classes.moneyStr}>{moneyStr} đồng</div>}
        </div>
    );
}

export default App;