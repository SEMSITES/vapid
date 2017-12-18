#!/usr/bin/env node

const path = require('path')
const program = require('commander')

const pjson = require('../package.json')
const Server = require('../lib/server')
const Site = require('../lib/site')
const Logger = require('../lib/logger')

// NEW
program
  .command('new <target>')
  .description('create a new project')
  .action((target) => {
    let site = new Site(target)

    try {
      site.localInitialize()
      Logger.info(`Project created.`)
      Logger.extra([
        'To start the development server now, run:',
        `  ${pjson.name} server ${target}`
      ])
    } catch (err) {
      Logger.error(err.message)
    }
  })

// SERVER
program
  .command('server')
  .description('start the development server')
  .action((target) => {
    try {
      let site = new Site(target)
      let server = new Server(site)
      
      Logger.info(`Starting the development server...`)
      server.start()
      Logger.extra([
        `View your site at http://localhost:${server.port}`,
        'Ctrl + C to quit'
      ]);
    } catch (err) {
      Logger.error(err.message)
    }
  })

// DEPLOY
program
  .command('deploy')
  .description('deploy to Vapid\'s hosting service')
  .action((target) => {
    Logger.info(`DEPLOY`)
  })

// VERSION
program
  .command('version')
  .description('shows the version number')
  .action((target) => {
    Logger.extra(`Vapid ${program.version()}`)
  })

// CATCH-ALL
program
  .command('*', { noHelp: true })
  .action(() => {
    Logger.error(`Command "${process.argv[2]}" not found.`)
    program.help()
  })

if (process.argv.slice(2).length) {
  program
    .version(pjson.version)
    .parse(process.argv)
} else {
  program.help()
}