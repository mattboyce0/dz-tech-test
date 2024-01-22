const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json());

const pollArray = [
    {
        "pollId": 1,
        "pollName": "Premier League Winner",
        "question": "Who will win the Premier League?",
        "options": [
            {
                "optionId": 1,
                "optionText": "Manchester City",
                "optionScore": 0
            },
            {
                "optionId": 2,
                "optionText": "Arsenal",
                "optionScore": 0
            },
            {
                "optionId": 3,
                "optionText": "Liverpool",
                "optionScore": 0
            },
            {
                "optionId": 4,
                "optionText": "Brighton",
                "optionScore": 0
            }
        ]
    },
    {
        "pollId": 2,
        "pollName": "Best Potato",
        "question": "What is the best type of potato",
        "options": [
            {
                "optionId": 1,
                "optionText": "Sweet Potatoes",
                "optionScore": 0
            },
            {
                "optionId": 2,
                "optionText": "Marris Piper",
                "optionScore": 0
            },
            {
                "optionId": 3,
                "optionText": "French Fingerling",
                "optionScore": 0
            },
            {
                "optionId": 4,
                "optionText": "Russet Potato",
                "optionScore": 0
            }
        ]
    },
    {
        "pollId": 3,
        "pollName": "Best Car Brand",
        "question": "What is the best car brand?",
        "options": [
            {
                "optionId": 1,
                "optionText": "BMW",
                "optionScore": 0
            },
            {
                "optionId": 2,
                "optionText": "Ford",
                "optionScore": 0
            },
            {
                "optionId": 3,
                "optionText": "Toyota",
                "optionScore": 0
            },
            {
                "optionId": 4,
                "optionText": "Audi",
                "optionScore": 0
            }
        ]
    }
]

function checkForPollId(id){
    for (poll in pollArray){
        if (pollArray[poll].pollId == id){
            return pollArray[poll];
        }
    }
    return null;
}

function incrementOptionScore(pollId, optionId){
    pollArray.forEach((poll) => {
        if (poll.pollId === pollId){
            poll.options.forEach((option) => {
                if (option.optionId === optionId) {
                    option.optionScore += 1;
                }
            })
        }
    })
}

app.get('/poll', (req, res) =>{
    const pollReq = req.query.pollid;
    console.log("Poll GET request - id:", pollReq)
    //check to see if all polls were requested (undefined, arg not supplied) or a specific poll was requested
    if (pollReq === undefined){
        console.log("No poll supplied, returning all");
        res.send(pollArray);
    } else {
        //poll arg supplied, check if valid
        const poll = checkForPollId(pollReq);
        if (poll === null){
            //send empty poll/not found
            console.log("Poll not found - returning notFound")
            res.send({"pollName": "NotFound"})
        } else {
            //return poll if found
            res.send(poll);
        }
    }
})

app.post('/pollsubmit', (req, res) => {
    const requestData = req.body;
    incrementOptionScore(requestData.selectedPollId, requestData.selectedOptionId);
    res.json({result: 'success'});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})