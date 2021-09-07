import React from 'react';
import Card from '@material-tailwind/react/Card';
import CardImage from '@material-tailwind/react/CardImage';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H6 from '@material-tailwind/react/Heading6';
import Paragraph from '@material-tailwind/react/Paragraph';
import Button from '@material-tailwind/react/Button';

import Img from 'assets/img/teamwork.jpeg';

const RecommendsCard = () => {
  return (
    <Card className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
      <CardImage src={Img} alt="Card Image" />
      <CardBody className="mx-2">
        <H6 color="gray">Card Title</H6>
        <Paragraph color="gray">
          Don't be scared of the truth because we need to restart the human foundation in truth And I love you like
          Kanye loves Kanye I love Rick Owens’ bed design but the back is...
        </Paragraph>
      </CardBody>

      <CardFooter>
        <Button color="lightBlue" size="lg" ripple="light">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendsCard;