# Branchsters Web

The [Branch Web SDK](https://github.com/BranchMetrics/Web-SDK) is a simple and powerful tool to empower your Web App with Branch deep link generation, tracking, attritubtion, referrals, and rewards. The entire SDK is only ~7K gzipped of vanilla JS, and requires no outside dependencies. The SDK has thourough documentation in the README, however, we know many engineers like to learn best by example. So we've made a simple single page web app and accompanying tutorial, as a simple example of the major features of the [Branch Web SDK](https://github.com/BranchMetrics/Web-SDK).

This example is written with [AngularJS](https://angularjs.org/) and [Bootstrap](http://getbootstrap.com/), and the project was started and managed with [Yeoman](http://yeoman.io/). Aren't familiar with AngularJS? That's OK, we just assume you have some JavaScript knowledge. We also have examples with other frameworks, like [React](http://facebook.github.io/react/), on the way. If you're not familiar with Yeoman, that's also OK - it's essentially a three prong bundle which includes: generators for starting projects (over 1000 available now), [Bower](http://bower.io/) for installing and managing dependencies (Including the Branch Web SDK!), and [Grunt](http://gruntjs.com/) for build and development tasks, live reload, etc.

If you're only interested in seeing the example Branch Web SDK integration with Branchsters, skip to step 4.

#### Tools and frameworks used in this tutorial
- [Sublime Text](http://www.sublimetext.com/)
- [Node](http://nodejs.org/)
- [npm (Node package manager)](https://www.npmjs.com/)
- [Yeoman](http://yeoman.io/)
- [Bower](http://bower.io/)
- [Grunt](http://gruntjs.com/)
- [AngularJS](https://angularjs.org/)
- [Bootstrap](http://getbootstrap.com/)
- [git](http://git-scm.com/)

##### **Note: If you are unfamiliar with any tools in this list, background information is given on these topics in a box. Otherwise, feel free to skip that information to get to the meat.**

### Getting Started

First of all, we'll assume you have all of the tools and frameworks listed above installed. If you need help with any of them, Yeoman has a great summary of setting up a dev environment with what we'll be using [here](http://yeoman.io/codelab/setup.html).

If you'd like to follow along with the codebase, starting with step 3 (nothing much exists in the codebase before that), each commit is tagged with "STEP #".

##### 1. Install the Yeoman [AngularJS generator](https://www.npmjs.org/package/generator-angular)
Open your favorite Bash terminal, and enter the following command:
```
$ npm install --global generator-angular
```
*Note: --global installs this generator globally, you may need sudo for the proper permissions. Or feel free to install it locally to your project by omitting the option*

##### 2. Create a project folder and run the generator
```
$ mkdir Branchster-Web && cd Branchster-Web
```
Pick your directory name carefully, as the AngularJS generator will use this as the namespace for your app! For example, this directory name will produce: ```angular.module('Branchster-Web', [])```

Now that you're in the project directory, let's run the AngularJS generator!
```
$ yo angular
```

Yeoman (yo), will now ask us a series of questions as so:
![Yeoman prompt with question about SASS](tutorial-imgs/tut-1.png)

For Branchsters, we'll answer the questions as so:
```
Would you like to use Sass (with Compass)? No
Would you like to include Bootstrap? Yes
❯◉ angular-animate.js
 ◉ angular-cookies.js
 ◉ angular-resource.js
 ◉ angular-route.js
 ◯ angular-sanitize.js
 ◉ angular-touch.js
```
*Tip: Select and deselect options in the Angular library list with the up and down arrow keys and the spacebar.*

And now a bunch of magic will happen (this is where you see the real value of Yeoman). Yeoman will automatically setup a directory scaffolding, and install the proper npm and bower packages! This is a great point to go grab a cub of coffee, as it will take a few minutes to install everything.

##### Live Reload
Now that Yeoman has setup the scaffolding for a basic Angular app, and setup some basic grunt tasks, run the following command:
```
$ grunt serve
```

Grunt will serve a live version of your app on port 9000, that automatically refreshses anytime files are changed! Try changing some files to see this working, as it will ome in very useful when we are styling Branhsters.

##### 3. Modify the Boilerplate generated Angular Boilerplate

First, let's some modifications to the boilerplate Yeoman Angular template.

**The changes by file and line number**

##### app/index.html
- 5: *add* ```<title>Branchsters Web</title>```
- 26...30: *remove* ```<ul class="nav nav-pills pull-right">...</ul>```
- 31: *change to* ```<h3 class="text-muted">Brancshters Monster Factory</h3>```
- 37: *change to* ```<p><span class="glyphicon glyphicon-heart"></span> from the <a href="http://branch.io">Branch Metrics team</a></p>```
- 75: *remove* ```<script src="scripts/controllers/about.js"></script>```

##### app/views/main.html
- 2...22: *remove all, leaving just* ```html <div class="jumbotron"></div>```

##### app/scripts/app.js
- 25...28: *remove all*

##### app/scripts/controllers/main.js
- 12...16: *remove all* ```$scope.awesomeThings...];```

There are also some files we can delete:
```
$ rm app/views/about.html app/favicon.ico app/images/yeoman.png app/scripts/controllers/about.js
```


We'll be using some icons from [Font Awesome](http://fontawesome.io/), which can easily be installed with Bower:

```
$ bower install --save fontawesome
```

##### 4. Build the Branchster interface

First, let's write the JavaScript that will let the user build their Branchster. Insert the following code starting at line 11, just after `.controller('MainCtrl', function ($scope) {`

app/scripts/controllers/main.js
```
  	// available branchster colors
    $scope.colors = [ '#24A4DD', '#EC6279', '#29B471', '#F69938', '#84268B', '#24CADA', '#FED521', '#9E1623' ];

    // loops through indices for the body and face, between 0 and max
    $scope.loopIncrement = function(amount, index, max) {
    	amount = (index === 0 && amount === -1) ? max : amount;
		amount = (index === max && amount === 1) ? -1 * max : amount;
		return amount;
    };

    // selected branchster on load
    $scope.selectedFaceIndex = 0;
    $scope.selectedBodyIndex = 0;
    $scope.selectedColorIndex = 0;

    $scope.switchColor = function(color) {
    	$scope.selectedColorIndex = color;
    };

    $scope.incrementFace = function(amount) {
    	$scope.selectedFaceIndex += $scope.loopIncrement(amount, $scope.selectedFaceIndex, 3);
    };

    $scope.incrementBody = function(amount) {
    	$scope.selectedBodyIndex += $scope.loopIncrement(amount, $scope.selectedBodyIndex, 3);
    };
```

##### Explanation
This code is fairly straightforward. Essentially, there are 3 indices that control what the Branchster looks like, selectedFaceIndex, selectedBodyIndex, and selectedColorIndex. These three indicies are incremented and decremented by the methods `switchColor`, `incrementFace`, and `incrementBody`. The method `switchColor` accepts one argument, which is the index of the desired color in the `colors` array. This is set by clicking one of the color buttons, as seen in the HTML below. The methods `incrementFace` and `incrementBody` accepts one argument: an increment amount (either a 1, or a -1). This value is passed into `loopIncrement`, which loops through the available bodies and faces, i.e. if the current value of `selectedFaceIndex` is 3 (the maximum - last available face) and an increment amount of +1 is recieved, it will return 0, looping back to the beginning of available faces.

##### HTML for interface

app/views/main.html
```
<form>
	<div class="form-group">
		<label for="name" class="branchsters-heading">Choose your Monster's name</label>
		<input type="text" class="form-control" id="name" name="name" placeholder="John">
	<div class="form-group">
		<label for="body" class="branchsters-heading">Choose face and body</label>
		<div class="jumbotron branchsters-body-container branchsters-square" name="body">
			<!-- monster components -->
			<img class="branchsters-bodypart" id="branchsters-face" ng-src="images/monsters/faces/{{selectedFaceIndex}}face.png"></img>
			<img class="branchsters-bodypart" id="branchsters-body" ng-src="images/monsters/bodies/{{selectedBodyIndex}}body.png"></img>
			<img class="branchsters-bodypart branchsters-bodycolor" ng-style="{'background-color': colors[selectedColorIndex]}"></img>
			<!-- arrows -->
			<i class="fa fa-chevron-left fa-2x branchsters-arrow branchsters-left-arrow" ng-click="incrementFace(-1)"></i>
			<i class="fa fa-chevron-right fa-2x branchsters-arrow branchsters-right-arrow" ng-click="incrementFace(1)"></i>
			<i class="fa fa-chevron-up fa-2x branchsters-arrow branchsters-up-arrow" ng-click="incrementBody(-1)"></i>
			<i class="fa fa-chevron-down fa-2x branchsters-arrow branchsters-down-arrow" ng-click="incrementBody(1)"></i>
		</div>
	</div>
	<div class="form-group">
		<label for="color" class="branchsters-heading">Pick a color</label>
		<div class="jumbotron branchsters-square" name="color">
			<div class="btn-group btn-group-lg" role="group" ng-repeat="color in colors">
				<button type="button" class="btn btn-default" ng-model="color" ng-click="switchColor($index)" ng-style="{'background-color': color}"></button>
			</div>
		</div>
	</div>
	<div class="form-group branchsters-heading">
		<button type="button" class="btn btn-default btn-lg btn-success" id="branchsters-create-button">CREATE YOUR MONSTER</button>
	</div>
</form>
```

### Styles for interface

app/styles/main.css
```

/* Branchsters classes */
input[type="text"] {
	color: #555;
	text-align: center;
	margin-top: 10px;
	padding: 0px 30px;
	font-size: 25px;
	color: #333;
	font-family: 'Roboto', Arial;
	font-weight: 100;
	width: 100%;
	border: 1px solid #ccc;
	border-radius: 20px;
	background: #FFF;
	height: 40px;
	box-sizing: border-box;
}

.header {
	margin-bottom: 0 !important;
}

h3 {
	font-size: 40px;
	font-weight: 500 !important;
	color: #c6d6ec !important;
}

.branchsters-heading {
	font-family: 'Roboto', Arial;
	font-size: 28px;
	color: #000;
	font-weight: 100;
	text-align: center;
	width: 100%;
	padding-top: 30px;
}

.branchsters-body-container {
	  position: relative;
	  height: 400px;
}

.branchsters-bodypart {
	width: 200px;
	height: 300px;
	position: absolute;
	margin-left: -100px;
}

.branchsters-square {
	border: 1px solid #CCC;
	border-bottom: 1px solid #CCC !important;
	border-style: solid;
	background-color: #fff;
	border-radius: 20px !important;
}

#branchsters-face {
	z-index: 3;
}

#branchsters-body {
	z-index: 2;
}

.branchsters-bodycolor {
	z-index: 1;
}

.branchsters-arrow {
	cursor: pointer !important;
}

.branchsters-left-arrow {
	position: absolute;
	top: 190px;
	left: 40px;
}

.branchsters-right-arrow {
	position: absolute;
	top: 190px;
	right: 40px;
}

.branchsters-up-arrow {
	position: absolute;
	top: 10px;
}

.branchsters-down-arrow {
	position: absolute;
	bottom: 10px;
}

#branchsters-create-button {
	top: -20px;
	position: relative;
	font-weight: 100;
	background: #00D0F3;
	border-color: #00A7C3;
	text-transform: uppercase;
	border-radius: 8px;
	font-family: 'Roboto', Arial;
	color: #FFF;
	text-decoration: none;
	font-size: 25px;
}
```

##### 4. Integrate the Branch Web SDK
