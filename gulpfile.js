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
var config = require("./config.js");

gulp.task("sass", function() {
  return gulp
    .src("./src/resources/assets/**/*.scss", {
      base: "./src/resources/assets/"
    })
    .pipe(changed("./src/resources/assets/**/*.scss"))
    .pipe(sass().on("error", notify.onError("Error: <%= error.message %>")))
    .pipe(gulp.dest("./src/resources/assets"))
    .pipe(
      notify({
        title: "Pages Notification",
        message: "SCSS files compiled, enjoy",
        onLast: true
      })
    );
});

gulp.task("package", function() {
  return gulp
    .src("./src/resources/assets/**/*.*", { base: "./src/resources/assets/" })
    .pipe(changed("./src/resources/assets/**/*.*"))
    .pipe(gulp.dest("../../resources/assets/:package_name"));
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
    .pipe(gulp.dest("./src/resources/views"))
    .pipe(print());
});

/**
 * imports assets into the public dir
 */
gulp.task("import:assets", function() {
  return gulp
    .src(["./html/theme/public/**/*.css", "./html/theme/public/**/*.js"], {
      base: "./html/theme/public"
    })
    .pipe(gulp.dest("./src/public"))
    .pipe(print());
});

gulp.task("default", ["package"], function() {});
