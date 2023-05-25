import Popup from "./Popup";
import EditStudentForm from "./EditStudentForm";

export default function StudentView({data, isStudentView, toggleStudentView, index, changeIsDataChanged, isDataChanged, currentUser}) {
    return (
        <div>
    {isStudentView && <Popup
      content={<>
        <div className="studentTitleBox">
        <h3 className="studentNameEdit">{data[index].data.name}</h3>
        </div>
        <EditStudentForm toggleStudentView={toggleStudentView} data={data[index]} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged} currentUser={currentUser}/>
    </>}
      handleClose={toggleStudentView}
    />}
  </div>
    );
}