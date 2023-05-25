import Popup from "./Popup";
import EditTeacherForm from "./EditTeacherForm";

export default function TeacherView({data, isTeacherView, toggleTeacherView, index, changeIsDataChanged, isDataChanged, currentUser}) {
    return (
        <div>
    {isTeacherView && <Popup
      content={<>
        <b>{data[index].data.name}</b>
        <EditTeacherForm toggleTeacherView={toggleTeacherView} data={data[index]} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged} currentUser={currentUser}/>
      </>}
      handleClose={toggleTeacherView}
    />}
  </div>
    );
}