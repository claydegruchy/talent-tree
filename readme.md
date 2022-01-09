# TalentTree
A system to display education courses in a talent tree style layout. Based initally off the KTH course API. Check it out here: 

https://claydegruchy.github.io/talent-tree/dist/index
# What exactly am I looking at here
This system takes all avalible courses from the KTH API and charts them into a heirachy, showing which courses are required to take which others. 
# How do I use this
Select a course to see what prerequisites it has, and what future courses it may enable. Use the search in the top right to find specific courses. Doubleclick to open the page for that course on the KTH website.
# How does it work
`./course-processor/` containes `index.js` which is simple nodejs. This script can be used to pull all courses from the KTH API and then find which prereqs each has. The prereq find process is pretty medicore as I'm just searching inside the prereq field (where possible).

This JS file produces a `processed-courses.json`, which the react app then consoles to create the chart.

# Notes
At the moment the 'talent tree' is more reminiscent of Path of Exile than World of Warcraft. Some courses are required for so many others that it becomes a spiderweb. This can probably be fixed with better parsing of the prereqs