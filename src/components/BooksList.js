import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from "../services/book.services";
import { collection, getDocs } from "firebase/firestore"; 
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../firebase-config";

// const BooksList = ({ getBookId }) => {
//   const [books, setBooks] = useState([]);
//   useEffect(() => {
//     const colRef = collection(db, "books")
//     //real time update
//     onSnapshot(colRef, (snapshot) => {
//       // console.log("working firebase =>",snapshot)
//       const newBooks = [];
//         snapshot.docs.forEach((doc) => {
//     // setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     newBooks.push({ ...doc.data(), id: doc.id });
//   });
//     setBooks(newBooks)
//           console.log("working firebase =>",doc.data())
        
//         })
// }, [])
  


const BooksList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const colRef = collection(db, "books");

    // Real-time update
    onSnapshot(colRef, (snapshot) => {
      const newBooks = [];

      snapshot.docs.forEach((doc) => {
        newBooks.push({ ...doc.data(), id: doc.id });
      });

      setBooks(newBooks);
    });
  }, []);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getBooks}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getBookId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default BooksList;