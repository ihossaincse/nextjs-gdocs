import Icon from '@material-tailwind/react/Icon';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';
import TextEditor from '../../components/TextEditor';
import { db } from "../../firebase";

const Doc = () => {
    const router = useRouter();
    const {id} = router.query;
    
    const [snapshot, loadingSnapshot] = useDocumentOnce(db.collection("docs").doc(id));
    
    return (
    <div>
      <Head>
        <title>React Google Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-between items-center p-3 pb-1">
        <span onClick={() => router.push("/")} className="cursor-pointer">
          <Icon name="description" size="5xl" color="blue" />
        </span>
        <div className="flex-grow px-2">
          <h2>{snapshot?.data()?.name}</h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-500">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
      </header>
      <TextEditor />
    </div>
    )
}

export default Doc
