const API_ADDR = "http://localhost:3000"

class main {
    constructor(){
        this.selectedPollId = 0;
        this.selectedOptionId = 0;
        this.fetchAllPolls();
    }

    fetchAllPolls(){
        //function to retrieve a list of all the polls from the backend
        fetch(`${API_ADDR}/poll`,
            {method: 'GET',
            headers: {
                'Accept': 'application/json'
            }})
            .then(response => response.json())
            .then(response => {this.setPollButtons(response)})
            .catch((error) => {
                const mainContentContainer = document.getElementById('poll-button-container');
                const errorText = document.createElement("p");
                errorText.textContent = "Please try again later";
                mainContentContainer.appendChild(errorText);
                console.log("Error fetching polls: ", error)
            });
    }

    setPollButtons(pollList){
        //take the list of polls from fetchAllPolls() and add poll buttons to page based on the polls returned
        const mainContentContainer = document.getElementById('poll-button-container');
        try{
            pollList.forEach((poll) => {
                //create new poll button with poll name as text
                const newPollButton = document.createElement("button");
                newPollButton.textContent = poll.pollName;

                //assign unique id to refer to button later
                newPollButton.setAttribute('id', `poll${poll.pollId}`);

                //attach event listener, assign new button to poll-button class
                newPollButton.addEventListener('click', ()=> this.pollSelect(poll.pollId))
                mainContentContainer.appendChild(newPollButton);
                newPollButton.classList.add("poll-button");
            })
        } catch (error) {
            console.log("Error setting poll buttons: ", error);
        }

        //check to see if polls exist, add submit button if they do.
        if (pollList.length) {
            //add submit button
            const newSubmitButton = document.createElement('button');
            newSubmitButton.textContent = "SUBMIT";
            newSubmitButton.addEventListener('click', ()=> this.submitPollChoice(pollList));
            newSubmitButton.classList.add("poll-button");
            newSubmitButton.setAttribute('id', 'submit-button');
            mainContentContainer.appendChild(newSubmitButton);
        } else {
            const noPollErrorText = document.createElement('p');
            noPollErrorText.textContent = "No polls available.";
            mainContentContainer.appendChild(noPollErrorText);
        }
    }

    submitPollChoice(pollList){
        //submit the poll choice selected by the user
        if (this.selectedPollId === 0){
            window.alert("Please select a value.");
        } else {
            document.getElementById("poll-button-container").remove();
            pollList.forEach((poll) => {
                if (poll.pollId === this.selectedPollId){
                    this.displayOptionButtons(poll);
                }
            })
        }
    }

    pollSelect(pollId) {
        this.selectedPollId = pollId;
    }

    displayOptionButtons(selectedPoll){
        //Take selected poll and populate page with buttons based on poll options
        const questionButtonContainer = document.getElementById('question-button-container');

        //add question text header
        const headerText = document.createElement('h2');
        headerText.textContent = selectedPoll.question;
        questionButtonContainer.appendChild(headerText);

        //iterate through poll and populate question buttons
        try{
            selectedPoll.options.forEach((option) => {
                //create new option button with option text content as text
                const optionButton = document.createElement('button');
                optionButton.textContent = option.optionText;

                //assign uid
                optionButton.setAttribute('id', `option${option.optionId}`);

                //attach event listener
                optionButton.addEventListener('click', ()=> this.selectedOptionId = option.optionId);
                questionButtonContainer.appendChild(optionButton);
                optionButton.classList.add('poll-button');
            })
        } catch (error){
            console.log("Failed to populate question buttons: ", error);
        }

        // add submit button, check for options present before doing so
        if (selectedPoll.options.length){
            //add submit button
            const newSubmitButton = document.createElement('button');
            newSubmitButton.textContent = "SUBMIT";
            newSubmitButton.addEventListener('click', ()=> this.submitUserChoice());
            newSubmitButton.classList.add("poll-button");
            newSubmitButton.setAttribute('id', 'submit-button');
            questionButtonContainer.appendChild(newSubmitButton);
        } else {
            const noOptionErrorText = document.createElement('p');
            noOptionErrorText.textContent = "No options available.";
            questionButtonContainer.appendChild(noOptionErrorText);
        }

    }

    submitUserChoice(){
        if (this.selectedOptionId ===0 ){
            window.alert('Please enter a selection')
        } else {
            //Add selected poll id to local storage for later reference in viewing results
            localStorage.setItem("selectedPollId", this.selectedPollId);
            fetch(`${API_ADDR}/pollsubmit`, {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {"selectedPollId": this.selectedPollId,
                        "selectedOptionId": this.selectedOptionId}
                )
            })
                .then(response => response.json())
                .then(response => console.log(JSON.stringify(response)))
                .catch((error) => {
                    console.log("Submit User Choice Error: ", error)
                })

            //move to next page
            window.location.replace('voting-results.html');
        }
    }
}

main = new main();