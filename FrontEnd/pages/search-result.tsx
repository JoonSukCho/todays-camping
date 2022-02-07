import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';

const SearchResult = () => {
  return (
    <>
      <Header brand="오늘의 캠핑" rightLinks={<HeaderLinks />} fixed color="black" />
    </>
  );
};

export default SearchResult;
