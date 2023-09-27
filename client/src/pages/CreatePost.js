import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };    // exporting modules from React-quill library

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();

        const respond = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
        });
        if (respond.ok){
            setRedirect(true);
        }
    }
    if (redirect){
        return <Navigate to={'/'} />
    }
    return (
        <form onSubmit={createNewPost}>
            <input type="text"
                    placeholder="Title" 
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}/> {/* updating the value of title via useState */}
            <input type="text" 
                    placeholder="Summary" 
                    value={summary}
                    onChange={ev => setSummary(ev.target.value)}/> {/* updating the value opf summary via useState */}
            <input type="file" 
                    placeholder="File"
                    onChange={ev => setFiles(ev.target.files)} />
            <ReactQuill value={content} 
                        onChange={newValue => setContent(newValue)} 
                        modules={modules} 
                        formats={formats}/>
            <button style={{marginTop:'5px'}}>Create Post</button>
        </form>
    )
}