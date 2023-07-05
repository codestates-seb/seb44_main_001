import { useParams } from 'react-router-dom';
import SearchBar from '../../../common/components/SearchBar';
import Cards from '../../../common/components/Cards';
export default function Search() {
  const params = useParams();
  console.log(params.keyword)
  return (
    <div>
      <SearchBar />
      <Cards lists={[]} />
    </div>
  );
}
