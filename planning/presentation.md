# AHSAN

# Which Project We Chose & Why
[] Honestly, we chose this project because it seemed the most realistic to us. It's something we use more often that we'd use anything else. Literally all of us have ordered pizza using a pizza place's web ordering service, or have used Uber Eats or what have you. So it's layout and functionality was easy to emulate.
[] If you're going to be freelacing, it's also the easiest niche market to get into.
[] We thought the ability to send and receive text messages via web app was also interesting and wanted to explore that.

# App Demo
[] Increasing/decreasing order items
[] Adding items to order
[] Removing items from order
[] Placing the order writes it to the database and then, sends one text message to the restaurant owner and one text message to the person who made the order
[] Page shows that order has been placed with a link to the status tracking page
[] Owner can update the status tracking page via text messages
[] User can refresh the status tracking page to see updates statuses of their order

# Future Improvements to the App
[] Pictures of the food items
[] Created a console for the restaurant owner to add or remove items to their menu list, with the ability to upload pictures of the food items
[] The ability to update orders via the console, not just SMS
[] Ability to send receipts, order confirmations and order statuses via email
[] User registration/login so that users can see their order histories and re-order items they've ordered before + add their address and payment details so that they do not have to enter them every time they make a new order
[] Give the user to specify whether they would like the order ASAP or at a particular time
[] Give the user the ability to specific whether they want delivery or pick up

# MUSTAFA

# What Each of Us Did Individually
[] Ahsan: Database development & front end functionality development using jQuery
[] Vincent: Back-end server routing & front-end CSS
[] Mustafa: Front-end HTML layouts & CSS
[] All of also helped each other out with debugging

# Challenges
[] Our major challenge was that our kept breaking when we tried to add pictures to the menu items. At the end we were unable to get them in. But at that point we had to restore our repo to an older version. It took as an hour or so to do that, but we figured it out with lots of trial and error and googling.
[] Writing to the database was often a pain. You think you've written the right query to insert into or update the database, but it ends up giving you errors. In this case, use console.log to check what the error message the database is sending back to you. In our case, it was often an SQL syntax error with an easy fix.
[] Another major challenge was that we tried putting pictures of the food items into the menu but couldn't without breaking the app. We had thought we could put pictures of food items in each menu item after we had written the jQuery stuff. However, every time we tried to get the pictures in, we broke the functionality, so we had to let that go. To be able to put the pictures in, we would have to re-write major portions of the jQuery stuff. In the end we just had to let go of this.

# VINCENT

# Key Learnings
[] Don't be afraid to break the app! That's how you learn!
[] Working on any project together (let alone app development) allows you to learn faster than if you were working on it alone.
[] Decide the project workflow and communication protocols early on.
[] First thing to do is to decide wireframes/mockups, decide the database structures and decide what divs/sections are going to be in your HTML because these affect how the code is going to be written especially if you're doing jQuery.
[] Leave styling to the very end. No need to worry about styles in the very beginning. Start with just enough styling that allows you to visualize your app and helps you do your jQuery.
[] Always do your git merges together. That way you can agree about how to resolve your code conflicts together. We did all ours together and it made everything quite smooth.
[] Update your repo frequently. There was a point where we had to restore our git to an older version. If we hadn't pushed to the repo frequently enough, we'd have lost a significant chunk of our work at that point.
[] Try to avoid having more than one person work on a single file. If someone does have to edit a file that someone else is working on, it helps to consult them first, or better yet, write that file in pair programming mode.
[] Use console.log a lot! It's unbelievable how much you can learn just by printing out the data streams, which then allows you to debug your code.
[] If you're doing jQuery, then finalize the HTML divs & sections. Otherwise you'll be spending a lot of time adjusting the parents & childrens in jQuery to get your app to be functional.
