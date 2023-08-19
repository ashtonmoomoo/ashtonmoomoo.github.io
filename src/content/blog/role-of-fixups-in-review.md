---
pubDatetime: 2023-08-19T13:00:00Z
title: Using Fixup Commits in Code Review
postSlug: role-of-fixups-in-review
featured: false
draft: false
tags:
  - git
  - software-engineering
ogImage: ""
description: Make your code easier to (re-)review with fixup commits
---

Making your code as easy as possible to review is a critical skill as a software engineer.
There are steps you can take at develop or pre-review time, such as committing your work in logical chunks with descriptive messages, and writing great `(pull|merge)` request descriptions, but how do you continue making your team mate's lives easy after they have provided their first review?

For each piece of code-related feedback a team mate gives on my `(pull|merge)` request, I like to create a fixup commit that addresses that feedback and ties the revised bit of code to where it was originally introduced or changed.
Generally I will then respond to the feedback saying that the feedback has been addressed, with a link to the fixup commit which the reviewer can follow to see the exact change that their feedback inspired.

Once the reviewer is satisfied that their suggestions have been implemented, the conversations can be resolved, and I will rebase the fixup commits into the commits that they belong in and force push to remote.
This way of working makes the reviewer's life simpler, providing a way of keeping track of what feedback has been implemented, and what hasn't.
Once it's all done, the rebase means the `(pull|merge)` request can be returned to something resembling what it looked like when it was first opened, except it's better this time!

![image showing two comments on GitHub, the first saying "delet this", and the second saying "ok ee01d04"](https://github.com/ashtonmoomoo/ashtonmoomoo.github.io/assets/39810977/0a5eae36-98e2-462d-9530-f83a9096de66)

<p align="center">
  This is definitely a real thing that happened.
</p>
