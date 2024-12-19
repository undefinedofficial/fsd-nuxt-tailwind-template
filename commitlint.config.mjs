export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
      ],
    ],
    'type-case': [
      2,
      'always',
      'lower-case',
    ],
    'type-empty': [
      2,
      'never',
    ],
    'type-max-length': [
      2,
      'always',
      8,
    ],
    'scope-case': [
      2,
      'always',
      'lower-case',
    ],
    'subject-case': [
      2,
      'always',
      'lower-case',
    ],
    'subject-empty': [
      2,
      'never',
    ],
    'subject-min-length': [
      2,
      'always',
      10,
    ],
  },
}
