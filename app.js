const express = require("express");
const app = express();
const PORT = 5000;


app.use(express.json());

let restaurants = [
    {
        id: 1,
        name: "Spice Garden",
        cuisine: "Indian",
        location: "Lucknow",
        rating: 4.5
    },
    {
        id: 2,
        name: "Urban Bites",
        cuisine: "Fast Food",
        location: "Lucknow",
        rating: 4.2
    }
];

app.get("/", (req, res) => {
    res.json({
        message: "FoodieHub Backend API is running"
    });
});


app.get("/restaurants", (req, res) => {
    res.status(200).json({
        success: true,
        count: restaurants.length,
        data: restaurants
    });
});


app.get("/restaurants/:id", (req, res) => {

    const id = Number(req.params.id);

    const restaurant = restaurants.find(
        item => item.id === id
    );

    if (!restaurant) {
        return res.status(404).json({
            success: false,
            message: "Restaurant not found"
        });
    }

    res.status(200).json({
        success: true,
        data: restaurant
    });
});


app.post("/restaurants", (req, res) => {

    const { name, cuisine, location, rating } = req.body;


    if (!name || !cuisine || !location || rating === undefined) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    if (rating < 0 || rating > 5) {
        return res.status(400).json({
            success: false,
            message: "Rating must be between 0 and 5"
        });
    }

    const newRestaurant = {
        id: restaurants.length + 1,
        name,
        cuisine,
        location,
        rating
    };

    restaurants.push(newRestaurant);

    res.status(201).json({
        success: true,
        message: "Restaurant added successfully",
        data: newRestaurant
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});