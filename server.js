const express = require('express');
const app = express();
app.use(express.json());

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

function validateBasicTypes(data) {
    if (data.age && typeof data.age !== "number") return false;
    if (data.height && typeof data.height !== "number") return false;
    if (data.weight && typeof data.weight !== "number") return false;
    return true;
}

function validateReasonableLimits(data) {
    if (data.age > 150 || data.height > 250 || data.weight > 300) {
        return false;
    }
    return true;
}

function getMacros(onboardingData) {
    return { fats: 20, protein: 30, carbs: 50 }
}

app.post('/macros', (req, res) =>  {
    let onboardingData = req.body;

    if (!onboardingData || Object.keys(onboardingData).length === 0) {
        onboardingData = defaultData;
    }

    if (!validateBasicTypes(onboardingData)) {
        return res.status(400).send({
            error: "Invalid data types provided."
        });
    }

    if (!validateReasonableLimits(onboardingData)) {
        console.warn("Warning: unreasonable data provided");
    }

    const data = getMacros(onboardingData);
    res.send(data);
});

app.post('/onboarding', (req, res) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).send({
            error: "Body is required to create profile."
        });
    }

    if (!data.id) {
        return res.status(400).send({
            error: "User id is required."
        });
    }

    if (typeof data.id !== "number") {
        return res.status(400).send({
            error: "Invalid id type. Must be a number."
        });
    }

    const user = {
        id: data.id,
        name: data.name,
        email: 'email@example.com',
        onboardedAt: Date.now()
    }

    const profile = {
        userId: data.id,
        ...data
    }

    res.status(201).send(profile);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
