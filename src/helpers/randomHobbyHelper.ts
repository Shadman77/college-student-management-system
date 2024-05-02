export default () => {
  const activities = ['Reading', 'Traveling', 'Movies', 'Games'];
  const randomIndex = Math.floor(Math.random() * activities.length);
  return activities[randomIndex];
};
