const gulp = require("gulp");
const annotate = require("gulp-ng-annotate");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const livereload = require("gulp-livereload");

gulp.task("build", () => {
  return gulp.src("src/app/**/*.js")
    .pipe(concat("app.min.js"))
    .pipe(annotate())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload());
});

gulp.task("watch", ["build"], () => {
  livereload.listen();
  gulp.watch("./src/app/**/*.js", ["build"]);
});

const nodemon = require("gulp-nodemon");

gulp.task("nodemon", ["watch"], () => {
  nodemon({
    script: "index.js",
    ext: "js html css",
    ignore: ["src/app/**/*.js", "gulp", "test"]
  }).on("restart", () => {
    livereload();
    console.log("server restart");
  })
});
