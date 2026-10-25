---
title: "fetching user-supplied urls"
pubDate: 2026-10-25
---

recently i dug into an image download problem. a user gives us a url to their image, and we download it from there. most of the time it just works. but some of those requests, at some hours, go wrong in ways i didn't expect, and i'm learning how to handle them.

to understand the problem, i had to relearn the network basics: the steps one request goes through, and what their error messages look like. a download is five steps, each one waiting on the one before:

```text
step            what happens              takes about
1. dns          where is the host?        5 ms
2. tcp          open a line to it         10 ms
3. tls          agree on encryption       20 ms
4. first byte   ask, wait for the answer  80 ms
5. body         the file, in chunks       30 ms
                                          ------
                                          150 ms
```

the times are rough, from one real download.

each step can fail in two ways. loud: the other side says no, fast. silent: the other side says nothing, and only your own timer ends it. a loud failure costs almost nothing, a silent one costs whatever your timer is.

our downloads go through curl, so i learnt what each failure looks like from curl's error messages, shortened here:

```text
step           loud                     silent
1. dns         could not resolve host   resolving timed out
2. tcp         could not connect        connection timed out
3. tls         certificate has expired  connection timed out
4. first byte  a 403, 404 or 503        timed out, 0 bytes
5. body        n bytes missing          timed out, n of m bytes
```

one thing surprised me: when tcp or tls goes silent, the message is the same, so the error alone can't tell you which of the two got stuck. the ones that hurt me were all silent: most while connecting, some before the first byte, a few mid-file.

so the first fix is the timer. one long timeout for the whole download is a guess, so i measured healthy downloads first, and they all finished each step much faster than the timeout. then i split it into three timers, each a bit above the slowest healthy one:

- connect: tcp and tls.
- silence, no byte for a while: the wait for the first byte, and any gap mid-file. a big file that keeps flowing is never cut, a dead one is.
- whole: since silence alone never stops a server that sends a trickle.

the second fix is a retry. a host often runs on many servers, so when one is stuck, trying again might land on another one that works.

not every failure deserves a retry though:

- a 4xx like 403 or 404: the answer won't change. give up.
- a timeout, a refused or cut connection: retry right away.
- a 5xx or 429: the server is busy. wait a second first.

and only once. retries stack: if three layers each try three times, one request becomes 27 calls to a server that's already struggling.

with both, a stuck server should cost a few seconds, and the retry should often get the file. this is just a design for now, it's not on prod yet. once it is, i'll look at the metrics to see how much it actually helps.

## refs

- [libcurl error codes](https://curl.se/libcurl/c/libcurl-errors.html)
- [Timeouts (requests docs), where the read timeout is the wait between bytes](https://requests.readthedocs.io/en/latest/user/advanced/#timeouts)
- [Timeouts, retries, and backoff with jitter (Amazon Builders' Library)](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter)
- [Addressing Cascading Failures (Google SRE book)](https://sre.google/sre-book/addressing-cascading-failures/)
- [Retry strategy (Google Cloud Storage docs)](https://docs.cloud.google.com/storage/docs/retry-strategy)
