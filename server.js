const express = require('express');
const app = express();

const defaultData = {
    id: 1,
    name: 'Rogelio Camacho',
    goal: 'Improve health',
    age: 20,
    height: 178,
    height_unit: 'cm',
    weight: 64,
    weight_unit: 'kg',
    sex: 'male',
    activity_level: 'very light',
    weekly_workout: 'very light',
    dietary_preferences: "anything"
}

function getMacros(onboardingData) {

    // Aqui se procesaría los datos para calcular los macros...

    // Se regresa un objeto con los macros
    return {
        fats: 20,
        protein: 30,
        carbs: 50,
    }
}

app.post('/macros', (req, res) =>  {
    let onboardingData = req.body;

    if (!onboardingData) {
        onboardingData = defaultData;
    }

    const data = getMacros(onboardingData); // Función para calcular los macros
    res.send(data);
});

app.post('/onboarding', async (req, res) => {
    let data = req.body;

    if (!data) {
        data = defaultData;
    }

    const id = data.id;

    // get user
    // const getUser = fetch(`https://app.alimenta.app/api/users/${id}`);
    // const resp = await getUser().json();
    
    let user = {
        id: id,
        name: data.name,
        email: 'email@example.com',
        onboardedAt: null,
        // otra info del usuario
    }

    // set onboarding complete on user
    user.onboardedAt = Date.now();

    // save user on db
    // fetch(`https://app.alimenta.app/api/users/${id}`, user);
    
    // create user profile
    let profile = {
        userId: id,
        ...data,
    }
    
    // save profile on DB
    // fetch(url, profile);
    
    // if user and profile saved succesfully on DB
    res.status(201).send(profile); // 201 --> created
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));