"use strict";

var generators = require('yeoman-generator'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    yosay = require('yosay'),
    chalk = require('chalk');

//Config variables
var appPathName = 'public_html',
    toolPathName = 'web_tools',
    bowerName = 'bower_components'; // inside web_tools

module.exports = generators.Base.extend({

    //Custom function
    _createProjectFileSystem: function () {
        var sourceApp = this.templatePath(appPathName), // returns './templates/public_html'
            sourceTool = this.templatePath(toolPathName), // returns './templates/web_tools'

            destApp = this.destinationPath(appPathName), // returns '~/public_html'
            destTool = this.destinationPath(toolPathName), // returns '~/web_tools'

            templateContext = {
                appName: this.appName,
                appDescription: this.appDescription,
                appVersion: this.appVersion,
                appLicense: this.appLicense,
                appAuthor: this.appAuthor,
                appEmail: this.appEmail,
                config: {
                    app: appPathName,
                    dist: appPathName + '/dist',
                    thirdParty: appPathName + '/third_party',
                    bowerComponents: bowerName,
                    bootstrapPath: '../../' + toolPathName + '/' + bowerName + '/bootstrap-sass/assets/stylesheets'
                }
            };

        // Creating folder structures.
        //public_html/
        //├── css/
        //├── dist/
        //├── fonts/
        //├── images/
        //├── images_temp/
        //├── js/
        //├── scss/
        //├── third_party/
        //└── index.html
        //└── robots.txt
        mkdirp(destApp);
        mkdirp(destApp + '/css');
        mkdirp(destApp + '/dist');
        mkdirp(destApp + '/fonts');
        mkdirp(destApp + '/images');
        mkdirp(destApp + '/images_temp');
        mkdirp(destApp + '/js');
        mkdirp(destApp + '/scss');
        mkdirp(destApp + '/third_party');

        //web_tools/
        //├── .bowerrc
        //├── .gitignore
        //├── bower.json
        //├── CONTRIBUTING.md
        //├── Gruntfile.js
        //├── package.json
        //└── README.md
        mkdirp(destTool);

        // Creating files public_html
        // copy favicons
        this.fs.copy(sourceApp + '/images/favicons', destApp + '/images/favicons');
        this.fs.copyTpl(sourceApp + '/images/favicons_json', destApp + '/images/favicons', templateContext);
        // copy js
        this.fs.copyTpl(sourceApp + '/js', destApp + '/js', templateContext);
        // copy scss
        this.fs.copyTpl(sourceApp + '/scss', destApp + '/scss', templateContext);
        // copy index
        this.fs.copyTpl(sourceApp + '/index.html', destApp + '/index.html', templateContext);
        // copy robots
        this.fs.copy(sourceApp + '/robots.txt', destApp + '/robots.txt', templateContext);


        // Creating files web_tools
        this.fs.copyTpl(sourceTool, destTool, templateContext);
        this.fs.copyTpl(sourceTool+ '/.bowerrc', destTool+ '/.bowerrc', templateContext);
        this.fs.copyTpl(sourceTool+ '/.gitignore', destTool+ '/.gitignore', templateContext);
    },

    _getPrompts: function () {
        var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project?',
                //Defaults to the project's folder name if the input is skipped
                default: this.appName
            },
            {
                type: 'input',
                name: 'description',
                message: 'What is a description of your project?'
            },
            {
                type: 'input',
                name: 'version',
                message: 'What is the version of your project?',
                default: '1.0.0'
            },
            {
                type: 'input',
                name: 'license',
                message: 'How is your project licensed?',
                default: 'MIT'
            },
            {
                type: 'input',
                name: 'author',
                message: 'What is your name?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email address?'
            }
        ];
        return prompts;
    },
    _saveAnswers: function (answers, callback) {
        this.appName = answers.name;
        this.appDescription = answers.description;
        this.appVersion = answers.version;
        this.appLicense = answers.license;
        this.appAuthor = answers.author;
        this.appEmail = answers.email;
        callback();
    },

    //Configurations will be loaded here.
    initializing: function () {
        var message = chalk.yellow.bold('Welcome to IMVN\n') + chalk.yellow('Develop by ') + chalk.green.bold('Nghia Tran ');
        console.log(yosay(message));
    },
    configuring: function () {
        this.config.save();
    },
    //Ask for user input
    prompting: function () {
        var done = this.async();

        this.prompt(this._getPrompts(), function (answers) {
            this._saveAnswers(answers, done);
        }.bind(this));
    },
    //Writing Logic here

    writing: function () {
        this._createProjectFileSystem();
    },
    install: function () {
        // Change working directory to 'web_tools' for dependency install
        var npmdir = process.cwd() + '/' + toolPathName;
        process.chdir(npmdir);
        // end

        this.npmInstall();
        this.bowerInstall();
    },
    end: function () {
        this.spawnCommand('grunt', ['setup']);
    }
});