import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

const Editor = dynamic(() => import("react-draft-wysiwyg").then(module => module.Editor), {ssr: false});

const TextEditor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const router = useRouter();
    const {id} = router.query;
    const [snapshot] = useDocumentOnce(db.collection("docs").doc(id));

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        db.collection("docs").doc(id).set({
            editorState: convertToRaw(editorState.getCurrentContent())
        }, {
            merge: true
        });
    }

    useEffect(() => {
        if(snapshot?.data()?.editorState) {
            const editorStateData = snapshot?.data()?.editorState;
            const editorStateContent = EditorState.createWithContent(convertFromRaw(editorStateData));
            setEditorState(editorStateContent);
        }
    }, [snapshot]);

    return (
        <div className="textEditor bg-gray-100 pb-16">
            <Editor
            editorState={editorState}
            toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
            editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12"
            onEditorStateChange={onEditorStateChange}
            />
        </div>
    )
}

export default TextEditor
