import { Location1 } from '../../../common/components/Locations';

const Form = () => {
  return (
    <form method="post" action="">
      <label htmlFor="title">제목</label>
      <input type="text" name="title" />
      <label htmlFor="location">지역</label>
      <Location1 />
    </form>
  );
};

export default Form;
