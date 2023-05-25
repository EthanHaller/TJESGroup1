import Popup from "./Popup";
import EditTeacherForm from "./EditTeacherForm";

export default function TeacherView({data, isTeacherView, toggleTeacherView, index, changeIsDataChanged, isDataChanged, currentUser}) {
    return (
        <div>
    {isTeacherView && <Popup
      content={<>
      <div className="studentTitleBox">
        <h3 className="studentNameEdit">{data[index].data.name}</h3>
        </div>
        <EditTeacherForm toggleTeacherView={toggleTeacherView} data={data[index]} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged} currentUser={currentUser}/>
      </>}
      handleClose={toggleTeacherView}
    />}
  </div>
    );
}