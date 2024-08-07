function carApp() {
    return {
        cars: [],
        newCar: { color: 'Pink', make: 'Ford', model: 'Fiesta', reg_number: ' CL 87543', location: 'Stellenbosch' },
        editingCar: null,
        leastPopularModel: null,
        showPopUp: false,
        townCodes: {
            'Paarl': 'CJ',
            'Bellville': 'CY',
            'Stellenbosch': 'CL',
            'Malmesbury': 'CK',
            'Cape Town': 'CA',
            'Kuilsriver': 'CF'
        },

        // Fetch all cars
        fetchCars() {
            axios.get('http://localhost:3000/api/cars')
                .then(response => {
                    this.cars = response.data;
                    console.log(response.data.length);
                    
                    if (this.cars.length > 0) {
                        this.showPopUp = true;
                    } else {
                        this.showPopUp = false;
                    }
                })
                .catch(error => {
                    console.error('Error fetching cars:', error);
                });
        },

        // Add a new car
        addCar() {
            if (!this.newCar.location || !Object.values(this.townCodes).includes(this.newCar.location)) {
                alert('Invalid location code.');
                return;
            }

            axios.post('http://localhost:3000/api/cars', this.newCar)
                .then(response => {
                    this.cars.push(response.data);
                    this.newCar = { color: '', make: '', model: '', reg_number: '', location: '' };
                    this.showPopUp = true; // Ensure pop-up is shown when a new car is added
                })
                .catch(error => {
                    console.error('Error adding car:', error);
                });
        },

        // Edit a car
        editCar(car) {
            this.editingCar = { ...car };
        },

        // Update a car
        updateCar() {
            axios.put(`http://localhost:3000/api/cars/${this.editingCar.id}`, this.editingCar)
                .then(response => {
                    const index = this.cars.findIndex(car => car.id === this.editingCar.id);
                    this.cars.splice(index, 1, response.data);
                    this.editingCar = null;
                })
                .catch(error => {
                    console.error('Error updating car:', error);
                });
        },

        // Cancel editing
        cancelEdit() {
            this.editingCar = null;
        },

        // Delete a car
        deleteCar(id) {
            axios.delete(`http://localhost:3000/api/cars/${id}`)
                .then(() => {
                    this.cars = this.cars.filter(car => car.id !== id);
                    if (this.cars.length === 0) {
                        this.showPopUp = false; // Hide pop-up if no cars are left
                    }
                })
                .catch(error => {
                    console.error('Error deleting car:', error);
                });
        },

        // Get least popular car model in Kuilsriver
        getLeastPopularCarModel() {
            axios.get('http://localhost:3000/api/leastPopularCarModel')
                .then(response => {
                    this.leastPopularModel = response.data;
                })
                .catch(error => {
                    console.error('Error fetching least popular car model:', error);
                });
        },

        // Initialize app
        init() {
            this.fetchCars();
        }
    };
}
