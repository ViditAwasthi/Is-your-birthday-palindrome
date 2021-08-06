const birthDate = document.querySelector("#birth-date");
const checkButton = document.querySelector("#check-button");
const resultDiv = document.querySelector("#result-div");


function checkBirthDatePalindrome() {
    if (birthDate.value) {
        const dateOfBirth = birthDate.value;
        isPalindrome(dateOfBirth);
    } else {
        resultDiv.innerText = "Please Enter the Birthdate to Check!😊"
    }
}

function isPalindrome(dateOfBirth) {
    dateOfBirth = dateOfBirth.replaceAll("-", "");
    let i =0; 
    let j =dateOfBirth.length-1;
    while(i<j){
        if(Number(dateOfBirth.charAt(i)) !== Number(dateOfBirth.charAt(j))){
            resultDiv.innerText = "Oh! Your Birthdate is Not Palindrome☹️"
            return;
        }  
        j--;
        i++;
    }
    resultDiv.innerText = "Congrats! Your Birthdate is Palindrome🥳"
    return;
}


checkButton.addEventListener("click", checkBirthDatePalindrome)