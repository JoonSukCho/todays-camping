import Image from '@material-tailwind/react/Image';
import H6 from '@material-tailwind/react/Heading6';
import Paragraph from '@material-tailwind/react/Paragraph';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';

export default function LandingTeamCard({ img, name, position }) {
  return (
    <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-12 mb-12 px-4">
      <div className="px-6">
        <Image src={img} alt={name} raised />
        <div className="pt-6 text-center">
          <H6 color="gray">{name}</H6>
          <Paragraph color="blueGray">{position}</Paragraph>
          <div className="flex items-center justify-center">
            This is a simple example of a Landing Page you can build using Material Tailwind. It
            features multiple components based on the Tailwind CSS and Material Design by Google.
          </div>
        </div>
      </div>
    </div>
  );
}
