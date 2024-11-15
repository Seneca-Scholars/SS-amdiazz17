import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    ...(props => ({
      transform: props.expand ? 'rotate(180deg)' : 'rotate(0deg)',
    })),
  }));
export function CardsComponent({plants}){
      const [expanded, setExpanded] = useState(false);
      const handleExpandClick = () => {
        setExpanded(!expanded);
      }
    return(
        <Card sx={{maxWidth: 300}}>
            <CardHeader
                title={plants.title}
                subheader={plants.subtitle}
            />
            <CardMedia
            component="img"
            image={plants.image}
            />
            <CardContent>
                <Typography>
                    {plants.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                <FavoriteIcon/>
                </IconButton>
                <ExpandMore
                    expannd={expanded}
                    onClick={handleExpandClick}
                >
                <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        Care Tips:
                    </Typography>
                    <Typography>
                        {plants.careTips}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>

    )
}