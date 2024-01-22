<h1>Readme - Tech Assessment - Matt Boyce</h1>
<h2>How to run</h2>
<p>To run the application, first start the backend (./public/backend/app.js) using node. Then open the initial page (voting-page.html).
Please ensure that the backend address (http://localhost:3000) can be reached by the frontend.</p>

<h2>Front End</h2>
<p>For the front end of the application, I chose to use HTML and CSS for the pages, and JavaScript to implement the logic.
I chose these languages as they are commonly used across modern web development and I have the most experience
in these languages.</p>
<p>There are two pages in the application (voting-page and voting-results). The first page has two sets of choices for the user,
the first choice is to select a poll from any that are available on the server. The next set of choices are populated based on
the options for the previously selected poll. Error checking is implemented throughout to ensure that a user selects a valid poll and valid option.
</p>

<h2>Back End/Server</h2>
<p>The back end of the application uses the express.js framework to implement a simple API. There are two endpoints - /poll and /pollsubmit.
/poll is  a GET endpoint that will return a list of all available polls if no pollID is supplied, or a specific poll if an ID is supplied.</p>
<p>/pollsubmit is a POST endpoint that will take a poll ID and an option ID, in order to increment the score for that particular poll/option combination
on the backend.</p>

<h3>Testing</h3>
<p>My application was tested with a number of different methods. Error handling was implemented and tested at multiple stages
of execution, namely selecting a poll, displaying the options of a poll and displaying the resutls page if no poll has previosuly been completed.</p>
<p>The majority of the testing was done using manual checks and the in-build POST/GET request generator within WebStorm, although with more time available
I would definitely look at implementing a testing framework or other automated testing.</p>


<h3>Things that went well</h3>
<p>Some of the elements I feel went well relate to the handling of polls on the backend. Multiple polls can be stored on the backend, and
the frontend will automatically display these to the user, allowing the user to pick from a list.</p>
<p>Another element I feel went well relates to error handling. Error handling was implemented in common areas that are possibly the most
likely to experience untoward changes, such as local storage and a user trying to access the results page before submitting a poll.</p>


<h3>...And not so well</h3>
<p>Whilst I am very happy with the overall result of my application, I understand there are some key areas that have some room for improvement.
For example, no automated testing framework or front end framework was implemented. I attribute this mostly to my lack of experience in these areas, and considering
the timeframe available for the project I felt that it would be better to use more basic tools than try and learn and implement a framework in the timeframe given.</p>
<p>Additionally, I understand the intention for the backend was to utilise a different resource to hold the scores, however for simplicity, and given my level of experience 
with backend development such as this, I found that the most stable approach was to hold the score values within the poll object. Given an extended time frame this would
be one of the first elements I would focus on refactoring.</p>
<p>Finally, I was unable to sort the results by current score in the summary page. If given more time to complete this I would investigate holding
each of the display tiles in an array in the frontend, and sort said array by the score associated with the tile. I would then iterate through
the array in order to dictate where the tiles appeared on the screen.</p>

<h3>Security Considerations</h3>
<p>From a security standpoint, there are several key considerations that need to be made when considering this web application.
For the frontend, there is no authentication or encryption when communicating with the backend. This may lead to confidentiality or integrity violations where
a user may be able to see or change the information being transmitted between the frontend and the backend. A suitable encryption or authentication mechanism
would be needed to ensure only legitimate data is passed to the backend.</p>
<p>Additionally, the back end does not have any rate limits in place. A user could flood the server with requests for polls or post requests for scores and cause a denial of service
attack that may impact availability to other users. To combat this, rate limits or other request-based heuristics should be employed to temporarily restrict or block requests from potentially malicious endpoints.</p>
<p>Another element to consider would be the CORS configuration. In my application the frontend is configured to allow CORS from anywhere. If deployed this could present a CSRF vulnerability and would need to be configured
to only allow resource sharing from intended domains</p>
<p>Finally, from a slightly more infrastructure standpoint, the web server that hosts the application should be configured to only allow connections over HTTPS, by specifying a HSTS header in the server's response to any request made by the browser.
As well as HSTS, the server can configure a content security policy that would help to mitigate other attack types, souch as XSS.</p>

<h3>Note</h3>
<p>From a more personal standpoint, this project has been the first time I have done serious web development since my first year
of university, back in 2019. This project is by far the most complex application I have written using the web development stack, and I have
greatly enjoyed the process. I would love an opportunity to learn and explore this further, </p>
