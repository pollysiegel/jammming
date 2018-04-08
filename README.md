# jammming
## Jammming -- codecademy project class for building FE apps in React.

The basic app first authenticates with Spotify, and then allows you to search for tracks in Spotify, and create and save new playlists to Spotify.

The app is deployed at http://coda.surge.sh.  Although the course is over, I am still working on enhancing the app/fixing bugs, and continue to push out changes from time to time.

## Jammming Feature Extension -- Final Capstone Project
-- Spec can be downloaded from the repository as a PDF (please download it rather than reading it within github, because some of the links won't work within github): 
 https://github.com/pollysiegel/jammming/blob/master/jammming-feature-request-polly-siegel.pdf

# Notes on the project
* Bug: There is a problem with authentication.  You need to first do something (search or save playlist) to get the authorization 
redirect URL to load.  Once it loads, everything will work.
* I've added some code to display when there are no search results
* Bug: when you type something into the Save Playlist form box, it should erase the placeholder text that's in the box
* Improvement: hitting return in either form field should initiate the action

 
# Enhancements to do
* would like to retrieve existing playlists


# Notes for the course organizers
* This project (and this class) was extremely frustrating. The instructions were unclear, and the material leading up
to doing this class were not structured in such a way as to allow you to do this project easily. Concepts were
introduced within the project for the first time, with no mention that they were new.  If you need to
introduce something new or need us to type something in verbatim because we haven't yet learned it, then tell us that up front. Although better yet, we should be able to complete the project with things that we've learned in the class so far.

I'd recommend that at the end of every "assessment" in the project, you include a description of expected behavior for the project at that point in time, so developers can make sure their app is working properly to that point. However, since some of the project steps are not constructed so that this is possible, I'd recommend reorganizing the project so that each major "assessment" has a verifiable result that the learner can use to validate their code.

I have more suggestions I'd be happy to discuss, so just contact me if you're interested.
* Given the newness of the components of the project, I think you should slate two weeks for project completion, rather than one.
* The advisors were fantastic!


# Notes for anyone looking at my code

The basic structure of the project (the App/Component hierarchy) was laid out by the course organizers. Some of the React properties/state were added through suggestions in the course instruction. 
