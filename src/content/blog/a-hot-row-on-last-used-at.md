---
title: "hot row problem"
pubDate: 2026-10-20
---

recently i faced a small problem.

i had an api keys table with a `last_used_at` column. on every request, the key's row gets updated with the current time, which is what shows "used 2 minutes ago" on the keys page.

the thing is, one key is one row. when a key is used a lot, all those updates hit the same row, and each one waits for the lock of the one before. normally it's fast and nobody notices. but when the database is slow, requests start queueing just to write a timestamp. this is called a hot row.

and the value is barely read. someone opens the keys page once in a while, and nobody cares if it's off by a minute. it's also a timestamp, so the last write wins and skipping one loses nothing. for a counter or a balance, a skipped write would be lost data, and you'd need sth else.

so instead of writing it on every request, only write it back when the stored value is older than a certain amount of time, a minute in my case.

```text
every request writes            at most once a minute

req --+                         req --> [ key row ]   write
req --|                         req --> skip, still fresh
req --+--> [ key row ]          req --> skip, still fresh
req --|    one at a time,       req --> skip, still fresh
req --+    the rest wait          ... a minute later ...
                                req --> [ key row ]   write
```

this takes the writes from one per request down to about one a minute per key. and it's a known problem: redmine, bitbucket and gitlab do the same for their last login and token usage times, and linux does it for file access times with `relatime`.

## refs

- [Update User#last_login_on only once per minute (Redmine #28952)](https://redmine.org/issues/28952)
- [HTTP Access Token LAST_AUTHENTICATED updates may produce high row contention (BSERV-13568)](https://jira.atlassian.com/browse/BSERV-13568)
- [GitLab personal access tokens](https://docs.gitlab.com/user/profile/personal_access_tokens/)
- [mount(8), relatime](https://man7.org/linux/man-pages/man8/mount.8.html)
