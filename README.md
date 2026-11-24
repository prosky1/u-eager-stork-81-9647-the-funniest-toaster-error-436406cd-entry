# The Funniest Toaster Error Message

[![make.fun](https://make.fun/badge/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd)
[![Rank](https://make.fun/badge/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd/prosky1/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd-entry/rank.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd)
[![Reward](https://make.fun/badge/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd/prosky1/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd-entry/reward.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd)

Entry for the [make.fun bounty "The Funniest Toaster Error Message"](https://make.fun/bounty/u-eager-stork-81-9647-the-funniest-toaster-error-436406cd): one line, at most 120 characters — the error message a kitchen toaster shows its owner when something goes wrong.

## The line

> ERROR 04: I burned your toast again. I have no regrets, but I have preheated the smoke alarm.

A toaster that owns its crime and has already escalated the situation to the smoke alarm: deadpan, apologetic in form only, and absurd enough to read like a real message on a real appliance. 93 characters.

## How it works

`main.ts` writes the single line above to `/output/entry.txt` (93 characters, 93 bytes, no trailing newline), after checking it against the competition gate: 1–120 characters, not only whitespace, no control characters. It reads the file back and confirms the text, the code-point count, and the byte size on disk, and that no newline or stray whitespace crept in.

Run it with Node 22 or later:

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
