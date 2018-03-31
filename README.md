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

### For merging:
* In develop branch: git merge master
* One way:
    * git checkout master
    * git merge --no-ff development  (maybe no need to do this
    * git push
* The other way:
    * git checkout development
    * git push origin development:master
