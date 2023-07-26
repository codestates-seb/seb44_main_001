import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { setCreatedPost } from '../store/CreatedPost';
import { ArticleToPost } from '../../../common/type';
import {
  BASE_URL,
  CONTENT_INPUT_PLACEHOLDER,
} from '../../../common/util/constantValue';
import { useMemo, useRef } from 'react';
import axios from 'axios';

function Editor({ data }: { data: ArticleToPost }) {
  const dispatch = useDispatch();

  const quillRef = useRef<ReactQuill | null>(null);

  const handleContentChange = (value: string) => {
    dispatch(setCreatedPost({ ...data, content: value }));
  };

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files && input.files[0];

      const formData = new FormData();

      if (file) {
        formData.append('img', file);
      }

      try {
        const result = await axios.post(
          `${BASE_URL}/posts/upload-image`,
          formData,
        );

        console.log(result);

        const IMG_URL = result.data;

        const editor = quillRef.current && quillRef.current.getEditor();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        const range = editor?.getSelection()!;

        editor?.insertEmbed(range?.index, 'image', IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
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
        handlers: {
          image: imageHandler,
        },
      },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
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
      ref={quillRef}
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
