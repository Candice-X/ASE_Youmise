ASE Project
Team: Cat named doggie

## Setup

Before you can run the sample, you need to do the following:


1.  Install dependencies:

    With `npm`:

        npm install

    or with `yarn`:

        yarn install

## Running locally

With `npm`:

    npm start

or with `yarn`:

    yarn start

### For passing process.env variables:
* If using fish, then: env USERID= USERNAME= node app.js
* If using bash, remove "env"


## Some HELPFUL git commands:

### For merging:
* In develop branch: git merge master
* One way:
    * git checkout master
    * git merge --no-ff development  (maybe no need to do this
    * git push
* The other way:
    * git checkout development
    * git push origin development:master

### Cleaning current working directory:
* When you are working on file A, and want to implement some changes on file B and you do not want to stage changes in file A, then:
    * git stash (will help you cleaning the working directory)
    * make changes on file B
    * stage changes and push
    * git stash apply (this will recover changes in file A and now you can continuelly work on file A)

### Cleaning working directory for unstaged changes:
* git checkout -- .
