import { useState } from 'react';

// lib
import InfiniteScroll from 'react-infinite-scroll-component';

// components
import Title from 'components/landing/Title';
import TeamCard from 'components/landing/TeamCard';
import RecommendsCard from 'components/recommends/RecommendsCard';

// Images
import Image1 from 'assets/img/team-1-800x800.jpg';
import Image2 from 'assets/img/team-2-800x800.jpg';
import Image3 from 'assets/img/team-3-800x800.jpg';
import Image4 from 'assets/img/team-4-470x470.png';

const TeamSection = () => {
  const [items, setItems] = useState([1]);

  return (
    <section className="pt-20 pb-48">
      <div className="container max-w-7xl mx-auto px-4">
        <Title heading="Here are our heroes">
          According to the National Oceanic and Atmospheric Administration, Ted, Scambos, NSIDClead
          scentist, puts the potentially record maximum.
        </Title>
        <InfiniteScroll
          dataLength={items.length}
          next={() => {
            setTimeout(() => {
              setItems((prev) => prev.concat([5]));
            }, 1000);
          }}
          hasMore
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="flex flex-wrap">
            {items.map((item, idx) => {
              return (
                <>
                  <TeamCard
                    key={String(idx)}
                    img={Image1}
                    name="Ryan Tompson"
                    position="Web Developer"
                  />
                  <TeamCard img={Image2} name="Romina Hadid" position="Marketing Specialist" />
                  <TeamCard img={Image3} name="Alexa Smith" position="UI/UX Designer" />
                  <TeamCard img={Image4} name="Jenna Kardi" position="Founder and CEO" />
                </>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default TeamSection;
