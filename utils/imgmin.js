import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

(async () => {
	await imagemin(['./src/assets/img/**/*.{png,jpg,ico,svg}'], {
		destination: './dist/assets/img/',
		plugins: [
			imageminWebp({lossless: true})
		]
	});

	// console.log('Images optimized');
})();