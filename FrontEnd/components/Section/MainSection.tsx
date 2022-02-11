import styled from 'styled-components';

interface MainSectionProps {
  children: React.ReactNode;
}

const MainSection = ({ children }: MainSectionProps) => {
  return (
    <Section>
      <Container>{children}</Container>
    </Section>
  );
};

const Section = styled.section`
  background: #ffffff;
  position: relative;
  z-index: 3;
  border-radius: 6px;
  /* box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2); */
`;

const Container = styled.div`
  width: 100%;
  padding: 50px 15px 0px 15px;
  margin: 0 auto;
  background-color: #f5f6fa;
`;

export default MainSection;
