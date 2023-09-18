import { auth, db } from './config/firebase';
import { getDocs, getDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';


const util = {
  logout: async () => {
    try {
      await signOut(auth);
      alert("User Logout successfully!");
      return true;
    } catch (error) {
      console.error("Error logging out user:", error.message);
      return false;
    }
  },
  getGeneralDetails : async()=>{
    try {
      const generalDetails = doc(db, auth.currentUser.email, 'generalDetail');
      let genDoc = (await getDoc(generalDetails)).data();
      return genDoc;
    } catch (error) {
      console.log(error)
    }
  },
  updateGeneral: async (updateFeild, op, quant) => {
    try {
      const generalDetails = doc(db, auth.currentUser.email, 'generalDetail');
      let genDoc = (await getDoc(generalDetails)).data();
      genDoc[updateFeild] = op ? (Number(genDoc[updateFeild]) + Number(quant)) : (Number(genDoc[updateFeild]) - Number(quant));
      await updateDoc(generalDetails, genDoc);
    } catch (error) {
      console.log(error)
    }
  },
  addMember: async (student) => {
    try {
      const studentsDataRef = doc(db, auth.currentUser.email, 'student');
      const customDocRef = doc(studentsDataRef, 'data', student.enrollment);
      await util.updateGeneral('totalStudent',1,1)
      await setDoc(customDocRef, student);
      util.createStudentLog(student.enrollment);
    } catch (error) {
      console.log(error)
    }
  },
  getStudent: async () => {
    try {
      const studentCollection = collection(db, auth.currentUser.email, 'student', 'data');
      const data = await getDocs(studentCollection);
      const studentsList = data.docs.map((doc) => ({ ...doc.data() }));
      return studentsList;
    } catch (error) {
      console.log(error)
    }
  },
  createStudentLog: async (enrollment) => {
    try {
      const studentsDataRef = doc(db, auth.currentUser.email, 'student');
      const customDocRef = doc(studentsDataRef, 'bookDetails', enrollment);
      await setDoc(customDocRef, { ReturnedBooks: [], notReturedBook: [] });
    } catch (error) {
      console.log(error)
    }
  },
  getBooks: async () => {
    try {
      const bookCollection = collection(db, auth.currentUser.email, 'bookCollection', 'data');
      const data = await getDocs(bookCollection);
      const bookList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return bookList;
    } catch (error) {
      console.log(error)
    }
  },
  addBook: async (id, book) => {
    try {
      const bookRef = doc(db, auth.currentUser.email, 'bookCollection');
      const customBookRef = doc(bookRef, 'data', id);
      await setDoc(customBookRef, book);
      util.updateGeneral('totalBooks', 1, book.tcount);
    } catch (error) {
      console.log(error)
    }
  },
  searchStudent: async (para, student) => {
    try {
      let stList = await util.getStudent();
      let selectedSt = stList.filter((data) => data[para] === student ? data : '')

      return { ...selectedSt };
    } catch (error) {
      console.log(error)
    }
  },
  searchBook: async (para, book) => {
    try {
      let bookList = await util.getBooks();
      let selectBook = bookList.filter((data) => data[para] === book ? data : '')
      return { ...selectBook };
    } catch (error) {
      console.log(error)
    }
  },
  issueBook: async (enrollment, book) => {
    try {
      const studentCollection = doc(db, auth.currentUser.email, 'student', 'bookDetails', enrollment);
      const studentBook = (await getDoc(studentCollection)).data();
      let bookStatus = false;
      studentBook.notReturedBook.map((value) => {
        if (book === value) {
          bookStatus = true;
        }
      })
      if (bookStatus) {
        alert(`Book Already alloted to ${enrollment}`);
        return;
      } else {
        studentBook.notReturedBook.push(book)

        await updateDoc(studentCollection, studentBook);
        alert(`Successfully alloted to ${enrollment}`);
        await util.updateGeneral('issueBooks', 1, 1)
        await util.updateGeneral('totalBooks', 0, 1)
        await util.updateBookCount(book, 0)
      }
    } catch (error) {
      console.error(error);
    }
  },
  returnBook: async (enrollment, book) => {
    try {
      const studentCollection = doc(db, auth.currentUser.email, 'student', 'bookDetails', enrollment);
      const studentBook = (await getDoc(studentCollection)).data();
      let check = false;
      let notReturnedBook = studentBook['notReturedBook'].filter((value) => {
        if (value === book) {
          check = true;
        }
        return book !== value ? value : ''
      })
      if (check) {
        alert(`Successfully Returnrd from ${enrollment}`);
        let returnedBook = studentBook.ReturnedBooks;
        returnedBook.push(book);
        await updateDoc(studentCollection, { notReturedBook: notReturnedBook.length ? notReturnedBook : [], ReturnedBooks: returnedBook.length ? returnedBook : [] });
        await util.updateGeneral('totalBooks', 1, 1)
        await util.updateGeneral('issueBooks', 0, 1)
        await util.updateBookCount(book, 1)

      } else {
        alert(`There is no Book to Return`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  getStudentBookLog: async (enrollment) => {
    try {
      const studentCollection = doc(db, auth.currentUser.email, 'student', 'bookDetails', enrollment);
      const studentBook = (await getDoc(studentCollection)).data();
      return studentBook;
    } catch (error) {
      console.error(error);
    }
  },
  updateBookCount: async (bookId, op) => {
    try {
      const bookList = doc(db, auth.currentUser.email, 'bookCollection', 'data', bookId);
      let book = (await getDoc(bookList)).data();
      book['tcount'] = op ? (Number(book['tcount']) + 1) : (Number(book['tcount']) - 1);
      await updateDoc(bookList, book);
    } catch (error) {
      console.log(error)
    }
  }
};

export default util;
