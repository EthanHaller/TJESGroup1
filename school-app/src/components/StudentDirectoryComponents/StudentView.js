import Popup from "./Popup";
import EditStudentForm from "./EditStudentForm";

export default function StudentView({data, isStudentView, toggleStudentView, index, changeIsDataChanged, isDataChanged}) {
    return (
        <div>
    {isStudentView && <Popup
      content={<>
        <b>{data[index].data.name}</b>
        <EditStudentForm toggleStudentView={toggleStudentView} data={data[index]} changeIsDataChanged={changeIsDataChanged} isDataChanged={isDataChanged}/>
      </>}
      handleClose={toggleStudentView}
    />}
  </div>
    );
}