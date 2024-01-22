const API_ADDR = 'http://localhost:3000';
const LOCAL_STORAGE_POLL_ID_KEY = 'selectedPollId';
class main {
    constructor() {
        this.userSelectedPollId = 0;
        this.getPollIdFromLocalStorage();
        this.scoreArray = []

        this.fetchPoll(this.userSelectedPollId);
    }

    getPollIdFromLocalStorage(){
        try{
            this.userSelectedPollId = localStorage.getItem(LOCAL_STORAGE_POLL_ID_KEY);
            console.log("Previosuly Selected Poll ID: ", this.userSelectedPollId);
        } catch (error) {
            console.log("Failed to load previously selected poll ID from local storage.")
        }
    }

    fetchPoll(pollId){
        fetch(`${API_ADDR}/poll?pollid=${pollId}`,
            {method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }})
            .then(response => response.json())
            .then(response => {this.setResultTiles(response)})
            .catch((error) => {
                const resultsContainer = document.getElementById('results-container');
                const errorText = document.createElement('p');
                errorText.textContent = 'Please try again later.';
                resultsContainer.appendChild(errorText);
                console.log('Error fetching poll: ', pollId);
                console.log(error);
        });
    }

    setResultTiles(poll){
        var totalVoteCount = 0;
        poll.options.forEach((option) => {
            totalVoteCount += option.optionScore;
        })
        //take list of poll options and add result tiles to page
        const resultsContainer = document.getElementById('results-container');
        try{
            const resultsHeader = document.createElement('h2');
            resultsHeader.textContent = "Thank you for your vote.";
            resultsContainer.appendChild(resultsHeader);
            poll.options.forEach((option) =>{
                //create new results tile for each option
                const newResultsTile = document.createElement('p');
                newResultsTile.textContent = (option.optionText + " - ");
                newResultsTile.textContent += (Math.round((option.optionScore / totalVoteCount * 100)));
                newResultsTile.textContent += ("%");

                //assign unique id
                newResultsTile.setAttribute('id', `result${option.optionId}`)
                resultsContainer.appendChild(newResultsTile);
                newResultsTile.classList.add('results-cell');
            })
        } catch (error) {
            console.log('Error setting results tiles: ', error);
        }
    }
}

main = new main();
