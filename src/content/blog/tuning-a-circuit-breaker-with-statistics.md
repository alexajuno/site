---
title: "tuning a circuit breaker with statistics"
pubDate: 2026-11-02
---

recently i faced a common problem in system design: a failing dependency. a service we call started failing part of the time. most calls still worked, but the failing ones hung until our timeout, and only then did we try a fallback. every new call did the same, so while the service was failing, a lot of calls waited out the full timeout.

```text
call 1 -> failing service ... timeout -> fallback -> ok
call 2 -> failing service ... timeout -> fallback -> ok
call 3 -> failing service ... timeout -> fallback -> ok
```

the usual fix is the circuit breaker pattern. a breaker remembers that a service is failing and stops sending calls to it for a while, so they go straight to the fallback. it has three states:

```text
       too many failures       wait runs out
closed ----------------> open --------------> half-open
  ^                       ^                       |
  |                       +----- trials fail -----+
  |                                               |
  +----------------- trials pass -----------------+

closed     every call goes through, and is watched
open       no call goes through, for a while
half-open  a few trial calls go through
```

## the numbers

so i cloned the textbook one. while closed, it watches a window, the calls and failures of the last few minutes, and opens once the failure rate passes a threshold over at least some number of calls. after a wait, it lets a few trial calls through to see if the service is back.

that's a handful of numbers to tune: the window, the threshold, the minimum number of calls, the wait and the trials. libraries ship defaults for them, and i picked my own, but i couldn't tell which numbers fit our system. a quiet service can take minutes to reach the minimum number of calls, and a busy one reaches it in a fraction of a second, so a number that fits one service doesn't fit the next. i wanted settings that mean the same for any service, and to let statistics turn them into the breaker's numbers.

i don't have a stats background, so i used ai to research how statistics handles this, then learnt it one piece at a time.

after each call, the breaker asks whether the service is fine or broken. in statistics that's a hypothesis test, and a test needs both answers spelled out. so the breaker gets two failure rates: a fine service fails 5% of its calls, which we can live with, and a broken one fails 20%, which is worth skipping.

the results come in one at a time, and the breaker should decide as soon as it has seen enough. abraham wald worked out a test for that in 1943, and published it in 1945: the sequential probability ratio test: weigh each result as it comes in, and stop once the evidence is strong enough either way.

a test like that can be wrong in two ways. it can call a fine service broken, a false alarm, or call a broken service fine, a miss. neither can be ruled out, so you pick how often you accept each, and the test works out how much evidence that takes.

two more pieces come in later: e. s. page's cusum, from 1954, which keeps a test like wald's running for as long as you watch, and jean ville's inequality, from 1939, which bounds how often it raises a false alarm.

so in the end there are still numbers to tune. they say what fine and broken mean, and how often each mistake may happen, so they mean the same for any service:

```text
setting               example  meaning
fine failure rate     5%       we can live with it
broken failure rate   20%      worth skipping
false alarms          1/month  at most, while fine
trial wrongly opens   1%       on a recovered service
trial wrongly closes  5%       on a broken service
```

the rest of this post works the breaker's numbers out from these.

to check each step, i replayed real traffic through it with a fake clock: every call from a normal week, and from the bad day when the service was failing.

## a score instead of a window

the window goes away. each service keeps one score, and every result moves it:

```text
a call fails       +8 points
a call succeeds    -1 point
never below 0
score reaches the line: open
```

a healthy service gets far more successes than failures, so its score stays at 0 most of the time. a failing one climbs:

```text
result  score
ok      0    can't go below 0
FAIL    8
ok      7
ok      6
FAIL    14
FAIL    22
FAIL    30   past a line of 26: open
```

the 8 and the 1 come from the two rates. picture two worlds:

```text
fine world:    5 of every 100 calls fail
broken world: 20 of every 100 calls fail
```

for each result, compare how often it happens in each world:

- a failure happens 5 times in 100 in the fine world and 20 times in 100 in the broken one, so a failure is 20 / 5 = 4 times more likely if the service is broken.
- a success happens 95 times in 100 in the fine world and 80 times in 100 in the broken one, so a success is 95 / 80, about 1.19 times more likely if it's fine.

1.19 multiplied by itself 8 times is about 4, so it takes about 8 successes to cancel one failure.

in math, with p0 the fine rate and p1 the broken one, a run of F failures and S successes is this many times more likely if the service is broken:

```text
ratio = (p1 / p0)^F x ((1 - p1) / (1 - p0))^S
      = 4^F x 0.84^S
```

a product is awkward to keep as a running score, so the breaker keeps its log, which turns x into +:

```text
score = F x ln(4)  + S x ln(0.84)
      = F x 1.39   - S x 0.17
```

divided by 0.17, that's +8 for a failure and -1 for a success. the code keeps 1.39 and 0.17, and the points are only there to make it easier to read.

the per-result ratios are called likelihood ratios. adding up their logs is wald's test, and the floor at 0 makes it page's cusum, which was made to spot when a machine on a production line starts making bad parts.

### the gap

the two rates need a gap between them. if both were 10%, every result would be just as likely in both worlds, ln(1) = 0, and the score would never move.

a service failing somewhere between the two rates moves the score slowly. its drift per call shows which way:

```text
drift per call = rate x 8 - (1 - rate) x 1
zero at rate = 1/9, about 11%

under 11% failing  drifts down, stays closed
over 11% failing   drifts up, opens
                   slowly near 11%, fast past 20%
```

statisticians call this gap the indifference zone. a wider gap makes each result count for more, so the breaker decides faster, but the edge between fine and broken gets blurrier. a narrower gap gives a sharper edge and needs more calls.

### a wrong first try

my first statistical version used the service's usual failure rate as the fine rate, which was well under 1%. against a rate that low, one failure outweighs far more than 8 successes, so a few failures close together tripped it. on the normal week, it opened more often than the textbook breaker.

the test was right that a few failures in a few minutes were unusual for that service, but what i wanted to know was whether the service was bad enough to skip. so the fine rate should be the rate you can live with.

## the line

the line says how much evidence is enough. wald's test puts it at:

```text
line = ln((1 - b) / a)
     = ln(0.95 / 0.01)
     = ln(95) = 4.55, about 26 points
```

where a is the chance of a false alarm and b the chance of a miss, here 1% and 5%. picture 1,000 fine services and 1,000 broken ones playing the game. at most 1% of the fine ones should reach the line, so 10, and 95% of the broken ones should, so 950. a service at the line is then broken 950 to 10, or 95 to 1, and that's where the line sits.

that 1% holds for one round, though. a round starts when a failure lifts the score off 0, and ends back at 0 or at the line:

```text
usual round:  0 8 7 6 5 4 3 2 1 0   nothing happens
rare round:   0 8 7 15 14 22 30     past 26: open
```

a busy service plays thousands of rounds a week, so a small chance per round adds up. in a simulation of a service failing exactly 5%, the fine rate, a line of 26 points raised a false alarm about every 1,800 calls. so i set the line by time instead: at most one false alarm a month.

### one false alarm a month

if the service takes N calls a month, the line goes at ln(N). the reason is that while the service is fine, the ratio behind the score is a fair bet: on average, a call multiplies it by exactly 1.

```text
p0 x (p1 / p0) + (1 - p0) x ((1 - p1) / (1 - p0))
  = p1 + (1 - p1)
  = 1
```

ville's inequality says a fair bet that starts at 1 reaches N with a chance of at most 1 in N. each round starts from a score of 0, which is a ratio of 1, so each round reaches ln(N) with a chance of at most 1 in N. a round takes at least one call, so N calls bring at most one false alarm on average. gary lorden proved this bound for cusum in 1971. a service failing less than the fine rate makes the bet worse than fair, so its false alarms are even rarer.

in a simulation of a service failing exactly 5%, the false alarms came about 18 to 19 times rarer than the bound:

```text
line         bound: at most     simulated: about
             one false alarm    one false alarm
             every              every
ln(1,000)    1,000 calls        18,000 calls
ln(10,000)   10,000 calls       180,000 calls
ln(100,000)  100,000 calls      1,900,000 calls
```

the simulation assumes failures come at random, one at a time. real failures come in bunches, which trip it sooner.

### measuring traffic

traffic changes through the day, so the breaker measures it itself. each call adds 1 to a count, and the count fades by a factor of e every hour, so the count divided by an hour is the recent calls a second. the unix load average works the same way, an exponentially damped moving average, and it needs two numbers per service: the count, and when it was last updated.

```text
calls a minute  calls a month  line
1               43,200         10.7, about 62 points
60              2,592,000      14.8, about 86 points
600             25,920,000     17.1, about 99 points
```

a busier service gets a higher line, so its false alarms stay as rare in time. the line grows with the log of the traffic, so 600 times the traffic adds under 40 points, and a failing service still opens quickly. simulated, at the line for a call a minute:

```text
service failing  opens after about
20%              74 calls
35%              29 calls
100%             8 calls
```

## half-open

after the wait, the breaker lets trial calls through. they play the same game on a new score from 0, without the floor, since a score below 0 is now what shows the service has recovered:

```text
trial fails       +8
trial succeeds    -1
reaches +26       still broken: open again
reaches -18       recovered: close
```

these are wald's two lines, with a = 1% the chance of keeping out a service that recovered, and b = 5% the chance of letting a broken one back:

```text
open again at  ln((1 - b) / a) = ln(95)     = +4.55
close at       ln(b / (1 - a)) = ln(0.0505) = -2.99
```

in points, 4 failures in a row open it again, since 32 is past 26.5, and 18 successes in a row close it, 17.4 rounded up. a failure in between costs 8 more successes:

```text
recovered     ok x 18                  -18: close
broken        ok FAIL ok ok FAIL FAIL  -1 7 6 5 13 21
              FAIL                     29: open
one hiccup    ok x 10, FAIL, ok x 16   -10 -2 -18: close
```

wald and wolfowitz proved in 1948 that no other test with the same error rates needs fewer trials on average.

### one trial at a time

the trials go one at a time. a call to a service that's still failing can hang until the timeout, and with one trial at a time only one user waits.

on a quiet service that makes the trials slow: 18 of them at a call a minute take 18 minutes. so the time half-open may take comes from the traffic as well, three times as long as the trials to close would take at the service's pace. i picked the three myself. when that time runs out, the breaker closes if the score is below 0, and opens again otherwise.

a trial that doesn't answer within the time a call is given counts as lost and the next one goes, so a server that died in the middle of a trial can't keep the breaker half-open.

### real calls as trials

write-ups of the pattern mention two ways to tell whether the service is back: real calls, or a separate health check. i used real calls:

- a failed trial doesn't fail the user's call. it moves on to the fallback like any other failure, so that user only waits longer.
- a health check can pass while real calls fail, for example when the service fails only on some inputs.
- health checks add load to a service that's already struggling, and need their own code: a scheduled job, and a test input for every service.

a health check would matter where there's no fallback, since there a failed trial fails the user. the breaker never skips a call's last option, though: if the failing service is the only one left, the call tries it anyway. some ai gateways do the same when every target is open.

### how long to wait

the first wait is a minute. each time the trials find the service still failing, the wait doubles, up to ten minutes, and once it closes the next wait starts at a minute again. this is called capped exponential backoff: the wait grows by doubling, and stops growing at the cap. other breakers grow their wait too, some by the same amount each time instead of doubling. there's no statistics in this part. it means a long outage gets fewer trials.

```text
open 1m -> trials fail -> 2m -> 4m -> 8m -> 10m -> 10m
trials pass: close, and the next open starts at 1m
```

## details

### counters that drift apart

my first version kept calls and failures as two counters in a cache, each expiring five minutes after its own first hit. they didn't line up, so old failures got divided by the calls of a newer window:

```text
00:00  first call     calls counter starts
00:20  first failure  failures counter starts
 ...   lots of successes
05:00  calls counter expires, starts over at 0
05:10  10 calls, 2 failures: 20%, open
```

a service failing 2 in 50 looked like 2 in 10. the score has no window, so this can't happen there.

### everyone back at once

my first half-open let every call through once the wait ran out. when a failing call hangs for the whole timeout, every call in that stretch hangs, until the first failure opens the breaker again, and after the next wait it repeats. one trial at a time fixes this.

### one state for every server

the caller runs on many servers, and all of them must see the same breaker. so its state is one entry per service in a shared cache: the state, the score, how long it stays open, the traffic count. every change happens under a lock, so two servers can't both read the score, add to it, and overwrite each other.

if the lock is still taken after a couple of seconds, the change is dropped. losing one result, or letting one call through uncounted, does less harm than holding up the user's call.

### late results

a call let in while closed can fail after the breaker has opened. in my first version that late failure counted against the trials and opened the breaker again. replayed on the bad day, a big share of its openings came from late results like that.

so every change of state gets a new number, a generation, and each call carries the generation it was let in with. its result counts only while the breaker is still in that generation, since a late result says nothing about the trials that came after it.

### what counts as a failure

only failures that mean the service is failing count: a timeout, a refused connection, a 5xx, a 429, or the service turning down our own key or account. a call the service refuses because of its input doesn't count, and neither does a rate limit on a user's own account.

## where it stands

before shipping, the design was replayed on real traffic with a fake clock, over a normal week and over the day of the outage that started all this. on the normal week it opened less often than the textbook version, and on the bad day far fewer calls waited on the failing service. it also sent more calls that would have worked to the fallback, so how much it helps depends on how good your fallback is.

it's been on prod for about two weeks. once it meets a real outage, i'll look at how often it opened and how long calls waited.

## refs

- [CircuitBreaker (Martin Fowler)](https://martinfowler.com/bliki/CircuitBreaker.html)
- [Circuit Breaker pattern (Microsoft Azure Architecture Center)](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)
- [CircuitBreaker (Resilience4j docs)](https://resilience4j.readme.io/docs/circuitbreaker)
- [Sequential Tests of Statistical Hypotheses (Wald, 1945)](https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-16/issue-2/Sequential-Tests-of-Statistical-Hypotheses/10.1214/aoms/1177731118.full)
- [Sequential probability ratio test (Wikipedia)](https://en.wikipedia.org/wiki/Sequential_probability_ratio_test)
- [Optimum Character of the Sequential Probability Ratio Test (Wald and Wolfowitz, 1948)](https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-19/issue-3/Optimum-Character-of-the-Sequential-Probability-Ratio-Test/10.1214/aoms/1177730197.full)
- [Continuous Inspection Schemes (Page, 1954)](https://doi.org/10.1093/biomet/41.1-2.100)
- [CUSUM (Wikipedia)](https://en.wikipedia.org/wiki/CUSUM)
- [Ville's inequality (Wikipedia)](https://en.wikipedia.org/wiki/Ville%27s_inequality)
- [Procedures for Reacting to a Change in Distribution (Lorden, 1971)](https://projecteuclid.org/journals/annals-of-mathematical-statistics/volume-42/issue-6/Procedures-for-Reacting-to-a-Change-in-Distribution/10.1214/aoms/1177693055.full)
- [Load (computing), the exponentially damped moving average (Wikipedia)](https://en.wikipedia.org/wiki/Load_(computing))
- [Circuit breaker (Portkey AI gateway docs)](https://portkey.ai/docs/product/ai-gateway/circuit-breaker)
- [Outlier detection (Envoy docs)](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/outlier)
- [Timeouts, retries, and backoff with jitter (Amazon Builders' Library)](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter)
