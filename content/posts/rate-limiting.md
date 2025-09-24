---
slug: rate-limiting
title: "Rate Limiting and Identifying Users"
date: "2025-09-24:00:00+07:00"
category: "Tech"
tags: ["Rate Limiting", "Backend", "Security", "Token"]
excerpt: "Retrospective of working with rate limiting"
---

# Rate Limiting and Identifying User

Recently I had a chance to work with the topic of rate limiting/throttling, and I want to share a bit.

There’s already a lot written about rate limiting. You can check the references (I’ll update them over time).
Some basic ideas I picked up: IP-based limiting. You can block requests at multiple levels, from the edge runtime (e.g. Cloudflare), to proxies like ngrok, and finally at the server side.
But when it comes to app logic, you still have to let the request reach your server. At that point, you need to store request info somewhere and apply a rate-limiting algorithm. Using a cache (e.g. Redis) is usually better than a disk-based database since you need fast access and possibly quick revocation.

Honestly, while working on this, I realized that rate limiting itself isn’t that difficult. There are many useful approaches to choose from, each with strengths and weaknesses depending on the case. In general, most approaches are fine.

The bigger concern is how to identify clients. For example, take Stripe: they embed their client SDK/form inside other websites. The general (and imo best) idea is to issue a secret-signed token as a client/session ID with some payload. Essential info usually includes an `issued_at + expire time` combo for token invalidation. Once you have that skeleton, you can pick from a variety of algorithms, but the basic approach I thought of is hashing with a secret (e.g. HMAC).

Then comes the question: should the token payload live on the client or server?

If it’s client-side, you could use a JWT or a simpler form like `iss|exp|token`. Each has trade-offs. JWT is standardized and widely supported with libraries across platforms. If you go lighter with a custom format, you might need to reinvent some token signing/verification logic, but it’s usually manageable.

Another idea is device fingerprinting, with open source projects like Fingerprint.js or Thumbmark.js. The hit rate isn’t 100%, and device fingerprinting feels sensitive since it can be blocked by the client (e.g. with adblocker) and is already being deprecated by browsers. It’s not good for tracking user info long-term, so personally I don’t like this approach. But it does work as a way to identify clients in anonymous sessions.

## References

- [ByteByteGo Rate Limiting](https://bytebytego.com/courses/system-design-interview/design-a-rate-limiter)
- [Cloudflare Rate Limiting best practices](https://developers.cloudflare.com/waf/rate-limiting-rules/best-practices/)
