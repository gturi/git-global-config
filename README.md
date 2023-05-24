# git-global-config

Utility hooks that will parse 'hotfix' and 'feature' branches name and will open the the commit editor with the specified ticket name.

I.E.
Running `git commit` on `feature/JIRA-XYZ` will open the editor with `JIRA-XYZ` text prefilled. If the commit editor is closed without adding a message ouside of `JIRA-XYZ` commit msg hook will fail with an error.

## Global git hooks

Run

```
git config --global core.hooksPath /path/to/global/git/hooks
```

To add global git hooks in your `.gitconfig`.

Result:
```
[core]
  hooksPath = /path/to/global/git/hooks
```

### Windows git bash

On windows git bash to specify your home directory you need to use `~`.

I.E. To specify this path `/c/Users/your-username/.git-global-cfg/hooks`

```
[core]
  hooksPath = ~/.git-global-cfg/hooks
```

## License

This software is distributed under the [MIT license](LICENSE).
