import React, { useState, useEffect } from "react";
import "./Marks.css";
import data from "../../studentsdata/marksdata.json";
import { useParams } from "react-router-dom";

export const Marks = () => {
  const { rn } = useParams();

  const [totalMarksGot, setTotalMarksGot] = useState(0);
  const [totalMarksFor, setTotalMarksFor] = useState(0);

  const studentmarksdetails = data.data.find((item) =>
    rn.includes(item.rollno)
  );

  useEffect(() => {
    if (studentmarksdetails) {
      const marksGot = studentmarksdetails.marksdetails.reduce(
        (acc, curr) => acc + curr.marks_got,
        0
      );
      const marksFor = studentmarksdetails.marksdetails.reduce(
        (acc, curr) => acc + curr.marks_total_per_subject,
        0
      );
      setTotalMarksGot(marksGot);
      setTotalMarksFor(marksFor);
    }
  }, [studentmarksdetails]);

  if (!studentmarksdetails) {
    return (
      <section>
        <div className="container markspage">
          <div className="row">
            <div className="col-lg-12">
              <div>
                <div style={{ float: "left" }}>
                  <span>
                    <b>Students Details not found</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container markspage">
        <div className="row">
          <div className="col-lg-12">
            <div>
              <div style={{ float: "left" }}>
                <span>
                  <b>Name :</b>
                </span>{" "}
                {studentmarksdetails.name}
              </div>
              <br />
              <div style={{ float: "left" }}>
                <span>
                  <b>Roll No :</b>
                </span>{" "}
                {studentmarksdetails.rollno}
              </div>
              <div className="container table-responsive py-5">
                <table className="table table-bordered table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Marks</th>
                      <th scope="col">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentmarksdetails.marksdetails.map(
                      (marksdetail, index) => (
                        <tr key={marksdetail.subject}>
                          <th scope="row">{index + 1}</th>
                          <td>{marksdetail.subject}</td>
                          <td>
                            {marksdetail.marks_got} /{" "}
                            {marksdetail.marks_total_per_subject}
                          </td>
                          <td
                            className={
                              marksdetail.result == "PASS" ? "pass" : "fail"
                            }
                          >
                            <b>{marksdetail.result}</b>
                          </td>
                        </tr>
                      )
                    )}

                    <tr>
                      <th scope="row"></th>
                      <td>
                        <b>Total</b>
                      </td>
                      <td>
                        <b>
                          {totalMarksGot} / {totalMarksFor}
                        </b>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};