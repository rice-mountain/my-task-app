import { addTestTaskToFirestore } from "../data/taskRepository";

const FirestoreTestButton = () => {
  return (
    <button onClick={addTestTaskToFirestore}>
      Firestore にテストデータを追加
    </button>
  );
};

export default FirestoreTestButton;
