import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  CardMedia,
  Badge,
} from "@mui/material";
import But from "../UI/But";
import Head from "../UI/Head";
import SubHeading from "../UI/SubHeading";
import clean from '../Images/clean.jpg';
import saveWater from '../Images/saveWater.jpg';
import tree from '../Images/tree.jpg';

const challenges = [
  {
    id: 1,
    title: "Reduce Water Usage",
    description: "Minimize your water usage for a week and track your savings.",
    reward: "Water Saver Badge",
    image: saveWater,
  },
  {
    id: 2,
    title: "Local Cleanup",
    description:
      "Participate in a local cleanup event and help clean your community.",
    reward: "Community Helper Badge",
    image: clean,
  },
  {
    id: 3,
    title: "Tree Plantation",
    description:
      "Participate in a Tree Plantation event and help the earth to be green.",
    reward: "Tree Plantation Badge",
    image: tree,
  },
];

const userChallenges = [
  {
    id: 1,
    title: "Reduce Water Usage",
    completed: false,
  },
  {
    id: 2,
    title: "Local Cleanup",
    completed: false,
  },
  {
    id: 3,
    title: "Tree Plantation",
    completed: false,
  },
];

const Challenges = () => {
  const [userCompletedChallenges, setUserCompletedChallenges] =
    useState(userChallenges);

  const [bagdes,setBadges] = useState(false);
  const BadgeHandler = () => {
    setBadges(true);
  } 

  const handleCompleteChallenge = (id) => {
    setUserCompletedChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === id ? { ...challenge, completed: true } : challenge
      )
    );
    setBadges(true);
  };

  return (
    <Container>
      <Head>Challenges and Rewards</Head>
      <SubHeading>Complete challenges to earn badges and rewards.</SubHeading>
      <Grid container spacing={4}>
      {challenges.map((challenge) => (
        <Grid item xs={12} sm={6} md={4} key={challenge.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={challenge.image} // Assume each challenge object has an image property
              alt={challenge.title}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {challenge.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {challenge.description}
              </Typography>
              <Typography
                variant="body2"
                color="var(--var-color)"
                style={{ marginTop: 10 }}
              >
                Reward: {challenge.reward}
              </Typography>
            </CardContent>
            <CardActions>
              {userCompletedChallenges.find(
                (uc) => uc.id === challenge.id && uc.completed
              ) ? (
                <Button disabled color="primary">
                  Completed
                </Button>
              ) : (
                <Button
                  sx={{
                    background: "var(--var-color)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "var(--var-hover)",
                    },
                  }}
                  onClick={() => handleCompleteChallenge(challenge.id)}
                >
                  Complete Challenge
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>

      <Typography variant="h4" gutterBottom style={{ textAlign:"center",marginTop: 40 }}>
        Your Badges
      </Typography>

      {bagdes ?   
      <Grid container spacing={4}>
        {userCompletedChallenges
          .filter((challenge) => challenge.completed)
          .map((challenge) => (
            <Grid item xs={12} sm={6} md={4} key={challenge.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {challenge.title}
                  </Typography>
                  <Avatar
                    alt={challenge.title}
                    src={`/path-to-badge-images/${challenge.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}.png`}
                    style={{ width: 60, height: 60, margin: "20px auto" }}
                  />
                  <Typography variant="body2" color="text.primary">
                    {challenge.reward}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
        :<SubHeading onClick={BadgeHandler}>Complete the Chanllenge to earn Badges</SubHeading>}
    </Container>
  );
};

export default Challenges;
