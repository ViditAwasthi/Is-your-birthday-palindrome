const birthDate = document.querySelector("#birth-date");
const checkButton = document.querySelector("#check-button");
const resultDiv = document.querySelector("#result-div");




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

function checkPalindrome(dateOfBirth) {
    let dateArray = dateOfBirth.split("-");
    let year = dateArray[0];
    let month = dateArray[1];
    let date = dateArray[2];

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
            resultDiv.innerText = "Congrats! Your Birthdate is Palindrome🥳"
            return;
        }
    }
    resultDiv.innerText = "Oh! Your Birthdate is Not Palindrome☹️"
    return;

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