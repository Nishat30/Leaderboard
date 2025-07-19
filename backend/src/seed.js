require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const usersToSeed = [
    { name: 'Raj', totalPoints: 490, avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { name: 'Ram', totalPoints: 9000, avatar: 'https://randomuser.me/api/portraits/men/13.jpg' },
    { name: 'Rohan', totalPoints: 3004, avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { name: 'Koyal', totalPoints: 798, avatar: 'https://randomuser.me/api/portraits/women/19.jpg' },
    { name: 'Suhaib', totalPoints: 402, avatar: 'https://randomuser.me/api/portraits/men/17.jpg' },
    { name: 'Zoya', totalPoints: 850, avatar: 'https://randomuser.me/api/portraits/women/19.jpg' },
    { name: 'Minhaj', totalPoints: 1392, avatar: 'https://randomuser.me/api/portraits/men/14.jpg' },
    { name: 'Asad', totalPoints: 8192, avatar: 'https://randomuser.me/api/portraits/men/15.jpg' },
    { name: 'Rajesh', totalPoints: 9132, avatar: 'https://randomuser.me/api/portraits/men/16.jpg' },
    { name: 'Omkar', totalPoints: 1110, avatar: 'https://randomuser.me/api/portraits/men/17.jpg' }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected for seeding.');

        for (const userData of usersToSeed) {
            const existingUser = await User.findOne({ name: new RegExp(`^${userData.name.trim()}$`, 'i') });
            if (!existingUser) {
                await User.create(userData);
                console.log(`User '${userData.name}' added with avatar.`);
            } else {
                if (existingUser.avatar !== userData.avatar) {
                    await User.updateOne({ _id: existingUser._id }, { $set: { avatar: userData.avatar } });
                    console.log(`User '${userData.name}' already exists. Avatar updated.`);
                } else {
                    console.log(`User '${userData.name}' already exists with the same avatar. Skipping.`);
                }
            }
        }

        console.log('Database seeding complete.');
        process.exit(0);
    } catch (err) {
        console.error('Database seeding failed:', err);
        process.exit(1);
    }
};

seedDB();
