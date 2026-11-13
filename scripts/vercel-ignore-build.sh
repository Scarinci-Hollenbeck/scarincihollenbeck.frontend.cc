#!/bin/sh
# Vercel "Ignored Build Step" (Project Settings > Build and Deployment). The
# dashboard runs:
#   case "$VERCEL_GIT_COMMIT_REF" in dependabot/*) exit 0;; esac; [ -f scripts/vercel-ignore-build.sh ] && sh scripts/vercel-ignore-build.sh || exit 1
# (the dependabot check is repeated there for branches cut from a commit
# without this script). Exit 0 skips the build; any other exit (including a
# missing script) builds. Every build prerenders the whole site through the
# production WordPress (about 670 requests in 3 minutes, tasks #15), so builds
# that test nothing new are skipped.

# Dependabot branches are never deployed.
case "$VERCEL_GIT_COMMIT_REF" in dependabot/*) exit 0 ;; esac

if [ "$VERCEL_GIT_COMMIT_REF" = staging ]; then
  # Explicit request, e.g. an empty commit before a release sweep.
  case "$VERCEL_GIT_COMMIT_MESSAGE" in *"[build]"*) exit 1 ;; esac

  # Merging an up-to-date PR gives staging exactly the code its preview build
  # already had (merge only PRs whose head has a green Vercel check). The
  # staging alias then keeps the previous deployment until the next build
  # (see "Releasing staging to production" in CLAUDE.md).
  if git cat-file -e 'HEAD^2' 2>/dev/null \
    && [ "$(git rev-parse 'HEAD^{tree}')" = "$(git rev-parse 'HEAD^2^{tree}')" ]; then
    echo "Merge of an up-to-date PR: same code as its preview build, skipping."
    exit 0
  fi
fi

# A branch with no deployment yet always builds: comparing only with HEAD^
# could skip the first push of a branch whose last commit is docs-only, and
# the staging rule above relies on every PR head having been built.
[ -n "$VERCEL_GIT_PREVIOUS_SHA" ] || exit 1

# Skip when nothing but docs and tests changed since the last deployed commit.
git cat-file -e "$VERCEL_GIT_PREVIOUS_SHA" || exit 1
git diff --quiet "$VERCEL_GIT_PREVIOUS_SHA" HEAD -- . ':!*.md' ':!tests/' ':!.superpowers/'
