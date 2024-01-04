import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import SearchBar from '../components/SearchBar';
import CategoryIcons from '../components/CategoryIcons';
import Cards from '../components/Cards';
import ListsHeader from '../components/ListsHeader';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import useMyInfo from '../../../common/util/customHook/useMyInfo';
import Loading from '../../../common/components/Loading';

export default function Lists() {
  const { myData, isLoading } = useMyInfo();

  const location = useLocation();

  const isPathLists = location.pathname === '/lists';

  const selectedCategory = useSelector(
    (state: RootState) => state.selectedCategory,
  );

  const selectedLocation = useSelector(
    (state: RootState) => state.selectedLocation,
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <SearchBar
        selectedCategory={selectedCategory}
        selectedLocation={selectedLocation}
      />
      {isPathLists ? (
        <CategoryIcons selectedCategory={selectedCategory} />
      ) : null}
      <ListsHeader selectedLocation={selectedLocation} myData={myData} />
      <Cards
        selectedLocationId={selectedLocation.locationId}
        selectedCategoryId={selectedCategory.categoryId}
      />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
