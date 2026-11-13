#!/bin/sh
# Vercel "Ignored Build Step" (Project Settings > Build and Deployment). The
# dashboard runs:
#   case "$VERCEL_GIT_COMMIT_REF" in dependabot/*) exit 0;; esac; [ -f scripts/vercel-ignore-build.sh ] && sh scripts/vercel-ignore-build.sh || exit 1
# (the dependabot check is repeated there for branches without this script).
# Exit 0 skips the build; any other exit (including a missing script) builds.
# The VERCEL_GIT_* variables need "Enable access to System Environment
# Variables" (Settings > Environment Variables), on since 2026-11-13.
#
# Every build prerenders the whole site through the production WordPress
# (about 670 requests in 3 minutes, tasks #15), so:
# - staging and production always build, so each shows the code merged into it;
# - a PR branch builds a preview only when the pushed commit's message
#   contains [preview];
# - dependabot branches never build;
# - staging and production skip a push that changed only docs and tests.

REF=$VERCEL_GIT_COMMIT_REF

# Without the branch name a PR branch cannot be told from staging: build.
[ -n "$REF" ] || exit 1

case "$REF" in
  dependabot/*) exit 0 ;;
  staging | production)
    B=$VERCEL_GIT_PREVIOUS_SHA
    { [ -n "$B" ] && git cat-file -e "$B" 2>/dev/null; } || exit 1
    git diff --quiet "$B" HEAD -- . ':!*.md' ':!tests/' ':!.superpowers/'
    exit $?
    ;;
esac

MSG=${VERCEL_GIT_COMMIT_MESSAGE:-$(git log -1 --format=%B)}
case "$MSG" in *"[preview]"*) exit 1 ;; esac
echo "No [preview] in the commit message: no preview build for this push."
exit 0
