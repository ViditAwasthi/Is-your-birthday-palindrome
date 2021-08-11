const birthDate = document.querySelector("#birth-date");
const checkButton = document.querySelector("#check-button");
const resultDiv = document.querySelector("#result-div");



function isLeapYear(year) {

    if (year % 400 === 0)
        return true;

    if (year % 100 === 0)
        return false;

    if (year % 4 === 0)
        return true;

    return false;
}

function getPrevDate(date, month, year) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let d = Number(date) - 1;
    let m = Number(month);
    let y = Number(year);

    console.log(d, m, y);
    if (m === 3) {
        if (isLeapYear(y)) {
            if (d < 1) {
                d = 29;
                m = 2;
            }
        } else {
            if (d < 1) {
                d = 28;
                m = 2;
            }
        }
    } else {
        if (d == 0 && m == 1) {
            d = 31;
            m = m - 1;
        } else if (d < 1) {
            m = m - 1;
            d = daysInMonth[m - 1];
            console.log("this is day", d);
        }
    }
    if (m < 1) {
        m = 12;
        y = y - 1;
    }
    d = d.toString();
    m = m.toString();
    y = y.toString();
    if (d.length == 1) {
        d = "0" + d;
    }
    if (m.length == 1) {
        m = "0" + m;
    }
    return [d, m, y];
}

function getPrevPalindromeDate(date, month, year) {
    var prevDate = getPrevDate(date, month, year);
    var count = 0;

    while (1) {
        count++;
        var fl = checkPalindromeForAllFormats(prevDate[0], prevDate[1], prevDate[2]);
        if (fl) {
            return [count, prevDate];
        } else {
            prevDate = getPrevDate(prevDate[0], prevDate[1], prevDate[2]);
        }
    }
}

function getNextDate(date, month, year) {
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let d = Number(date) + 1;
    let m = Number(month);
    let y = Number(year);

    //next day so date will increase only
    if (m === 2) {
        if (isLeapYear(y)) {
            if (d > 29) {
                d = 1;
                m = 3;
            }
        } else {
            if (d > 28) {
                d = 1;
                m = 3;
            }
        }
    } else {
        if (d > daysInMonth[m - 1]) {
            d = 1;
            m++;
        }
    }

    if (m > 12) {
        m = 1;
        y++;
    }
    d = d.toString();
    m = m.toString();
    y = y.toString();
    if (d.length == 1) {
        d = "0" + d;
    }
    if (m.length == 1) {
        m = "0" + m;
    }
    return [d, m, y];


}


function getNextPalindromeDate(date, month, year) {

    var nextDate = getNextDate(date, month, year);
    var count = 0;

    while (1) {
        count++;
        var fl = checkPalindromeForAllFormats(nextDate[0], nextDate[1], nextDate[2]);
        if (fl) {
            return [count, nextDate];
        } else {
            nextDate = getNextDate(nextDate[0], nextDate[1], nextDate[2]);
        }
    }
}


function isPalindrome(completeDate) {
    let i = 0;
    let j = completeDate.length - 1;
    while (i < j) {
        if (Number(completeDate.charAt(i)) !== Number(completeDate.charAt(j))) {
            return false;
        }
        j--;
        i++;
    }
    return true;
}

function checkPalindromeForAllFormats(date, month, year) {
    let ddmmyyyy = date + month + year;
    let mmddyyyy = month + date + year;
    let yyyymmdd = year + month + date;
    let ddmmyy = date + month + year.slice(2, 4);
    let mmddyy = month + date + year.slice(2, 4);
    let yymmdd = year.slice(2, 4) + month + date;
    const combinationArray = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    for (let i = 0; i < combinationArray.length; i++) {
        let flag = isPalindrome(combinationArray[i]);
        if (flag) {
            return true;
        }
    }
    return false;
}


function checkPalindrome(dateOfBirth) {
    let dateArray = dateOfBirth.split("-");
    let year = dateArray[0];
    let month = dateArray[1];
    let date = dateArray[2];

    let flg = checkPalindromeForAllFormats(date, month, year);
    if (flg) {
        resultDiv.innerText = "Congrats! Your Birthdate is Palindrome🥳"
    } else {

        let nextPalindromeDate = getNextPalindromeDate(date, month, year);
        let prevPalindromeDate = getPrevPalindromeDate(date, month, year);

        if (nextPalindromeDate[0] < prevPalindromeDate[0]) {
            resultDiv.innerText = "Oh! Your Birthdate is Not Palindrome☹️ You missed it by " + nextPalindromeDate[0] + " days and the next Palindrome Date(DDMMYYY) is " + nextPalindromeDate[1][0] + "-" + nextPalindromeDate[1][1] + "-" + nextPalindromeDate[1][2];
        } else {
            resultDiv.innerText = "Oh! Your Birthdate is Not Palindrome☹️ You missed it by " + prevPalindromeDate[0] + " days and the next Palindrome Date(DDMMYYY) is " + prevPalindromeDate[1][0] + "-" + prevPalindromeDate[1][1] + "-" + prevPalindromeDate[1][2];
        }
        return;
    }
}

function checkBirthDate() {
    if (birthDate.value) {
        const dateOfBirth = birthDate.value;
        checkPalindrome(dateOfBirth);
    } else {
        resultDiv.innerText = "Please Enter the Birthdate to Check!😊"
    }
    return;
}


checkButton.addEventListener("click", checkBirthDate)