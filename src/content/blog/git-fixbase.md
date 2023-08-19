---
pubDatetime: 2023-08-18T13:00:00Z
title: Git Fixbase
postSlug: git-fixbase
featured: false
draft: false
tags:
  - technical
  - git
ogImage: ""
description: Level up your git skills with an alias for amending commits that aren't HEAD
---

I always used to find myself needing to edit/amend commits that I made a few commits ago.
I would handle this scenario by making the changes I wanted, stage them, then create a `!fixup` commit (`git commit --fixup <commit-hash>`) for the commit I was planning to edit.
Provided I had no other changes in my index, I would then interactively rebase from the commit before the one I am fixing up.
I did this a lot.
It was pretty much muscle memory I did it so much.

One day I set out to create a `git` alias to perform these operations all in one go.
Initially I thought I would need to create a small shell script and invoke it with a `git` alias, but it turns out you can include plain bash in a `git` alias by prefixing the alias with `!`.

Introducing `git fixbase <hash-to-fixup>`:

```bash
[alias]
        fixbase = "!f() { git commit --fixup=$1 && GIT_EDITOR=true git rebase --interactive --autosquash $1^; }; f"
```

The `GIT_EDITOR=true` is the key to the command - it will prevent `git` from opening your configured text editor and automatically accept the interactive rebase without your input.
Perfect!
