#!/bin/sh
# Vercel "Ignored Build Step" (Project Settings > Build and Deployment). The
# dashboard runs:
#   [ -f scripts/vercel-ignore-build.sh ] && sh scripts/vercel-ignore-build.sh || exit 1
# Exit 0 skips the build; any other exit (including a missing script on an old
# branch) builds. Every build prerenders the whole site through the production
# WordPress (about 670 requests in 3 minutes, tasks #15), so builds that test
# nothing new are skipped.

# Dependabot branches are never deployed.
case "$VERCEL_GIT_COMMIT_REF" in dependabot/*) exit 0 ;; esac

if [ "$VERCEL_GIT_COMMIT_REF" = staging ]; then
  # Explicit request, e.g. an empty commit before a release sweep.
  case "$VERCEL_GIT_COMMIT_MESSAGE" in *"[build]"*) exit 1 ;; esac

  # Merging an up-to-date PR gives staging exactly the code its preview build
  # already had. The staging alias then keeps the previous deployment until the
  # next build (see "Releasing staging to production" in CLAUDE.md).
  if git cat-file -e 'HEAD^2' 2>/dev/null \
    && [ "$(git rev-parse 'HEAD^{tree}')" = "$(git rev-parse 'HEAD^2^{tree}')" ]; then
    echo "Merge of an up-to-date PR: same code as its preview build, skipping."
    exit 0
  fi
fi

# Skip when nothing but docs and tests changed since the last deployed commit;
# an unknown previous commit always builds.
B=${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}
git cat-file -e "$B" || exit 1
git diff --quiet "$B" HEAD -- . ':!*.md' ':!tests/' ':!.superpowers/'
