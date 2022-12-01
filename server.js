require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const Movie = require("./models/movies")
const moviesController = require("./controllers/movie")

/////////////////////////////////////////////
//         Database Connection             //
/////////////////////////////////////////////
// Setup inputs for our connect function
// const DATABASE_URL = process.env.DATABASE_URL;
// const CONFIG = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// Establish Connection
// mongoose.connect(DATABASE_URL, CONFIG);

// Events for when connection opens/disconnects/errors
// mongoose.connection
//   .on("open", () => console.log("Connected to Mongoose"))
//   .on("close", () => console.log("Disconnected from Mongoose"))
//   .on("error", (error) => console.log(error));

// const { Schema, model } = mongoose;

// make fruits schema
// const moviesSchema = new Schema({
//   title: { type: String, required: true },
//   releaseDate: String,
//   length: Number,
//   genre: String,
//   poster: { type: String, required: true },
//   director: { type: String, required: true },
//   rating: String,
//   watchAgain: Boolean,
//   cast: [{ type: String }],
// });

// // make fruit model
// const Movie = model("Movie", moviesSchema);

// const app = express();
// app.engine("jsx", require("express-react-views").createEngine());
// app.set("view engine", "jsx");

const app = express()




app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');

// /////////////////////////////////////////////////////
// //                Middleware                       //
// /////////////////////////////////////////////////////
app.use(morgan("tiny")); //logging
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })); // parse urlencoded request bodies
app.use(express.static("public")); // serve files from public statically

// ============ ROUTE =================

app.use("/movies", moviesController)

////////////////////////////////////////////
//              Routes                    //
////////////////////////////////////////////
// app.get("/", (req, res) => {
//   res.send("your server is running... better catch it.");
// });

// app.get("/movies/seed", (req, res) => {
//     const startMovies= [
//       {
//         title: "Matrix",
//         releaseDate: "1999",
//         length: 136,
//         genre: "Sci-fi",
//         poster: "https://www.themoviedb.org/t/p/w220_and_h330_face/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
//         director: "Lana, Lily Wasoki",
//         rating: "R",
//         watchAgain: true,
//         cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
//       },
//       {
//         title: "50 First Dates",
//         releaseDate: "2004",
//         length: 99,
//         genre: "Comedy",
//         poster: "https://m.media-amazon.com/images/M/MV5BMjAwMzc4MDgxNF5BMl5BanBnXkFtZTYwNjUwMzE3._V1_FMjpg_UX1000_.jpg",
//         director: "Peter Segal",
//         rating: "PG-13",
//         watchAgain: true,
//         cast: ["Adam Sandler", "Drew Barrymore", "Rob Schneider"]
//       },
//       {
//         title: "The Dark Knight",
//         releaseDate: "2008",
//         length: 152,
//         genre: "Action/Superhero",
//         poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
//         director: "Christopher Nolan",
//         rating: "PG-13",
//         watchAgain: true,
//         cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
//       }
//     ]
  
//     Movie.deleteMany({}).then((data) => {
//       // Seed Starter Movies
//       Movie.create(startMovies).then((data) => {
//         // send created movies as response to confirm creation
//         res.json(data);
//       });
//     });
//   })
// // ========== INDEX ================
//   app.get("/movies", async (req, res) => {
//     const movies = await Movie.find({});
//     res.render("movies/Index", { movies });
//   });

// //New
// app.get("/movies/new", (req, res) => {
//   res.render("movies/New")
// })

// //DELETE
// app.delete("/movies/:id", (req, res) => {
//   // get the id from params
//   const id = req.params.id;
//   // delete the fruit
//   Movie.findByIdAndRemove(id)
//     .then((movie) => {
//       // redirect to main page after deleting
//       res.redirect("/movies");
//     })
//     // send error as json
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// });


// //UPDATE
// app.put("/movies/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
//     req.body.cast = req.body.cast.split(",")
//     await Movie.findByIdAndUpdate(id, req.body)
//     res.redirect(`/movies/${id}`)
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }
// })

// // CREATE
// app.post("/movies", async (req, res) => {
//   try {
//     req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
//     req.body.cast = req.body.cast.split(",")
//     console.log(req.body)
//     const createdMovie = await Movie.create(req.body)
//     res.redirect("/movies")
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }
// })



// //Edit 
// app.get("/movies/:id/edit", (req, res) => {
//   // get the id from params
//   const id = req.params.id;
//   // get the fruit from the database
//   Movie.findById(id)
//     .then((movie) => {
//       // render Edit page and send fruit data
//       res.render("movies/Edit.jsx", { movie });
//     })
//     // send error as json
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// });



// // ============= Show Route =============
// app.get("/movies/:id", async (req, res) => {
//   const id = req.params.id

//   try {
//     const movie = await Movie.findById(id)
//     res.render("movies/Show", { movie })
//   } catch (error){
//     console.log(error);
//     res.json({ error });
//   }
// })

//////////////////////////////////////////////
//           Server Listener                //
//////////////////////////////////////////////
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
