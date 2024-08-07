const express = require('express');
const cars = require('./cars.js');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(express.json());


app.get('/api/cars', async (req, res) => {
    try {
        res.json(cars);
    } catch (error) {
        res.status(500).send('Error fetching car data.');
    }
});

// Endpoint to create a new car
app.post('/api/cars', async (req, res) => {
    // In a real-world scenario, you would save this to a database.
    const newCar = req.body;
    res.status(201).json(newCar); // Echo the created car back as response
});

// Endpoint to update a car
app.put('/api/cars/:id', async (req, res) => {
    const carId = req.params.id;
    const updatedCar = req.body;
    // In a real-world scenario, you would update this in the database.
    res.json({ id: carId, ...updatedCar });
});

app.delete('/api/cars/:id', async (req, res) => {
 
})

app.listen(PORT,()=>{
    console.log(`app runing at ${PORT}`);
    
})