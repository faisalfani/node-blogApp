//jshint esversion:6
//created by faisal al isfahani

//defining the lib
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

//content each menu
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//instance the express sever
const app = express();
//just an global variable post array handle that soon gonna push by some value
const posts= []
//setting the view engine ejs
app.set('view engine', 'ejs');
//use the middleware body parser for parse the form body request
app.use(bodyParser.urlencoded({extended: true}));
//defining static express folder is on public folder
app.use(express.static("public"));

// the / route that will render the home view
app.get("/",(req,res)=>{
  res.render("home",{
    title:"Home", 
    content:homeStartingContent,
    posts:posts
  })
})
// another route using the express routing params combining with button href on header.ejs
app.get("/:content",(req,res)=>{
  let content = req.params.content
  if (content === "about"){
    var bodyContent = aboutContent
    
  }else {
    var bodyContent = contactContent
  }
  res.render(content,{
    title:content,
    content: bodyContent
  })

})

// route that handle the post request on /compose route
app.post("/compose",(req,res)=>{
  let title = req.body.postTitle
  let body = req.body.postBody
  var post ={
    title: title,
    body: body
  }
  posts.push(post)
  res.redirect("/")
})

//express routing parameters example (for return the detail views of our blog)
app.get("/posts/:postName",(req,res)=>{
  let request = req.params.postName
  let postName = _.lowerCase(request)
  posts.forEach((post)=>{
    let title = post.title
    if (postName === title) {
      res.render("post",{
        title: title,
        body:post.body
      })
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
