//Function for calculate the Pearson Correlation between two users
const pearsonCorrelation = (user1Ratings: any, user2Ratings: any) => {
  const mutualItems = [];

  for (let item in user1Ratings) {
    if (item in user2Ratings) {
      mutualItems.push(item);
    }
  }

  const n = mutualItems.length;

  if (n === 0) return 0;

  let sum1 = 0,
    sum2 = 0,
    sum1Sq = 0,
    sum2Sq = 0,
    pSum = 0;

  mutualItems.forEach((item) => {
    const user1Rating = user1Ratings[item];
    const user2Rating = user2Ratings[item];

    sum1 += user1Rating;
    sum2 += user2Rating;
    sum1Sq += Math.pow(user1Rating, 2);
    sum2Sq += Math.pow(user2Rating, 2);
    pSum += user1Rating * user2Rating;
  });

  const num = pSum - (sum1 * sum2) / n;
  const den = Math.sqrt(
    (sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n)
  );

  return den === 0 ? 0 : num / den;
};

const findSimilarUsers = (targetUserId: any, users: any[]) => {
  const scores = [];

  for (let userId in users) {
    if (userId !== targetUserId) {
      const similarity = pearsonCorrelation(users[targetUserId], users[userId]);
      scores.push({ userId, similarity });
    }
  }

  return scores.sort((a, b) => b.similarity - a.similarity);
};
