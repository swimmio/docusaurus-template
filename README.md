# Exporting Swimm Documentation To Docusaurus

Welcome! This repository contains all of the files that you'll need in order to export your Swimm documentation to [Docusaurus](https://docusaurus.io/), which makes it easy for anyone to read and search your documentation using just a web browser.

[Here's a really cool example](https://relaxed-franklin-0b4004.netlify.app/) pulled from Swimm documentation for the game AncientBeast.

We're breaking this tutorial down into three parts:

 1. Exporting your Swimm docs to Markdown using the command line,
 2. Building the Docusaurus version of your documentation
 3. Publishing the documentation usin Netlify

This should take you approximately five minutes, from start to finish. In order to accomplish everything, you're going to need:

 - Swimm version 0.4.5 or higher
 - Node / NPM
 - A Netlify account, or somewhere to host the documentation (optional)

 ## First - Export Your Docs To Markdown

 Since 0.4.4, Swimm has [added support for exporting Docs to markdown](https://swimm.io/blog/release-notes-dive-into-0-4-4/). In 0.4.5, we've also added support for exporting to Docusaurus format, in addition to Boogi:

 ```
 $~ swimm help export
Usage: swimm export [options] [swimm_id]

Save Swimm files as MDs

Options:
  -a, --all         Save all Swimm files in the repository as MDs files
  -b, --boogi       Add boogi metadata to saved MD files
  -d, --docusaurus  export the MD files in a Docusaurus format
  -h, --help        display help for command
  ```

Here, our focus is on Docusaurus, so we'll focus on that, but we encourage you to play around with other formats (and to just poke around the files in `.swm/swm_md` in general, there's lots of stuff you can do around publishing them). So, let's jump in!

Follow the instructions in the linked blog post to enable markdown export in the Swimm app itself (the toggle lives in the "integrations" tab you can find when viewing any workspace or repo). Everything else we're doing is shell-based. While you're there, make sure you're up-to-date.

Go to the repo where you intend to publish, and:

```
~/myrepo % swimm export -a -d
```

This will export your markdown, file by file (one per unit you have). The resulting files will be saved in `~/myrepo/.swm/swm_md/` with `.md` extensions. 

## Second - Clone this repository & Import Your Docs

Yes, this one, which you're currently reading. You need some stuff in here that we've put together to make everything work (stuff like styling, assets, etc - everything we need to make everything work). 

You can clone this repository as a submodule in the repo that you want to export, or do something out of tree entirely - you do you. You'll probably also think of ways that a few scripts and symlinks can completely automate all of this - we encourage you to do that, less friction in documentation is always better. This tutorial gives you all the structure you need; make it your own. 

Once cloned, we'll copy our exported markdown into our documents folder so we can begin importing, and then install some dependencies:

```
~ % git clone https://github.com/swimmio/docusaurus-template
~ % cd docusaurus-template
~/docusaurus-template % cp ~/myrepo/.swm/swm_md/* docs/
~/docusaurus-template % npm install
```

Now, we need to bring in everything needed to build the docs, and then launch an instance of it that we can interact with through our browser locally:

```
~/docusaurus-template % npm run start
```

If you see a prompt alerting you that your terminal is trying to open your browser, please allow it. If not, you can go to `http://localhost:3000` and you should see your documentation! 

## Third - Automate Things A Bit (Netlify example)

As we said previously, Netlify is just an example of how you could incorporate this into your build. Docusaurus [lists a bunch of other ways that you can use it](https://docusaurus.io/docs/deployment). If you're a fan of using [pre-commit](https://pre-commit.com), you can [run a doc build on pre-commit along with coverage checks](https://github.com/swimmio/pre-commit) as well. 

Let's commit _this_ repo, because we'll need to stage it somewhere. For demonstration sake, I'm going to assume you can push the contents somewhere where the world can find them:

```
~/docusaurus-template % git commit -a -m "Documentation build" && git push
```

Now, [create a website on Netlify](https://app.netlify.com/start) and point it to the repository you just created, using the following settings:

```
build command: npm run build
build directory: build
```

After your Netlify website is up, any changes in the docusaurus-template repository will trigger a website build.

## Fourth - Add Docusaurus To Your CI/CD Flow

If you're doing all of your integration tests pre-commit and you're all set on where Docusaurus is going to live, then you don't really need to go any further. You've done the thing and you should feel great about it. We encourage you to keep reading anyway, but you're all set.

Let's imagine this as a little shell script:

```
#/bin/sh

set -e

REPO="~/myrepo"
DOCROOT="~/docusaurus-template/docs"

# build the docs
cd $REPO
swimm export -a -d || exit $?

# clean up from previous run
rm -rf "${DOCROOT}/*"

# copy the docs over
cp "${REPO}/.swm/swm_md/* ${DOCROOT}/

# push the changes
cd $DOCROOT
git add -A
git commit -m "Update Swimm Documentation"
git push
```

How you want to wire that up to meet your own security and accessibility goals is entirely up to you. As long as a script can manage to get itself access to the code repo, and access to the incoming Docusaurus document root, it's completely automateable.

How did this work out for you? Please drop us a line and let us know, or open an issue if something isn't working right for you. Thanks for being a Swimm user!
