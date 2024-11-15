import Grid from '@mui/material/Grid2';
import {CardsComponent} from "./Cards"
export function Cards() {
  const plantsList = [
    {
      title: "Spider Plant",
      subtitle: "Best in Spring",
      image: "https://images.app.goo.gl/CckHw1DnKCJgipLC7",
      description: "Great air-purifying plant that thrives in indirect sunlight.",
      careTips: [
        "Water every 1-2 weeks. ",
        "Prefer temperatures between 65-75°F. ",
        "Repot every 2-3 years. "
      ]
    },
    {
      title: "Fiddle Leaf Fig",
      subtitle: "Low Light Tolerant",
      image: "https://images.app.goo.gl/2PZGMWEyJPRmiZjH9",
      description: "A popular houseplant known for its large, lush leaves.",
      careTips: [
        "Water when the top inch of soil is dry. ",
        "Needs bright, indirect sunlight. ",
        "Dust leaves regularly to keep them clean. "
      ]
    },
    {
      title: "Succulent",
      subtitle: "Indoor or Outdoor",
      image: "https://unsplash.com/photos/green-succulent-plant-tR2aTsb4qG0",
      description: "Easy to care for, perfect for beginners.",
      careTips: [
        "Water sparingly, every 2-3 weeks. ",
        "Prefer bright light but can tolerate partial shade. ",
        "Well-draining soil is essential. "
      ]
    }
  ];
  return (
    <Grid container spacing={4} size={{ s: 4, md: 8 }}>
      {plantsList.map((plants, index) => (
        <Grid item xs={8} key={index}>
          <CardsComponent plants={plants} />
        </Grid>
      ))}
    </Grid>
  );
}