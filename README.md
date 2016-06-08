# README

Author: Lin Dong

Date: 6/5/2016

## Thoughts
By going over the github APIs.
1. https://developer.github.com/v3/issues/#list-issues-for-a-repository

I see that issues has 3 states: `open`, `closed`, or `all`.

And the assignment asks to display only issues with `open` state, but I thought it would be nice to display in `all` state in backward chronological order.

So, without exhausting the browser client, implementing `Pagination` is essential.

I also found the API supports pagination by passing `page` and `per_page` parameters. i.e. `https://api.github.com/user/repos?page=2&per_page=100`

1. https://developer.github.com/v3/

Now, we need to implement `mention functionality` with `@`:

Use regular express to massage data by converting string from @username
to link <a target="_blank" href="https://github.com/username">@username</a>

140 Characters: is little bit tricky. First just truncate to 140 characters, then use CSS to text-overflow: ellipsis to style, see style.css for details.


## Used APIs
1. https://api.github.com/repos/rails/rails/issues?page=1&per_page=1
2. https://api.github.com/repos/rails/rails/issues?page=1&per_page=1&state=closed






