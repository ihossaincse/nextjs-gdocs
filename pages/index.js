import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import firebase from 'firebase/compat/app';
import Head from 'next/head';
import { useEffect, useState } from "react";
import DocsBlank from "../assets/images/docs-blank-googlecolors.png";
import DocumentRow from "../components/DocumentRow";
import Header from '../components/Header';
import { db } from "../firebase";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  
  useEffect(() => {
    db.collection("docs").orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      setData(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
      });
  }, []);
  
  const createDocument = () => {
    if(!input) return;

    db.collection("docs").add(
      {
        name: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }
    )

    setInput('');
    setShowModal(false);
  }
  
  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="outline-none w-full" placeholder="Enter name of document" />
      </ModalBody>
      <ModalFooter>
          <Button 
              color="blue"
              buttonType="link"
              onClick={(e) => setShowModal(false)}
              ripple="dark"
          >
              Cancel
          </Button>
          <Button
              color="blue"
              onClick={() => createDocument()}
              ripple="light"
          >
              Create
          </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <Head>
        <title>React Google Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {modal}
      <section className="bg-gray-100 p-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <Button color="grey" buttonType="outline" rounded={true} iconOnly={true} ripple="dark" className="border-0">
                <Icon name="more_vert" size="3xl" />
            </Button>
          </div>
          <div>
            <img onClick={() => setShowModal(true)} className="blank__image" src={DocsBlank.src} alt="Google Docs Blank" />
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">Blank</p>
          </div>
        </div>
      </section>
      <section className="bg-white p-10 pt-0 pb-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Document</h2>
            <p className="pr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
        </div>
      </section>
      <div className="max-w-3xl mx-auto pb-10">
        {data?.map(doc => <DocumentRow key={doc.id} id={doc.id} name={doc.data.name} timestamp={doc.data.timestamp} />)}
      </div>
    </div>
  )
}
