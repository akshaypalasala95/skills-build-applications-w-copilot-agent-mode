import { Router } from 'express';
import { Activity, Team, User, Workout } from './models/index.js';

const router = Router();

router.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().populate('team').sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members').sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.post('/teams/:teamId/members/:userId', async (request, response, next) => {
  try {
    const [team, user] = await Promise.all([
      Team.findByIdAndUpdate(request.params.teamId, { $addToSet: { members: request.params.userId } }, { new: true }),
      User.findByIdAndUpdate(request.params.userId, { team: request.params.teamId }, { new: true }),
    ]);
    if (!team || !user) {
      response.status(404).json({ error: 'Team or user not found' });
      return;
    }
    response.json(await team.populate('members'));
  } catch (error) {
    next(error);
  }
});

router.get('/activities', async (request, response, next) => {
  try {
    const filter = request.query.user ? { user: request.query.user } : {};
    response.json(await Activity.find(filter).populate('user', 'username displayName').sort({ completedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/activities', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$user', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { _id: 0, user: { _id: '$user._id', username: '$user.username', displayName: '$user.displayName' }, points: 1, activities: 1 } },
    ]);
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.get('/workouts', async (request, response, next) => {
  try {
    const filter = request.query.level ? { fitnessLevel: request.query.level } : {};
    response.json(await Workout.find(filter).sort({ fitnessLevel: 1, title: 1 }));
  } catch (error) {
    next(error);
  }
});

router.post('/workouts', async (request, response, next) => {
  try {
    response.status(201).json(await Workout.create(request.body));
  } catch (error) {
    next(error);
  }
});

export default router;