import fs from 'node:fs'
import path from 'node:path'

export function copyFolderSync(source: string, target: string) {
	if (!fs.existsSync(target)) {
		fs.mkdirSync(target)
	}

	const files = fs.readdirSync(source)

	files.forEach((file) => {
		const sourcePath = path.join(source, file)
		const targetPath = path.join(target, file)

		if (fs.statSync(sourcePath).isDirectory()) {
			copyFolderSync(sourcePath, targetPath)
		} else {
			fs.copyFileSync(sourcePath, targetPath)
		}
	})
}
