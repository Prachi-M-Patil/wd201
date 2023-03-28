const http = require('http')
const fs = require('fs')
const args = require('minimist')(process.argv.slice(1), {
  alias: {
    p: 'port'
  },
  default: {
    port: 3000
  }
})

let homeContent = ''
let projectContent = ''
let register = ''

fs.readFile('home.html', (err, home) => {
  if (err) {
    throw err
  }
  homeContent = home
})

fs.readFile('project.html', (err, project) => {
  if (err) {
    throw err
  }
  projectContent = project
})

fs.readFile('registration.html', (err, data) => {
  if (err) throw err
  register = data
})

http
  .createServer((request, response) => {
    const url = request.url
    response.writeHeader(200, { 'Content-Type': 'text/html' })
    switch (url) {
      case '/project':
        response.write(projectContent)
        response.end()
        break
      case '/registration':
        response.write(register)
        response.end()
        break
      default:
        response.write(homeContent)
        response.end()
        break
    }
  })
  .listen(args.port)
