'ues strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {

	co(function *() {
		//分步接收用户输入的参数
		let tplName = yield prompt('Template name: ')
		let gitUrl = yield prompt('Git https link: ')
		let branch = yield prompt('Branch: ')

		let config = null
		try{
			config = require('../templates.json')
		} catch(e) {
			config = {
				tpl: {}
			} 
		}

		if(!config.tpl[tplName]) {
			config.tpl[tplName] = {}
			config.tpl[tplName]['url'] = gitUrl.trim()
			config.tpl[tplName]['branch'] = branch.trim()
		} else{
			console.log(chalk.red('Templates has already existed!'))
			process.exit()
		}

		

		fs.writeFile(__dirname + '/../templates.json',JSON.stringify(config),'utf-8',err=>{
			if(err) console.err(err)
			console.log(chalk.green('New template added!\n'))
			console.log(chalk.grey('The last template list is: \n'))
			console.log(config)
			console.log('\n')
			process.exit()
		})

	})
}
