import Popup from "./Popup";
import EditTeacherForm from "./EditTeacherForm";

export default function TeacherView({data, isTeacherView, toggleTeacherView, index, changeIsDataChanged, isDataChanged}) {
    return (
        <div>
    {isTeacherView && <Popup
      content={<>
        <b>{data[index].data.name}</b>
        <EditTeacherForm toggleTeacherView={toggleTeacherView} data={data[index]} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged}/>
      </>}
      handleClose={toggleTeacherView}
    />}
  </div>
    );
}