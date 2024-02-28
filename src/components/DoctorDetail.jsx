const DoctorDetail = ({ doctors }) => {
  return (
    <div>
      {doctors.map((doctor) => {
        <div className="doctor-detail-row">
          <img src={doctor.image} alt="" />
          <div className="doctor-info">
            <p>{doctor.name}</p>
            <p>{doctor.gender}</p>
            <p>{doctor.age}</p>
            <p>{doctor.degree}</p>
            <p>{doctor.email}</p>
            <p>{doctor.phoneNumber}</p>
            <p>{doctor.education}</p>
            
          </div>
        </div>;
      })}
    </div>
  );
};

export default DoctorDetail;
