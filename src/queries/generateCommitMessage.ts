export const constructCommitMessageQuery = (changes: string) =>
  `Construct a commit message based on the following changes:\n\n${changes}\n\n
Use this convention: fix: a commit of type "fix" fixes a bug in your code (corresponds to PATCH in Semantic Versioning).
feat: a commit of type "feat" adds a new feature to your code (corresponds to MINOR in Semantic Versioning).
BREAKING CHANGE: a commit that has a "BREAKING CHANGE" footer or a commit that ends with an exclamation mark (!) after the type or scope introduces changes that break backwards compatibility (corresponds to MAJOR in Semantic Versioning). A BREAKING CHANGE may be part of any commit type.
Other commit types are allowed. For example, @commitlint/config-conventional (based on the Angular convention) recommends build, chore, ci, docs, style, refactor, perf, test, and others.
Other commit footers may follow the git trailer format convention.
Response me only commit commit message without detailed description:`;
