---
title: "workslop and slowing down in the agentic productivity era"
pubDate: 2026-09-18
---

i'm starting to feel sick of reading ai-generated content at work, and for a while i didn't know why.

recently my position at work has changed a bit. i'm not sure how to describe it, but something has changed.

part of it is that i'm now the sole engineer on a running product, which is how the manager wants it. the teammates from the ai side, who used to only write python, are moving into web work because the workload is too much for one person.

but as i worried at the start, when the manager proposed this: when teammates with no web expertise start dumping ai-generated prs on you and you have to review them, you can tell immediately that the code is bad and full of holes. not broken in the obvious way, either. it's functional line by line and wrong in the details. even the manager dumps ai slop on you. he doesn't have the time, and honestly you can't blame him for that. but i've been getting a lot of it lately and i'm tired of it. "sick of it" is more exact.

at first i didn't know why. but the annoyance was there, so i tried to figure out what was going on and whether there was a name for it. turns out people everywhere are dealing with this, and the term is "workslop": ai-generated work content that masquerades as good work, but lacks the substance to meaningfully advance a given task.

people now generate very long jira comments, long ticket descriptions, long everything. the thing is, the human brain, or at least mine, isn't built to read and absorb every detail of a description. same with code. attention is limited, and what's happening is that the mental load is being moved from the generator to the reader. the researchers who coined the term put it as shifting the burden of the work downstream, requiring the receiver to interpret, correct, or redo it. sean goedecke calls it asymmetrical effort: cheap to write, expensive to read. and the person forwarding it often becomes a conduit, routing output they can't evaluate themselves.

i'm guilty of this too. i generate prs with long, nearly unreadable bodies, and i admit it sucks. and it gets wrapped in the word "productivity" at my workplace. because people are in the early phase of adopting ai, they focus on how to apply the tools rather than on where ai sits in the team's, or the company's, process.

documentation, detailed comments and descriptions aren't new. large companies have maintained them by hand for a long time. what's new is that generating a lot of it is free, and because agents coordinate better with more context, people generate more and more. but we have to be clear about who the audience of that output is, and where ai fits into the team's existing workflow. people are bloating huge knowledge bases for ai without realizing that companies have done this by hand before, and there's experience to borrow. for a smaller team, the team needs to know its own procedures first. ai should only be the accelerator in that process. and the documentation needs structure: a clear definition of what gets written, and for whom.

so what next? for me, first: be clear about who the audience of the generated content is.

for code, if it's ai-generated and it's serious work, engineering especially, it needs to be refactored before it lands. keep the generated part out of the core modules, or something along those lines.

for prose like pr bodies or jira tickets, write them by hand. if there's too much detail for that, say it's ai-generated, and put the human intention on top: a few lines of your own about what and why, above the generated part.

and slow down. engineering is attention to detail: reading each small piece of code, weighing trade-offs, questioning the design.

## ref

- [AI-Generated "Workslop" Is Destroying Productivity](https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity)
- [Appearing productive in the workplace](https://nooneshappy.com/article/appearing-productive-in-the-workplace/)
- [AI makes weak engineers less harmful](https://www.seangoedecke.com/ai-makes-weak-engineers-less-harmful/)
- [How to protect yourself from workslop](https://www.seangoedecke.com/how-to-protect-yourself-from-workslop/)
