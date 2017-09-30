/**
 * Created by shawnsandy on 8/14/16.
 */
var gulp = require("gulp");
var q = require("q");
var path = require("path");
var fs = require("fs");
var Grunticon = require("grunticon-lib");
var _ = require("underscore");
var imagemin = require("gulp-imagemin");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var changed = require("gulp-changed");
var toast = require("node-notifier");
var git = require("gulp-git");
var replace = require("gulp-ext-replace");
var print = require("gulp-print");
var replace_txt = require("gulp-replace");
var cssnano = require("gulp-cssnano");
var config = require("./config.js");
var reports = require("gulp-sizereport");

/**
 * process files sass
 * */
gulp.task("sass", function() {
  return gulp
    .src("./src/scss/**/*.scss", { base: "./src/scss/" })
    .pipe(changed("./src/scss/**/*.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest("./src/public/css"))
    .pipe(
      reports({
        gzip: true
      })
    )
    .pipe(
      notify({
        title: "Task Completed",
        message: "SCSS files compiled, enjoy",
        onLast: true
      })
    );
});

/**
 * watch sass files
 * run sass task on change
 */
gulp.task("sass:watch", function() {
  gulp.watch("./src/scss", ["sass"]);
});

gulp.task("clone:html", function() {
  git.clone(
    "https://github.com/shawnsandy/frontend",
    { args: "./html" },
    function(err) {
      if (err) {
        toast.notify({
          title: "Sorry!",
          message: "Error cloning theme, see console for log info",
          sound: true
        });
        console.log(err);
      }
    }
  );
});

/**
 * run import task
 */
gulp.task(
  "imports",
  ["import:views", "import:partials", "import:assets"],
  function() {}
);

/**
 * imports views and converts them to blade.php files
 *
 */

gulp.task("import:views", function() {
  return gulp
    .src("./html/theme/views/**/*.html", { base: "./html/theme/views" })
    .pipe(replace(".blade.php", ".html"))
    .pipe(replace_txt("stylesheets", "/" + config.theme_folder + "/css"))
    .pipe(replace_txt("javascripts", "/" + config.theme_folder + "/js"))
    .pipe(gulp.dest("./src/imports/views"))
    .pipe(print());
});

/**
 * import partial views directly into resources
 * overwrites existing files in the directory
 * partials should not be edited / modified
 */
gulp.task("import:partials", function() {
  return gulp
    .src("./html/theme/views/partials/**/*.html", {
      base: "./html/theme/views"
    })
    .pipe(replace(".blade.php", ".html"))
    .pipe(replace_txt("stylesheets", "/" + config.theme_folder + "/css"))
    .pipe(replace_txt("javascripts", "/" + config.theme_folder + "/js"))
    .pipe(gulp.dest("./src/resources/views"))
    .pipe(print());
});

/**
 * imports assets into the public dir
 */
gulp.task("import:assets", function() {
  return gulp
    .src(
      ["./html/theme/public/css/**/*.css", "./html/theme/public/js/**/*.js"],
      {
        base: "./html/theme/public"
      }
    )
    .pipe(gulp.dest("./src/public"))
    .pipe(print());
});

gulp.task("import:sass", function() {
  return gulp
    .src(["./html/src/stylesheets/**/*.scss"], {
      base: "./html/src/stylesheets"
    })
    .pipe(gulp.dest("./src/scss"))
    .pipe(print());
});

gulp.task("default", ["imports"], function() {});
