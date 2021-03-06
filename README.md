# Movie Guide (WBS Project)

Author: Dominik Münch

The app can be found [here.](https://movieguide.herokuapp.com/)



##  Description

Movie Guide is a Mashup-App, that uses serveral REST-API's to provide you with interesting infomation about the movies you enjoy. The information presented includes:



- Genre, Imbd-rating, length
- Short summary
- A Wiki-article
- Information about the cast and the option to read up their Wiki-info
- NYT review
- A recomandation of movies with similar genre or cast



Upon loading the site for the first time, you are presented a search-bar. Once you search for a movie (english title only) a new section will show up which contains the requested information. If you hover the movie poster it will flip over and present you information from Wikipedia. You could also scroll down to see recommended movies or click on one of the cast members name to open up some more information about them. This will change the recommended section to movies this person has been part of.



## API's

The API's used on this website are provided by:

- [TMBd](https://developers.themoviedb.org/3/getting-started/introduction) (for the search algorithm, images, cast, plot and the recommended section)
- [OMDb](http://www.omdbapi.com/) (for minor information like rating, genre length etc.)
- [NYT-API](https://developer.nytimes.com/)
- [Wikipedia-API](https://www.mediawiki.org/wiki/API:Main_page)

The API provided by TMDb is very powerful and allows for a vast variety of different GET-Requests that provide all the information you need. When working with TMDb you will need to start by their search-requests to get you their internal ID for the movie/actor you wish to get information on.

You should also keep in mind that these API's work the best when searching for popular movies. There is always a chance that some movies are not listed in one of these data-bases, which can lead to some problems. TMBd difinitely does the best job returning results for even older or more niche movies, but OMDb can be a bit tricky sometimes. 

It's also not easy getting the right results from Wikipedia's API and their documentation is realy not helpful in any way. I used `incategory:English-language_films` for my GET-Request, which still isn't the perfect solution, but it works fine most of the time.




## Color-Design

For the color-design I used [Google's Material Design Color System](https://material.io/design/color/the-color-system.html#color-usage-and-palettes). Since this app is using a lot of different mostly colorfull images I didn't want to push things too far by using bright colors in the design. I also figured that most people would search for movies in the evening/night time, so I settled for a nice, relaxing grey tone as my primary color: `#212529`. From there, I choose my secondary color, `#fec503`, because it realy pops out in front of the darker primary color, while still not beeing overpowering to the eye.

After deciding on these two colors I used the so called 'swatch' tool to get some darker and brighter tones related to my base colors for things like highlights on hovering links and contrast on elements.



![color](color.JPG)



I also used some variance of white and black, again because the pictures used are very colorfull to begin with, but since my primary color is grey, they're basicly just some brighter and darker version of my primary color.

I obviously couldn't use any complementary or triadic color system since the complementary color for grey would also be just grey. I still tried to follow the rest of the guide by using my secondary color to highlight interactive elements like links and buttons.



## Installation



Here's how to install the app in a few steps:



1. Clone the git project 

2. Navigate to the project using `cd wbs_mashupapp`

3. Type `npm install` in the console

4. Type `npm start` to run the app on your [localhost:3000](localhost:3000). If this doesn't work try `set DEBUG=myapp:* & npm start`.

   

## Known Bugs & Issues

There is a bug with the animation on the "related" section. For some reason these animations stop working when the display property of other elements get changed through code, but resizing the browser window gets them working again. This bug seems to affect all animations triggered by scrolling.