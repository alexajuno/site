---
title: "server sent event against per http authentication"
pubDate: 2025-09-19
---

currently i'm working on an image ai generation platform, and the request time usually take a very long time. originally another colleague tries to have a polling strategy, that you keep querying a status endpoint, but i have a gut that it's not a good choice. even though i'm not clear why. maybe it sounds too naive: for example, you keep querying after a certain amount of time, then it's... not spontaneous right?

so after digging around, i found the server sent event approach, which i think is the valid one, that you just open a single connection and let the server pushes statuses to you. which at least sounds better.
but sse has failure modes too. and originally, i vibe coded the sse approach. but now, i'm getting back to it and trying to learn lessons properly, so i wanna share new insights.

so the first bug i faced is http auth is per request, but sse is one request that outlives its own authentication. on jwt auth, you want the token to be quite short live, and have a refresh mechanism on it. but in a long single connection, what would happen when the token expires? so, you gotta answer this. actually i don't really understand the solution, i vibe coded this part too but in short, you have to aware of this failure and try again in the middle of the connection.

the second failure mode is on php specifically. when you hold a long connection, you are holding the whole php-fpm worker, which is... kinda expensive, since each worker in laravel is a whole app booted (on my app it's roughly 150mb)
so i looked for a better answer with ai again and i saw sth called go daemon, which is actually the usual standard answer for php shared state problem, specifically a package from symfony, which is the team with all the fundamental networking packages people use in laravel day to day.
the go daemon is much cheaper. but of course, going for this is also another bunch of failure modes since you have a new component but... it's gonna be fine. honestly currently the team has never adopt the golang so i feel like this is a good chance to experiment and find out more



