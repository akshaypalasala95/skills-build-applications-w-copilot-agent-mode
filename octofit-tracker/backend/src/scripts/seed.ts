import { connectDatabase } from '../config/database.js';
import { Activity, Team, User, Workout } from '../models/index.js';
import mongoose from 'mongoose';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}), Workout.deleteMany({})]);

    const users = await User.create([
      { username: 'alex', displayName: 'Alex Morgan', email: 'alex@example.com', fitnessLevel: 'beginner' },
      { username: 'sam', displayName: 'Sam Rivera', email: 'sam@example.com', fitnessLevel: 'intermediate' },
    ]);
    const team = await Team.create({ name: 'Peak Performers', description: 'Small steps, strong habits.' });
    const userIds = users.map((user: { _id: mongoose.Types.ObjectId }) => user._id);
    await Team.findByIdAndUpdate(team._id, { members: userIds });
    await User.updateMany({ _id: { $in: userIds } }, { team: team._id });
    await Activity.create([
      { user: users[0]._id, type: 'walking', durationMinutes: 30, distanceKilometers: 2.5, points: 25 },
      { user: users[1]._id, type: 'running', durationMinutes: 25, distanceKilometers: 4, points: 45 },
    ]);
    await Workout.create([
      { title: 'Foundation Walk', description: 'A steady walk to build consistency.', fitnessLevel: 'beginner', durationMinutes: 30, activityType: 'walking' },
      { title: 'Tempo Run', description: 'A focused interval run for developing endurance.', fitnessLevel: 'intermediate', durationMinutes: 35, activityType: 'running' },
      { title: 'Strength Circuit', description: 'A demanding full-body circuit with minimal rest.', fitnessLevel: 'advanced', durationMinutes: 45, activityType: 'strength' },
    ]);

    console.log('Database seeding complete');
    process.exitCode = 0;
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
