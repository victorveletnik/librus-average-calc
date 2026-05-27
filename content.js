console.log("Librus Calculator loaded");

function calculateAverageGrade() {
    //Pick every table row (tr) with the class 'subject-row-class' 
    const subjectRows = document.querySelectorAll('tr.<subject-row-class>'); //Replace with the actual class name for the subject rows
    if (subjectRows.length === 0) {
        console.error("No subject rows found. Please check the class name.");
        return;
    }
    subjectRows.forEach(row => {
        const gradeElement = row.querySelectorAll('.grade-class'); //Replace with the actual class for the grade element
        
        let sum = 0;
        let count = 0;

        gradeElement.forEach(el => {
            //Pick the text content of the grade element
            let gradeText = el.innerText.trim();
            //Replace comma with dot for decimal numbers and parse the grade as a float (so isNaN wont return true for valid grades with + or -)
            let gradeNumber = parseFloat(gradeText.replace(',', '.')); 
            //Filter non-numbers (ex. "np" or "zw") and calculate the sum and count of valid grades
            if (!isNaN(gradeNumber)) {
                if(gradeText.includes('+')) {  
                gradeNumber += 0.5; //Add 0.5 for grades with a plus sign
                }
                if(gradeText.includes('-')) {
                    gradeNumber -= 0.25; //Subtract 0.25 for grades with a minus sign
                }
                sum += gradeNumber;
                count++;
            }      
            
        });
        //If there are valid grades, calculate the average and display it
        if (count > 0) {
            const average = (sum/count).toFixed(2); //Calculate the average and round to 2 decimal places
            const averageElement = document.createElement('td'); //Create a new table cell for the average grade
            averageElement.innerHTML = `<strong>${average}</strong>`; //Set the average grade as the content of the new cell
            averageElement.style.textAlign = 'center'; //Center the text in the new cell
            //Color the average grade based on its value
            if(average >= 4.75) {
                averageElement.style.backgroundColor = 'lightgreen';
            } else if(average < 4.75 && average >= 4) {
                averageElement.style.backgroundColor = 'lightyellow';
            } else {
                averageElement.style.backgroundColor = 'lightcoral';
            }
            averageElement.style.borderLeft="2px solid black"; //Add a left border to separate the average grade from the other grades
            row.appendChild(averageElement); //Add the new cell to the end of the current row
        }
    });
    
}
calculateAverageGrade();