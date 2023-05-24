import Popup from "./Popup";
import EditStudentForm from "./EditStudentForm";

export default function StudentView({data, isStudentView, toggleStudentView, index, changeIsDataChanged, isDataChanged, currentUser}) {
    return (
        <div>
    {isStudentView && <Popup
      content={<>
        <b>{data[index].data.name}</b>
        <EditStudentForm toggleStudentView={toggleStudentView} data={data[index]} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged} currentUser={currentUser}/>
    </>}
      handleClose={toggleStudentView}
    />}
  </div>
    );
}