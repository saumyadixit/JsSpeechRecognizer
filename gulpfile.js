const gulp = require('gulp');
const rollup = require('rollup-stream');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');

const TEST_FILE = 'test/test.keywordspotting.js';
const BENCHMARK_FILE = 'test/benchmark.js';

gulp.task('rollup-test', () => {
  return rollup({
    entry: TEST_FILE,
  })
  .pipe(source('test.keywordspotting.js'))
  .pipe(
    gulp.dest('test/dist')
  );
});
gulp.task('rollup-benchmark', () => {
  return rollup({
    entry: BENCHMARK_FILE,
    plugins: [
        nodeResolve({
        browser: true,
        main: true,
      }),
      commonjs()
    ]
  })
  .pipe(source('benchmark.js'))
  .pipe(
    gulp.dest('test/dist')
  );
});

gulp.task('copy-html', () => {
  return gulp
    .src([
      'test/*.html',
    ])
    .pipe(gulp.dest('test/dist'));
});

gulp.task('copy-wavs', () => {
  return gulp
    .src([
      'test/resources/*.wav',
    ])
    .pipe(gulp.dest('test/dist/resources'));
});

gulp.task('watch', () => {
  gulp.watch(['test/**'], ['build-test']);
});

gulp.task('build-test', ['rollup-test', 'rollup-benchmark', 'copy-html', 'copy-wavs']);

gulp.task('default', () => {
  runSequence('build-test', 'watch');
});
