import gulp from "gulp";
import { plugins } from "./config/gulp-plugins.js";
import { path } from "./config/gulp-settings.js";

global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	isWebP: !process.argv.includes('--nowebp'),
	isImgOpt: !process.argv.includes('--noimgopt'),
	isFontsReW: process.argv.includes('--rewrite'),
	gulp: gulp,
	path: path,
	plugins: plugins
}

import { reset } from "./config/gulp-tasks/reset.js";
import { html } from "./config/gulp-tasks/html.js";
import { css } from "./config/gulp-tasks/css.js";
import { js } from "./config/gulp-tasks/js.js";
import { jsDev } from "./config/gulp-tasks/js-dev.js";
import { imagesOptimize, copySvg } from "./config/gulp-tasks/images.js";
import { ftp } from "./config/gulp-tasks/ftp.js";
import { zip } from "./config/gulp-tasks/zip.js";
import { sprite } from "./config/gulp-tasks/sprite.js";
import { gitignore } from "./config/gulp-tasks/gitignore.js";

const devTasks = gulp.series(reset, gitignore);
const buildTasks = gulp.series(reset, jsDev, js, gulp.parallel(html, css, gulp.parallel(imagesOptimize, copySvg), gitignore));

export { html }
export { css }
export { js }
export { jsDev }
export { sprite }
export { ftp }
export { zip }

const development = devTasks;
const build = buildTasks;
const deployFTP = gulp.series(buildTasks, ftp);
const deployZIP = gulp.series(buildTasks, zip);

export { development }
export { build }
export { deployFTP }
export { deployZIP }

gulp.task('default', development);