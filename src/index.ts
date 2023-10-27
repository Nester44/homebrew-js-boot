import { execSync } from 'child_process'
import { Command } from 'commander'
import { existsSync, rmSync, writeFileSync } from 'fs'
import { mkdir } from 'fs/promises'
import { dirname } from 'path'
import { orange, red } from './constants/colors'
import { dependencies, packageTemplate } from './constants/configurations'
import { IOptions, Language } from './types'
import { copyFolderSync } from './utils/copyFolder'

const TEMPLATES_DIR = dirname(__dirname) + '/_templates/'

const program = new Command()

program
	.arguments('[newDirName]')
	.option('-ts, --typescript', 'Enable TypeScript')
	.option('-f, --force', 'Overwrite existing directory')
	.option('-e, --env', 'Add env')
	.option('-o, --open', 'Open in VSCode')
	.option('-or, --open-reuse', 'Open in VSCode with reuse windows')
	.action(main)

program.parse()

async function main(newDirectoryName: string, options: IOptions) {
	console.log('\nBootstrapping...✨\n')

	const start = Date.now()

	if (options.force) console.log(orange, 'Using force!')

	if (newDirectoryName) {
		if (existsSync(newDirectoryName) && !options.force) {
			console.log(red, `Directory ${newDirectoryName} already exists`)
			process.exit(1)
		}

		if (existsSync(newDirectoryName) && options.force) {
			rmSync(newDirectoryName, { recursive: true, force: true })
		}
		await mkdir(newDirectoryName)
		process.chdir(newDirectoryName)
	}

	if (existsSync('package.json')) {
		console.log(
			red,
			"Couldn't bootstrap project since package.json already exists\n",
		)
		process.exit(1)
	}
	const language = options.typescript ? 'ts' : 'js'

	const templatePath = TEMPLATES_DIR + language

	copyFolderSync(templatePath, '.')

	createPackageJson(language)
	installDependencies(language)

	if (options.env) {
		writeFileSync('.env', '')
		execSync('npm i dotenv')
	}

	if (options.open) {
		execSync('code .')
	}

	if (options.openReuse) {
		execSync('code -r .')
	}

	const end = Date.now()
	const time = (end - start) / 1000

	console.log(`\nDone in ${time}!✨\n`)
}

function installDependencies(language: Language) {
	const deps = dependencies[language]

	execSync(`npm i ${deps.dev.join(' ')} -D`)
	execSync(`npm i ${deps.main.join(' ')}`)
}

function createPackageJson(language: Language) {
	const packageValue = packageTemplate[language]
	writeFileSync('package.json', JSON.stringify(packageValue, null, 2))
}
