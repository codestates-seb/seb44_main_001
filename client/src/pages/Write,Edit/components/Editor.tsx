import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { setCreatedPost } from '../store/CreatedPost';
import { ArticleToPost } from '../../../common/type';
import { CONTENT_INPUT_PLACEHOLDER } from '../../../common/util/constantValue';
import { useMemo } from 'react';

function Editor({ data }: { data: ArticleToPost }) {
  const dispatch = useDispatch();

  const handleContentChange = (value: string) => {
    dispatch(setCreatedPost({ ...data, content: value }));
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image'],
        [{ align: [] }, { color: [] }, { background: [] }],
        ['clean'],
      ],
    }),
    [],
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      placeholder={CONTENT_INPUT_PLACEHOLDER}
      onChange={handleContentChange}
      value={data.content}
    />
  );
}

export default Editor;
